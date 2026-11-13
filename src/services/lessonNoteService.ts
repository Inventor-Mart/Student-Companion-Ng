import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  AcademicStream,
  AdminLessonNote,
  AdminLessonNoteStream,
  CurriculumTopic,
  NigerianClassLevel
} from '../types';

export const ADMIN_LESSON_NOTES_COLLECTION = 'admin_lesson_notes';
const CACHE_KEY_ADMIN_LESSON_NOTES = 'sc_admin_lesson_notes_v1';

type NotesListener = (notes: AdminLessonNote[]) => void;
const localListeners = new Set<NotesListener>();

function readCachedNotes(): AdminLessonNote[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY_ADMIN_LESSON_NOTES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCachedNotes(notes: AdminLessonNote[]): void {
  try {
    localStorage.setItem(CACHE_KEY_ADMIN_LESSON_NOTES, JSON.stringify(notes));
  } catch {
    // Ignore storage quota warnings on large attachments
  }
  localListeners.forEach(listener => listener(notes));
}

function slugifySegment(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildAdminLessonNoteId(
  classLevel: string,
  stream: AdminLessonNoteStream,
  term: string,
  subject: string,
  weekNumber: number
): string {
  const raw = [
    slugifySegment(classLevel),
    slugifySegment(stream),
    slugifySegment(term),
    `w${weekNumber}`,
    slugifySegment(subject)
  ]
    .filter(Boolean)
    .join('_')
    .replace(/[^a-zA-Z0-9_-]/g, '');

  return raw.slice(0, 120) || `note_${Date.now()}`;
}

export function normalizeSubjectKey(subject: string): string {
  return subject.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getDefaultQuizIdForClass(classLevel: NigerianClassLevel): string {
  if (classLevel === 'SS 3') return 'jamb-utme-biology-2025';
  if (classLevel === 'JSS 3') return 'bece-math-junior-2024';
  if (classLevel === 'JSS 1') return 'jss1-math-basic-science-2025';
  if (classLevel === 'JSS 2') return 'jss2-algebra-integrated-science-2025';
  if (classLevel === 'SS 1') return 'ss1-promotional-math-biology-2025';
  return 'ss2-promotional-physics-chemistry-2025';
}

export function toCurriculumTopic(
  note: AdminLessonNote,
  fallbackStream?: AcademicStream
): CurriculumTopic {
  const resolvedStream: AcademicStream =
    note.stream === 'All'
      ? note.classLevel.startsWith('JSS')
        ? 'Junior'
        : fallbackStream || 'Science'
      : note.stream;

  return {
    id: note.id,
    classLevel: note.classLevel,
    stream: resolvedStream,
    subject: note.subject,
    term: note.term,
    weekNumber: note.weekNumber,
    topicTitle: note.topicTitle,
    subtopics: note.subtopics,
    readingTimeMinutes: note.readingTimeMinutes,
    summary: note.summary,
    contentMarkdown: note.contentMarkdown,
    keyTakeaways: note.keyTakeaways,
    associatedQuizId: note.associatedQuizId || getDefaultQuizIdForClass(note.classLevel),
    attachmentName: note.attachmentName,
    attachmentDataUrl: note.attachmentDataUrl,
    isAdminOverride: true,
    updatedAt: note.updatedAt
  };
}

export function resolveAdminLessonNote(
  adminNotes: AdminLessonNote[],
  classLevel: NigerianClassLevel,
  subject: string,
  term: '1st Term' | '2nd Term' | '3rd Term',
  weekNumber: number,
  stream?: AcademicStream
): CurriculumTopic | null {
  if (!adminNotes || adminNotes.length === 0) return null;
  const targetSub = normalizeSubjectKey(subject);
  const effectiveClass = classLevel === 'University Aspirant' ? 'SS 3' : classLevel;

  const matchingSlot = adminNotes.filter(
    n =>
      n.classLevel === effectiveClass &&
      n.term === term &&
      n.weekNumber === weekNumber &&
      normalizeSubjectKey(n.subject) === targetSub
  );

  if (matchingSlot.length === 0) return null;

  // Prefer exact stream match over 'All' stream override
  const exactStreamMatch = stream
    ? matchingSlot.find(n => n.stream === stream)
    : undefined;
  const allStreamMatch = matchingSlot.find(n => n.stream === 'All');
  const chosen = exactStreamMatch || allStreamMatch || matchingSlot[0];

  return toCurriculumTopic(chosen, stream);
}

let sharedUnsubFirestore: (() => void) | null = null;
let sharedUnsubAuth: (() => void) | null = null;
let initialFetchDone = false;

function processLessonNotesSnapshot(
  forEach: (cb: (docSnap: { id: string; data: () => unknown }) => void) => void
) {
  const remoteNotes: AdminLessonNote[] = [];
  forEach((docSnap) => {
    const data = docSnap.data() as AdminLessonNote;
    if (data && data.topicTitle && data.classLevel && data.subject) {
      remoteNotes.push({
        ...data,
        id: docSnap.id
      });
    }
  });
  remoteNotes.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  writeCachedNotes(remoteNotes);
}

function attachAuthenticatedNotesListener() {
  if (sharedUnsubFirestore || localListeners.size === 0 || !auth.currentUser) {
    return;
  }
  try {
    const colRef = collection(db, ADMIN_LESSON_NOTES_COLLECTION);
    sharedUnsubFirestore = onSnapshot(
      colRef,
      snapshot => {
        processLessonNotesSnapshot(cb => snapshot.forEach(cb));
      },
      error => {
        console.warn('Admin lesson notes listener fallback to cache:', error);
        const cached = readCachedNotes();
        localListeners.forEach(l => l(cached));
      }
    );
  } catch (err) {
    console.warn('Could not attach Firestore lesson notes listener:', err);
  }
}

function detachSharedNotesListener() {
  if (sharedUnsubFirestore) {
    try {
      sharedUnsubFirestore();
    } catch {}
    sharedUnsubFirestore = null;
  }
}

export function subscribeToAdminLessonNotes(callback: NotesListener): () => void {
  const initialCached = readCachedNotes();
  callback(initialCached);
  localListeners.add(callback);

  // One-shot cloud read on initial mount so unauthenticated views get updates without holding Listen streams
  if (!initialFetchDone && (typeof navigator === 'undefined' || navigator.onLine)) {
    initialFetchDone = true;
    getDocs(collection(db, ADMIN_LESSON_NOTES_COLLECTION))
      .then(snapshot => {
        processLessonNotesSnapshot(cb => snapshot.forEach(cb));
      })
      .catch(() => {});
  }

  // Only attach real-time onSnapshot when user is authenticated
  if (!sharedUnsubAuth) {
    sharedUnsubAuth = onAuthStateChanged(auth, user => {
      if (user && localListeners.size > 0) {
        attachAuthenticatedNotesListener();
      } else {
        detachSharedNotesListener();
      }
    });
  }
  if (auth.currentUser) {
    attachAuthenticatedNotesListener();
  }

  return () => {
    localListeners.delete(callback);
    if (localListeners.size === 0) {
      detachSharedNotesListener();
      if (sharedUnsubAuth) {
        try {
          sharedUnsubAuth();
        } catch {}
        sharedUnsubAuth = null;
      }
    }
  };
}

export async function saveAdminLessonNote(
  note: AdminLessonNote
): Promise<{ savedLocally: boolean; syncedToCloud: boolean }> {
  const sanitized: AdminLessonNote = {
    id: note.id.slice(0, 128),
    classLevel: note.classLevel,
    stream: note.stream,
    subject: note.subject.trim().slice(0, 100),
    term: note.term,
    weekNumber: Math.max(1, Math.min(13, Math.round(note.weekNumber))),
    topicTitle: note.topicTitle.trim().slice(0, 200),
    subtopics: note.subtopics.map(s => s.trim()).filter(Boolean).slice(0, 20),
    readingTimeMinutes: Math.max(1, Math.min(180, Math.round(note.readingTimeMinutes || 7))),
    summary: note.summary.trim().slice(0, 1000),
    contentMarkdown: note.contentMarkdown.trim().slice(0, 120000),
    keyTakeaways: note.keyTakeaways.map(k => k.trim()).filter(Boolean).slice(0, 15),
    associatedQuizId: (note.associatedQuizId || getDefaultQuizIdForClass(note.classLevel)).slice(0, 128),
    uploadMode: note.uploadMode,
    uploadedBy: (note.uploadedBy || 'martorefe@gmail.com').slice(0, 150),
    createdAt: note.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...(note.attachmentName ? { attachmentName: note.attachmentName.trim().slice(0, 200) } : {}),
    ...(note.attachmentDataUrl ? { attachmentDataUrl: note.attachmentDataUrl.slice(0, 650000) } : {})
  };

  // Update local cache immediately for instant UI visibility
  const existing = readCachedNotes();
  const next = [sanitized, ...existing.filter(n => n.id !== sanitized.id)];
  writeCachedNotes(next);

  // Sync to Firestore when Firebase Auth session is active
  if (!auth.currentUser) {
    return { savedLocally: true, syncedToCloud: false };
  }

  const docPath = `${ADMIN_LESSON_NOTES_COLLECTION}/${sanitized.id}`;
  try {
    await setDoc(doc(db, ADMIN_LESSON_NOTES_COLLECTION, sanitized.id), sanitized, { merge: false });
    return { savedLocally: true, syncedToCloud: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function deleteAdminLessonNote(
  noteId: string
): Promise<{ deletedLocally: boolean; syncedToCloud: boolean }> {
  const existing = readCachedNotes();
  const next = existing.filter(n => n.id !== noteId);
  writeCachedNotes(next);

  if (!auth.currentUser) {
    return { deletedLocally: true, syncedToCloud: false };
  }

  const docPath = `${ADMIN_LESSON_NOTES_COLLECTION}/${noteId}`;
  try {
    await deleteDoc(doc(db, ADMIN_LESSON_NOTES_COLLECTION, noteId));
    return { deletedLocally: true, syncedToCloud: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
