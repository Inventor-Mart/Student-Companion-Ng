import { CurriculumTopic } from '../types';
import { safeGetItem, safeSetItem } from '../lib/storage';

interface SavedProgressEntry {
  elapsedSeconds: number;
  targetSeconds: number;
  updatedAt: string;
}

const PROGRESS_STORAGE_PREFIX = 'sc_reading_progress_';
const MAX_SAVED_NOTES = 100;

/**
 * Calculates realistic study time in minutes based on topic breadth
 * (subtopics & markdown sections) plus deliberate comprehension pace (~95 wpm)
 * and worked-example/takeaway digestion.
 * Full multi-topic weekly syllabus notes scale into 20-35 minutes.
 */
export function calculateRealisticStudyMinutes(topic: Partial<CurriculumTopic> | null | undefined): number {
  if (!topic) return 20;

  const subtopicCount = Math.max(1, topic.subtopics?.length || 0);
  const markdown = topic.contentMarkdown || '';
  const headingCount = (markdown.match(/^#{2,4}\s+/gm) || []).length;
  const takeawayCount = topic.keyTakeaways?.length || 0;

  const combinedText = [
    topic.summary || '',
    markdown,
    (topic.keyTakeaways || []).join(' ')
  ].join(' ');
  const wordCount = combinedText.trim().split(/\s+/).filter(Boolean).length;

  // Deliberate study speed (~95 wpm) + multi-topic concept & example digestion
  const wordMinutes = wordCount / 95;
  const topicDepthMinutes = subtopicCount * 2.2 + headingCount * 0.6 + takeawayCount * 0.5;
  const rawMinutes = Math.round(wordMinutes + topicDepthMinutes);

  const isMultiTopicWeekly = subtopicCount >= 3 || headingCount >= 3 || wordCount >= 220;
  const calculated = isMultiTopicWeekly
    ? Math.min(35, Math.max(20, rawMinutes))
    : Math.min(35, Math.max(5, rawMinutes));

  if (topic.isAdminOverride && typeof topic.readingTimeMinutes === 'number' && topic.readingTimeMinutes >= 20) {
    return Math.min(60, Math.max(calculated, Math.round(topic.readingTimeMinutes)));
  }

  return calculated;
}

export function formatStudyTimer(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getStorageKey(studentId?: string): string {
  const cleanId = (studentId || 'guest').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${PROGRESS_STORAGE_PREFIX}${cleanId}`;
}

function readProgressMap(studentId?: string): Record<string, SavedProgressEntry> {
  const raw = safeGetItem(getStorageKey(studentId));
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function getSavedReadingProgress(studentId: string | undefined, noteId: string): number {
  if (!noteId) return 0;
  const map = readProgressMap(studentId);
  const entry = map[noteId];
  if (!entry || typeof entry.elapsedSeconds !== 'number') return 0;
  return Math.max(0, Math.floor(entry.elapsedSeconds));
}

export function saveReadingProgress(
  studentId: string | undefined,
  noteId: string,
  elapsedSeconds: number,
  targetSeconds: number
): void {
  if (!noteId || elapsedSeconds <= 0) return;
  const map = readProgressMap(studentId);
  map[noteId] = {
    elapsedSeconds: Math.min(targetSeconds, Math.max(0, Math.floor(elapsedSeconds))),
    targetSeconds,
    updatedAt: new Date().toISOString()
  };

  // Keep storage bounded to most recent 100 in-progress notes
  const keys = Object.keys(map);
  if (keys.length > MAX_SAVED_NOTES) {
    keys
      .sort((a, b) => (map[a]?.updatedAt || '').localeCompare(map[b]?.updatedAt || ''))
      .slice(0, keys.length - MAX_SAVED_NOTES)
      .forEach(oldestKey => {
        delete map[oldestKey];
      });
  }

  safeSetItem(getStorageKey(studentId), JSON.stringify(map));
}

export function clearSavedReadingProgress(studentId: string | undefined, noteId: string): void {
  if (!noteId) return;
  const map = readProgressMap(studentId);
  if (noteId in map) {
    delete map[noteId];
    safeSetItem(getStorageKey(studentId), JSON.stringify(map));
  }
}
