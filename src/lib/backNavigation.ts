import { useEffect, useId, useRef } from 'react';

export interface BackHandlerEntry {
  id: string;
  seq: number;
  handler: () => boolean | void;
}

export interface ActiveExamBackGuard {
  id: string;
  title: string;
  onConfirmExit: () => void;
}

let handlerSequence = 0;
const backHandlers: BackHandlerEntry[] = [];
const activeExamGuards: Array<ActiveExamBackGuard & { seq: number }> = [];

export function hasNativeAndroidBackBridge(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const androidBridge = (window as unknown as {
      StudentCompanionAndroid?: { isAvailable?: () => boolean };
    }).StudentCompanionAndroid;
    return Boolean(androidBridge && typeof androidBridge.isAvailable === 'function' && androidBridge.isAvailable());
  } catch {
    return false;
  }
}

export function hasNavSentinelState(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean((window.history.state as { __scNavSentinel?: boolean } | null)?.__scNavSentinel);
  } catch {
    return false;
  }
}

export function ensureNavSentinel(): void {
  if (typeof window === 'undefined') return;
  if (hasNativeAndroidBackBridge()) return;
  if (hasNavSentinelState()) return;
  try {
    window.history.pushState({ __scNavSentinel: true, scTs: Date.now() }, '');
  } catch {
    // Ignore history quota or restricted-frame errors
  }
}

export function registerBackHandler(id: string, handler: () => boolean | void): () => void {
  const existingIdx = backHandlers.findIndex((item) => item.id === id);
  if (existingIdx !== -1) {
    backHandlers.splice(existingIdx, 1);
  }

  const seq = ++handlerSequence;
  backHandlers.push({ id, seq, handler });

  return () => {
    const idx = backHandlers.findIndex((item) => item.id === id && item.seq === seq);
    if (idx !== -1) {
      backHandlers.splice(idx, 1);
    }
  };
}

export function dispatchTopBackHandler(): boolean {
  for (let i = backHandlers.length - 1; i >= 0; i--) {
    const entry = backHandlers[i];
    if (!entry) continue;
    try {
      const result = entry.handler();
      if (result !== false) {
        return true;
      }
    } catch {
      return true;
    }
  }
  return false;
}

export function useBackHandler(
  isActive: boolean,
  handler: () => boolean | void,
  idPrefix = 'overlay'
): void {
  const reactId = useId();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!isActive) return;
    ensureNavSentinel();
    const entryId = `${idPrefix}:${reactId}`;
    return registerBackHandler(entryId, () => handlerRef.current());
  }, [isActive, idPrefix, reactId]);
}

export function registerActiveExamBackGuard(
  id: string,
  title: string,
  onConfirmExit: () => void
): () => void {
  const existingIdx = activeExamGuards.findIndex((g) => g.id === id);
  if (existingIdx !== -1) {
    activeExamGuards.splice(existingIdx, 1);
  }
  const seq = ++handlerSequence;
  activeExamGuards.push({ id, title, onConfirmExit, seq });
  return () => {
    const idx = activeExamGuards.findIndex((g) => g.id === id && g.seq === seq);
    if (idx !== -1) {
      activeExamGuards.splice(idx, 1);
    }
  };
}

export function getActiveExamBackGuard(): ActiveExamBackGuard | null {
  if (activeExamGuards.length === 0) return null;
  return activeExamGuards[activeExamGuards.length - 1];
}

export function useActiveExamBackGuard(
  isActive: boolean,
  title: string,
  onConfirmExit: () => void
): void {
  const reactId = useId();
  const exitRef = useRef(onConfirmExit);
  exitRef.current = onConfirmExit;

  useEffect(() => {
    if (!isActive) return;
    ensureNavSentinel();
    const guardId = `exam-guard:${reactId}`;
    return registerActiveExamBackGuard(guardId, title, () => exitRef.current());
  }, [isActive, title, reactId]);
}
