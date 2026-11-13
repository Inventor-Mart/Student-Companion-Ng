import fs from 'fs';
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
  increment
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
      blockTypes: ['wallet_freeze', 'account_suspend']
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

// 1. Get Paystack Public Config
app.get('/api/paystack/config', (_req, res) => {
  const pubKey = runtimePaystackPublicKey || process.env.VITE_PAYSTACK_PUBLIC_KEY || '';
  const isLive = pubKey.startsWith('pk_live_');
  const isTest = pubKey.startsWith('pk_test_');
  const hasSecret = Boolean(runtimePaystackSecretKey || process.env.PAYSTACK_SECRET_KEY);

  res.json({
    publicKey: pubKey,
    isLive,
    isTest,
    hasSecretKey: hasSecret,
    mode: isLive ? 'live' : isTest ? 'test' : 'unconfigured',
  });
});

// 2. Save / Update Paystack Keys (Admin Only: wowrealities@gmail.com, martorefe@gmail.com)
app.post('/api/paystack/save-keys', async (req, res) => {
  const { publicKey, secretKey, adminEmail } = req.body;
  const authorizedAdmins = ['martorefe@gmail.com', 'wowrealities@gmail.com'];

  if (!adminEmail || !authorizedAdmins.includes(String(adminEmail).toLowerCase().trim())) {
    await securityService.logUnauthorizedProbe(req, '/api/paystack/save-keys', adminEmail);
    return res.status(403).json({ success: false, error: 'Unauthorized: Admin privileges required to update payment gateway keys.' });
  }

  if (publicKey !== undefined) {
    runtimePaystackPublicKey = String(publicKey).trim();
  }
  if (secretKey !== undefined) {
    runtimePaystackSecretKey = String(secretKey).trim();
  }

  return res.json({
    success: true,
    message: 'Paystack gateway configuration updated successfully.',
    publicKey: runtimePaystackPublicKey,
    hasSecretKey: Boolean(runtimePaystackSecretKey),
    mode: runtimePaystackPublicKey.startsWith('pk_live_') ? 'live' : runtimePaystackPublicKey.startsWith('pk_test_') ? 'test' : 'unconfigured',
  });
});

// 3. Verify Payment with Paystack REST API and Credit Parent Escrow Wallet
app.post('/api/paystack/verify-payment', async (req, res) => {
  try {
    const { reference, amountNaira, email, parentId, studentId, wardName, purpose = 'parent_wallet_topup' } = req.body;

    if (!reference || typeof amountNaira !== 'number' || !Number.isFinite(amountNaira) || amountNaira <= 0 || amountNaira > 5000000) {
      await securityService.recordIncident({
        category: 'tampered_payload',
        severity: 'high',
        status: 'open',
        source: 'server_guard',
        title: 'Tampered Paystack Verification Payload',
        description: `Rejected invalid payment verification (ref=${reference}, amountNaira=${amountNaira}) from ${email || extractClientIp(req)}.`,
        actorUserId: parentId || studentId,
        actorEmail: email,
        ipAddress: extractClientIp(req),
        deviceFingerprint: extractDeviceFingerprint(req),
        endpoint: '/api/paystack/verify-payment',
        actionTaken: '400 Rejected'
      });
      return res.status(400).json({ success: false, error: 'Valid payment reference and positive amountNaira are required' });
    }

    const walletBlock = findActiveBlock({
      userId: parentId || studentId,
      email,
      blockTypes: ['wallet_freeze', 'account_suspend']
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
        actionTaken: '409 Replay Blocked + IP/Device Auto-Blocked (60m)'
      });
      await securityService.createOrActivateBlock({
        blockType: 'ip',
        targetValue: ip,
        reason: `Automatic 60m block for Paystack transaction replay attempt (${reference})`,
        createdBy: 'auto_shield',
        durationMinutes: 60
      });
      if (fp !== 'unknown-fp') {
        await securityService.createOrActivateBlock({
          blockType: 'device_fingerprint',
          targetValue: fp,
          reason: `Automatic 60m block for Paystack transaction replay attempt (${reference})`,
          createdBy: 'auto_shield',
          durationMinutes: 60
        });
      }
      return res.status(409).json({
        success: false,
        replayBlocked: true,
        error: 'Security Alert: This payment reference has already been processed and cannot be replayed.'
      });
    }

    await securityService.checkPaymentVelocity(req, String(parentId || studentId || ''), email, amountNaira);

    const secretKey = runtimePaystackSecretKey || process.env.PAYSTACK_SECRET_KEY || '';
    let paystackResponseData: any = null;
    let paymentChannel = 'card';

    // If secret key is provided, perform live server-side verification with Paystack
    if (secretKey) {
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
          ? 'Paystack Secret Key is invalid or not registered in your Paystack Dashboard. Please input your active secret key from https://dashboard.paystack.com/#/settings/developer in Gateway Keys.'
          : (verifyJson.message || 'Payment reference verification failed at Paystack');
        return res.status(400).json({
          success: false,
          error: errorMsg,
        });
      }

      paystackResponseData = verifyJson.data;

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
    } else {
      console.warn(`[Paystack Notice] PAYSTACK_SECRET_KEY not set. Recording reference ${reference} in verified sandbox mode.`);
    }

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
// GIT HUB REPOSITORY SYNC ROUTES (Authorized Existing Super Admins Only)
// =========================================================================
const execFileAsync = promisify(execFile);
const AUTHORIZED_GIT_ADMINS = ['martorefe@gmail.com', 'wowrealities@gmail.com'];
const TARGET_GITHUB_OWNER = 'Inventor-Mart';
const TARGET_GITHUB_REPO = 'Student-Companion-Ng';
const TARGET_GITHUB_BRANCH = 'main';

function scrubGitToken(text: string, token: string): string {
  if (!text) return '';
  if (!token) return text;
  return text.split(token).join('***');
}

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
  try {
    const [branchOut, headOut, statusOut] = await Promise.all([
      execFileAsync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: __dirname }),
      execFileAsync('git', ['rev-parse', '--short', 'HEAD'], { cwd: __dirname }),
      execFileAsync('git', ['status', '--porcelain'], { cwd: __dirname }),
    ]);

    let aheadCount = 0;
    try {
      const aheadOut = await execFileAsync(
        'git',
        ['rev-list', '--count', `origin/${TARGET_GITHUB_BRANCH}..HEAD`],
        { cwd: __dirname }
      );
      aheadCount = Number(aheadOut.stdout.trim()) || 0;
    } catch {
      aheadCount = 0;
    }

    return res.json({
      success: true,
      configured: Boolean(token),
      repo: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
      branch: branchOut.stdout.trim() || TARGET_GITHUB_BRANCH,
      aheadCount,
      latestCommit: headOut.stdout.trim(),
      hasUncommitted: Boolean(statusOut.stdout.trim()),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: scrubGitToken(err?.message || 'Unable to inspect local git repository.', token),
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
        'GITHUB_TOKEN is not available in the running server environment. Ensure GITHUB_TOKEN is saved in Secrets and restart the dev server.',
    });
  }

  try {
    const statusOut = await execFileAsync('git', ['status', '--porcelain'], { cwd: __dirname });
    if (statusOut.stdout.trim()) {
      const commitMsg =
        String(req.body?.commitMessage || '').trim() ||
        `chore: sync Student Companion updates [${new Date().toISOString()}]`;
      await execFileAsync('git', ['add', '-A'], { cwd: __dirname });
      await execFileAsync('git', ['commit', '-m', commitMsg], { cwd: __dirname });
    }

    let aheadCount = 0;
    try {
      const aheadOut = await execFileAsync(
        'git',
        ['rev-list', '--count', `origin/${TARGET_GITHUB_BRANCH}..HEAD`],
        { cwd: __dirname }
      );
      aheadCount = Number(aheadOut.stdout.trim()) || 0;
    } catch {
      aheadCount = 0;
    }

    const authenticatedUrl = `https://x-access-token:${encodeURIComponent(token)}@github.com/${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}.git`;

    await execFileAsync('git', ['push', authenticatedUrl, TARGET_GITHUB_BRANCH], {
      cwd: __dirname,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      timeout: 45000,
    });

    // Update local origin/main tracking ref so ahead count reflects pushed state
    try {
      await execFileAsync('git', ['fetch', authenticatedUrl, TARGET_GITHUB_BRANCH], {
        cwd: __dirname,
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
        timeout: 20000,
      });
      await execFileAsync(
        'git',
        ['update-ref', `refs/remotes/origin/${TARGET_GITHUB_BRANCH}`, 'HEAD'],
        { cwd: __dirname }
      );
    } catch {
      // Non-fatal if remote tracking ref update fails after successful push
    }

    const headOut = await execFileAsync('git', ['rev-parse', '--short', 'HEAD'], { cwd: __dirname });

    return res.json({
      success: true,
      repo: `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO}`,
      branch: TARGET_GITHUB_BRANCH,
      pushedCommits: aheadCount,
      latestCommit: headOut.stdout.trim(),
      message:
        aheadCount > 0
          ? `Successfully pushed ${aheadCount} commit(s) to ${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}).`
          : `${TARGET_GITHUB_OWNER}/${TARGET_GITHUB_REPO} (${TARGET_GITHUB_BRANCH}) is up to date.`,
    });
  } catch (err: any) {
    const rawMsg = err?.stderr || err?.message || 'GitHub push failed.';
    return res.status(500).json({
      success: false,
      error: scrubGitToken(String(rawMsg), token),
    });
  }
});

// Vite Middleware for Dev or Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
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
