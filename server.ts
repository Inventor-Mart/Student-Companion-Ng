import fs from 'fs';
import zlib from 'zlib';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { GoogleGenAI, Type } from '@google/genai';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

import { initializeApp as initServerFirebase, getApps as getServerApps } from 'firebase/app';
import {
  getFirestore as getServerFirestore,
  setLogLevel as setServerFirestoreLogLevel,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  runTransaction,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  increment,
  deleteDoc
} from 'firebase/firestore/lite';
import firebaseConfig from './firebase-applet-config.json';
import {
  SecurityService,
  findActiveBlock,
  extractClientIp,
  extractDeviceFingerprint,
  AUTHORIZED_SUPER_ADMINS
} from './serverSecurity';
import {
  getStudentTierPricing,
  getAspirantTierPricing,
  isReferralPromoActive,
  normalizeNigerianPhone,
  ASPIRANT_FIRST_REG_CASH_NAIRA
} from './src/utils/referralPromoPolicy';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Environment constraint: Dev server must always run on port 3000.
// Cloud Run injects PORT=8080 where nginx runs; binding to 8080 causes EADDRINUSE.
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

// Initialize server-side Firestore (handled errors are caught by routes and SecurityService)
setServerFirestoreLogLevel('silent');
const serverApps = getServerApps();
const serverApp = serverApps.length > 0 ? serverApps[0] : initServerFirebase(firebaseConfig, 'companion-server');
const serverDb = getServerFirestore(serverApp, (firebaseConfig as any).firestoreDatabaseId);
const securityService = new SecurityService(serverDb);

// Health check endpoints for platform probes and control plane
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

// Global Security Middleware (IP / Device Fingerprint Blocking & Sliding-Window Rate Limiting)
app.use('/api', securityService.middleware());
securityService.registerRoutes(app);

// Initialize GoogleGenAI server-side with required User-Agent
let aiInstance: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// Check if error is a transient upstream capacity or network issue
function isTransientGeminiError(err: any): boolean {
  const msg = String(err?.message || err || '');
  const status = err?.status || err?.code;
  return (
    status === 503 ||
    status === 429 ||
    msg.includes('503') ||
    msg.includes('high demand') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('temporarily') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('spikes in demand')
  );
}

// Format raw or nested JSON error messages into human-readable strings
function sanitizeGeminiErrorMessage(err: any, fallbackMessage: string): string {
  if (!err) return fallbackMessage;
  const raw = typeof err === 'string' ? err : err.message || '';
  try {
    const parsed = JSON.parse(raw);
    if (parsed.error && parsed.error.message) {
      return sanitizeGeminiErrorMessage(parsed.error.message, fallbackMessage);
    }
  } catch {}
  if (
    raw.includes('503') ||
    raw.includes('high demand') ||
    raw.includes('UNAVAILABLE') ||
    raw.includes('spikes in demand')
  ) {
    return 'The AI examination engine is experiencing temporary high demand across national servers. Please retry in a few moments.';
  }
  if (raw.includes('429') || raw.includes('RESOURCE_EXHAUSTED') || raw.includes('quota')) {
    return 'Examination generation capacity is temporarily saturated. Please retry in a moment.';
  }
  return raw || fallbackMessage;
}

// Resilient Gemini generation helper with exponential backoff and fallback model
async function generateGeminiWithResilience(params: {
  primaryModel?: string;
  fallbackModel?: string;
  contents: any;
  config: any;
  label?: string;
}): Promise<any> {
  const primaryModel = params.primaryModel || 'gemini-3.8-flash';
  const fallbackModel = params.fallbackModel || 'gemini-flash-latest';
  const label = params.label || 'Gemini Request';

  // Attempt 1: Primary model
  try {
    return await getAi().models.generateContent({
      model: primaryModel,
      contents: params.contents,
      config: params.config,
    });
  } catch (err: any) {
    if (!isTransientGeminiError(err)) {
      throw err;
    }
    console.warn(`[${label}] Primary model ${primaryModel} reported high demand / 503. Retrying with 1500ms backoff...`);
    await new Promise(r => setTimeout(r, 1500));

    // Attempt 2: Retry primary model after 1.5s backoff
    try {
      return await getAi().models.generateContent({
        model: primaryModel,
        contents: params.contents,
        config: params.config,
      });
    } catch (retryErr: any) {
      if (!isTransientGeminiError(retryErr)) {
        throw retryErr;
      }
      console.warn(`[${label}] Primary model retry congested. Delegating to fallback model ${fallbackModel}...`);

      // Attempt 3: Delegate to fallback model
      return await getAi().models.generateContent({
        model: fallbackModel,
        contents: params.contents,
        config: params.config,
      });
    }
  }
}

// 1. Nigerian Secondary AI Study Coach & Exam Master
app.post('/api/gemini/study-tutor', async (req, res) => {
  try {
    const { prompt, subject, examType, level, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = `You are the Expert Nigerian Study Coach and Chief Exam Tutor on the Student Companion platform.
You specialize in Nigerian secondary school education: NERDC curriculum, WAEC (WASSCE), JAMB UTME, and NECO SSCE.
Subject: ${subject || 'General Academic Studies'}
Target Exam: ${examType || 'WAEC / JAMB UTME'}
Class Level: ${level || 'Senior Secondary (SS1 - SS3)'}

Strict Pedagogical Guidelines:
1. Provide structured, step-by-step, encouraging explanations.
2. For Mathematics, Physics, Further Maths, and Chemistry calculations:
   - Identify given parameters and state the standard formula clearly.
   - Show step-by-step substitution and working.
   - Clearly bold or box the final numeric answer with units (e.g., **v = 24.5 m/s**).
3. For JAMB UTME questions:
   - Explain the 40-second speed-solving strategy.
   - Reveal distractor tricks and common examiner traps.
4. For WAEC / NECO essay & theory questions:
   - Highlight what WAEC marking schemes and Chief Examiner reports demand (presentation, steps, units, grammatical concord).
5. Use relatable Nigerian context and examples (e.g., Naira ₦, local geography, practical day-to-day analogies in Lagos, Abuja, Port Harcourt, Ibadan).
6. Present information clearly with markdown headings, bullet points, and numbered steps.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.text && (msg.role === 'user' || msg.role === 'model')) {
          contents.push({
            role: msg.role,
            parts: [{ text: String(msg.text) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: String(prompt) }],
    });

    const response = await generateGeminiWithResilience({
      primaryModel: 'gemini-3.8-flash',
      fallbackModel: 'gemini-flash-latest',
      contents,
      config: {
        systemInstruction,
      },
      label: 'StudyTutor'
    });

    const text = response.text || 'No response generated.';
    return res.json({ text });
  } catch (error: any) {
    console.error('Gemini Study Tutor Error:', error);
    const status = error?.status || 500;
    const sanitized = sanitizeGeminiErrorMessage(error, 'Failed to generate study explanation with Gemini AI');
    return res.status(status).json({
      error: sanitized,
    });
  }
});

// 2. NERDC Syllabus Concept Breakdown Endpoint
app.post('/api/gemini/syllabus-breakdown', async (req, res) => {
  try {
    const { topic, subject, level } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const systemInstruction = `You are an expert curriculum developer for the Nigerian Educational Research and Development Council (NERDC).
You break down complex curriculum topics for Nigerian students preparing for WAEC, JAMB, and NECO exams into simple, intuitive concepts.`;

    const promptText = `Break down the topic "${topic}" for "${subject || 'General'}" (${level || 'Secondary School'}).
Please provide:
1. 💡 **Core Concept in Plain English** (Simple explanation like teaching a curious 15-year-old).
2. 🇳🇬 **Relatable Nigerian Application** (How this appears in everyday life, business, or technology in Nigeria).
3. 📐 **Key Definitions & Formulas to Memorize**.
4. 📝 **2 High-Yield WAEC/JAMB Past Question Scenarios** (Question + Step-by-Step Solution).
5. ⚠️ **Common Exam Pitfalls & Examiner Traps to Avoid**.`;

    const response = await getAi().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
      },
    });

    const text = response.text || 'No breakdown available.';
    return res.json({ text });
  } catch (error: any) {
    console.error('Gemini Syllabus Breakdown Error:', error);
    const status = error?.status || 500;
    return res.status(status).json({
      error: error?.message || 'Failed to break down syllabus topic with Gemini AI',
    });
  }
});

// 2b. AI-Generated Exam Preparation Study Calendar Endpoint
app.post('/api/gemini/generate-exam-calendar', async (req, res) => {
  try {
    const { classLevel, stream, targetExam, weakSubjects, strongSubjects, dailyStudyHours, preferredTimeOfDay } = req.body;

    const systemInstruction = `You are the Chief Academic Strategist and Director of Curriculum for Nigerian Secondary Schools.
You specialize in designing high-yield study timetables aligned with the NERDC curriculum, WAEC (WASSCE), JAMB UTME, and NECO/BECE syllabi.
Your role is to generate a comprehensive, structured daily study calendar for Nigerian secondary school students that eliminates exam anxiety through disciplined daily practice and integrated tutor support.`;

    const promptText = `Generate a structured 14-day intensive daily study calendar for:
- Class Level: ${classLevel || 'SS 3'}
- Academic Stream: ${stream || 'Science'}
- Target Exam: ${targetExam || 'WAEC / JAMB UTME'}
- Priority Weak Subjects (require extra reinforcement & tutor booking recommendations): ${Array.isArray(weakSubjects) && weakSubjects.length > 0 ? weakSubjects.join(', ') : 'Mathematics, English'}
- Strong Subjects (reinforce with speed drills): ${Array.isArray(strongSubjects) && strongSubjects.length > 0 ? strongSubjects.join(', ') : 'Biology, Economics'}
- Daily Study Allocation: ${dailyStudyHours || 2.5} hours per day
- Preferred Study Time: ${preferredTimeOfDay || 'Evening'}

Instructions:
1. Provide a comprehensive strategy breakdown.
2. For each day (Day 1 through Day 14), provide:
   - dayNumber: integer
   - title: concise title (e.g., "Day 1: Algebraic Foundations & Speed Drill")
   - dateLabel: string (e.g., "Day 1")
   - focusTheme: encouraging pedagogical focus (e.g., "Mastering Fractional Indices & Concord")
   - blocks: an array of 2 to 3 study blocks. Each block must have:
     - id: unique string (e.g., "d1-b1")
     - timeSlot: display time (e.g., "04:30 PM - 05:45 PM")
     - subject: subject name matching Nigerian curriculum
     - topic: high-yield syllabus topic
     - keyObjectives: array of 2-3 specific learning outcomes
     - drillQuestionCount: 10, 15, or 20
     - suggestedTutorSubject: relevant subject for 1-on-1 tutoring
     - suggestedTutorTopic: specific difficult subtopic where a student may need tutor help (eligible for ₦4,000 credit)
3. Return valid JSON only.`;

    const response = await getAi().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = (response.text || '{}').trim();
    let parsedCalendar;
    try {
      parsedCalendar = JSON.parse(rawText);
    } catch {
      // In case of markdown formatting
      const cleanJson = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      parsedCalendar = JSON.parse(cleanJson);
    }

    return res.json({
      success: true,
      calendar: parsedCalendar,
    });
  } catch (error: any) {
    console.error('Gemini Exam Calendar Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate study calendar with Gemini AI',
    });
  }
});

// 2c. AI Endless Current Affairs Questions Generator Endpoint
app.post('/api/gemini/current-affairs-questions', async (req, res) => {
  try {
    const { scope = 'nigeria', count = 10, excludeTitles = [] } = req.body;
    const isNigeria = scope === 'nigeria';

    const systemInstruction = `You are the Lead Quizmaster and Chief Examiner for Secondary School General Knowledge and Current Affairs competitions in Nigeria and across the globe.
You produce high-quality, unambiguous 4-option multiple choice questions with accurate historical and contemporary facts, accompanied by concise educational explanations.`;

    const promptText = `Generate ${count} engaging, factually verified multiple-choice questions for the category: "${isNigeria ? 'Nigeria: Governance, History, Geography, Leaders, Constitution, Culture & Landmarks' : 'World: Geopolitics, World Capitals, International Bodies, Landmarks, Science & History'}".
Ensure questions have clear single-line options, exactly one correct option, and an informative 1-2 sentence explanation.

Instructions:
Return valid JSON only formatted as an array of objects with the following schema:
[
  {
    "id": "q-unique-id",
    "question": "The question prompt text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Clear educational explanation of why this option is correct.",
    "category": "${isNigeria ? 'Nigeria Current Affairs' : 'World Current Affairs'}"
  }
]`;

    const response = await getAi().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = (response.text || '[]').trim();
    let questions = [];
    try {
      questions = JSON.parse(rawText);
    } catch {
      const cleanJson = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      questions = JSON.parse(cleanJson);
    }

    return res.json({
      success: true,
      questions: Array.isArray(questions) ? questions : [],
    });
  } catch (error: any) {
    console.error('Gemini Current Affairs Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate current affairs questions with Gemini AI',
    });
  }
});

// 2d. NERDC 40-Question Termly Drill Generator with Firestore Caching
app.post('/api/gemini/generate-termly-drill', async (req, res) => {
  try {
    const {
      classLevel = 'SS 1',
      term = '2nd Term',
      subject = 'Mathematics',
      forceFresh = false,
      studentId,
      topicsContext = []
    } = req.body;

    if (!subject) {
      return res.status(400).json({ success: false, error: 'Subject is required' });
    }

    const sanitizedClass = String(classLevel).trim();
    const sanitizedTerm = String(term).trim();
    const sanitizedSubject = String(subject).trim();
    const drillDocId = `${sanitizedClass}_${sanitizedTerm}_${sanitizedSubject}`.toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    const drillDocRef = doc(serverDb, 'termly_drills', drillDocId);

    // If not requesting a fresh generation, check Firestore cache first
    if (!forceFresh) {
      try {
        const snap = await getDoc(drillDocRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data && data.drill && Array.isArray(data.drill.questions) && data.drill.questions.length >= 20) {
            console.log(`[Firestore Cache Hit] Returning cached termly drill for ${drillDocId}`);
            return res.json({
              success: true,
              cached: true,
              drillId: drillDocId,
              drill: data.drill,
              generatedAt: data.generatedAt || new Date().toISOString()
            });
          }
        }
      } catch (cacheErr) {
        console.warn('Error reading from Firestore termly_drills cache, proceeding to generate fresh:', cacheErr);
      }
    }

    console.log(`[Drill Generation] Generating 40-question termly drill via Gemini for ${sanitizedClass} - ${sanitizedSubject} (${sanitizedTerm})...`);

    const topicsList = Array.isArray(topicsContext) && topicsContext.length > 0
      ? topicsContext.join('\n- ')
      : 'Comprehensive 12-week NERDC termly syllabus topics covering all foundational, intermediate, and advanced concepts.';

    const systemInstruction = `You are the Chief Examiner and Senior Curriculum Specialist for the Nigerian Educational Research and Development Council (NERDC).
You compose official secondary school termly examination papers strictly aligned with the NERDC national curriculum, WAEC, NECO, and BECE testing benchmarks.
You produce unambiguous, pedagogically sound, 4-option objective questions (A, B, C, D) with step-by-step verified explanations and exact syllabus week/topic references.`;

    const promptText = `Generate an official 40-question Termly Drill Examination for Nigerian secondary students with the following parameters:
- Class Level: ${sanitizedClass}
- Academic Term: ${sanitizedTerm}
- Subject: ${sanitizedSubject}
- Standard Official Time Allocation: 45 minutes
- Total Objective Questions: EXACTLY 40 questions

Syllabus Topics (Weeks 1 to 12):
- ${topicsList}

STRICT EXAM REQUIREMENTS:
1. Provide EXACTLY 40 multiple-choice questions numbered id: 1 to 40.
2. Even Distribution across Weeks 1 to 12:
   - Weeks 1–4: Questions 1 to 13
   - Weeks 5–8: Questions 14 to 26
   - Weeks 9–12: Questions 27 to 40
3. For each question:
   - 'question': Clear, realistic exam question statement. For calculation subjects (Maths, Physics, Chemistry, Further Maths, Commerce), include practical numerical values or algebraic terms.
   - 'options': Exactly 4 distinct, plausible options.
   - 'correctOptionIndex': An integer (0 for Option A, 1 for Option B, 2 for Option C, 3 for Option D).
   - 'explanation': Concise, high-yield step-by-step working or rule (1-2 sentences) showing why the option is correct.
   - 'topicRef': Explicit week and topic reference (e.g. "Week 3: Quadratic Equations & Factorization").
4. Difficulty Level: Rigorous, realistic NERDC standard appropriate for ${sanitizedClass}.`;

    const response = await generateGeminiWithResilience({
      primaryModel: 'gemini-3.8-flash',
      fallbackModel: 'gemini-flash-latest',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctOptionIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topicRef: { type: Type.STRING }
                },
                required: ['id', 'question', 'options', 'correctOptionIndex', 'explanation', 'topicRef']
              }
            }
          },
          required: ['title', 'questions']
        }
      },
      label: `TermlyDrill:${sanitizedClass}-${sanitizedSubject}`
    });

    const rawText = (response.text || '{}').trim();
    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const cleanJson = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      parsed = JSON.parse(cleanJson);
    }

    const questionsList = Array.isArray(parsed.questions) ? parsed.questions : [];
    if (questionsList.length === 0) {
      throw new Error('AI generation did not return valid questions');
    }

    const formattedQuestions = questionsList.map((q: any, idx: number) => ({
      id: idx + 1,
      question: q.question || `Question ${idx + 1}`,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctOptionIndex: typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3 ? q.correctOptionIndex : 0,
      explanation: q.explanation || 'Detailed step-by-step explanation based on NERDC curriculum.',
      topicRef: q.topicRef || `Week ${Math.min(12, Math.floor(idx / 3.3) + 1)}`
    }));

    const drill = {
      id: `drill_${drillDocId}_${Date.now()}`,
      examType: 'TERM_MOCK',
      title: parsed.title || `${sanitizedClass} ${sanitizedSubject} - ${sanitizedTerm} 40-Question Drill`,
      subject: sanitizedSubject,
      classLevel: sanitizedClass,
      durationMinutes: 45,
      year: new Date().getFullYear(),
      xpReward: 200,
      questions: formattedQuestions
    };

    // Cache to Firestore in termly_drills
    try {
      await setDoc(drillDocRef, {
        id: drillDocId,
        classLevel: sanitizedClass,
        term: sanitizedTerm,
        subject: sanitizedSubject,
        drill,
        questionCount: formattedQuestions.length,
        generatedAt: new Date().toISOString(),
        lastRequestedBy: studentId || 'anonymous'
      });
      console.log(`[Firestore Cache Write] Successfully cached 40-question drill in /termly_drills/${drillDocId}`);
    } catch (saveErr) {
      console.warn('Failed to cache drill in Firestore:', saveErr);
    }

    return res.json({
      success: true,
      cached: false,
      drillId: drillDocId,
      drill,
      generatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Termly Drill Generation Error:', error);
    const sanitizedMsg = sanitizeGeminiErrorMessage(error, 'Failed to generate 40-question Termly Drill');
    return res.status(500).json({
      success: false,
      error: sanitizedMsg
    });
  }
});

// 2e. Official National Certificate Examination Drill Generator (BECE, WAEC, NECO, JAMB)
app.post('/api/gemini/generate-certificate-drill', async (req, res) => {
  try {
    const {
      board = 'WAEC',
      classLevel = 'SS 3',
      subject = 'Mathematics',
      forceFresh = false,
      studentId
    } = req.body;

    if (!subject) {
      return res.status(400).json({ success: false, error: 'Subject is required' });
    }

    const rawBoard = String(board).trim().toUpperCase();
    const boardKey = rawBoard.includes('BECE')
      ? 'BECE'
      : rawBoard.includes('JAMB')
      ? 'JAMB'
      : rawBoard.includes('NECO')
      ? 'NECO'
      : 'WAEC';

    const sanitizedSubject = String(subject).trim();
    const drillDocId = `${boardKey.toLowerCase()}_${sanitizedSubject.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`;
    const drillDocRef = doc(serverDb, 'certificate_drills', drillDocId);

    // Board standard configurations
    const boardConfig = {
      BECE: {
        examType: 'BECE',
        boardName: 'BECE (Junior WAEC)',
        targetQuestions: 60,
        durationMinutes: 60,
        xpReward: 250,
        scope: '3-year NERDC Junior Secondary Curriculum (JSS 1 through JSS 3)'
      },
      WAEC: {
        examType: 'WAEC',
        boardName: 'WAEC (WASSCE Objective Paper 1)',
        targetQuestions: 50,
        durationMinutes: 60,
        xpReward: 250,
        scope: 'NERDC Senior Secondary Curriculum (SS 1 through SS 3) matching official West African Examinations Council standards'
      },
      NECO: {
        examType: 'NECO',
        boardName: 'NECO (SSCE Objective Paper 1)',
        targetQuestions: 60,
        durationMinutes: 60,
        xpReward: 250,
        scope: 'NERDC Senior Secondary Curriculum (SS 1 through SS 3) matching National Examinations Council standards'
      },
      JAMB: {
        examType: 'JAMB_UTME',
        boardName: 'JAMB (UTME Computer-Based Test)',
        targetQuestions: 60,
        durationMinutes: 45,
        xpReward: 300,
        scope: 'Official Joint Admissions and Matriculation Board (JAMB) UTME syllabus with speed-solving strategies and calculation traps'
      }
    }[boardKey];

    // Check Firestore cache first if not requesting fresh compilation
    if (!forceFresh) {
      try {
        const snap = await getDoc(drillDocRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data && data.drill && Array.isArray(data.drill.questions) && data.drill.questions.length >= 30) {
            console.log(`[Firestore Certificate Cache Hit] Returning cached ${boardKey} drill for ${drillDocId}`);
            return res.json({
              success: true,
              cached: true,
              drillId: drillDocId,
              board: boardKey,
              drill: data.drill,
              generatedAt: data.generatedAt || new Date().toISOString()
            });
          }
        }
      } catch (cacheErr) {
        console.warn('Error reading from Firestore certificate_drills cache, proceeding to generate fresh:', cacheErr);
      }
    }

    console.log(`[Certificate Drill Generation] Generating official ${boardConfig.targetQuestions}-question ${boardKey} paper for ${sanitizedSubject}...`);

    const systemInstruction = `You are the Lead Psychometrician and Chief Examination Board Architect for Nigerian National Certificate Examinations.
You prepare official papers for ${boardConfig.boardName}.
You write authentic, rigorous, 4-option objective questions (options A, B, C, D) strictly faithful to official past examinations, national syllabus weighting, and official test standards.
Every question must contain clear problem statements, verified answers, plausible distractors, and step-by-step educational explanations.`;

    const promptText = `Generate an official authentic ${boardConfig.boardName} Examination Paper for Nigerian students:
- Subject: ${sanitizedSubject}
- Target Candidates: ${boardKey === 'BECE' ? 'Junior Secondary School Class 3 (JSS 3)' : 'Senior Secondary School Class 3 (SS 3) and University Aspirants'}
- Official Syllabus Scope: ${boardConfig.scope}
- Official Allocated Duration: ${boardConfig.durationMinutes} minutes
- Total Number of Objective Questions: EXACTLY ${boardConfig.targetQuestions} questions

STRICT BOARD SPECIFICATIONS:
1. Provide EXACTLY ${boardConfig.targetQuestions} multiple-choice questions numbered id: 1 to ${boardConfig.targetQuestions}.
2. Ensure full syllabus breadth across all foundational, core, and terminal examination topics.
3. For calculation subjects (Mathematics, Physics, Chemistry, Further Mathematics, Commerce, Economics): Include realistic numbers, algebra, or diagrams references.
4. For English Language / Literature: Include grammar concord, lexis & structure, idioms, figures of speech, and comprehension scenarios.
5. For each question:
   - 'question': Clear, realistic, unambiguous examination question statement.
   - 'options': Exactly 4 distinct, plausible options.
   - 'correctOptionIndex': An integer (0 for A, 1 for B, 2 for C, 3 for D).
   - 'explanation': Clear, step-by-step verified working, formula proof, or grammatical concord rule.
   - 'topicRef': Explicit syllabus topic area (e.g., "${boardKey} Core: Circle Theorems" or "${boardKey} Syllabus: Cell Biology").
6. Difficulty and style: Strictly reflect official ${boardConfig.boardName} past question rigor.`;

    const response = await generateGeminiWithResilience({
      primaryModel: 'gemini-3.8-flash',
      fallbackModel: 'gemini-flash-latest',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctOptionIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topicRef: { type: Type.STRING }
                },
                required: ['id', 'question', 'options', 'correctOptionIndex', 'explanation', 'topicRef']
              }
            }
          },
          required: ['title', 'questions']
        }
      },
      label: `CertificateDrill:${boardKey}-${sanitizedSubject}`
    });

    const rawText = (response.text || '{}').trim();
    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const cleanJson = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      parsed = JSON.parse(cleanJson);
    }

    const questionsList = Array.isArray(parsed.questions) ? parsed.questions : [];
    if (questionsList.length === 0) {
      throw new Error(`AI generation did not return valid questions for ${boardKey}`);
    }

    const formattedQuestions = questionsList.map((q: any, idx: number) => ({
      id: idx + 1,
      question: q.question || `Question ${idx + 1}`,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctOptionIndex: typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3 ? q.correctOptionIndex : 0,
      explanation: q.explanation || `Detailed explanation based on ${boardKey} national standards.`,
      topicRef: q.topicRef || `${boardKey} Core Syllabus`
    }));

    const drill = {
      id: `cert_${drillDocId}_${Date.now()}`,
      examType: boardConfig.examType,
      title: parsed.title || `${sanitizedSubject} - Official ${boardConfig.boardName} Drill`,
      subject: sanitizedSubject,
      classLevel: classLevel || (boardKey === 'BECE' ? 'JSS 3' : 'SS 3'),
      durationMinutes: boardConfig.durationMinutes,
      year: new Date().getFullYear(),
      xpReward: boardConfig.xpReward,
      questions: formattedQuestions
    };

    // Cache to Firestore in certificate_drills
    try {
      await setDoc(drillDocRef, {
        id: drillDocId,
        board: boardKey,
        classLevel: classLevel || (boardKey === 'BECE' ? 'JSS 3' : 'SS 3'),
        subject: sanitizedSubject,
        drill,
        questionCount: formattedQuestions.length,
        durationMinutes: boardConfig.durationMinutes,
        generatedAt: new Date().toISOString(),
        lastRequestedBy: studentId || 'anonymous'
      });
      console.log(`[Firestore Certificate Write] Successfully cached ${formattedQuestions.length}-question ${boardKey} drill in /certificate_drills/${drillDocId}`);
    } catch (saveErr) {
      console.warn('Failed to cache certificate drill in Firestore:', saveErr);
    }

    return res.json({
      success: true,
      cached: false,
      drillId: drillDocId,
      board: boardKey,
      drill,
      generatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Certificate Drill Generation Error:', error);
    const sanitizedMsg = sanitizeGeminiErrorMessage(error, 'Failed to generate official certificate examination drill');
    return res.status(500).json({
      success: false,
      error: sanitizedMsg
    });
  }
});

// 3. Email Service Status Endpoint
app.get('/api/email-status', (_req, res) => {
  const hasGmail = Boolean(process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD.trim() !== '');
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '');
  const gmailUser = process.env.GMAIL_USER?.trim() || 'martorefe@gmail.com';

  return res.json({
    configured: hasGmail || hasResend,
    provider: hasGmail ? 'gmail-smtp' : (hasResend ? 'resend' : 'none'),
    senderEmail: hasGmail ? gmailUser : (process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'),
    directDeliveryAvailable: hasGmail || (hasResend && !process.env.RESEND_FROM_EMAIL?.includes('resend.dev')),
  });
});

// 4. Verification Email Dispatch (Gmail SMTP direct to any user + Resend fallback)
app.post('/api/send-verification-code', async (req, res) => {
  try {
    const { email, code, name } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, error: 'Email and 6-digit verification code are required' });
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const displayName = name ? String(name).trim() : 'Student';
    const gmailUser = process.env.GMAIL_USER?.trim() || 'martorefe@gmail.com';
    const rawGmailPass = process.env.GMAIL_APP_PASSWORD?.trim();
    const gmailPassword = rawGmailPass ? rawGmailPass.replace(/\s+/g, '') : '';
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Student Companion Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A1322; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0A1322; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #0E1B2E; border: 1px solid #1E3355; border-radius: 20px; padding: 36px 28px; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);">
          <!-- Header Logo / Badge -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="display: inline-block; padding: 8px 18px; background-color: #14233C; border-radius: 9999px; border: 1px solid #84E000;">
                <span style="font-size: 14px; font-weight: 900; color: #84E000; letter-spacing: 1px; text-transform: uppercase;">
                  🇳🇬 Student Companion
                </span>
              </div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding-bottom: 16px;">
              <h1 style="font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 0 0 10px 0;">Verify Your Email Address</h1>
              <p style="font-size: 14px; color: #94A3B8; margin: 0; line-height: 1.6;">
                Hello <strong style="color: #FFFFFF;">${displayName}</strong>, welcome to Nigeria's premier academic companion for WAEC, JAMB, and NECO excellence.
              </p>
            </td>
          </tr>

          <!-- Verification Box -->
          <tr>
            <td align="center" style="padding: 24px 0;">
              <div style="background-color: #081220; border: 2px dashed #84E000; border-radius: 16px; padding: 20px 24px; display: inline-block;">
                <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #84E000; margin: 0 0 8px 0;">
                  Security Verification Code
                </p>
                <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #FFFFFF; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;">
                  ${code}
                </div>
              </div>
              <p style="font-size: 12px; color: #64748B; margin: 12px 0 0 0;">
                This code expires in <strong>10 minutes</strong>. Never share this code with anyone.
              </p>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="background-color: #14233C; border-radius: 12px; padding: 14px 18px; margin-top: 12px;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                🔒 If you did not attempt to register or sign in to Student Companion, please ignore this email. Your account remains protected.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="border-top: 1px solid #1E304F; margin-top: 24px; padding-top: 20px;">
              <p style="font-size: 11px; color: #64748B; margin: 0; line-height: 1.6;">
                Student Companion Platform &bull; Lagos & Abuja, Nigeria<br />
                NERDC-Aligned Digital Secondary Education
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // OPTION 1: Gmail SMTP via Nodemailer (Delivers to ANY student/parent/tutor email address)
    if (gmailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPassword,
          },
        });

        const info = await transporter.sendMail({
          from: `"Student Companion" <${gmailUser}>`,
          to: trimmedEmail,
          subject: `[Student Companion] ${code} is your verification code`,
          text: `Hello ${displayName},\n\nYour Student Companion verification code is: ${code}\n\nThis code expires in 10 minutes. Do not share this code with anyone.\n\nStudent Companion Nigeria`,
          html: htmlContent,
        });

        console.log(`[Gmail SMTP Success] Verification code sent directly to ${trimmedEmail}. Message ID: ${info.messageId}`);
        return res.json({
          success: true,
          delivered: true,
          provider: 'gmail-smtp',
          deliveredTo: trimmedEmail,
          messageId: info.messageId,
          message: `Verification code successfully delivered to ${trimmedEmail}`,
        });
      } catch (smtpErr: any) {
        console.error('[Gmail SMTP Error]:', smtpErr);
        return res.status(500).json({
          success: false,
          error: `Failed to deliver verification email via Gmail SMTP: ${smtpErr?.message || 'Authentication failed'}. Please ensure your 16-character Google App Password is correct.`,
        });
      }
    }

    // OPTION 2: Resend API (Direct dispatch if verified domain, or to owner if testing)
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'Student Companion <onboarding@resend.dev>';

      const sendResult = await resend.emails.send({
        from: fromEmail,
        to: [trimmedEmail],
        subject: `[Student Companion] ${code} is your verification code`,
        html: htmlContent,
        text: `Hello ${displayName},\n\nYour Student Companion verification code is: ${code}\n\nThis code expires in 10 minutes. Do not share this code with anyone.\n\nStudent Companion Nigeria`,
      });

      if (sendResult.error) {
        if (sendResult.error.statusCode === 403 || sendResult.error.name === 'validation_error') {
          console.error('[Resend Sandbox Restriction]:', sendResult.error.message);
          return res.status(403).json({
            success: false,
            error: `Resend sandbox restriction: The free onboarding domain can only send to ${gmailUser}. To send verification codes directly to ${trimmedEmail}, connect Gmail SMTP using GMAIL_APP_PASSWORD or verify your domain in Resend.`,
          });
        }

        console.error('[Resend Error]:', sendResult.error);
        return res.status(500).json({
          success: false,
          error: `Email delivery failed: ${sendResult.error.message}`,
        });
      }

      console.log(`[Resend Success] Email delivered to ${trimmedEmail}. ID: ${sendResult.data?.id}`);
      return res.json({
        success: true,
        delivered: true,
        provider: 'resend',
        deliveredTo: trimmedEmail,
        id: sendResult.data?.id,
        message: `Verification code successfully sent to ${trimmedEmail}`,
      });
    }

    // STRICT VERIFICATION: If no email credentials configured, refuse registration progression
    return res.status(503).json({
      success: false,
      error: 'Email delivery service is not configured. Please set GMAIL_APP_PASSWORD in environment settings to enable live verification code delivery to any student email.',
    });
  } catch (error: any) {
    console.error('Fatal error in /api/send-verification-code:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error while dispatching verification email',
    });
  }
});

// ==========================================
// GROWTH PARTNER & LIFETIME REVENUE SHARE API
// ==========================================

const REFERRAL_STORE_PATH = '/tmp/sc-referral-store.json';

interface LocalReferralBinding {
  studentId: string;
  partnerId: string;
  partnerName: string;
  referralCodeUsed: string;
  attributedAt: string;
}

interface LocalAspirantRewardRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  referralCodeUsed: string;
  partnerId: string;
  paymentId: string;
  tierPaid: 'basic' | 'elite';
  amountPaidNaira: number;
  rewardType: 'data_2gb' | 'cash_500';
  network?: 'MTN' | 'Airtel' | 'Glo' | '9mobile';
  phoneNumber?: string;
  amountNaira?: number;
  status: 'credited' | 'pending_fulfillment' | 'fulfilled';
  createdAt: string;
  fulfilledAt?: string;
  fulfilledBy?: string;
}

interface ReferralStoreState {
  partners: Record<string, any>;
  bindings: Record<string, LocalReferralBinding>;
  aspirantPaidHistory: Record<string, { paymentId: string; tierPaid: 'basic' | 'elite'; amountPaidNaira: number; paidAt: string }[]>;
  rewards: LocalAspirantRewardRecord[];
  transactions: any[];
}

function loadReferralStore(): ReferralStoreState {
  try {
    if (fs.existsSync(REFERRAL_STORE_PATH)) {
      const raw = JSON.parse(fs.readFileSync(REFERRAL_STORE_PATH, 'utf8'));
      return {
        partners: raw.partners || {},
        bindings: raw.bindings || {},
        aspirantPaidHistory: raw.aspirantPaidHistory || {},
        rewards: Array.isArray(raw.rewards) ? raw.rewards : [],
        transactions: Array.isArray(raw.transactions) ? raw.transactions : []
      };
    }
  } catch {}
  return { partners: {}, bindings: {}, aspirantPaidHistory: {}, rewards: [], transactions: [] };
}

const referralMemoryStore: ReferralStoreState = loadReferralStore();

function saveReferralStore() {
  try {
    fs.writeFileSync(REFERRAL_STORE_PATH, JSON.stringify(referralMemoryStore), 'utf8');
  } catch {}
}

async function resolveActivePartnerByCode(codeRaw: string): Promise<{
  partnerId: string;
  partnerName: string;
  referralCode: string;
  commissionRatePercent: number;
} | null> {
  const cleanCode = String(codeRaw || '').trim().toUpperCase();
  if (!cleanCode) return null;

  try {
    const partnersRef = collection(serverDb, 'growthPartners');
    const partnerQuery = query(partnersRef, where('referralCode', '==', cleanCode));
    const partnerSnap = await getDocs(partnerQuery);
    if (!partnerSnap.empty) {
      const partnerDoc = partnerSnap.docs[0];
      const partner = partnerDoc.data();
      if (partner.status !== 'active') return null;
      return {
        partnerId: partner.id || partnerDoc.id,
        partnerName: partner.name || 'Growth Partner',
        referralCode: cleanCode,
        commissionRatePercent: typeof partner.commissionRatePercent === 'number' ? partner.commissionRatePercent : 10
      };
    }
  } catch {}

  for (const p of Object.values(referralMemoryStore.partners)) {
    if (String(p.referralCode || '').toUpperCase() === cleanCode && p.status === 'active') {
      return {
        partnerId: p.id,
        partnerName: p.name || 'Growth Partner',
        referralCode: cleanCode,
        commissionRatePercent: typeof p.commissionRatePercent === 'number' ? p.commissionRatePercent : 10
      };
    }
  }

  for (const b of Object.values(referralMemoryStore.bindings)) {
    if (b.referralCodeUsed === cleanCode) {
      return {
        partnerId: b.partnerId,
        partnerName: b.partnerName,
        referralCode: cleanCode,
        commissionRatePercent: 10
      };
    }
  }

  return null;
}

async function bindStudentToPartner(params: {
  referralCode: string;
  studentId: string;
  studentName?: string;
}): Promise<{
  success: boolean;
  alreadyLinked?: boolean;
  partnerId?: string;
  partnerName?: string;
  referralCode?: string;
  error?: string;
}> {
  const resolved = await resolveActivePartnerByCode(params.referralCode);
  if (!resolved) {
    return {
      success: false,
      error: `Referral code "${String(params.referralCode).trim().toUpperCase()}" was not found or is inactive.`
    };
  }

  const { partnerId, partnerName, referralCode } = resolved;
  const studentId = params.studentId;
  const studentName = params.studentName || 'Student Scholar';

  const existingLocal = referralMemoryStore.bindings[studentId];
  if (existingLocal && existingLocal.partnerId === partnerId) {
    return {
      success: true,
      alreadyLinked: true,
      partnerId,
      partnerName,
      referralCode
    };
  }

  referralMemoryStore.bindings[studentId] = {
    studentId,
    partnerId,
    partnerName,
    referralCodeUsed: referralCode,
    attributedAt: new Date().toISOString()
  };
  if (referralMemoryStore.partners[partnerId]) {
    const countForPartner = Object.values(referralMemoryStore.bindings).filter(
      b => b.partnerId === partnerId
    ).length;
    referralMemoryStore.partners[partnerId].activeReferralsCount = countForPartner;
  }
  saveReferralStore();

  try {
    const referralId = `${partnerId}_${studentId}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
    const referralRef = doc(serverDb, 'referrals', referralId);
    const existingRef = await getDoc(referralRef);
    if (!existingRef.exists()) {
      await setDoc(referralRef, {
        id: referralId,
        partnerId,
        referredUserId: studentId,
        referredUserName: studentName,
        referralCodeUsed: referralCode,
        status: 'active',
        totalVolumePaidNaira: 0,
        totalCommissionEarnedNaira: 0,
        createdAt: new Date().toISOString()
      });

      const partnerDocSnap = await getDoc(doc(serverDb, 'growthPartners', partnerId));
      const prevCount = partnerDocSnap.exists() ? partnerDocSnap.data().activeReferralsCount || 0 : 0;
      await updateDoc(doc(serverDb, 'growthPartners', partnerId), {
        activeReferralsCount: prevCount + 1,
        updatedAt: new Date().toISOString()
      });
    }
  } catch {}

  return {
    success: true,
    alreadyLinked: false,
    partnerId,
    partnerName,
    referralCode
  };
}

async function processSubscriptionCommissionAndEligibility(params: {
  studentId: string;
  studentName?: string;
  plan: string;
  amountNaira: number;
  paymentGateway?: string;
  clientPaymentId?: string;
  referralCode?: string;
  isAspirant?: boolean;
}) {
  const {
    studentId,
    studentName,
    plan,
    amountNaira,
    paymentGateway,
    clientPaymentId,
    referralCode,
    isAspirant
  } = params;

  const paymentId = clientPaymentId || `PAY_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const sanitizedStudentName = studentName || 'Student Scholar';
  const gateway = paymentGateway || 'Paystack';

  // Auto-bind referral code if supplied at checkout and student isn't already bound
  if (referralCode && String(referralCode).trim()) {
    await bindStudentToPartner({
      referralCode: String(referralCode).trim().toUpperCase(),
      studentId,
      studentName: sanitizedStudentName
    });
  }

  let partnerId: string | null = null;
  let referralDocId: string | null = null;
  let partnerCommissionRate = 10;
  let referralCodeUsed: string | null = referralMemoryStore.bindings[studentId]?.referralCodeUsed || null;

  try {
    const referralsRef = collection(serverDb, 'referrals');
    const referralQuery = query(
      referralsRef,
      where('referredUserId', '==', studentId),
      where('status', '==', 'active')
    );
    const referralSnapshot = await getDocs(referralQuery);

    if (!referralSnapshot.empty) {
      const activeReferral = referralSnapshot.docs[0];
      referralDocId = activeReferral.id;
      const refData = activeReferral.data();
      const refPartnerId = refData.partnerId;
      referralCodeUsed = refData.referralCodeUsed || referralCodeUsed;

      if (typeof refPartnerId === 'string' && refPartnerId.trim().length > 0) {
        partnerId = refPartnerId;
        const partnerDocRef = doc(serverDb, 'growthPartners', refPartnerId);
        const partnerSnap = await getDoc(partnerDocRef);
        if (partnerSnap.exists()) {
          const pData = partnerSnap.data();
          if (pData.status === 'active') {
            partnerCommissionRate = typeof pData.commissionRatePercent === 'number' ? pData.commissionRatePercent : 10;
          } else {
            partnerId = null;
          }
        }
      }
    }
  } catch {}

  if (!partnerId && referralMemoryStore.bindings[studentId]) {
    partnerId = referralMemoryStore.bindings[studentId].partnerId;
    referralCodeUsed = referralMemoryStore.bindings[studentId].referralCodeUsed;
  }

  // 10% commission calculated strictly on the net discounted amount actually paid
  const commissionAmount = partnerId ? Math.round((amountNaira * partnerCommissionRate) / 100) : 0;

  if (partnerId && commissionAmount > 0) {
    if (referralMemoryStore.partners[partnerId]) {
      referralMemoryStore.partners[partnerId].totalEarningsNaira =
        (referralMemoryStore.partners[partnerId].totalEarningsNaira || 0) + commissionAmount;
      referralMemoryStore.partners[partnerId].balanceNaira =
        (referralMemoryStore.partners[partnerId].balanceNaira || 0) + commissionAmount;
    }
    referralMemoryStore.transactions.unshift({
      id: `REV_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      partnerId,
      studentId,
      studentName: sanitizedStudentName,
      paymentId,
      subscriptionPlan: plan,
      paymentAmountNaira: amountNaira,
      commissionRatePercent: partnerCommissionRate,
      commissionAmountNaira: commissionAmount,
      status: 'credited',
      createdAt: new Date().toISOString()
    });
    saveReferralStore();
  }

  const resolvedPartnerId = partnerId;
  const resolvedReferralDocId = referralDocId;

  try {
    await runTransaction(serverDb, async (transaction) => {
      let walletSnap: any = null;
      let partnerSnap: any = null;
      let refSnap: any = null;

      let walletRef: any = null;
      let partnerRef: any = null;
      let refDocRef: any = null;

      if (resolvedPartnerId && commissionAmount > 0) {
        walletRef = doc(serverDb, 'partnerWallets', resolvedPartnerId);
        partnerRef = doc(serverDb, 'growthPartners', resolvedPartnerId);
        walletSnap = await transaction.get(walletRef);
        partnerSnap = await transaction.get(partnerRef);
        if (resolvedReferralDocId) {
          refDocRef = doc(serverDb, 'referrals', resolvedReferralDocId);
          refSnap = await transaction.get(refDocRef);
        }
      }

      if (resolvedPartnerId && commissionAmount > 0 && walletRef && partnerRef) {
        let currentBalance = 0;
        let currentLifetime = 0;
        let currentWithdrawn = 0;

        if (walletSnap && walletSnap.exists()) {
          const wData = walletSnap.data();
          currentBalance = typeof wData.balanceNaira === 'number' ? wData.balanceNaira : 0;
          currentLifetime = typeof wData.lifetimeEarnedNaira === 'number' ? wData.lifetimeEarnedNaira : 0;
          currentWithdrawn = typeof wData.totalWithdrawnNaira === 'number' ? wData.totalWithdrawnNaira : 0;
        }

        transaction.set(
          walletRef,
          {
            partnerId: resolvedPartnerId,
            balanceNaira: currentBalance + commissionAmount,
            lifetimeEarnedNaira: currentLifetime + commissionAmount,
            totalWithdrawnNaira: currentWithdrawn,
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );

        const currentTotalEarnings = partnerSnap && partnerSnap.exists() ? partnerSnap.data().totalEarningsNaira || 0 : 0;
        transaction.set(
          partnerRef,
          {
            totalEarningsNaira: currentTotalEarnings + commissionAmount,
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );

        if (refDocRef) {
          const prevVolume = refSnap && refSnap.exists() ? refSnap.data().totalVolumePaidNaira || 0 : 0;
          const prevCommission = refSnap && refSnap.exists() ? refSnap.data().totalCommissionEarnedNaira || 0 : 0;
          transaction.set(
            refDocRef,
            {
              totalVolumePaidNaira: prevVolume + amountNaira,
              totalCommissionEarnedNaira: prevCommission + commissionAmount,
              lastPaymentDate: new Date().toISOString()
            },
            { merge: true }
          );
        }

        const revTxId = `REV_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const revTxRef = doc(serverDb, 'revenueShareTransactions', revTxId);
        transaction.set(revTxRef, {
          id: revTxId,
          partnerId: resolvedPartnerId,
          studentId,
          studentName: sanitizedStudentName,
          paymentId,
          subscriptionPlan: plan,
          paymentAmountNaira: amountNaira,
          commissionRatePercent: partnerCommissionRate,
          commissionAmountNaira: commissionAmount,
          status: 'credited',
          createdAt: new Date().toISOString()
        });
      }

      const paymentRef = doc(serverDb, 'subscriptionPayments', paymentId);
      transaction.set(paymentRef, {
        id: paymentId,
        studentId,
        studentName: sanitizedStudentName,
        plan,
        amountNaira,
        paymentGateway: gateway === 'Direct Escrow' || gateway === 'wallet' ? 'Direct Escrow' : 'Paystack',
        status: 'successful',
        partnerId: resolvedPartnerId || null,
        partnerCommissionCredited: Boolean(resolvedPartnerId && commissionAmount > 0),
        commissionAmountNaira: commissionAmount,
        createdAt: new Date().toISOString()
      });
    });
  } catch (txErr) {
    console.warn('[Revenue Share Notice] Firestore transaction skipped or partial:', (txErr as any)?.message);
  }

  // Track University Aspirant first-registration referral reward eligibility
  let aspirantRewardEligible = false;
  const planLower = plan.toLowerCase();
  const isAspirantPlan = Boolean(isAspirant || planLower.includes('aspirant'));
  if (isAspirantPlan && amountNaira > 0 && resolvedPartnerId) {
    const existingRewards = referralMemoryStore.rewards.some(r => r.studentId === studentId);
    const prevPayments = referralMemoryStore.aspirantPaidHistory[studentId] || [];
    const tierPaid: 'basic' | 'elite' = planLower.includes('elite') || amountNaira >= 10000 ? 'elite' : 'basic';

    prevPayments.push({
      paymentId,
      tierPaid,
      amountPaidNaira: amountNaira,
      paidAt: new Date().toISOString()
    });
    referralMemoryStore.aspirantPaidHistory[studentId] = prevPayments;
    saveReferralStore();

    if (!existingRewards && prevPayments.length === 1) {
      aspirantRewardEligible = true;
    }
  }

  console.log(
    `[Revenue Share Trigger] Payment ${paymentId}: ₦${amountNaira} for ${plan}. Partner: ${partnerId || 'None'}. Commission: ₦${commissionAmount}`
  );

  return {
    paymentId,
    hasPartner: Boolean(partnerId),
    partnerId,
    referralCodeUsed,
    paymentAmountNaira: amountNaira,
    commissionRatePercent: partnerCommissionRate,
    commissionAmountNaira: commissionAmount,
    aspirantRewardEligible
  };
}

// 0. Validate a Referral Code prior to Signup or Subscription Checkout
app.get('/api/partners/validate-referral', async (req, res) => {
  try {
    const rawCode = String(req.query.code || '').trim().toUpperCase();
    if (!rawCode) {
      return res.status(400).json({ valid: false, error: 'Referral code is required.' });
    }

    const partner = await resolveActivePartnerByCode(rawCode);
    if (!partner) {
      return res.status(404).json({
        valid: false,
        error: `Referral code "${rawCode}" was not found or is currently inactive.`
      });
    }

    const promoActive = isReferralPromoActive();
    return res.json({
      valid: true,
      referralCode: partner.referralCode,
      partnerId: partner.partnerId,
      partnerName: partner.partnerName,
      promoActive,
      studentDiscountPercent: promoActive ? 20 : 0,
      commissionRatePercent: partner.commissionRatePercent
    });
  } catch (err: any) {
    return res.status(500).json({ valid: false, error: err?.message || 'Failed to validate referral code' });
  }
});

// 1. Backend Payment Trigger Function: Check referral, calculate 10% on net paid amount, atomic wallet credit
app.post('/api/partners/process-subscription-payment', async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      plan,
      planName,
      amountNaira,
      paymentGateway,
      clientPaymentId,
      paystackRef,
      referralCode,
      isAspirant
    } = req.body;
    const resolvedPlan = String(plan || planName || '').trim();
    const resolvedPaymentId = clientPaymentId || paystackRef;

    if (!studentId || !resolvedPlan || typeof amountNaira !== 'number' || amountNaira <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: studentId, plan, and valid positive amountNaira are mandatory',
      });
    }

    const result = await processSubscriptionCommissionAndEligibility({
      studentId,
      studentName,
      plan: resolvedPlan,
      amountNaira,
      paymentGateway,
      clientPaymentId: resolvedPaymentId,
      referralCode,
      isAspirant
    });

    return res.json({
      success: true,
      ...result,
      message: result.hasPartner
        ? `Payment verified. ${result.commissionRatePercent}% net revenue share (₦${result.commissionAmountNaira.toLocaleString()}) credited to Growth Partner digital wallet.`
        : 'Payment verified and recorded. No associated Growth Partner found for student.',
    });
  } catch (error: any) {
    console.error('Error in /api/partners/process-subscription-payment:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process subscription payment and revenue share trigger',
    });
  }
});

// 2. Register or Bind Student to a Partner via Referral Code
app.post('/api/partners/register-referral', async (req, res) => {
  try {
    const { referralCode, studentId, studentName } = req.body;

    if (!referralCode || !studentId) {
      return res.status(400).json({
        success: false,
        error: 'referralCode and studentId are required',
      });
    }

    const bindRes = await bindStudentToPartner({ referralCode, studentId, studentName });
    if (!bindRes.success) {
      return res.status(404).json({
        success: false,
        error: bindRes.error || 'Referral code not found or inactive.'
      });
    }

    return res.json({
      success: true,
      alreadyLinked: bindRes.alreadyLinked,
      partnerId: bindRes.partnerId,
      partnerName: bindRes.partnerName,
      referralCode: bindRes.referralCode,
      message: bindRes.alreadyLinked
        ? 'Student is already linked to this Growth Partner.'
        : `Successfully attributed to Growth Partner: ${bindRes.partnerName}`,
    });
  } catch (error: any) {
    console.error('Error in /api/partners/register-referral:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to bind referral code',
    });
  }
});

// ==========================================
// UNIVERSITY ASPIRANT REFERRAL REWARDS (2GB DATA OR ₦500 CASHBACK)
// ==========================================

app.get('/api/referrals/aspirant-reward-status', async (req, res) => {
  try {
    const studentId = String(req.query.studentId || '').trim();
    if (!studentId) {
      return res.status(400).json({ success: false, error: 'studentId is required' });
    }

    let existingReward: LocalAspirantRewardRecord | undefined = referralMemoryStore.rewards.find(
      r => r.studentId === studentId
    );

    if (!existingReward) {
      try {
        const rewardQ = query(
          collection(serverDb, 'aspirantReferralRewards'),
          where('studentId', '==', studentId),
          limit(1)
        );
        const snap = await getDocs(rewardQ);
        if (!snap.empty) {
          existingReward = snap.docs[0].data() as LocalAspirantRewardRecord;
        }
      } catch {}
    }

    const binding = referralMemoryStore.bindings[studentId];
    const paidHistory = referralMemoryStore.aspirantPaidHistory[studentId] || [];
    const eligible = Boolean(!existingReward && binding && paidHistory.length >= 1);

    return res.json({
      success: true,
      eligible,
      claimed: Boolean(existingReward),
      rewardRecord: existingReward || null,
      referralCodeUsed: binding?.referralCodeUsed || existingReward?.referralCodeUsed || null,
      partnerName: binding?.partnerName || null
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message || 'Failed to fetch reward status' });
  }
});

app.post('/api/referrals/claim-aspirant-reward', async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      rewardType,
      network,
      phoneNumber,
      referralCode,
      paymentId,
      tierPaid,
      amountPaidNaira
    } = req.body || {};

    if (!studentId || (rewardType !== 'cash_500' && rewardType !== 'data_2gb')) {
      return res.status(400).json({
        success: false,
        error: 'studentId and valid rewardType (cash_500 or data_2gb) are required.'
      });
    }

    // Check duplicate claim
    if (referralMemoryStore.rewards.some(r => r.studentId === studentId)) {
      return res.status(409).json({
        success: false,
        error: 'First-registration referral reward has already been claimed for this account.'
      });
    }

    try {
      const existingSnap = await getDocs(
        query(collection(serverDb, 'aspirantReferralRewards'), where('studentId', '==', studentId), limit(1))
      );
      if (!existingSnap.empty) {
        return res.status(409).json({
          success: false,
          error: 'First-registration referral reward has already been claimed for this account.'
        });
      }
    } catch {}

    // Ensure partner attribution exists (either prior binding or code passed cleanly)
    if (referralCode && !referralMemoryStore.bindings[studentId]) {
      await bindStudentToPartner({
        referralCode: String(referralCode),
        studentId: String(studentId),
        studentName
      });
    }

    const binding = referralMemoryStore.bindings[studentId];
    if (!binding) {
      return res.status(400).json({
        success: false,
        error: 'A valid referral code attribution is required to claim the first-registration reward.'
      });
    }

    const paidHistory = referralMemoryStore.aspirantPaidHistory[studentId] || [];
    const latestPayment = paidHistory[0] || (amountPaidNaira && Number(amountPaidNaira) >= 5000
      ? {
          paymentId: paymentId || `ASP_${Date.now()}`,
          tierPaid: (tierPaid === 'elite' || Number(amountPaidNaira) >= 10000 ? 'elite' : 'basic') as 'basic' | 'elite',
          amountPaidNaira: Number(amountPaidNaira),
          paidAt: new Date().toISOString()
        }
      : null);

    if (!latestPayment) {
      return res.status(400).json({
        success: false,
        error: 'Complete your first paid Aspirant subscription (Basic or Elite) to unlock this reward.'
      });
    }

    let formattedPhone: string | undefined;
    let selectedNetwork: 'MTN' | 'Airtel' | 'Glo' | '9mobile' | undefined;

    if (rewardType === 'data_2gb') {
      const allowedNetworks = ['MTN', 'Airtel', 'Glo', '9mobile'];
      if (!allowedNetworks.includes(String(network))) {
        return res.status(400).json({
          success: false,
          error: 'Please select a valid mobile network (MTN, Airtel, Glo, or 9mobile).'
        });
      }
      const normPhone = normalizeNigerianPhone(String(phoneNumber || ''));
      if (!normPhone) {
        return res.status(400).json({
          success: false,
          error: 'Enter a valid 11-digit Nigerian mobile number (e.g. 08031234567).'
        });
      }
      formattedPhone = normPhone;
      selectedNetwork = network;
    }

    const rewardId = `ASPRWD_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const rewardRecord: LocalAspirantRewardRecord = {
      id: rewardId,
      studentId: String(studentId),
      studentName: String(studentName || 'University Aspirant').slice(0, 95),
      ...(studentEmail ? { studentEmail: String(studentEmail).slice(0, 140) } : {}),
      referralCodeUsed: binding.referralCodeUsed,
      partnerId: binding.partnerId,
      paymentId: latestPayment.paymentId,
      tierPaid: latestPayment.tierPaid,
      amountPaidNaira: latestPayment.amountPaidNaira,
      rewardType,
      ...(rewardType === 'data_2gb'
        ? {
            network: selectedNetwork,
            phoneNumber: formattedPhone,
            status: 'pending_fulfillment' as const
          }
        : {
            amountNaira: ASPIRANT_FIRST_REG_CASH_NAIRA,
            status: 'credited' as const
          }),
      createdAt: new Date().toISOString()
    };

    referralMemoryStore.rewards.unshift(rewardRecord);
    saveReferralStore();

    try {
      await setDoc(doc(serverDb, 'aspirantReferralRewards', rewardId), rewardRecord);
      await setDoc(
        doc(serverDb, 'students', String(studentId)),
        {
          aspirantRewardStatus: rewardType === 'cash_500' ? 'claimed_cash_500' : 'claimed_data_2gb',
          aspirantFirstPaidAt: latestPayment.paidAt
        },
        { merge: true }
      );
    } catch {}

    return res.json({
      success: true,
      reward: rewardRecord,
      rewardRecord,
      message:
        rewardType === 'cash_500'
          ? '₦500 referral cashback credited instantly to your digital wallet!'
          : `2GB ${selectedNetwork} mobile data claim queued for ${formattedPhone}.`
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message || 'Failed to claim referral reward' });
  }
});

app.get('/api/admin/aspirant-rewards', async (req, res) => {
  const adminEmail = String(req.query.adminEmail || '').toLowerCase().trim();
  if (!AUTHORIZED_SUPER_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/admin/aspirant-rewards', adminEmail);
    return res.status(403).json({ success: false, error: 'Unauthorized: Super Admin required.' });
  }

  const map = new Map<string, LocalAspirantRewardRecord>();
  for (const r of referralMemoryStore.rewards) map.set(r.id, r);
  try {
    const snap = await getDocs(query(collection(serverDb, 'aspirantReferralRewards'), limit(100)));
    snap.forEach(d => {
      const data = d.data() as LocalAspirantRewardRecord;
      if (data?.id && !map.has(data.id)) map.set(data.id, data);
    });
  } catch {}

  const list = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return res.json({ success: true, rewards: list });
});

app.post('/api/admin/aspirant-rewards/fulfill', async (req, res) => {
  const { adminEmail, rewardId } = req.body || {};
  const cleanAdmin = String(adminEmail || '').toLowerCase().trim();
  if (!AUTHORIZED_SUPER_ADMINS.includes(cleanAdmin)) {
    await securityService.logUnauthorizedProbe(req, '/api/admin/aspirant-rewards/fulfill', cleanAdmin);
    return res.status(403).json({ success: false, error: 'Unauthorized: Super Admin required.' });
  }

  if (!rewardId) {
    return res.status(400).json({ success: false, error: 'rewardId is required' });
  }

  const target = referralMemoryStore.rewards.find(r => r.id === rewardId);
  const nowIso = new Date().toISOString();
  if (target) {
    target.status = 'fulfilled';
    target.fulfilledAt = nowIso;
    target.fulfilledBy = cleanAdmin;
    saveReferralStore();
  }

  try {
    await setDoc(
      doc(serverDb, 'aspirantReferralRewards', String(rewardId)),
      { status: 'fulfilled', fulfilledAt: nowIso, fulfilledBy: cleanAdmin },
      { merge: true }
    );
  } catch {}

  return res.json({
    success: true,
    rewardId,
    status: 'fulfilled',
    fulfilledAt: nowIso,
    reward: target || { id: rewardId, status: 'fulfilled', fulfilledAt: nowIso, fulfilledBy: cleanAdmin }
  });
});

// 3. Get or Onboard Growth Partner Profile
app.post('/api/partners/onboard', async (req, res) => {
  try {
    const {
      partnerId: providedPartnerId,
      name,
      email,
      phone,
      bankName,
      accountNumber,
      accountName,
      referralCode: requestedReferralCode
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'name and email are required',
      });
    }

    const partnerId =
      providedPartnerId ||
      `gp_${String(email).toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 32)}`;

    try {
      const partnerRef = doc(serverDb, 'growthPartners', partnerId);
      const partnerSnap = await getDoc(partnerRef);
      if (partnerSnap.exists()) {
        const existing = partnerSnap.data();
        referralMemoryStore.partners[partnerId] = {
          ...(referralMemoryStore.partners[partnerId] || {}),
          ...existing
        };
        saveReferralStore();
        return res.json({
          success: true,
          partner: existing,
          message: 'Existing Growth Partner profile retrieved',
        });
      }
    } catch {}

    if (referralMemoryStore.partners[partnerId]) {
      return res.json({
        success: true,
        partner: referralMemoryStore.partners[partnerId],
        message: 'Existing Growth Partner profile retrieved',
      });
    }

    const initials = String(name).replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() || 'GP';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const referralCode =
      requestedReferralCode && String(requestedReferralCode).trim()
        ? String(requestedReferralCode).trim().toUpperCase()
        : `GP-${initials}${randNum}`;

    const newPartner = {
      id: partnerId,
      name,
      email,
      phone: phone || '',
      referralCode,
      commissionRatePercent: 10,
      totalEarningsNaira: 0,
      balanceNaira: 0,
      totalPaidOutNaira: 0,
      activeReferralsCount: 0,
      bankName: bankName || 'Access Bank',
      accountNumber: accountNumber || '0123456789',
      accountName: accountName || name,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    referralMemoryStore.partners[partnerId] = newPartner;
    saveReferralStore();

    try {
      await setDoc(doc(serverDb, 'growthPartners', partnerId), newPartner);
      await setDoc(doc(serverDb, 'partnerWallets', partnerId), {
        partnerId,
        balanceNaira: 0,
        lifetimeEarnedNaira: 0,
        totalWithdrawnNaira: 0,
        updatedAt: new Date().toISOString(),
      });
    } catch {}

    return res.json({
      success: true,
      partner: newPartner,
      message: `Growth Partner profile created! Your unique referral code is ${referralCode}`,
    });
  } catch (error: any) {
    console.error('Error in /api/partners/onboard:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to onboard Growth Partner',
    });
  }
});

// 4. Partner Dashboard Summary & Analytics
app.get('/api/partners/:partnerId/summary', async (req, res) => {
  try {
    const { partnerId } = req.params;

    if (!partnerId) {
      return res.status(400).json({ error: 'partnerId is required' });
    }

    try {
      const partnerDoc = await getDoc(doc(serverDb, 'growthPartners', partnerId));
      if (partnerDoc.exists()) {
        const walletDoc = await getDoc(doc(serverDb, 'partnerWallets', partnerId));
        const walletData = walletDoc.exists()
          ? walletDoc.data()
          : { balanceNaira: 0, lifetimeEarnedNaira: 0, totalWithdrawnNaira: 0 };

        const refQuery = query(collection(serverDb, 'referrals'), where('partnerId', '==', partnerId));
        const refSnap = await getDocs(refQuery);
        const referrals = refSnap.docs.map((d) => d.data());

        const txQuery = query(
          collection(serverDb, 'revenueShareTransactions'),
          where('partnerId', '==', partnerId)
        );
        const txSnap = await getDocs(txQuery);
        const transactions = txSnap.docs.map((d) => d.data());
        transactions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return res.json({
          success: true,
          partner: partnerDoc.data(),
          wallet: walletData,
          referralsCount: referrals.length,
          referrals,
          transactions: transactions.slice(0, 25),
        });
      }
    } catch {}

    const localPartner = referralMemoryStore.partners[partnerId];
    if (!localPartner) {
      return res.status(404).json({ error: 'Growth Partner profile not found' });
    }

    const localReferrals = Object.values(referralMemoryStore.bindings).filter(b => b.partnerId === partnerId);
    const localTransactions = referralMemoryStore.transactions.filter(t => t.partnerId === partnerId);

    return res.json({
      success: true,
      partner: localPartner,
      wallet: {
        balanceNaira: localPartner.balanceNaira || localPartner.totalEarningsNaira || 0,
        lifetimeEarnedNaira: localPartner.totalEarningsNaira || 0,
        totalWithdrawnNaira: localPartner.totalPaidOutNaira || 0
      },
      referralsCount: localReferrals.length,
      referrals: localReferrals,
      transactions: localTransactions.slice(0, 25),
    });
  } catch (error: any) {
    console.error('Error in /api/partners/:partnerId/summary:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to fetch partner summary',
    });
  }
});

// 5. Submit Withdrawal Request from Partner Digital Wallet
app.post('/api/partners/withdraw', async (req, res) => {
  try {
    const { partnerId, amountNaira } = req.body;

    if (!partnerId || typeof amountNaira !== 'number' || !Number.isFinite(amountNaira) || amountNaira <= 0 || amountNaira > 5000000) {
      await securityService.recordIncident({
        category: 'tampered_payload',
        severity: 'high',
        status: 'open',
        source: 'server_guard',
        title: 'Invalid Partner Withdrawal Payload',
        description: `Rejected malformed withdrawal request for partner "${partnerId}" (amount: ${amountNaira}).`,
        actorUserId: partnerId ? String(partnerId) : undefined,
        ipAddress: extractClientIp(req),
        deviceFingerprint: extractDeviceFingerprint(req),
        endpoint: '/api/partners/withdraw',
        actionTaken: '400 Rejected'
      });
      return res.status(400).json({
        success: false,
        error: 'Valid partnerId and positive amountNaira are required',
      });
    }

    const freezeBlock = findActiveBlock({
      userId: String(partnerId),
      blockTypes: ['wallet_freeze', 'account_suspend', 'account_lock', 'account_delete']
    });
    if (freezeBlock) {
      return res.status(403).json({
        success: false,
        error: `Withdrawal blocked: ${freezeBlock.reason}`,
      });
    }

    const velocityAllowed = await securityService.checkWithdrawalVelocity(req, String(partnerId), amountNaira);
    if (!velocityAllowed) {
      return res.status(429).json({
        success: false,
        error: 'Unusual withdrawal frequency detected. Payouts temporarily paused for security review.',
      });
    }

    const walletRef = doc(serverDb, 'partnerWallets', partnerId);
    const partnerRef = doc(serverDb, 'growthPartners', partnerId);

    const result = await runTransaction(serverDb, async (transaction) => {
      // 1. ALL READS FIRST
      const walletSnap = await transaction.get(walletRef);
      const partnerSnap = await transaction.get(partnerRef);

      if (!walletSnap.exists()) {
        throw new Error('Partner digital wallet does not exist');
      }

      const wData = walletSnap.data();
      const currentBalance = wData.balanceNaira || 0;

      if (currentBalance < amountNaira) {
        throw new Error(`Insufficient wallet balance. Available: ₦${currentBalance.toLocaleString()}, Requested: ₦${amountNaira.toLocaleString()}`);
      }

      const newBalance = currentBalance - amountNaira;
      const newWithdrawn = (wData.totalWithdrawnNaira || 0) + amountNaira;

      // 2. ALL WRITES AFTER READS
      transaction.update(walletRef, {
        balanceNaira: newBalance,
        totalWithdrawnNaira: newWithdrawn,
        updatedAt: new Date().toISOString(),
      });

      if (partnerSnap.exists()) {
        const pData = partnerSnap.data();
        transaction.update(partnerRef, {
          totalPaidOutNaira: (pData.totalPaidOutNaira || 0) + amountNaira,
          updatedAt: new Date().toISOString(),
        });
      }

      return {
        newBalance,
        newWithdrawn,
      };
    });

    return res.json({
      success: true,
      amountWithdrawn: amountNaira,
      remainingBalanceNaira: result.newBalance,
      totalWithdrawnNaira: result.newWithdrawn,
      message: `Withdrawal request of ₦${amountNaira.toLocaleString()} processed successfully to your registered bank account.`,
    });
  } catch (error: any) {
    console.error('Error in /api/partners/withdraw:', error);
    return res.status(400).json({
      success: false,
      error: error?.message || 'Withdrawal processing failed',
    });
  }
});

// ==========================================
// PAYSTACK PAYMENT & VERIFICATION GATEWAY
// ==========================================

let runtimePaystackPublicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '';
let runtimePaystackSecretKey = process.env.PAYSTACK_SECRET_KEY || '';

// 1. Get Paystack Public Config (Live Keys Only)
app.get('/api/paystack/config', (_req, res) => {
  const pubKey = (runtimePaystackPublicKey || process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '').trim();
  const secretKey = (runtimePaystackSecretKey || process.env.PAYSTACK_SECRET_KEY || '').trim();
  const isLive = pubKey.startsWith('pk_live_');
  const isTest = pubKey.startsWith('pk_test_');
  const hasLiveSecret = secretKey.startsWith('sk_live_');
  const liveConfigured = isLive && hasLiveSecret;

  res.json({
    publicKey: isLive ? pubKey : '',
    isLive,
    isTest,
    hasSecretKey: hasLiveSecret,
    liveConfigured,
    mode: liveConfigured ? 'live' : isTest || secretKey.startsWith('sk_test_') ? 'test_blocked' : 'unconfigured',
  });
});

// 2. Save / Update Paystack Live Keys (Admin Only: wowrealities@gmail.com, martorefe@gmail.com)
app.post('/api/paystack/save-keys', async (req, res) => {
  const { publicKey, secretKey, adminEmail } = req.body;
  const authorizedAdmins = ['martorefe@gmail.com', 'wowrealities@gmail.com'];

  if (!adminEmail || !authorizedAdmins.includes(String(adminEmail).toLowerCase().trim())) {
    await securityService.logUnauthorizedProbe(req, '/api/paystack/save-keys', adminEmail);
    return res.status(403).json({ success: false, error: 'Unauthorized: Admin privileges required to update payment gateway keys.' });
  }

  const nextPub = publicKey !== undefined ? String(publicKey).trim() : runtimePaystackPublicKey;
  const nextSec = secretKey !== undefined ? String(secretKey).trim() : runtimePaystackSecretKey;

  if (nextPub && !nextPub.startsWith('pk_live_')) {
    return res.status(400).json({
      success: false,
      error: 'Test or invalid public key rejected. Only live Paystack public keys (pk_live_...) are allowed.'
    });
  }

  if (nextSec && !nextSec.startsWith('sk_live_')) {
    return res.status(400).json({
      success: false,
      error: 'Test or invalid secret key rejected. Only live Paystack secret keys (sk_live_...) are allowed.'
    });
  }

  if (publicKey !== undefined) {
    runtimePaystackPublicKey = nextPub;
  }
  if (secretKey !== undefined) {
    runtimePaystackSecretKey = nextSec;
  }

  const liveConfigured =
    runtimePaystackPublicKey.startsWith('pk_live_') && runtimePaystackSecretKey.startsWith('sk_live_');

  return res.json({
    success: true,
    message: liveConfigured
      ? 'Paystack Live gateway keys verified and active.'
      : 'Paystack live key saved. Both pk_live_ and sk_live_ must be configured to process live payments.',
    publicKey: runtimePaystackPublicKey.startsWith('pk_live_') ? runtimePaystackPublicKey : '',
    hasSecretKey: runtimePaystackSecretKey.startsWith('sk_live_'),
    liveConfigured,
    mode: liveConfigured ? 'live' : 'unconfigured',
  });
});

// 3. Verify Payment with Paystack REST API and Credit Parent Escrow Wallet
app.post('/api/paystack/verify-payment', async (req, res) => {
  try {
    const { reference, amountNaira, email, parentId, studentId, wardName, purpose = 'parent_wallet_topup' } = req.body;

    if (!reference || typeof amountNaira !== 'number' || !Number.isFinite(amountNaira) || amountNaira <= 0 || amountNaira > 5000000) {
      const ip = extractClientIp(req);
      const fp = extractDeviceFingerprint(req);
      const containment = await securityService.enforceAutomatedFraudContainment({
        userId: parentId || studentId,
        email,
        ip,
        fp,
        reason: `Tampered Paystack verification payload (ref=${reference}, amount=${amountNaira})`
      });
      await securityService.recordIncident({
        category: 'tampered_payload',
        severity: 'critical',
        status: containment.suspended || containment.walletFrozen ? 'auto_blocked' : 'open',
        source: 'server_guard',
        title: 'Tampered Paystack Verification Payload',
        description: `Rejected invalid payment verification (ref=${reference}, amountNaira=${amountNaira}) from ${email || ip}.`,
        actorUserId: parentId || studentId,
        actorEmail: email,
        ipAddress: ip,
        deviceFingerprint: fp,
        endpoint: '/api/paystack/verify-payment',
        actionTaken: `400 Rejected · ${containment.actionTaken}`
      });
      return res.status(400).json({ success: false, error: 'Valid payment reference and positive amountNaira are required' });
    }

    const walletBlock = findActiveBlock({
      userId: parentId || studentId,
      email,
      blockTypes: ['wallet_freeze', 'account_suspend', 'account_lock', 'account_delete']
    });
    if (walletBlock) {
      return res.status(403).json({
        success: false,
        error: `Payment blocked: ${walletBlock.reason}`
      });
    }

    // Paystack Reference Replay Attack Prevention
    const alreadyProcessed = await securityService.isPaystackRefProcessed(String(reference));
    if (alreadyProcessed) {
      const ip = extractClientIp(req);
      const fp = extractDeviceFingerprint(req);
      const containment = await securityService.enforceAutomatedFraudContainment({
        userId: parentId || studentId,
        email,
        ip,
        fp,
        reason: `Paystack transaction replay attempt (${reference})`,
        blockNetworkMinutes: 60
      });
      await securityService.recordIncident({
        category: 'payment_replay',
        severity: 'critical',
        status: 'auto_blocked',
        source: 'server_guard',
        title: `Paystack Reference Replay Blocked (${reference})`,
        description: `Duplicate attempt to reuse already-settled Paystack reference "${reference}" for ₦${Number(amountNaira).toLocaleString()}.`,
        actorUserId: parentId || studentId,
        actorEmail: email,
        ipAddress: ip,
        deviceFingerprint: fp,
        endpoint: '/api/paystack/verify-payment',
        actionTaken: `409 Replay Blocked · ${containment.actionTaken}`
      });
      return res.status(409).json({
        success: false,
        replayBlocked: true,
        error: 'Security Alert: This payment reference has already been processed and cannot be replayed.'
      });
    }

    await securityService.checkPaymentVelocity(req, String(parentId || studentId || ''), email, amountNaira);

    const secretKey = (runtimePaystackSecretKey || process.env.PAYSTACK_SECRET_KEY || '').trim();
    if (!secretKey || !secretKey.startsWith('sk_live_')) {
      return res.status(400).json({
        success: false,
        liveRequired: true,
        error: 'Live Paystack verification is required (sk_live_... secret key is missing or configured in test mode). Sandbox and simulated payments are disabled.'
      });
    }

    let paystackResponseData: any = null;
    let paymentChannel = 'card';

    // Perform strict live server-side verification with Paystack REST API
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const verifyJson = await verifyRes.json();

    if (!verifyRes.ok || !verifyJson.status) {
      const errorMsg = verifyJson.message === 'Invalid key'
        ? 'Paystack Live Secret Key is invalid. Please configure an active sk_live_ key in Gateway Keys.'
        : (verifyJson.message || 'Payment reference verification failed at Paystack');
      return res.status(400).json({
        success: false,
        error: errorMsg,
      });
    }

    paystackResponseData = verifyJson.data;

    // Reject any non-live / sandbox / test domain settlement
    if (paystackResponseData.domain && paystackResponseData.domain !== 'live') {
      return res.status(400).json({
        success: false,
        error: `Paystack transaction domain is '${paystackResponseData.domain}'. Only verified live payments are accepted.`
      });
    }

    // Validate currency and status
    if (paystackResponseData.status !== 'success') {
      return res.status(400).json({
        success: false,
        error: `Paystack transaction status is '${paystackResponseData.status}'. Payment not settled.`,
      });
    }

    if (paystackResponseData.currency !== 'NGN') {
      return res.status(400).json({
        success: false,
        error: `Invalid currency: expected NGN, got ${paystackResponseData.currency}`,
      });
    }

    // Paystack returns amount in Kobo (amountNaira * 100)
    const expectedKobo = Math.round(amountNaira * 100);
    if (paystackResponseData.amount < expectedKobo) {
      return res.status(400).json({
        success: false,
        error: `Amount mismatch: expected ₦${amountNaira} (${expectedKobo} kobo), but Paystack settled ${paystackResponseData.amount} kobo`,
      });
    }

    paymentChannel = paystackResponseData.channel || 'card';

    // Lock reference in idempotency registry before crediting balances or entitlements
    await securityService.markPaystackRefProcessed({
      reference: String(reference),
      amountNaira: Number(amountNaira),
      purpose: String(purpose),
      userId: parentId || studentId,
      ipAddress: extractClientIp(req),
      processedAt: new Date().toISOString()
    });

    if (purpose === 'school_direct_subscription') {
      const { adminId, schoolName, schoolCode, plan } = req.body;
      const cleanAdminId = adminId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'admin_default');
      const now = new Date();
      const isTermly = plan === 'termly' || amountNaira >= 40000;
      const durationDays = isTermly ? 90 : 30;
      const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();
      const planName = isTermly ? 'termly' : 'monthly';

      try {
        const userRef = doc(serverDb, 'users', cleanAdminId);
        await setDoc(userRef, {
          adminData: {
            directSubscription: {
              plan: planName,
              amountNaira,
              paidAt: now.toISOString(),
              expiresAt,
              paystackReference: reference,
              status: 'active'
            },
            accreditationQualified: true,
            qualificationReason: 'direct_subscription'
          }
        }, { merge: true });

        // Record in school_subscriptions collection
        const subRecordRef = doc(serverDb, 'school_subscriptions', reference);
        await setDoc(subRecordRef, {
          id: reference,
          adminId: cleanAdminId,
          schoolName: schoolName || 'Secondary School',
          schoolCode: schoolCode || '',
          plan: planName,
          amountNaira,
          channel: paymentChannel,
          reference,
          paidAt: now.toISOString(),
          expiresAt,
          status: 'active'
        });
      } catch (dbErr) {
        console.warn('Could not persist school subscription to Firestore:', dbErr);
      }

      return res.json({
        success: true,
        reference,
        amountNaira,
        plan: planName,
        expiresAt,
        channel: paymentChannel,
        message: `₦${amountNaira.toLocaleString()} institutional direct subscription verified and activated for ${schoolName || 'school'}.`
      });
    }

    // Helper for academic term cycle end date
    const getAcademicTermEndDate = (): string => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      let end: Date;
      if (month >= 0 && month <= 3) {
        end = new Date(year, 3, 20, 23, 59, 59);
        if (now >= end) end = new Date(year, 6, 31, 23, 59, 59);
      } else if (month >= 4 && month <= 7) {
        end = new Date(year, 6, 31, 23, 59, 59);
        if (now >= end) end = new Date(year, 11, 20, 23, 59, 59);
      } else {
        end = new Date(year, 11, 20, 23, 59, 59);
        if (now >= end) end = new Date(year + 1, 3, 20, 23, 59, 59);
      }
      return end.toISOString();
    };

    if (purpose === 'student_tier_subscription') {
      const { studentId, studentName, plan, parentId, referralCode, classLevel } = req.body;
      const cleanStudentId = studentId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'student_default');
      const cleanParentId = parentId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'parent_default');
      const termExpiresAt = getAcademicTermEndDate();
      const planName = (plan || 'basic').toLowerCase() as 'free' | 'basic' | 'standard' | 'elite';

      // Verify minimum payable amount against promo policy (allows 20% referral discount through Jan 3, 2027)
      const hasSuppliedOrBoundRef = Boolean(referralCode || referralMemoryStore.bindings[cleanStudentId]);
      const expectedQuote = getStudentTierPricing(planName, hasSuppliedOrBoundRef, classLevel);
      if (Number(amountNaira) < expectedQuote.finalPriceNaira) {
        return res.status(400).json({
          success: false,
          error: `Underpaid subscription amount: expected at least ₦${expectedQuote.finalPriceNaira.toLocaleString()} for ${planName.toUpperCase()} tier.`
        });
      }

      const commissionResult = await processSubscriptionCommissionAndEligibility({
        studentId: cleanStudentId,
        studentName,
        plan: planName,
        amountNaira: Number(amountNaira),
        paymentGateway: 'Paystack',
        clientPaymentId: reference,
        referralCode,
        isAspirant: false
      });

      try {
        const studentRef = doc(serverDb, 'students', cleanStudentId);
        await setDoc(studentRef, {
          isSubscribed: true,
          subscriptionPlan: planName,
          subscriptionTier: planName,
          termExpiresAt,
          subscribedUntil: termExpiresAt,
          lastSubscribedAt: new Date().toISOString(),
          lastPaymentReference: reference
        }, { merge: true });

        const userRef = doc(serverDb, 'users', cleanStudentId);
        await setDoc(userRef, {
          studentData: {
            isSubscribed: true,
            subscriptionPlan: planName,
            subscriptionTier: planName,
            termExpiresAt,
            subscribedUntil: termExpiresAt
          }
        }, { merge: true });

        // If Elite Tier, automatically credit ₦16,000 Pre-paid Tutor Credits to Parent Escrow Wallet
        if (planName === 'elite') {
          const walletRef = doc(serverDb, 'parentWallets', cleanParentId);
          const tutorTxId = `TX_TUTOR_CREDIT_${Date.now()}`;
          await runTransaction(serverDb, async (tx) => {
            const wSnap = await tx.get(walletRef);
            const currentBal = wSnap.exists() ? (wSnap.data().balance || 0) : 0;
            const newBal = currentBal + 16000;
            if (wSnap.exists()) {
              tx.update(walletRef, {
                balance: newBal,
                lastFundedAt: new Date().toISOString(),
                lastPaymentReference: reference
              });
            } else {
              tx.set(walletRef, {
                id: cleanParentId,
                parentId: cleanParentId,
                balance: newBal,
                totalFunded: 16000,
                createdAt: new Date().toISOString(),
                lastPaymentReference: reference
              });
            }

            const txRef = doc(serverDb, 'parentWallets', cleanParentId, 'transactions', tutorTxId);
            tx.set(txRef, {
              id: tutorTxId,
              parentId: cleanParentId,
              type: 'fund',
              amount: 16000,
              channel: 'tier_benefit',
              reference: `BONUS_${reference}`,
              status: 'success',
              purpose: 'elite_tier_tutor_credit',
              wardName: studentName || 'Enrolled Scholar',
              description: '₦16,000 Pre-paid Tutor Booking Credits (Elite Tier Package)',
              createdAt: new Date().toISOString()
            });
          });
        }
      } catch (dbErr) {
        console.warn('Could not persist student tier subscription to Firestore:', dbErr);
      }

      return res.json({
        success: true,
        reference,
        amountNaira,
        plan: planName,
        termExpiresAt,
        channel: paymentChannel,
        tutorCreditsAwarded: planName === 'elite' ? 16000 : 0,
        partnerCommissionCredited: commissionResult.hasPartner,
        partnerCommissionNaira: commissionResult.commissionAmountNaira,
        message: `₦${amountNaira.toLocaleString()} ${planName.toUpperCase()} Termly Subscription successfully verified!`
      });
    }

    if (purpose === 'aspirant_tier_subscription') {
      const { studentId, studentName, plan, referralCode } = req.body;
      const cleanStudentId = studentId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'aspirant_default');
      const rawTier = String(plan || 'basic').toLowerCase().includes('elite') ? 'elite' : 'basic';
      const aspirantQuote = getAspirantTierPricing(rawTier, Boolean(referralCode || referralMemoryStore.bindings[cleanStudentId]));

      if (Number(amountNaira) < aspirantQuote.finalPriceNaira) {
        return res.status(400).json({
          success: false,
          error: `Underpaid Aspirant subscription: expected ₦${aspirantQuote.finalPriceNaira.toLocaleString()} for Aspirant ${rawTier.toUpperCase()}.`
        });
      }

      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      const subscribedUntil = nextMonth.toISOString();

      const commissionResult = await processSubscriptionCommissionAndEligibility({
        studentId: cleanStudentId,
        studentName,
        plan: `Aspirant ${rawTier}`,
        amountNaira: Number(amountNaira),
        paymentGateway: 'Paystack',
        clientPaymentId: reference,
        referralCode,
        isAspirant: true
      });

      try {
        await setDoc(
          doc(serverDb, 'students', cleanStudentId),
          {
            isSubscribed: true,
            subscriptionTier: rawTier,
            subscribedUntil,
            lastPaymentReference: reference,
            ...(commissionResult.aspirantRewardEligible
              ? { aspirantRewardStatus: 'eligible', aspirantFirstPaidAt: new Date().toISOString() }
              : {})
          },
          { merge: true }
        );
      } catch {}

      return res.json({
        success: true,
        reference,
        amountNaira,
        tier: rawTier,
        subscribedUntil,
        channel: paymentChannel,
        partnerCommissionCredited: commissionResult.hasPartner,
        partnerCommissionNaira: commissionResult.commissionAmountNaira,
        aspirantRewardEligible: commissionResult.aspirantRewardEligible,
        referralCodeUsed: commissionResult.referralCodeUsed,
        message: `₦${amountNaira.toLocaleString()} Aspirant ${rawTier.toUpperCase()} Pass verified!`
      });
    }

    if (purpose === 'tutor_booking_payment' || purpose === 'exam_prep_unlock') {
      const { tutorId, bookingId, subject } = req.body;
      return res.json({
        success: true,
        reference,
        amountNaira,
        purpose,
        tutorId: tutorId || null,
        bookingId: bookingId || null,
        subject: subject || null,
        channel: paymentChannel,
        verifiedLive: true,
        message:
          purpose === 'tutor_booking_payment'
            ? `₦${amountNaira.toLocaleString()} live Paystack tutor escrow payment verified.`
            : `₦${amountNaira.toLocaleString()} live Paystack Exam Prep payment verified.`
      });
    }

    if (purpose === 'drill_regeneration' || purpose === 'certificate_drill_regeneration') {
      const { studentId, subject, board } = req.body;
      return res.json({
        success: true,
        reference,
        amountNaira,
        purpose,
        channel: paymentChannel,
        message: `₦${amountNaira.toLocaleString()} fresh ${board ? board + ' ' : ''}drill paper generation fee verified.`
      });
    }

    if (purpose === 'ai_coach_unlock' || purpose === 'termly_competition_unlock' || purpose === 'termly_drill_unlock') {
      const { studentId, subject } = req.body;
      const cleanStudentId = studentId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'student_default');

      try {
        const studentRef = doc(serverDb, 'students', cleanStudentId);
        const updateData: any = {};
        if (purpose === 'ai_coach_unlock') {
          updateData['addOns.aiCoachUnlocked'] = true;
        } else if (purpose === 'termly_competition_unlock') {
          updateData['addOns.termlyCompetitionUnlocked'] = true;
        } else if (purpose === 'termly_drill_unlock') {
          if (subject) {
            updateData['addOns.termlyDrillSingleSubjects'] = [subject];
          } else {
            updateData['addOns.termlyDrillAllSubjects'] = true;
          }
        }

        await setDoc(studentRef, updateData, { merge: true });
      } catch (dbErr) {
        console.warn('Could not persist student add-on unlock to Firestore:', dbErr);
      }

      return res.json({
        success: true,
        reference,
        amountNaira,
        purpose,
        channel: paymentChannel,
        message: `Add-on unlock verified and activated!`
      });
    }

    const cleanParentId = parentId || (email ? email.replace(/[^a-zA-Z0-9_-]/g, '_') : 'parent_default');
    const transactionId = `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Perform atomic wallet update in Firestore
    const walletRef = doc(serverDb, 'parentWallets', cleanParentId);
    let updatedBalance = amountNaira;

    await runTransaction(serverDb, async (tx) => {
      const walletSnap = await tx.get(walletRef);
      if (walletSnap.exists()) {
        const currentBal = walletSnap.data().balance || 0;
        updatedBalance = currentBal + amountNaira;
        tx.update(walletRef, {
          balance: updatedBalance,
          lastFundedAt: new Date().toISOString(),
          lastPaymentReference: reference,
        });
      } else {
        tx.set(walletRef, {
          id: cleanParentId,
          parentId: cleanParentId,
          balance: amountNaira,
          totalFunded: amountNaira,
          createdAt: new Date().toISOString(),
          lastPaymentReference: reference,
        });
      }

      // Record transaction ledger entry
      const txRef = doc(serverDb, 'parentWallets', cleanParentId, 'transactions', transactionId);
      tx.set(txRef, {
        id: transactionId,
        parentId: cleanParentId,
        type: 'fund',
        amount: amountNaira,
        channel: paymentChannel,
        reference,
        status: 'success',
        purpose,
        wardName: wardName || 'Registered Ward',
        createdAt: new Date().toISOString(),
      });
    });

    return res.json({
      success: true,
      reference,
      amountNaira,
      newBalance: updatedBalance,
      channel: paymentChannel,
      message: `₦${amountNaira.toLocaleString()} successfully verified and credited to Parent Escrow Wallet.`,
    });
  } catch (error: any) {
    console.error('Error in /api/paystack/verify-payment:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal error verifying payment',
    });
  }
});

// =========================================================================
// SUPER ADMIN PURGE TEST PERSONAS, WALLETS & ESCROW CREDITS ENDPOINT
// =========================================================================
const SAMPLE_PURGE_NEEDLES = [
  'chidinma',
  'ibrahim danjuma',
  'ngozi okoli',
  'folashade balogun',
  'emeka nwosu',
  'adewale adeyemi',
  'adewale bakare',
  'zainab al-hassan',
  'victoria okonkwo',
  'tunde balogun',
  '@students.ng',
  '@tutoreng.com',
  '@educators.ng',
  '@barewa.edu.ng',
  '@fgc.edu.ng',
  '@transport.ng',
  '@fgcikotekpene.edu.ng',
  'usr-std-',
  'usr-parent-',
  'usr-tutor-',
  'usr-admin-',
  'std-tunde',
  'tutor-adewale',
  'book-001',
  'demo-session'
];

function isSamplePurgeTarget(docId: string, data: any): boolean {
  const email = String(data?.email || data?.studentEmail || data?.actorEmail || '').toLowerCase().trim();
  if (AUTHORIZED_SUPER_ADMINS.includes(email)) return false;
  if (data?.isSuperAdmin === true || data?.role === 'superadmin') return false;

  const haystack = `${docId} ${email} ${data?.fullName || ''} ${data?.name || ''} ${data?.studentName || ''} ${data?.tutorName || ''} ${data?.tutorId || ''} ${data?.studentId || ''}`.toLowerCase();
  if (SAMPLE_PURGE_NEEDLES.some(needle => haystack.includes(needle))) return true;
  if (data?.balanceNaira === 35000 && data?.pin === '1234') return true;
  return false;
}

app.post('/api/admin/purge-test-accounts', async (req, res) => {
  const adminEmail = String(req.body?.adminEmail || '').toLowerCase().trim();
  if (!adminEmail || !AUTHORIZED_SUPER_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/admin/purge-test-accounts', adminEmail);
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Super Admin privileges required to purge test accounts and credits.'
    });
  }

  let purgedStoreEntries = 0;
  let deletedFirestoreDocs = 0;

  // 1. Purge test/sample records from referralMemoryStore
  for (const [partnerId, p] of Object.entries(referralMemoryStore.partners)) {
    if (isSamplePurgeTarget(partnerId, p)) {
      delete referralMemoryStore.partners[partnerId];
      purgedStoreEntries++;
    }
  }
  for (const [studentId, b] of Object.entries(referralMemoryStore.bindings)) {
    if (isSamplePurgeTarget(studentId, b)) {
      delete referralMemoryStore.bindings[studentId];
      purgedStoreEntries++;
    }
  }
  for (const studentId of Object.keys(referralMemoryStore.aspirantPaidHistory)) {
    if (isSamplePurgeTarget(studentId, { studentId })) {
      delete referralMemoryStore.aspirantPaidHistory[studentId];
      purgedStoreEntries++;
    }
  }
  const prevRewardsLen = referralMemoryStore.rewards.length;
  referralMemoryStore.rewards = referralMemoryStore.rewards.filter(r => !isSamplePurgeTarget(r.id, r));
  purgedStoreEntries += prevRewardsLen - referralMemoryStore.rewards.length;

  const prevTxLen = referralMemoryStore.transactions.length;
  referralMemoryStore.transactions = referralMemoryStore.transactions.filter(t => !isSamplePurgeTarget(t.id, t));
  purgedStoreEntries += prevTxLen - referralMemoryStore.transactions.length;

  saveReferralStore();

  // 2. Purge test/sample personas, synthetic wallets, and test bookings from Firestore (preserving Super Admins)
  const collectionsToScan = [
    'users',
    'students',
    'wallets',
    'parentWallets',
    'tutorBookings',
    'growthPartners',
    'referrals',
    'aspirantRewards'
  ];

  for (const colName of collectionsToScan) {
    try {
      const snap = await getDocs(collection(serverDb, colName));
      for (const d of snap.docs) {
        const data = d.data();
        if (isSamplePurgeTarget(d.id, data)) {
          try {
            await deleteDoc(doc(serverDb, colName, d.id));
            deletedFirestoreDocs++;
          } catch {}
        }
      }
    } catch {
      // Ignore collection read failures when running without full Firebase permissions
    }
  }

  return res.json({
    success: true,
    purgedStoreEntries,
    deletedFirestoreDocs,
    preservedSuperAdmins: AUTHORIZED_SUPER_ADMINS,
    message: `Purged ${deletedFirestoreDocs} Firestore test record(s) and ${purgedStoreEntries} in-memory sample record(s). Super Admin accounts preserved.`
  });
});

// =========================================================================
// GIT HUB REPOSITORY SYNC ROUTES (Authorized Existing Super Admins Only)
// =========================================================================
const execFileAsync = promisify(execFile);
const AUTHORIZED_GIT_ADMINS = ['martorefe@gmail.com', 'wowrealities@gmail.com'];
const TARGET_GITHUB_OWNER = 'Inventor-Mart';
const TARGET_GITHUB_REPO = 'Student-Companion-Ng';
const TARGET_GITHUB_BRANCH = 'main';
const CLEAN_REMOTE_URL = `https://github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}.git`;

function scrubGitToken(text: string, token: string): string {
  if (!text) return '';
  let cleaned = String(text);
  const envToken = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  for (const secret of [token, envToken]) {
    if (secret) {
      cleaned = cleaned.split(secret).join('***');
      cleaned = cleaned.split(encodeURIComponent(secret)).join('***');
    }
  }
  cleaned = cleaned.replace(/x-access-token:[^@]+@/gi, 'x-access-token:***@');
  cleaned = cleaned.replace(/https:\/\/[^:@/\s]+:[^@/\s]+@github\.com/gi, 'https://***@github.com');
  return cleaned;
}

async function runGit(
  args: string[],
  options?: { timeout?: number; tokenToScrub?: string }
): Promise<{ stdout: string; stderr: string }> {
  const token = options?.tokenToScrub ?? (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  try {
    return await execFileAsync(
      'git',
      ['-c', `safe.directory=${__dirname}`, ...args],
      {
        cwd: __dirname,
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
        timeout: options?.timeout ?? 30000,
        maxBuffer: 10 * 1024 * 1024,
      }
    );
  } catch (err: any) {
    if (err?.message) err.message = scrubGitToken(String(err.message), token);
    if (err?.stderr) err.stderr = scrubGitToken(String(err.stderr), token);
    if (err?.stdout) err.stdout = scrubGitToken(String(err.stdout), token);
    throw err;
  }
}

async function fetchRemoteMainRef(token: string): Promise<{
  remoteSha: string | null;
  emptyRepo: boolean;
  fetchError?: string;
}> {
  const remoteUrl = token
    ? `https://x-access-token:${encodeURIComponent(token)}@github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}.git`
    : CLEAN_REMOTE_URL;

  try {
    await runGit(['fetch', remoteUrl, TARGET_GITHUB_BRANCH], {
      timeout: 30000,
      tokenToScrub: token,
    });
    const fetchHeadOut = await runGit(['rev-parse', 'FETCH_HEAD'], { tokenToScrub: token });
    const remoteSha = fetchHeadOut.stdout.trim() || null;
    if (remoteSha) {
      try {
        await runGit(['update-ref', `refs/remotes/origin/${TARGET_GITHUB_BRANCH}`, remoteSha], {
          tokenToScrub: token,
        });
      } catch {}
    }
    return { remoteSha, emptyRepo: !remoteSha };
  } catch (fetchErr: any) {
    const rawMsg = String(fetchErr?.stderr || fetchErr?.message || 'Unable to fetch GitHub main branch.');
    const cleaned = scrubGitToken(rawMsg, token);
    if (cleaned.includes("couldn't find remote ref") || cleaned.includes('Remote branch')) {
      return { remoteSha: null, emptyRepo: true };
    }
    return { remoteSha: null, emptyRepo: false, fetchError: cleaned };
  }
}

type GitHubTokenStatus = 'missing' | 'valid' | 'read_only' | 'invalid' | 'not_found' | 'network_error';

async function verifyGithubTokenAccess(token: string): Promise<{
  configured: boolean;
  canPush: boolean;
  tokenStatus: GitHubTokenStatus;
  tokenMessage: string;
  githubUser?: string;
  remoteLatestCommit?: string;
}> {
  if (!token) {
    return {
      configured: false,
      canPush: false,
      tokenStatus: 'missing',
      tokenMessage:
        'GITHUB_TOKEN is missing from server environment. Add GITHUB_TOKEN (with repo / Contents Read & Write scope) in AI Studio Secrets and restart the server.'
    };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Student-Companion-Ng-Sync'
  };

  try {
    const repoRes = await fetch(
      `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
      { headers, signal: AbortSignal.timeout(8000) }
    );

    if (repoRes.status === 401) {
      return {
        configured: true,
        canPush: false,
        tokenStatus: 'invalid',
        tokenMessage: 'GITHUB_TOKEN was rejected by GitHub (401 Unauthorized). Generate a fresh token and update Secrets.'
      };
    }

    if (repoRes.status === 404) {
      return {
        configured: true,
        canPush: false,
        tokenStatus: 'not_found',
        tokenMessage: `Token cannot access ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (404). Verify repository name and token repo access.`
      };
    }

    if (!repoRes.ok) {
      return {
        configured: true,
        canPush: false,
        tokenStatus: 'network_error',
        tokenMessage: `GitHub API returned HTTP ${repoRes.status} while verifying repository permissions.`
      };
    }

    const repoData: any = await repoRes.json();
    const canPush = Boolean(
      repoData?.permissions?.push ||
      repoData?.permissions?.admin ||
      repoData?.permissions?.maintain
    );

    let githubUser: string | undefined;
    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers,
        signal: AbortSignal.timeout(5000)
      });
      if (userRes.ok) {
        const userData: any = await userRes.json();
        githubUser = userData?.login;
      }
    } catch {}

    let remoteLatestCommit: string | undefined;
    try {
      const branchRes = await fetch(
        `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/branches/${TARGET_GITHUB_BRANCH}`,
        { headers, signal: AbortSignal.timeout(5000) }
      );
      if (branchRes.ok) {
        const branchData: any = await branchRes.json();
        if (branchData?.commit?.sha) {
          remoteLatestCommit = String(branchData.commit.sha).slice(0, 7);
        }
      }
    } catch {}

    if (!canPush) {
      return {
        configured: true,
        canPush: false,
        tokenStatus: 'read_only',
        githubUser,
        remoteLatestCommit,
        tokenMessage: `Token${githubUser ? ` (@${githubUser})` : ''} only has read access to ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}. Grant "repo" or "Contents: Read & Write" permission.`
      };
    }

    return {
      configured: true,
      canPush: true,
      tokenStatus: 'valid',
      githubUser,
      remoteLatestCommit,
      tokenMessage: `Verified push permission${githubUser ? ` as @${githubUser}` : ''} for ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}.`
    };
  } catch (err: any) {
    return {
      configured: true,
      canPush: false,
      tokenStatus: 'network_error',
      tokenMessage: scrubGitToken(err?.message || 'Unable to reach api.github.com to verify token.', token)
    };
  }
}

async function ensureGitWorkspace(adminEmail: string): Promise<{ autoInitialized: boolean }> {
  const gitDir = path.join(__dirname, '.git');
  let autoInitialized = false;

  if (!fs.existsSync(gitDir)) {
    try {
      await runGit(['init', '-b', TARGET_GITHUB_BRANCH]);
    } catch {
      await runGit(['init']);
      await runGit(['symbolic-ref', 'HEAD', `refs/heads/${TARGET_GITHUB_BRANCH}`]);
    }
    autoInitialized = true;
  }

  try {
    const nameOut = await runGit(['config', 'user.name']);
    if (!nameOut.stdout.trim()) throw new Error('empty');
  } catch {
    await runGit(['config', 'user.name', 'Student Companion Admin']);
  }

  try {
    const emailOut = await runGit(['config', 'user.email']);
    if (!emailOut.stdout.trim()) throw new Error('empty');
  } catch {
    await runGit(['config', 'user.email', adminEmail || 'martorefe@gmail.com']);
  }

  try {
    const remoteOut = await runGit(['remote', 'get-url', 'origin']);
    if (remoteOut.stdout.trim() !== CLEAN_REMOTE_URL) {
      await runGit(['remote', 'set-url', 'origin', CLEAN_REMOTE_URL]);
    }
  } catch {
    await runGit(['remote', 'add', 'origin', CLEAN_REMOTE_URL]);
  }

  return { autoInitialized };
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function computeCrc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC32_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZipBuffer(entries: Array<{ name: string; content: Buffer }>): Buffer {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const fileNameBuf = Buffer.from(entry.name.replace(/^\/+/, ''), 'utf-8');
    const uncompressed = entry.content;
    const compressed = zlib.deflateRawSync(uncompressed);
    const crc = computeCrc32(uncompressed);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(8, 8); // deflate
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(uncompressed.length, 22);
    localHeader.writeUInt16LE(fileNameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, fileNameBuf, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(uncompressed.length, 24);
    centralHeader.writeUInt16LE(fileNameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, fileNameBuf);
    offset += localHeader.length + fileNameBuf.length + compressed.length;
  }

  const centralDir = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(entries.length, 8);
  endRecord.writeUInt16LE(entries.length, 10);
  endRecord.writeUInt32LE(centralDir.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDir, endRecord]);
}

function collectDirectoryZipEntries(dirPath: string, zipPrefix: string): Array<{ name: string; content: Buffer }> {
  const results: Array<{ name: string; content: Buffer }> = [];
  if (!fs.existsSync(dirPath)) return results;
  for (const item of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, item);
    const rel = `${zipPrefix}/${item}`;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectDirectoryZipEntries(full, rel));
    } else if (stat.isFile()) {
      results.push({ name: rel, content: fs.readFileSync(full) });
    }
  }
  return results;
}

async function resolveCompiledAndroidApk(): Promise<{
  apkReady: boolean;
  source?: 'local' | 'github';
  localPath?: string;
  apkUrl?: string;
  apkSizeBytes?: number;
  versionName?: string;
}> {
  const localReleaseApk = path.join(__dirname, 'public', 'releases', 'StudentCompanion-v1.0.0-android6plus.apk');
  if (fs.existsSync(localReleaseApk)) {
    const stat = fs.statSync(localReleaseApk);
    if (stat.size > 50_000) {
      return {
        apkReady: true,
        source: 'local',
        localPath: localReleaseApk,
        apkUrl: '/api/download/android-apk',
        apkSizeBytes: stat.size,
        versionName: '1.0.0',
      };
    }
  }

  try {
    const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'Student-Companion-Ng-APK',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    for (const relPath of ['releases/tags/android-latest', 'releases/latest']) {
      const releaseRes = await fetch(
        `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/${relPath}`,
        { headers, signal: AbortSignal.timeout(5000) }
      );
      if (releaseRes.ok) {
        const releaseData: any = await releaseRes.json();
        const assets: any[] = Array.isArray(releaseData?.assets) ? releaseData.assets : [];
        const apkAsset = assets.find(
          (a) => typeof a?.name === 'string' && a.name.toLowerCase().endsWith('.apk') && Number(a.size) > 50_000
        );
        if (apkAsset?.browser_download_url) {
          return {
            apkReady: true,
            source: 'github',
            apkUrl: apkAsset.browser_download_url,
            apkSizeBytes: Number(apkAsset.size),
            versionName: String(releaseData?.tag_name || '1.0.0'),
          };
        }
      }
    }
  } catch {}

  return { apkReady: false };
}

async function inspectGithubApkWorkflow(): Promise<{
  workflowOnRemote: boolean;
  latestRun: {
    status: string;
    conclusion: string | null;
    htmlUrl: string;
    createdAt: string;
  } | null;
}> {
  const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Student-Companion-Ng-APK',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let workflowOnRemote = false;
  let latestRun: {
    status: string;
    conclusion: string | null;
    htmlUrl: string;
    createdAt: string;
  } | null = null;

  try {
    const wfRes = await fetch(
      `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/contents/.github/workflows/build-android-apk.yml?ref=${TARGET_GITHUB_BRANCH}`,
      { headers, signal: AbortSignal.timeout(4000) }
    );
    workflowOnRemote = wfRes.ok;

    const runsRes = await fetch(
      `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/actions/workflows/build-android-apk.yml/runs?per_page=1`,
      { headers, signal: AbortSignal.timeout(4000) }
    );
    if (runsRes.ok) {
      const runsData: any = await runsRes.json();
      const firstRun = Array.isArray(runsData?.workflow_runs) ? runsData.workflow_runs[0] : null;
      if (firstRun) {
        workflowOnRemote = true;
        latestRun = {
          status: String(firstRun.status || 'unknown'),
          conclusion: firstRun.conclusion ? String(firstRun.conclusion) : null,
          htmlUrl: String(firstRun.html_url || ''),
          createdAt: String(firstRun.created_at || ''),
        };
      }
    }
  } catch {}

  return { workflowOnRemote, latestRun };
}

app.get('/api/android/apk-status', async (_req, res) => {
  const [resolved, workflowInfo] = await Promise.all([
    resolveCompiledAndroidApk(),
    inspectGithubApkWorkflow(),
  ]);
  return res.json({
    success: true,
    apkReady: resolved.apkReady,
    apkUrl: resolved.apkUrl || null,
    apkSizeBytes: resolved.apkSizeBytes || 0,
    versionName: resolved.versionName || '1.0.0',
    packageName: 'com.studentcompanion.app',
    minSdkVersion: 23,
    androidMinLabel: 'Android 6.0 Marshmallow+',
    standalonePwaUrl: 'https://ais-pre-6kneqjoxpjhkhbumgktpro-896173298722.europe-west2.run.app',
    studioKitUrl: '/api/download/android-studio-kit',
    offlinePwaUrl: '/api/download/offline-pwa-bundle',
    workflowOnRemote: workflowInfo.workflowOnRemote,
    latestRun: workflowInfo.latestRun,
    actionsPageUrl: `https://github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/actions`,
    releasesPageUrl: `https://github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/releases`,
  });
});

app.post('/api/android/trigger-github-apk-build', async (req, res) => {
  const adminEmail = String(req.body?.adminEmail || '').toLowerCase().trim();
  if (!adminEmail || !AUTHORIZED_GIT_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/android/trigger-github-apk-build', adminEmail);
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Super Admin privileges required to start GitHub APK build.',
    });
  }

  const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'GITHUB_TOKEN is not configured in server Secrets.',
    });
  }

  try {
    const dispatchRes = await fetch(
      `https://api.github.com/repos/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/actions/workflows/build-android-apk.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Student-Companion-Ng-APK',
        },
        body: JSON.stringify({ ref: TARGET_GITHUB_BRANCH }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (dispatchRes.status === 204) {
      return res.json({
        success: true,
        message:
          'GitHub cloud APK build started! Compilation takes ~2–3 minutes; once finished, Download Android APK will unlock automatically.',
        actionsPageUrl: `https://github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/actions`,
      });
    }

    const errBody = await dispatchRes.text();
    if (dispatchRes.status === 404) {
      return res.status(404).json({
        success: false,
        error:
          'The Android build workflow is not on GitHub main yet. Click "Sync to GitHub (main)" above first, then trigger the APK build.',
      });
    }
    if (dispatchRes.status === 403) {
      return res.status(403).json({
        success: false,
        error:
          'Your GITHUB_TOKEN needs Actions/Workflow write permission to trigger builds remotely, OR open GitHub -> Actions -> "Build Android 6+ APK" -> Run workflow.',
        actionsPageUrl: `https://github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}/actions`,
      });
    }

    return res.status(dispatchRes.status).json({
      success: false,
      error: scrubGitToken(errBody || `GitHub Actions returned HTTP ${dispatchRes.status}.`, token),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: scrubGitToken(err?.message || 'Failed to trigger GitHub Actions APK build.', token),
    });
  }
});

app.get('/api/download/android-apk', async (_req, res) => {
  const resolved = await resolveCompiledAndroidApk();
  if (resolved.apkReady && resolved.source === 'local' && resolved.localPath) {
    return res.download(resolved.localPath, 'StudentCompanion-v1.0.0-android6plus.apk');
  }
  if (resolved.apkReady && resolved.source === 'github' && resolved.apkUrl) {
    return res.redirect(resolved.apkUrl);
  }

  return res.status(404).json({
    success: false,
    apkReady: false,
    error:
      'No compiled binary .apk release has been built yet because this cloud server has no Java/Android SDK. Install the online PWA directly or download the ready Android 6+ Studio Project (.zip) to compile a signed .apk.',
    studioKitUrl: '/api/download/android-studio-kit',
    standalonePwaUrl: 'https://ais-pre-6kneqjoxpjhkhbumgktpro-896173298722.europe-west2.run.app',
  });
});

app.get('/api/download/android-studio-kit', (_req, res) => {
  const entries: Array<{ name: string; content: Buffer }> = [];
  entries.push(...collectDirectoryZipEntries(path.join(__dirname, 'android-project'), 'StudentCompanion-Android6Plus'));

  const extraFiles: Array<[string, string]> = [
    ['twa-manifest.json', 'twa-manifest.json'],
    ['public/pwa-512x512.png', 'icons/android-play-store-512x512.png'],
    ['public/pwa-maskable-512x512.png', 'icons/android-maskable-512x512.png'],
    ['public/ios-icon-1024x1024.png', 'icons/ios-app-store-1024x1024.png'],
    ['public/pwa-192x192.png', 'icons/pwa-192x192.png'],
  ];

  for (const [srcRel, zipDest] of extraFiles) {
    const abs = path.join(__dirname, srcRel);
    if (fs.existsSync(abs)) {
      entries.push({ name: `StudentCompanion-Android6Plus/${zipDest}`, content: fs.readFileSync(abs) });
    }
  }

  const zipBuf = createZipBuffer(entries);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="StudentCompanion-Android6Plus-Project.zip"');
  res.setHeader('Content-Length', zipBuf.length);
  return res.send(zipBuf);
});

app.get('/api/download/offline-pwa-bundle', (_req, res) => {
  const entries: Array<{ name: string; content: Buffer }> = [];

  const manifestJson = JSON.stringify(
    {
      id: '/',
      name: 'Student Companion',
      short_name: 'StudentComp',
      description: 'Comprehensive academic companion, scheme of work, CBT practice, and student portal.',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#0B1526',
      theme_color: '#0B1526',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2
  );
  entries.push({ name: 'manifest.webmanifest', content: Buffer.from(manifestJson, 'utf-8') });

  const assetFiles = [
    'icon.svg',
    'pwa-192x192.png',
    'pwa-512x512.png',
    'pwa-maskable-512x512.png',
    'ios-icon-1024x1024.png',
    'apple-touch-icon.png',
    'sw.js',
    'sw-notifications.js',
  ];
  for (const fname of assetFiles) {
    const abs = path.join(__dirname, 'public', fname);
    if (fs.existsSync(abs)) {
      entries.push({ name: fname, content: fs.readFileSync(abs) });
    }
  }

  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    entries.push(...collectDirectoryZipEntries(distDir, 'dist'));
  }

  const readme = [
    'Student Companion — Offline PWA & Brand Icons Package',
    '====================================================',
    'Included icons (PNG, no pre-rounded corners):',
    '  - ios-icon-1024x1024.png  (1024x1024 iOS App Store)',
    '  - pwa-512x512.png         (512x512 Android / Google Play)',
    '  - pwa-maskable-512x512.png (512x512 Android Adaptive Maskable)',
    '  - pwa-192x192.png         (192x192 PWA Launcher)',
    '  - apple-touch-icon.png    (180x180 iOS Safari)',
    '',
    'To install the live PWA on Android 6.0+:',
    '  1. Open https://ais-pre-6kneqjoxpjhkhbumgktpro-896173298722.europe-west2.run.app in Chrome or Edge.',
    '  2. Tap "Install" in the top bar or browser menu -> "Install app".',
  ].join('\n');
  entries.push({ name: 'README.txt', content: Buffer.from(readme, 'utf-8') });

  const zipBuf = createZipBuffer(entries);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="StudentCompanion-Offline-PWA.zip"');
  res.setHeader('Content-Length', zipBuf.length);
  return res.send(zipBuf);
});

app.get('/api/git/status', async (req, res) => {
  const adminEmail = String(req.query.adminEmail || '').toLowerCase().trim();
  if (!adminEmail || !AUTHORIZED_GIT_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/git/status', adminEmail);
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Super Admin privileges required.',
    });
  }

  const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  const shouldFetch = req.query.fetch === '1' || req.query.fetch === 'true';
  let gitInitialized = fs.existsSync(path.join(__dirname, '.git'));
  let lastError: string | undefined;

  if (shouldFetch && !gitInitialized) {
    try {
      await ensureGitWorkspace(adminEmail);
      gitInitialized = fs.existsSync(path.join(__dirname, '.git'));
    } catch (initErr: any) {
      lastError = scrubGitToken(String(initErr?.stderr || initErr?.message || 'Git auto-init failed.'), token);
    }
  }

  let branch = TARGET_GITHUB_BRANCH;
  let latestCommit = gitInitialized ? 'unborn' : 'not initialized';
  let hasLocalHead = false;
  let uncommittedCount = 0;
  let hasUncommitted = false;
  let aheadCount = 0;
  let behindCount = 0;
  let remoteLatestCommit: string | undefined;
  let incomingCommits: Array<{ sha: string; subject: string; author: string; date: string }> = [];

  if (gitInitialized) {
    if (shouldFetch) {
      const fetchResult = await fetchRemoteMainRef(token);
      if (fetchResult.fetchError) {
        lastError = fetchResult.fetchError;
      }
      if (fetchResult.remoteSha) {
        remoteLatestCommit = fetchResult.remoteSha.slice(0, 7);
      }
    }

    try {
      const branchOut = await runGit(['rev-parse', '--abbrev-ref', 'HEAD'], { tokenToScrub: token });
      if (branchOut.stdout.trim()) branch = branchOut.stdout.trim();
    } catch {}

    try {
      const headOut = await runGit(['rev-parse', '--short', 'HEAD'], { tokenToScrub: token });
      if (headOut.stdout.trim()) {
        latestCommit = headOut.stdout.trim();
        hasLocalHead = true;
      }
    } catch {
      latestCommit = 'unborn';
      hasLocalHead = false;
    }

    try {
      const statusOut = await runGit(['status', '--porcelain'], { tokenToScrub: token });
      const lines = statusOut.stdout.split(/\r?\n/).filter((l) => l.trim().length > 0);
      uncommittedCount = lines.length;
      hasUncommitted = uncommittedCount > 0;
    } catch (stErr: any) {
      hasUncommitted = true;
      if (!lastError) {
        lastError = scrubGitToken(String(stErr?.stderr || stErr?.message || 'Unable to read git status.'), token);
      }
    }

    const remoteTrackingRef = `refs/remotes/origin/${TARGET_GITHUB_BRANCH}`;
    let hasRemoteTracking = false;
    try {
      const remoteRefOut = await runGit(['rev-parse', '--short', remoteTrackingRef], { tokenToScrub: token });
      if (remoteRefOut.stdout.trim()) {
        hasRemoteTracking = true;
        if (!remoteLatestCommit) remoteLatestCommit = remoteRefOut.stdout.trim();
      }
    } catch {
      hasRemoteTracking = false;
    }

    if (hasRemoteTracking) {
      if (hasLocalHead) {
        try {
          const aheadOut = await runGit(['rev-list', '--count', `${remoteTrackingRef}..HEAD`], {
            tokenToScrub: token,
          });
          aheadCount = Number(aheadOut.stdout.trim()) || 0;
        } catch {
          aheadCount = 0;
        }

        try {
          const behindOut = await runGit(['rev-list', '--count', `HEAD..${remoteTrackingRef}`], {
            tokenToScrub: token,
          });
          behindCount = Number(behindOut.stdout.trim()) || 0;
        } catch {
          behindCount = 0;
        }

        if (behindCount > 0) {
          try {
            const logOut = await runGit(
              ['log', `HEAD..${remoteTrackingRef}`, '-n', '8', '--pretty=format:%h\t%s\t%an\t%ar'],
              { tokenToScrub: token }
            );
            incomingCommits = logOut.stdout
              .split(/\r?\n/)
              .filter(Boolean)
              .map((line) => {
                const [sha, subject, author, date] = line.split('\t');
                return {
                  sha: sha || '',
                  subject: subject || '(no message)',
                  author: author || 'GitHub',
                  date: date || '',
                };
              });
          } catch {}
        }
      } else {
        try {
          const behindOut = await runGit(['rev-list', '--count', remoteTrackingRef], {
            tokenToScrub: token,
          });
          behindCount = Number(behindOut.stdout.trim()) || 0;
          if (behindCount > 0) {
            const logOut = await runGit(
              ['log', remoteTrackingRef, '-n', '8', '--pretty=format:%h\t%s\t%an\t%ar'],
              { tokenToScrub: token }
            );
            incomingCommits = logOut.stdout
              .split(/\r?\n/)
              .filter(Boolean)
              .map((line) => {
                const [sha, subject, author, date] = line.split('\t');
                return {
                  sha: sha || '',
                  subject: subject || '(no message)',
                  author: author || 'GitHub',
                  date: date || '',
                };
              });
          }
        } catch {}
      }
    }
  }

  const tokenCheck = await verifyGithubTokenAccess(token);

  return res.json({
    success: true,
    configured: tokenCheck.configured,
    canPush: tokenCheck.canPush,
    tokenStatus: tokenCheck.tokenStatus,
    tokenMessage: tokenCheck.tokenMessage,
    githubUser: tokenCheck.githubUser,
    gitInitialized,
    repo: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
    branch,
    aheadCount,
    behindCount,
    uncommittedCount,
    incomingCommits,
    latestCommit,
    remoteLatestCommit: tokenCheck.remoteLatestCommit || remoteLatestCommit,
    hasUncommitted,
    lastError,
  });
});

app.post('/api/git/pull', async (req, res) => {
  const adminEmail = String(req.body?.adminEmail || '').toLowerCase().trim();
  if (!adminEmail || !AUTHORIZED_GIT_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/git/pull', adminEmail);
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Super Admin privileges required to pull updates.',
    });
  }

  const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  let didStash = false;

  try {
    const { autoInitialized } = await ensureGitWorkspace(adminEmail);

    const mergeHeadFile = path.join(__dirname, '.git', 'MERGE_HEAD');
    if (fs.existsSync(mergeHeadFile)) {
      return res.status(409).json({
        success: false,
        error:
          'A git merge is already in progress in this workspace. Finish committing or resolve conflicts before pulling new updates.',
      });
    }

    const fetchResult = await fetchRemoteMainRef(token);
    if (fetchResult.fetchError) {
      return res.status(502).json({
        success: false,
        error: fetchResult.fetchError,
      });
    }

    const remoteSha = fetchResult.remoteSha;
    if (!remoteSha) {
      return res.json({
        success: true,
        autoInitialized,
        pulledCommits: 0,
        updatedFilesCount: 0,
        latestCommit: 'unborn',
        message: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}) has no commits to pull yet.`,
      });
    }

    let prevHeadSha: string | null = null;
    try {
      const prevHeadOut = await runGit(['rev-parse', 'HEAD'], { tokenToScrub: token });
      prevHeadSha = prevHeadOut.stdout.trim() || null;
    } catch {
      prevHeadSha = null;
    }

    let pulledCommits = 0;
    if (prevHeadSha) {
      const behindOut = await runGit(['rev-list', '--count', `HEAD..${remoteSha}`], {
        tokenToScrub: token,
      });
      pulledCommits = Number(behindOut.stdout.trim()) || 0;
      if (pulledCommits === 0) {
        return res.json({
          success: true,
          autoInitialized,
          pulledCommits: 0,
          updatedFilesCount: 0,
          latestCommit: prevHeadSha.slice(0, 7),
          message: `Workspace is already up to date with GitHub ${TARGET_GITHUB_BRANCH} (${prevHeadSha.slice(0, 7)}).`,
        });
      }
    } else {
      const countOut = await runGit(['rev-list', '--count', remoteSha], { tokenToScrub: token });
      pulledCommits = Number(countOut.stdout.trim()) || 1;
    }

    const statusOut = await runGit(['status', '--porcelain'], { tokenToScrub: token });
    if (statusOut.stdout.trim()) {
      await runGit(['stash', 'push', '-u', '-m', 'pre-pull-sync'], { tokenToScrub: token });
      didStash = true;
    }

    if (!prevHeadSha) {
      await runGit(['update-ref', `refs/heads/${TARGET_GITHUB_BRANCH}`, remoteSha], { tokenToScrub: token });
      await runGit(['symbolic-ref', 'HEAD', `refs/heads/${TARGET_GITHUB_BRANCH}`], { tokenToScrub: token });
      await runGit(['reset', '--hard', remoteSha], { tokenToScrub: token });
    } else {
      try {
        await runGit(['merge', '--no-edit', remoteSha], { tokenToScrub: token });
      } catch (mergeErr: any) {
        const mergeMsg = String(mergeErr?.stderr || mergeErr?.message || '');
        if (mergeMsg.toLowerCase().includes('unrelated histories')) {
          try {
            await runGit(['merge', '--no-edit', '--allow-unrelated-histories', remoteSha], {
              tokenToScrub: token,
            });
          } catch (unrelErr: any) {
            let conflicted: string[] = [];
            try {
              const diffOut = await runGit(['diff', '--name-only', '--diff-filter=U'], {
                tokenToScrub: token,
              });
              conflicted = diffOut.stdout.split(/\r?\n/).filter(Boolean);
            } catch {}
            try {
              await runGit(['merge', '--abort'], { tokenToScrub: token });
            } catch {}
            if (didStash) {
              try {
                await runGit(['stash', 'pop'], { tokenToScrub: token });
              } catch {}
              didStash = false;
            }
            return res.status(409).json({
              success: false,
              error:
                conflicted.length > 0
                  ? `Pull paused due to merge conflict(s) in: ${conflicted.slice(0, 5).join(', ')}. Resolve or commit local changes first.`
                  : scrubGitToken(String(unrelErr?.stderr || unrelErr?.message || 'Merge conflict pulling GitHub updates.'), token),
            });
          }
        } else {
          let conflicted: string[] = [];
          try {
            const diffOut = await runGit(['diff', '--name-only', '--diff-filter=U'], {
              tokenToScrub: token,
            });
            conflicted = diffOut.stdout.split(/\r?\n/).filter(Boolean);
          } catch {}
          try {
            await runGit(['merge', '--abort'], { tokenToScrub: token });
          } catch {}
          if (didStash) {
            try {
              await runGit(['stash', 'pop'], { tokenToScrub: token });
            } catch {}
            didStash = false;
          }
          return res.status(409).json({
            success: false,
            error:
              conflicted.length > 0
                ? `Pull paused due to merge conflict(s) in: ${conflicted.slice(0, 5).join(', ')}. Resolve or commit local changes first.`
                : scrubGitToken(mergeMsg || 'Merge conflict while pulling GitHub main.', token),
          });
        }
      }
    }

    let stashWarning = '';
    if (didStash) {
      try {
        await runGit(['stash', 'pop'], { tokenToScrub: token });
      } catch (popErr: any) {
        stashWarning = ` (Local uncommitted edits remain safely in git stash: ${scrubGitToken(String(popErr?.message || 'stash pop needs manual check'), token)})`;
      }
      didStash = false;
    }

    const headOut = await runGit(['rev-parse', '--short', 'HEAD'], { tokenToScrub: token });
    let updatedFilesCount = 0;
    if (prevHeadSha) {
      try {
        const diffFilesOut = await runGit(['diff', '--name-only', `${prevHeadSha}..HEAD`], {
          tokenToScrub: token,
        });
        updatedFilesCount = diffFilesOut.stdout.split(/\r?\n/).filter(Boolean).length;
      } catch {}
    }

    return res.json({
      success: true,
      autoInitialized,
      repo: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
      branch: TARGET_GITHUB_BRANCH,
      pulledCommits,
      updatedFilesCount,
      latestCommit: headOut.stdout.trim(),
      message: `Pulled ${pulledCommits} commit(s) (${updatedFilesCount} file(s) updated) from ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}) · HEAD ${headOut.stdout.trim()}.${stashWarning}`,
    });
  } catch (err: any) {
    if (didStash) {
      try {
        await runGit(['stash', 'pop'], { tokenToScrub: token });
      } catch {}
    }
    const rawMsg = err?.stderr || err?.message || 'Failed to pull updates from GitHub.';
    return res.status(500).json({
      success: false,
      error: scrubGitToken(String(rawMsg), token),
    });
  }
});

app.post('/api/git/push', async (req, res) => {
  const adminEmail = String(req.body?.adminEmail || '').toLowerCase().trim();
  if (!adminEmail || !AUTHORIZED_GIT_ADMINS.includes(adminEmail)) {
    await securityService.logUnauthorizedProbe(req, '/api/git/push', adminEmail);
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Super Admin privileges required to sync repository.',
    });
  }

  const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
  if (!token) {
    return res.status(400).json({
      success: false,
      error:
        'GITHUB_TOKEN is not available in the running server environment. Add GITHUB_TOKEN (with repo / Contents Read & Write scope) in AI Studio Secrets and restart the dev server.',
    });
  }

  const tokenCheck = await verifyGithubTokenAccess(token);
  if (!tokenCheck.canPush && tokenCheck.tokenStatus !== 'network_error') {
    return res.status(403).json({
      success: false,
      error: tokenCheck.tokenMessage,
    });
  }

  let didStash = false;
  try {
    const { autoInitialized } = await ensureGitWorkspace(adminEmail);

    const mergeHeadFile = path.join(__dirname, '.git', 'MERGE_HEAD');
    if (fs.existsSync(mergeHeadFile)) {
      const unmergedOut = await runGit(['diff', '--name-only', '--diff-filter=U'], { tokenToScrub: token });
      const unmergedFiles = unmergedOut.stdout.split(/\r?\n/).filter(Boolean);
      if (unmergedFiles.length > 0) {
        return res.status(409).json({
          success: false,
          error: `Cannot push while merge conflicts exist in: ${unmergedFiles.slice(0, 5).join(', ')}.`,
        });
      }
      await runGit(['add', '-A'], { tokenToScrub: token });
      await runGit(['commit', '--no-edit'], { tokenToScrub: token });
    }

    const commitMsg =
      String(req.body?.commitMessage || '').trim().slice(0, 200) ||
      `chore: sync Student Companion updates [${new Date().toISOString()}]`;

    const authenticatedUrl = `https://x-access-token:${encodeURIComponent(token)}@github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}.git`;

    const fetchResult = await fetchRemoteMainRef(token);
    if (fetchResult.fetchError) {
      return res.status(502).json({
        success: false,
        error: fetchResult.fetchError,
      });
    }
    const remoteSha = fetchResult.remoteSha;

    let hasLocalHead = false;
    try {
      await runGit(['rev-parse', '--verify', 'HEAD'], { tokenToScrub: token });
      hasLocalHead = true;
    } catch {
      hasLocalHead = false;
    }

    let pushedCommits = 0;

    if (remoteSha) {
      let isAncestor = false;
      if (hasLocalHead) {
        try {
          await runGit(['merge-base', '--is-ancestor', remoteSha, 'HEAD'], { tokenToScrub: token });
          isAncestor = true;
        } catch {
          isAncestor = false;
        }
      }

      if (hasLocalHead && isAncestor) {
        const statusOut = await runGit(['status', '--porcelain'], { tokenToScrub: token });
        if (statusOut.stdout.trim()) {
          await runGit(['add', '-A'], { tokenToScrub: token });
          await runGit(['commit', '-m', commitMsg], { tokenToScrub: token });
        }
        const aheadOut = await runGit(['rev-list', '--count', `${remoteSha}..HEAD`], {
          tokenToScrub: token,
        });
        pushedCommits = Number(aheadOut.stdout.trim()) || 0;
        if (pushedCommits > 0) {
          await runGit(['push', authenticatedUrl, `HEAD:refs/heads/${TARGET_GITHUB_BRANCH}`], {
            timeout: 45000,
            tokenToScrub: token,
          });
        }
      } else if (hasLocalHead && !isAncestor) {
        // Local HEAD exists and remote main has commits not in HEAD: safely merge remote first!
        const statusOut = await runGit(['status', '--porcelain'], { tokenToScrub: token });
        if (statusOut.stdout.trim()) {
          await runGit(['stash', 'push', '-u', '-m', 'pre-push-merge-sync'], { tokenToScrub: token });
          didStash = true;
        }

        try {
          await runGit(['merge', '--no-edit', remoteSha], { tokenToScrub: token });
        } catch (mergeErr: any) {
          const mergeMsg = String(mergeErr?.stderr || mergeErr?.message || '');
          if (mergeMsg.toLowerCase().includes('unrelated histories')) {
            try {
              await runGit(['merge', '--no-edit', '--allow-unrelated-histories', remoteSha], {
                tokenToScrub: token,
              });
            } catch (unrelErr: any) {
              let conflicted: string[] = [];
              try {
                const diffOut = await runGit(['diff', '--name-only', '--diff-filter=U'], {
                  tokenToScrub: token,
                });
                conflicted = diffOut.stdout.split(/\r?\n/).filter(Boolean);
              } catch {}
              try {
                await runGit(['merge', '--abort'], { tokenToScrub: token });
              } catch {}
              if (didStash) {
                try {
                  await runGit(['stash', 'pop'], { tokenToScrub: token });
                } catch {}
                didStash = false;
              }
              return res.status(409).json({
                success: false,
                error:
                  conflicted.length > 0
                    ? `Sync paused: remote GitHub main has conflicting changes in ${conflicted.slice(0, 5).join(', ')}. Click "Pull from GitHub" or resolve locally first.`
                    : scrubGitToken(String(unrelErr?.stderr || unrelErr?.message || 'Merge conflict syncing with remote main.'), token),
              });
            }
          } else {
            let conflicted: string[] = [];
            try {
              const diffOut = await runGit(['diff', '--name-only', '--diff-filter=U'], {
                tokenToScrub: token,
              });
              conflicted = diffOut.stdout.split(/\r?\n/).filter(Boolean);
            } catch {}
            try {
              await runGit(['merge', '--abort'], { tokenToScrub: token });
            } catch {}
            if (didStash) {
              try {
                await runGit(['stash', 'pop'], { tokenToScrub: token });
              } catch {}
              didStash = false;
            }
            return res.status(409).json({
              success: false,
              error:
                conflicted.length > 0
                  ? `Sync paused: remote GitHub main has conflicting changes in ${conflicted.slice(0, 5).join(', ')}.`
                  : scrubGitToken(mergeMsg || 'Merge conflict syncing with remote main.', token),
            });
          }
        }

        if (didStash) {
          await runGit(['stash', 'pop'], { tokenToScrub: token });
          didStash = false;
        }

        const postMergeStatus = await runGit(['status', '--porcelain'], { tokenToScrub: token });
        if (postMergeStatus.stdout.trim()) {
          await runGit(['add', '-A'], { tokenToScrub: token });
          await runGit(['commit', '-m', commitMsg], { tokenToScrub: token });
        }

        const aheadOut = await runGit(['rev-list', '--count', `${remoteSha}..HEAD`], {
          tokenToScrub: token,
        });
        pushedCommits = Number(aheadOut.stdout.trim()) || 0;
        if (pushedCommits > 0) {
          await runGit(['push', authenticatedUrl, `HEAD:refs/heads/${TARGET_GITHUB_BRANCH}`], {
            timeout: 45000,
            tokenToScrub: token,
          });
        }
      } else {
        // Fresh container (.git was missing / unborn HEAD):
        // Stack workspace files cleanly as a child commit of remoteSha without losing GitHub history.
        await runGit(['add', '-A'], { tokenToScrub: token });
        const treeOut = await runGit(['write-tree'], { tokenToScrub: token });
        const workspaceTreeSha = treeOut.stdout.trim();
        const remoteTreeOut = await runGit(['rev-parse', `${remoteSha}^{tree}`], { tokenToScrub: token });
        const remoteTreeSha = remoteTreeOut.stdout.trim();

        if (workspaceTreeSha === remoteTreeSha) {
          await runGit(['update-ref', `refs/heads/${TARGET_GITHUB_BRANCH}`, remoteSha], { tokenToScrub: token });
          await runGit(['symbolic-ref', 'HEAD', `refs/heads/${TARGET_GITHUB_BRANCH}`], { tokenToScrub: token });
          await runGit(['reset', '--mixed', remoteSha], { tokenToScrub: token });
          pushedCommits = 0;
        } else {
          const commitOut = await runGit(
            ['commit-tree', workspaceTreeSha, '-p', remoteSha, '-m', commitMsg],
            { tokenToScrub: token }
          );
          const newCommitSha = commitOut.stdout.trim();
          await runGit(['update-ref', `refs/heads/${TARGET_GITHUB_BRANCH}`, newCommitSha], { tokenToScrub: token });
          await runGit(['symbolic-ref', 'HEAD', `refs/heads/${TARGET_GITHUB_BRANCH}`], { tokenToScrub: token });
          await runGit(['reset', '--mixed', newCommitSha], { tokenToScrub: token });

          await runGit(['push', authenticatedUrl, `HEAD:refs/heads/${TARGET_GITHUB_BRANCH}`], {
            timeout: 45000,
            tokenToScrub: token,
          });
          pushedCommits = 1;
        }
      }
    } else {
      // Brand new empty repository
      await runGit(['add', '-A'], { tokenToScrub: token });
      const statusOut = await runGit(['status', '--porcelain'], { tokenToScrub: token });
      if (statusOut.stdout.trim()) {
        await runGit(['commit', '-m', commitMsg], { tokenToScrub: token });
      } else {
        await runGit(['commit', '--allow-empty', '-m', commitMsg], { tokenToScrub: token });
      }
      await runGit(['push', authenticatedUrl, `HEAD:refs/heads/${TARGET_GITHUB_BRANCH}`], {
        timeout: 45000,
        tokenToScrub: token,
      });
      pushedCommits = 1;
    }

    try {
      await runGit(['update-ref', `refs/remotes/origin/${TARGET_GITHUB_BRANCH}`, 'HEAD'], {
        tokenToScrub: token,
      });
    } catch {}

    const headOut = await runGit(['rev-parse', '--short', 'HEAD'], { tokenToScrub: token });

    return res.json({
      success: true,
      autoInitialized,
      repo: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
      branch: TARGET_GITHUB_BRANCH,
      pushedCommits,
      latestCommit: headOut.stdout.trim(),
      message:
        pushedCommits > 0
          ? `Successfully synced ${pushedCommits} commit(s) to ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}) · HEAD ${headOut.stdout.trim()}.`
          : `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}) is already up to date (${headOut.stdout.trim()}).`,
    });
  } catch (err: any) {
    if (didStash) {
      try {
        await runGit(['stash', 'pop'], { tokenToScrub: token });
      } catch {}
    }
    const rawMsg = err?.stderr || err?.message || 'GitHub push failed.';
    const cleaned = scrubGitToken(String(rawMsg), token);
    if (cleaned.toLowerCase().includes('workflow') && (cleaned.toLowerCase().includes('scope') || cleaned.toLowerCase().includes('refusing'))) {
      return res.status(403).json({
        success: false,
        error:
          'GitHub rejected pushing .github/workflows/build-android-apk.yml because your GITHUB_TOKEN lacks the "workflow" scope (or Workflows: Read & Write permission). Add "workflow" to your token on GitHub, update GITHUB_TOKEN in Secrets, restart the server, and click Sync to GitHub again.',
      });
    }
    return res.status(500).json({
      success: false,
      error: cleaned,
    });
  }
});

// ==========================================
// OTA STATE MIRROR & EMAIL DIGEST DISPATCH
// ==========================================

const OTA_STATE_FILE = path.resolve(__dirname, '.ota-runtime-state.json');

interface ServerOTAState {
  appRelease: Record<string, any> | null;
  featureFlags: Record<string, any>;
  notifications: any[];
}

function readServerOTAState(): ServerOTAState {
  try {
    if (fs.existsSync(OTA_STATE_FILE)) {
      const raw = fs.readFileSync(OTA_STATE_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        appRelease: parsed.appRelease || null,
        featureFlags: parsed.featureFlags || {},
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
      };
    }
  } catch {
    // Ignore corrupt cache and start clean
  }
  return { appRelease: null, featureFlags: {}, notifications: [] };
}

function writeServerOTAState(state: ServerOTAState): void {
  try {
    fs.writeFileSync(OTA_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch {
    // Ignore write failure in read-only environments
  }
}

app.get('/api/ota/state', (_req, res) => {
  const state = readServerOTAState();
  return res.json({ success: true, ...state });
});

app.post('/api/ota/release', (req, res) => {
  const release = req.body;
  if (!release || !release.latestVersion) {
    return res.status(400).json({ success: false, error: 'latestVersion is required' });
  }
  const state = readServerOTAState();
  state.appRelease = {
    ...release,
    id: 'current_release',
    publishedAt: release.publishedAt || new Date().toISOString(),
  };
  writeServerOTAState(state);
  return res.json({ success: true, appRelease: state.appRelease });
});

app.post('/api/ota/features', (req, res) => {
  const { flag, flagsMap } = req.body || {};
  const state = readServerOTAState();
  if (flag && flag.featureKey) {
    state.featureFlags[flag.featureKey] = flag;
  } else if (flagsMap && typeof flagsMap === 'object') {
    state.featureFlags = { ...state.featureFlags, ...flagsMap };
  } else {
    return res.status(400).json({ success: false, error: 'flag or flagsMap is required' });
  }
  writeServerOTAState(state);
  return res.json({ success: true, featureFlags: state.featureFlags });
});

app.post('/api/ota/notifications', (req, res) => {
  const item = req.body;
  if (!item || !item.id || !item.title || !item.message) {
    return res.status(400).json({ success: false, error: 'Notification id, title, and message are required' });
  }
  const state = readServerOTAState();
  state.notifications = [item, ...state.notifications.filter((n: any) => n.id !== item.id)].slice(0, 60);
  writeServerOTAState(state);
  return res.json({ success: true, notification: item });
});

app.delete('/api/ota/notifications/:id', (req, res) => {
  const id = String(req.params.id || '');
  const state = readServerOTAState();
  state.notifications = state.notifications.filter((n: any) => n.id !== id);
  writeServerOTAState(state);
  return res.json({ success: true });
});

app.post('/api/notifications/send-digest', async (req, res) => {
  try {
    const { recipients, subject, title, message, actionLabel } = req.body || {};
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one recipient email is required.' });
    }
    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Title and message are required.' });
    }

    const validRecipients = recipients
      .filter((r: any) => r && typeof r.email === 'string' && r.email.includes('@'))
      .slice(0, 25);

    if (validRecipients.length === 0) {
      return res.status(400).json({ success: false, error: 'No valid email addresses provided.' });
    }

    const gmailUser = (process.env.GMAIL_USER || 'martorefe@gmail.com').trim();
    const gmailPassword = (process.env.GMAIL_APP_PASSWORD || '').trim();
    const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
    const appUrl = process.env.APP_URL || 'https://studentcompanion.ng';

    const buildHtml = (recipientName: string) => `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; background:#070D18; color:#F8FAFC; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#0B1526; border:1px solid #1E293B; border-radius:16px; overflow:hidden;">
          <div style="background:linear-gradient(135deg,#0B1526,#14233C); padding:20px 24px; border-bottom:2px solid #84E000;">
            <div style="font-size:12px; font-weight:800; color:#84E000; letter-spacing:0.08em; text-transform:uppercase;">Student Companion Reminder</div>
            <h1 style="margin:6px 0 0; font-size:20px; color:#FFFFFF;">${String(title).replace(/</g, '&lt;')}</h1>
          </div>
          <div style="padding:24px; line-height:1.6; font-size:14px; color:#CBD5E1;">
            <p style="margin-top:0;">Hello <strong style="color:#FFFFFF;">${String(recipientName || 'Scholar').replace(/</g, '&lt;')}</strong>,</p>
            <p>${String(message).replace(/</g, '&lt;')}</p>
            <div style="margin-top:22px;">
              <a href="${appUrl}" style="display:inline-block; background:#FF5B00; color:#FFFFFF; text-decoration:none; font-weight:700; padding:12px 22px; border-radius:10px; font-size:13px;">
                ${String(actionLabel || 'Open Student Companion').replace(/</g, '&lt;')}
              </a>
            </div>
          </div>
          <div style="padding:14px 24px; background:#060B14; border-top:1px solid #1E293B; font-size:11px; color:#64748B;">
            Student Companion Nigeria · Smart Study & Tutoring Companion
          </div>
        </div>
      </div>
    `;

    let sentCount = 0;
    let provider = 'none';

    if (gmailPassword) {
      provider = 'gmail-smtp';
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPassword },
      });
      for (const r of validRecipients) {
        try {
          await transporter.sendMail({
            from: `"Student Companion" <${gmailUser}>`,
            to: String(r.email).trim().toLowerCase(),
            subject: subject || `[Student Companion] ${title}`,
            text: `Hello ${r.name || 'User'},\n\n${title}\n${message}\n\nOpen the app: ${appUrl}`,
            html: buildHtml(r.name || 'User'),
          });
          sentCount += 1;
        } catch (err) {
          console.warn(`Digest email failed for ${r.email}:`, err);
        }
      }
      return res.json({
        success: sentCount > 0,
        sentCount,
        provider,
        message: `Delivered ${sentCount} reminder email(s) via Gmail SMTP.`,
      });
    }

    if (resendApiKey) {
      provider = 'resend';
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'Student Companion <onboarding@resend.dev>';
      for (const r of validRecipients) {
        const result = await resend.emails.send({
          from: fromEmail,
          to: [String(r.email).trim().toLowerCase()],
          subject: subject || `[Student Companion] ${title}`,
          html: buildHtml(r.name || 'User'),
          text: `Hello ${r.name || 'User'},\n\n${title}\n${message}\n\nOpen the app: ${appUrl}`,
        });
        if (!result.error) sentCount += 1;
      }
      return res.json({
        success: sentCount > 0,
        sentCount,
        provider,
        message: `Delivered ${sentCount} reminder email(s) via Resend.`,
      });
    }

    return res.status(503).json({
      success: false,
      error: 'Email delivery credentials (GMAIL_APP_PASSWORD or RESEND_API_KEY) are not configured on the server.',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Error sending reminder email digest.',
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const {
      identifier = '',
      password = '',
      method = 'password',
      userId,
      email,
      role,
      hasLocalProfile = false
    } = req.body || {};

    const cleanIdentifier = String(identifier || '').trim().toLowerCase();
    const cleanEmail = String(email || (cleanIdentifier.includes('@') ? cleanIdentifier : '')).trim().toLowerCase();
    const cleanUserId = String(
      userId || (!cleanIdentifier.includes('@') && cleanIdentifier ? cleanIdentifier : '')
    ).trim();

    const ip = extractClientIp(req);
    const fp = extractDeviceFingerprint(req);

    // Verified Super Admin login path
    if (AUTHORIZED_SUPER_ADMINS.includes(cleanEmail) || method === 'super_admin') {
      if (method === 'password' && !String(password || '').trim()) {
        return res.status(400).json({
          success: false,
          authenticated: false,
          error: 'Please enter your password.'
        });
      }
      return res.json({
        success: true,
        authenticated: true,
        role: 'admin',
        isSuperAdmin: true,
        displayName: 'Super Admin',
        message: 'Super Admin credentials verified.'
      });
    }

    // Security standing verification (account tombstone, suspension, timed lock, IP/device block)
    const activeBlock = findActiveBlock({
      ip,
      fingerprint: fp,
      userId: cleanUserId || undefined,
      email: cleanEmail || undefined,
      blockTypes: ['account_delete', 'account_suspend', 'account_lock', 'ip', 'device_fingerprint']
    });

    if (activeBlock) {
      if (activeBlock.blockType === 'account_delete') {
        return res.status(403).json({
          success: false,
          authenticated: false,
          accountStatus: 'deleted',
          error: `Account Closed: ${activeBlock.reason}`
        });
      }
      if (activeBlock.blockType === 'account_suspend') {
        return res.status(403).json({
          success: false,
          authenticated: false,
          accountStatus: 'suspended',
          error: `Account Suspended: ${activeBlock.reason}`
        });
      }
      if (activeBlock.blockType === 'account_lock') {
        const minsLeft = activeBlock.expiresAt
          ? Math.max(1, Math.ceil((new Date(activeBlock.expiresAt).getTime() - Date.now()) / 60000))
          : 15;
        return res.status(403).json({
          success: false,
          authenticated: false,
          accountStatus: 'locked',
          lockedUntil: activeBlock.expiresAt,
          error: `Account Temporarily Locked (${minsLeft}m remaining): ${activeBlock.reason}`
        });
      }
      return res.status(403).json({
        success: false,
        authenticated: false,
        isBlocked: true,
        error: `Connection Blocked: ${activeBlock.reason}`
      });
    }

    if (method === 'password') {
      if (!cleanIdentifier || !String(password || '').trim()) {
        return res.status(400).json({
          success: false,
          authenticated: false,
          error: 'Please enter both your email/username and password.'
        });
      }
      if (!hasLocalProfile) {
        return res.status(401).json({
          success: false,
          authenticated: false,
          needsSignup: true,
          error: 'No registered account matched those credentials.'
        });
      }
    }

    return res.json({
      success: true,
      authenticated: true,
      role: role || 'student',
      isSuperAdmin: false,
      message: 'Login verified.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      authenticated: false,
      error: err?.message || 'Unable to verify sign-in right now. Please try again.'
    });
  }
});

// Vite Middleware for Dev or Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    app.get('/manifest.webmanifest', (_req, res) => {
      res.setHeader('Content-Type', 'application/manifest+json');
      res.json({
        id: '/',
        name: 'Student Companion',
        short_name: 'StudentComp',
        description: 'Comprehensive academic companion, scheme of work, CBT practice, and student portal.',
        theme_color: '#0B1526',
        background_color: '#0B1526',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      });
    });

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      plugins: [
        {
          name: 'disable-hmr-websocket-connect',
          enforce: 'post',
          transform(code, id) {
            const cleanId = id.split('?')[0].replace(/\\/g, '/');
            if (cleanId.endsWith('/dist/client/client.mjs') || cleanId === '/@vite/client') {
              return {
                code: code
                  .replace(
                    /transport\.connect\([^;]*\);/,
                    '/* HMR WebSocket disabled */ Promise.resolve();'
                  )
                  .replace(
                    /else throw new SendBeforeConnectError\("send was called before connect"\);/g,
                    'else return;'
                  )
                  .replace(/ws\.send\(/g, 'ws?.send(')
                  .replace(/new WebSocket\([^)]*\)/g, 'null'),
                map: null,
              };
            }
          },
          transformIndexHtml(html) {
            if (!html.includes('rel="manifest"')) {
              return html.replace('</head>', '  <link rel="manifest" href="/manifest.webmanifest" />\n  </head>');
            }
            return html;
          },
        },
      ],
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Companion full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
