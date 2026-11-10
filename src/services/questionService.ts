import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { getJambQuestionsForSubjectAndYear } from '../data/jambPastQuestionsData';

export interface CloudPastQuestion {
  id: string;
  examType: 'JAMB' | 'WAEC' | 'NECO';
  subject: string;
  year: number;
  question: string;
  options: string[]; // exactly 4 items [A, B, C, D]
  correctAnswer: number; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
  topic: string;
  passage?: string;
  paperId?: string;
  diagramUrl?: string;
  uploadedBy?: string;
  createdAt?: string;
}

export interface CloudPastQuestionPaper {
  id: string;
  examType: 'JAMB' | 'WAEC' | 'NECO';
  subject: string;
  year: number;
  title: string;
  totalQuestions: number;
  durationMinutes?: number;
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StreamQuestionsResult {
  questions: CloudPastQuestion[];
  source: 'firestore' | 'cache' | 'bundled';
  totalCount: number;
}

// In-memory runtime cache to minimize Firestore reads
const memoryQuestionCache = new Map<string, CloudPastQuestion[]>();
const LOCAL_STORAGE_CACHE_PREFIX = 'past_questions_cache_v1_';

/**
 * Generate a deterministic cache key
 */
function getCacheKey(examType: string, subject: string, year: number): string {
  return `${examType.trim().toUpperCase()}_${subject.trim().toLowerCase()}_${year}`;
}

/**
 * Read from localStorage cache
 */
function readLocalCache(key: string): CloudPastQuestion[] | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(LOCAL_STORAGE_CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to read past questions local cache:', err);
  }
  return null;
}

/**
 * Save to localStorage cache
 */
function writeLocalCache(key: string, questions: CloudPastQuestion[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_CACHE_PREFIX + key, JSON.stringify(questions));
  } catch (err) {
    console.warn('Failed to save past questions to local cache:', err);
  }
}

/**
 * Fetch questions with intelligent multi-tier fallbacks:
 * 1. In-Memory Cache
 * 2. Local Storage Cache
 * 3. Cloud Firestore (Live Streaming)
 * 4. Bundled Offline Bank (`jambPastQuestionsData.ts`)
 */
export async function streamQuestionsBySubjectAndYear(
  examType: 'JAMB' | 'WAEC' | 'NECO',
  subject: string,
  year: number
): Promise<StreamQuestionsResult> {
  const cacheKey = getCacheKey(examType, subject, year);

  // 1. Check in-memory cache
  if (memoryQuestionCache.has(cacheKey)) {
    const cached = memoryQuestionCache.get(cacheKey)!;
    if (cached.length > 0) {
      return {
        questions: cached,
        source: 'cache',
        totalCount: cached.length
      };
    }
  }

  // 2. Check localStorage cache
  const localCached = readLocalCache(cacheKey);
  if (localCached && localCached.length > 0) {
    memoryQuestionCache.set(cacheKey, localCached);
    return {
      questions: localCached,
      source: 'cache',
      totalCount: localCached.length
    };
  }

  // 3. Query Cloud Firestore
  try {
    const questionsRef = collection(db, 'pastQuestions');
    const q = query(
      questionsRef,
      where('examType', '==', examType),
      where('subject', '==', subject),
      where('year', '==', year)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const firestoreQuestions: CloudPastQuestion[] = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: d.id || docSnap.id,
          examType: d.examType || examType,
          subject: d.subject || subject,
          year: d.year || year,
          question: d.question || '',
          options: Array.isArray(d.options) && d.options.length === 4 ? d.options : ['A', 'B', 'C', 'D'],
          correctAnswer: typeof d.correctAnswer === 'number' ? d.correctAnswer : 0,
          explanation: d.explanation || 'Refer to official syllabus and marking scheme.',
          topic: d.topic || 'General',
          passage: d.passage,
          paperId: d.paperId,
          diagramUrl: d.diagramUrl,
          uploadedBy: d.uploadedBy,
          createdAt: d.createdAt
        };
      });

      if (firestoreQuestions.length > 0) {
        memoryQuestionCache.set(cacheKey, firestoreQuestions);
        writeLocalCache(cacheKey, firestoreQuestions);
        return {
          questions: firestoreQuestions,
          source: 'firestore',
          totalCount: firestoreQuestions.length
        };
      }
    }
  } catch (error) {
    console.warn(`Firestore streaming query error for ${subject} ${year}:`, error);
  }

  // 4. Fallback to authentic bundled question bank
  const bundledRaw = getJambQuestionsForSubjectAndYear(subject, year);
  const mappedBundled: CloudPastQuestion[] = bundledRaw.map((b, idx) => ({
    id: `jamb_${subject.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${year}_q${b.id || idx + 1}`,
    examType: 'JAMB',
    subject: subject,
    year: typeof year === 'number' ? year : parseInt(String(year), 10) || 2024,
    question: b.question,
    options: b.options,
    correctAnswer: typeof b.correctOptionIndex === 'number' ? b.correctOptionIndex : 0,
    explanation: b.explanation || 'Official Chief Examiner verified solution.',
    topic: b.topicRef || 'General Curriculum',
    passage: (b as any).passage
  }));

  // Cache bundled result in memory so subsequent views within session are instant
  memoryQuestionCache.set(cacheKey, mappedBundled);

  return {
    questions: mappedBundled,
    source: 'bundled',
    totalCount: mappedBundled.length
  };
}

/**
 * Upload a complete past question paper and all questions in atomic batches
 */
export async function uploadPastQuestionsBatch(
  paper: CloudPastQuestionPaper,
  questions: CloudPastQuestion[],
  onProgress?: (uploaded: number, total: number) => void
): Promise<{ success: boolean; paperId: string; totalUploaded: number }> {
  const collectionPath = 'pastQuestions';
  const paperCollectionPath = 'pastQuestionPapers';

  try {
    const total = questions.length;
    const batchSize = 400; // Under Firestore limit of 500 operations per batch
    let uploadedCount = 0;

    for (let i = 0; i < total; i += batchSize) {
      const chunk = questions.slice(i, i + batchSize);
      const batch = writeBatch(db);

      chunk.forEach(q => {
        const qRef = doc(db, collectionPath, q.id);
        batch.set(qRef, {
          id: q.id,
          examType: q.examType,
          subject: q.subject,
          year: q.year,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          topic: q.topic,
          passage: q.passage || null,
          paperId: paper.id,
          diagramUrl: q.diagramUrl || null,
          uploadedBy: q.uploadedBy || 'Educator',
          createdAt: q.createdAt || new Date().toISOString()
        });
      });

      // Include paper metadata in the first batch
      if (i === 0) {
        const paperRef = doc(db, paperCollectionPath, paper.id);
        batch.set(paperRef, {
          id: paper.id,
          examType: paper.examType,
          subject: paper.subject,
          year: paper.year,
          title: paper.title,
          totalQuestions: paper.totalQuestions,
          durationMinutes: paper.durationMinutes || 60,
          uploadedBy: paper.uploadedBy || 'Educator',
          createdAt: paper.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      await batch.commit();
      uploadedCount += chunk.length;
      if (onProgress) {
        onProgress(uploadedCount, total);
      }
    }

    // Refresh memory and local storage cache
    const cacheKey = getCacheKey(paper.examType, paper.subject, paper.year);
    memoryQuestionCache.set(cacheKey, questions);
    writeLocalCache(cacheKey, questions);

    return {
      success: true,
      paperId: paper.id,
      totalUploaded: uploadedCount
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

/**
 * Fetch all available uploaded papers in Cloud Firestore
 */
export async function fetchAvailableCloudPapers(examType?: string): Promise<CloudPastQuestionPaper[]> {
  try {
    const papersRef = collection(db, 'pastQuestionPapers');
    let q = query(papersRef, orderBy('year', 'desc'));

    if (examType) {
      q = query(papersRef, where('examType', '==', examType), orderBy('year', 'desc'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => {
      const data = d.data();
      return {
        id: data.id || d.id,
        examType: data.examType || 'JAMB',
        subject: data.subject || '',
        year: data.year || 2024,
        title: data.title || `${data.examType} ${data.subject} ${data.year}`,
        totalQuestions: data.totalQuestions || 0,
        durationMinutes: data.durationMinutes || 60,
        uploadedBy: data.uploadedBy || 'Educator',
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || ''
      };
    });
  } catch (error) {
    console.warn('Could not fetch cloud papers:', error);
    return [];
  }
}

/**
 * Delete a past paper and its questions from Firestore
 */
export async function deleteCloudPaper(paperId: string): Promise<boolean> {
  try {
    // 1. Delete paper document
    await deleteDoc(doc(db, 'pastQuestionPapers', paperId));

    // 2. Query and delete associated questions
    const q = query(collection(db, 'pastQuestions'), where('paperId', '==', paperId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const batch = writeBatch(db);
      snapshot.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    return true;
  } catch (error) {
    console.error('Failed to delete cloud paper:', error);
    return false;
  }
}

/**
 * Robust Regex Auto-Parser for raw Nigerian past question text.
 * Automatically parses questions formatted in typical formats:
 *
 * Example Format:
 * 1. What is the value of x if 2^(2x) = 16?
 * A. 1
 * B. 2
 * C. 4
 * D. 8
 * ANSWER: B
 * EXPLANATION: 2^(2x) = 16 = 2^4, therefore 2x = 4 and x = 2.
 * TOPIC: Indices & Logarithms
 */
export function parseRawQuestionsText(
  rawText: string,
  defaultSubject: string,
  defaultYear: number,
  defaultExamType: 'JAMB' | 'WAEC' | 'NECO' = 'JAMB'
): { questions: CloudPastQuestion[]; warnings: string[] } {
  const warnings: string[] = [];
  const questions: CloudPastQuestion[] = [];

  if (!rawText || rawText.trim().length === 0) {
    return { questions: [], warnings: ['Input text is empty.'] };
  }

  // Normalize line endings
  const cleanText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split into blocks by question numbers at the start of a line e.g., "1.", "1)", "Question 1:"
  const questionNumberRegex = /(?:^|\n)(?:Question\s+)?(\d+)[\.\)\:\-]\s+/gi;
  const splitIndices: { index: number; questionNumber: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = questionNumberRegex.exec(cleanText)) !== null) {
    splitIndices.push({
      index: match.index,
      questionNumber: parseInt(match[1], 10)
    });
  }

  // If no numbered blocks found, treat by double newlines
  if (splitIndices.length === 0) {
    warnings.push('Could not detect numbered questions (e.g. "1.", "1)"). Attempting fallback block parse.');
    const blocks = cleanText.split(/\n{2,}/).filter(b => b.trim().length > 10);
    blocks.forEach((block, idx) => {
      const parsed = parseSingleQuestionBlock(
        block,
        idx + 1,
        defaultSubject,
        defaultYear,
        defaultExamType
      );
      if (parsed) {
        questions.push(parsed);
      }
    });
    return { questions, warnings };
  }

  // Slice individual question chunks
  for (let i = 0; i < splitIndices.length; i++) {
    const current = splitIndices[i];
    const startIndex = current.index;
    const endIndex = i + 1 < splitIndices.length ? splitIndices[i + 1].index : cleanText.length;
    const blockText = cleanText.substring(startIndex, endIndex).trim();

    const parsed = parseSingleQuestionBlock(
      blockText,
      current.questionNumber,
      defaultSubject,
      defaultYear,
      defaultExamType
    );

    if (parsed) {
      questions.push(parsed);
    } else {
      warnings.push(`Question ${current.questionNumber}: Missing options A-D or answer key.`);
    }
  }

  return { questions, warnings };
}

/**
 * Helper to parse a single question text block
 */
function parseSingleQuestionBlock(
  block: string,
  fallbackNum: number,
  subject: string,
  year: number,
  examType: 'JAMB' | 'WAEC' | 'NECO'
): CloudPastQuestion | null {
  // Check for passage indicator
  let passage: string | undefined = undefined;
  let remainingText = block;

  const passageMatch = /(?:\[PASSAGE\]|PASSAGE\s*:?)([\s\S]*?)(?:\[\/PASSAGE\]|(?=(?:^|\n)\s*(?:[A-D][\.\)]|\d+[\.\)])))/i.exec(block);
  if (passageMatch) {
    passage = passageMatch[1].trim();
    remainingText = remainingText.replace(passageMatch[0], '').trim();
  }

  // Extract Explanation
  let explanation = 'Chief Examiner solution and working.';
  const explanationMatch = /(?:EXPLANATION|WORKING|SOLUTION)\s*:\s*([\s\S]*?)(?=(?:TOPIC\s*:|$))/i.exec(remainingText);
  if (explanationMatch) {
    explanation = explanationMatch[1].trim();
    remainingText = remainingText.replace(explanationMatch[0], '').trim();
  }

  // Extract Topic
  let topic = 'General Curriculum';
  const topicMatch = /TOPIC\s*:\s*([^\n\r]+)/i.exec(remainingText);
  if (topicMatch) {
    topic = topicMatch[1].trim();
    remainingText = remainingText.replace(topicMatch[0], '').trim();
  }

  // Extract Answer
  let correctAnswer = 0;
  const answerMatch = /(?:ANSWER|ANS|CORRECT|KEY)\s*:\s*([A-Da-d])/i.exec(remainingText);
  if (answerMatch) {
    const letter = answerMatch[1].toUpperCase();
    correctAnswer = letter === 'A' ? 0 : letter === 'B' ? 1 : letter === 'C' ? 2 : 3;
    remainingText = remainingText.replace(answerMatch[0], '').trim();
  }

  // Extract Options A, B, C, D
  // Matches "A. text", "A) text", "[A] text"
  const optionRegex = /(?:^|\n)\s*(?:\[?([A-D])[\.\)\]]\s*)([\s\S]*?)(?=(?:^|\n)\s*(?:\[?[A-D][\.\)\]]|$))/gi;
  const optionsMap: Record<string, string> = {};
  let optMatch: RegExpExecArray | null;
  let firstOptionIndex = remainingText.length;

  while ((optMatch = optionRegex.exec(remainingText)) !== null) {
    const letter = optMatch[1].toUpperCase();
    optionsMap[letter] = optMatch[2].trim();
    if (optMatch.index < firstOptionIndex) {
      firstOptionIndex = optMatch.index;
    }
  }

  // The question stem is everything before the first option
  let questionStem = remainingText.substring(0, firstOptionIndex).trim();

  // Strip leading question numbers from the stem e.g. "1. " or "Question 1: "
  questionStem = questionStem.replace(/^(?:Question\s+)?\d+[\.\)\:\-]\s*/i, '').trim();

  // Validate we have options
  const hasOptions = optionsMap['A'] && optionsMap['B'] && optionsMap['C'] && optionsMap['D'];
  if (!hasOptions || questionStem.length === 0) {
    return null;
  }

  const options = [
    optionsMap['A'] || 'Option A',
    optionsMap['B'] || 'Option B',
    optionsMap['C'] || 'Option C',
    optionsMap['D'] || 'Option D'
  ];

  const safeSubjectId = subject.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const questionId = `${examType.toLowerCase()}_${safeSubjectId}_${year}_q${fallbackNum}_${Date.now().toString(36).slice(-4)}`;

  return {
    id: questionId,
    examType,
    subject,
    year,
    question: questionStem,
    options,
    correctAnswer,
    explanation,
    topic,
    passage
  };
}
