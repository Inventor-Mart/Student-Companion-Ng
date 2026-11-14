import { CBTExamResult, VerifiedLessonReadLog } from '../types';

export type OfflineSyncOperationType =
  | 'xp_award'
  | 'lesson_read'
  | 'exam_result'
  | 'study_block';

export interface OfflineSyncQueueItem {
  id: string;
  operationKey: string;
  userId: string;
  type: OfflineSyncOperationType;
  label: string;
  payload: Record<string, any>;
  createdAt: string;
  retryCount: number;
}

export interface OfflineCacheSummary {
  supported: boolean;
  serviceWorkerActive: boolean;
  totalEntries: number;
  cacheNames: string[];
  lastWarmedAt: string | null;
}

const QUEUE_KEY_PREFIX = 'sc_offline_sync_queue_';
const LAST_SYNCED_KEY_PREFIX = 'sc_offline_last_synced_';
const LAST_WARMED_KEY = 'sc_offline_last_warmed_at';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export function getOfflineSyncQueue(userScopeId: string): OfflineSyncQueueItem[] {
  const safeId = (userScopeId || 'guest').trim();
  const list = readJson<OfflineSyncQueueItem[]>(`${QUEUE_KEY_PREFIX}${safeId}`, []);
  return Array.isArray(list) ? list : [];
}

export function saveOfflineSyncQueue(userScopeId: string, items: OfflineSyncQueueItem[]): void {
  const safeId = (userScopeId || 'guest').trim();
  writeJson(`${QUEUE_KEY_PREFIX}${safeId}`, items.slice(-150));
}

export function enqueueOfflineSyncItem(
  userScopeId: string,
  item: Omit<OfflineSyncQueueItem, 'id' | 'userId' | 'createdAt' | 'retryCount'>
): OfflineSyncQueueItem[] {
  const safeId = (userScopeId || 'guest').trim();
  const existing = getOfflineSyncQueue(safeId);
  const nowIso = new Date().toISOString();
  const nextEntry: OfflineSyncQueueItem = {
    ...item,
    id: `${item.type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId: safeId,
    createdAt: nowIso,
    retryCount: 0
  };

  // Deduplicate idempotent snapshots by operationKey
  const filtered = existing.filter((entry) => entry.operationKey !== item.operationKey);
  const updated = [...filtered, nextEntry];
  saveOfflineSyncQueue(safeId, updated);
  return updated;
}

export function getLastOfflineSyncedAt(userScopeId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(`${LAST_SYNCED_KEY_PREFIX}${userScopeId || 'guest'}`);
  } catch {
    return null;
  }
}

export function markOfflineSyncedNow(userScopeId: string): string {
  const iso = new Date().toISOString();
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(`${LAST_SYNCED_KEY_PREFIX}${userScopeId || 'guest'}`, iso);
    } catch {}
  }
  return iso;
}

export function createLessonReadQueuePayload(params: {
  noteId: string;
  topicTitle: string;
  xp: number;
  rank: string;
  streakDays: number;
  lastStudyDate: string;
  completedReadNoteIds: string[];
  verifiedReadingLogs: VerifiedLessonReadLog[];
}) {
  return {
    operationKey: `lesson_read:${params.noteId}`,
    type: 'lesson_read' as const,
    label: `Verified note: ${params.topicTitle}`,
    payload: {
      xp: params.xp,
      rank: params.rank,
      streakDays: params.streakDays,
      lastStudyDate: params.lastStudyDate,
      completedReadNoteIds: params.completedReadNoteIds,
      verifiedReadingLogs: params.verifiedReadingLogs
    }
  };
}

export function createExamResultQueuePayload(result: CBTExamResult, xpAwarded: number) {
  return {
    operationKey: `exam_result:${result.id}`,
    type: 'exam_result' as const,
    label: `${result.examTitle} (${result.score}/${result.totalQuestions})`,
    payload: {
      result: {
        ...result,
        xpAwarded
      }
    }
  };
}

export async function getOfflineCacheSummary(): Promise<OfflineCacheSummary> {
  const supported = typeof window !== 'undefined' && 'caches' in window && 'serviceWorker' in navigator;
  let lastWarmedAt: string | null = null;
  if (typeof window !== 'undefined') {
    try {
      lastWarmedAt = window.localStorage.getItem(LAST_WARMED_KEY);
    } catch {}
  }
  if (!supported) {
    return {
      supported: false,
      serviceWorkerActive: false,
      totalEntries: 0,
      cacheNames: [],
      lastWarmedAt
    };
  }

  let serviceWorkerActive = false;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    serviceWorkerActive = Boolean(reg?.active || navigator.serviceWorker.controller);
  } catch {}

  try {
    const names = await caches.keys();
    let totalEntries = 0;
    for (const name of names) {
      const c = await caches.open(name);
      const keys = await c.keys();
      totalEntries += keys.length;
    }
    return {
      supported: true,
      serviceWorkerActive,
      totalEntries,
      cacheNames: names,
      lastWarmedAt
    };
  } catch {
    return {
      supported: true,
      serviceWorkerActive,
      totalEntries: 0,
      cacheNames: [],
      lastWarmedAt
    };
  }
}

export async function warmOfflineAppCache(): Promise<OfflineCacheSummary> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return getOfflineCacheSummary();
  }

  // Gather currently loaded scripts/stylesheets + core shell URLs
  const assetUrls = new Set<string>([
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
    '/pwa-maskable-512x512.png',
    '/apple-touch-icon.png',
    '/icon.svg',
    '/assets/aistudio/hero_illustration_d825bf85.jpeg',
    '/api/ota/state'
  ]);

  try {
    document
      .querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
        'script[src], link[rel="stylesheet"]'
      )
      .forEach((el) => {
        const src = 'src' in el ? el.src : el.href;
        if (!src) return;
        try {
          const parsed = new URL(src, window.location.origin);
          if (parsed.origin === window.location.origin) {
            assetUrls.add(parsed.pathname + parsed.search);
          }
        } catch {}
      });
  } catch {}

  const urlsArray = Array.from(assetUrls);

  // Ask active Service Worker to warm cache if available
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    await new Promise<void>((resolve) => {
      const channel = new MessageChannel();
      const timeoutId = window.setTimeout(() => resolve(), 3500);
      channel.port1.onmessage = () => {
        window.clearTimeout(timeoutId);
        resolve();
      };
      try {
        navigator.serviceWorker.controller?.postMessage(
          { type: 'WARM_OFFLINE_CACHE', urls: urlsArray },
          [channel.port2]
        );
      } catch {
        window.clearTimeout(timeoutId);
        resolve();
      }
    });
  } else {
    // Fallback direct Cache Storage write
    try {
      const cache = await caches.open('sc-shell-v2');
      await Promise.allSettled(
        urlsArray.map(async (u) => {
          const res = await fetch(u, { credentials: 'same-origin' });
          if (res.ok) await cache.put(u, res);
        })
      );
    } catch {}
  }

  try {
    window.localStorage.setItem(LAST_WARMED_KEY, new Date().toISOString());
  } catch {}

  return getOfflineCacheSummary();
}
