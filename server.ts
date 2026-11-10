import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

import { initializeApp as initServerFirebase, getApps as getServerApps } from 'firebase/app';
import {
  getFirestore as getServerFirestore,
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
  limit
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Environment constraint: Dev server must always run on port 3000.
// Cloud Run injects PORT=8080 where nginx runs; binding to 8080 causes EADDRINUSE.
const PORT = 3000;

app.use(express.json());

// Initialize server-side Firestore
const serverApps = getServerApps();
const serverApp = serverApps.length > 0 ? serverApps[0] : initServerFirebase(firebaseConfig, 'companion-server');
const serverDb = getServerFirestore(serverApp, (firebaseConfig as any).firestoreDatabaseId);

// Health check endpoints for platform probes and control plane
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

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

    const response = await getAi().models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const text = response.text || 'No response generated.';
    return res.json({ text });
  } catch (error: any) {
    console.error('Gemini Study Tutor Error:', error);
    const status = error?.status || 500;
    return res.status(status).json({
      error: error?.message || 'Failed to generate study explanation with Gemini AI',
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

// 1. Backend Payment Trigger Function: Check referral, calculate 10%, atomic wallet credit
app.post('/api/partners/process-subscription-payment', async (req, res) => {
  try {
    const { studentId, studentName, plan, amountNaira, paymentGateway, clientPaymentId } = req.body;

    if (!studentId || !plan || typeof amountNaira !== 'number' || amountNaira <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: studentId, plan, and valid positive amountNaira are mandatory',
      });
    }

    const paymentId = clientPaymentId || `PAY_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const sanitizedStudentName = studentName || 'Student Scholar';
    const gateway = paymentGateway || 'Paystack';

    // Step A: Check if student has an active Growth Partner referral
    const referralsRef = collection(serverDb, 'referrals');
    const referralQuery = query(
      referralsRef,
      where('referredUserId', '==', studentId),
      where('status', '==', 'active')
    );
    const referralSnapshot = await getDocs(referralQuery);

    let partnerId: string | null = null;
    let referralDocId: string | null = null;
    let partnerCommissionRate = 10; // Default 10% Lifetime Revenue Share

    if (!referralSnapshot.empty) {
      const activeReferral = referralSnapshot.docs[0];
      referralDocId = activeReferral.id;
      const refPartnerId = activeReferral.data().partnerId;

      if (typeof refPartnerId === 'string' && refPartnerId.trim().length > 0) {
        partnerId = refPartnerId;

        // Fetch partner document to verify status and custom commission rate if any
        const partnerDocRef = doc(serverDb, 'growthPartners', refPartnerId);
        const partnerSnap = await getDoc(partnerDocRef);
        if (partnerSnap.exists()) {
          const pData = partnerSnap.data();
          if (pData.status === 'active') {
            partnerCommissionRate = typeof pData.commissionRatePercent === 'number' ? pData.commissionRatePercent : 10;
          } else {
            // Partner suspended or inactive; do not credit
            partnerId = null;
          }
        }
      }
    }

    // Step B: Calculate 10% Revenue Share Commission
    const commissionAmount = partnerId
      ? Math.round((amountNaira * partnerCommissionRate) / 100)
      : 0;

    const resolvedPartnerId = partnerId;
    const resolvedReferralDocId = referralDocId;

    // Step C: Execute Atomic Firestore Transaction
    await runTransaction(serverDb, async (transaction) => {
      let walletSnap: any = null;
      let partnerSnap: any = null;
      let refSnap: any = null;

      let walletRef: any = null;
      let partnerRef: any = null;
      let refDocRef: any = null;

      if (resolvedPartnerId && resolvedReferralDocId && commissionAmount > 0) {
        // --- ALL READS FIRST ---
        walletRef = doc(serverDb, 'partnerWallets', resolvedPartnerId);
        partnerRef = doc(serverDb, 'growthPartners', resolvedPartnerId);
        refDocRef = doc(serverDb, 'referrals', resolvedReferralDocId);

        walletSnap = await transaction.get(walletRef);
        partnerSnap = await transaction.get(partnerRef);
        refSnap = await transaction.get(refDocRef);
      }

      // --- ALL WRITES AFTER ALL READS ---
      if (resolvedPartnerId && resolvedReferralDocId && commissionAmount > 0 && walletRef && partnerRef && refDocRef) {
        let currentBalance = 0;
        let currentLifetime = 0;
        let currentWithdrawn = 0;

        if (walletSnap && walletSnap.exists()) {
          const wData = walletSnap.data();
          currentBalance = typeof wData.balanceNaira === 'number' ? wData.balanceNaira : 0;
          currentLifetime = typeof wData.lifetimeEarnedNaira === 'number' ? wData.lifetimeEarnedNaira : 0;
          currentWithdrawn = typeof wData.totalWithdrawnNaira === 'number' ? wData.totalWithdrawnNaira : 0;
        }

        const newBalance = currentBalance + commissionAmount;
        const newLifetime = currentLifetime + commissionAmount;

        transaction.set(
          walletRef,
          {
            partnerId: resolvedPartnerId,
            balanceNaira: newBalance,
            lifetimeEarnedNaira: newLifetime,
            totalWithdrawnNaira: currentWithdrawn,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        let currentTotalEarnings = 0;
        if (partnerSnap && partnerSnap.exists()) {
          currentTotalEarnings = partnerSnap.data().totalEarningsNaira || 0;
        }

        transaction.set(
          partnerRef,
          {
            totalEarningsNaira: currentTotalEarnings + commissionAmount,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        let prevVolume = 0;
        let prevCommission = 0;
        if (refSnap && refSnap.exists()) {
          prevVolume = refSnap.data().totalVolumePaidNaira || 0;
          prevCommission = refSnap.data().totalCommissionEarnedNaira || 0;
        }

        transaction.set(
          refDocRef,
          {
            totalVolumePaidNaira: prevVolume + amountNaira,
            totalCommissionEarnedNaira: prevCommission + commissionAmount,
            lastPaymentDate: new Date().toISOString(),
          },
          { merge: true }
        );

        // Create Immutable Revenue Share Receipt
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
          createdAt: new Date().toISOString(),
        });
      }

      // Record Subscription Payment Receipt
      const paymentRef = doc(serverDb, 'subscriptionPayments', paymentId);
      transaction.set(paymentRef, {
        id: paymentId,
        studentId,
        studentName: sanitizedStudentName,
        plan,
        amountNaira,
        paymentGateway: gateway,
        status: 'successful',
        partnerId: resolvedPartnerId || null,
        partnerCommissionCredited: resolvedPartnerId ? true : false,
        commissionAmountNaira: commissionAmount,
        createdAt: new Date().toISOString(),
      });
    });

    console.log(
      `[Revenue Share Trigger] Payment ${paymentId}: ₦${amountNaira} for ${plan}. Partner: ${partnerId || 'None'}. Commission: ₦${commissionAmount}`
    );

    return res.json({
      success: true,
      paymentId,
      hasPartner: Boolean(partnerId),
      partnerId,
      paymentAmountNaira: amountNaira,
      commissionRatePercent: partnerCommissionRate,
      commissionAmountNaira: commissionAmount,
      message: partnerId
        ? `Payment verified. ${partnerCommissionRate}% revenue share (₦${commissionAmount.toLocaleString()}) credited to Growth Partner digital wallet.`
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

    const cleanCode = String(referralCode).trim().toUpperCase();

    // Query partner with this code
    const partnersRef = collection(serverDb, 'growthPartners');
    const partnerQuery = query(partnersRef, where('referralCode', '==', cleanCode));
    const partnerSnap = await getDocs(partnerQuery);

    if (partnerSnap.empty) {
      return res.status(404).json({
        success: false,
        error: `Referral code "${cleanCode}" was not found or is inactive.`,
      });
    }

    const partnerDoc = partnerSnap.docs[0];
    const partner = partnerDoc.data();

    if (partner.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: `Growth Partner account associated with code "${cleanCode}" is not active.`,
      });
    }

    const partnerId = partner.id || partnerDoc.id;

    // Check if referral already exists
    const referralId = `${partnerId}_${studentId}`;
    const referralRef = doc(serverDb, 'referrals', referralId);
    const existingRef = await getDoc(referralRef);

    if (existingRef.exists()) {
      return res.json({
        success: true,
        alreadyLinked: true,
        partnerId,
        partnerName: partner.name,
        message: 'Student is already linked to this Growth Partner.',
      });
    }

    // Create new referral record
    await setDoc(referralRef, {
      id: referralId,
      partnerId,
      referredUserId: studentId,
      referredUserName: studentName || 'Student Scholar',
      referralCodeUsed: cleanCode,
      status: 'active',
      totalVolumePaidNaira: 0,
      totalCommissionEarnedNaira: 0,
      createdAt: new Date().toISOString(),
    });

    // Increment partner activeReferralsCount
    await updateDoc(doc(serverDb, 'growthPartners', partnerId), {
      activeReferralsCount: (partner.activeReferralsCount || 0) + 1,
      updatedAt: new Date().toISOString(),
    });

    return res.json({
      success: true,
      partnerId,
      partnerName: partner.name,
      referralCode: cleanCode,
      message: `Successfully attributed to Growth Partner: ${partner.name}`,
    });
  } catch (error: any) {
    console.error('Error in /api/partners/register-referral:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to bind referral code',
    });
  }
});

// 3. Get or Onboard Growth Partner Profile
app.post('/api/partners/onboard', async (req, res) => {
  try {
    const { partnerId, name, email, phone, bankName, accountNumber, accountName } = req.body;

    if (!partnerId || !name || !email) {
      return res.status(400).json({
        success: false,
        error: 'partnerId, name, and email are required',
      });
    }

    const partnerRef = doc(serverDb, 'growthPartners', partnerId);
    const partnerSnap = await getDoc(partnerRef);

    if (partnerSnap.exists()) {
      return res.json({
        success: true,
        partner: partnerSnap.data(),
        message: 'Existing Growth Partner profile retrieved',
      });
    }

    // Generate unique referral code
    const initials = name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() || 'GP';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `GP-${initials}${randNum}`;

    const newPartner = {
      id: partnerId,
      name,
      email,
      phone: phone || '',
      referralCode,
      commissionRatePercent: 10,
      totalEarningsNaira: 0,
      totalPaidOutNaira: 0,
      activeReferralsCount: 0,
      bankName: bankName || 'Access Bank',
      accountNumber: accountNumber || '0123456789',
      accountName: accountName || name,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await setDoc(partnerRef, newPartner);

    // Initialize partner digital wallet
    const walletRef = doc(serverDb, 'partnerWallets', partnerId);
    await setDoc(walletRef, {
      partnerId,
      balanceNaira: 0,
      lifetimeEarnedNaira: 0,
      totalWithdrawnNaira: 0,
      updatedAt: new Date().toISOString(),
    });

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

    const partnerDoc = await getDoc(doc(serverDb, 'growthPartners', partnerId));
    if (!partnerDoc.exists()) {
      return res.status(404).json({ error: 'Growth Partner profile not found' });
    }

    const walletDoc = await getDoc(doc(serverDb, 'partnerWallets', partnerId));
    const walletData = walletDoc.exists()
      ? walletDoc.data()
      : { balanceNaira: 0, lifetimeEarnedNaira: 0, totalWithdrawnNaira: 0 };

    // Get referrals
    const refQuery = query(collection(serverDb, 'referrals'), where('partnerId', '==', partnerId));
    const refSnap = await getDocs(refQuery);
    const referrals = refSnap.docs.map((d) => d.data());

    // Get recent revenue share transactions
    const txQuery = query(
      collection(serverDb, 'revenueShareTransactions'),
      where('partnerId', '==', partnerId)
    );
    const txSnap = await getDocs(txQuery);
    const transactions = txSnap.docs.map((d) => d.data());

    // Sort transactions client-side by date desc
    transactions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.json({
      success: true,
      partner: partnerDoc.data(),
      wallet: walletData,
      referralsCount: referrals.length,
      referrals,
      transactions: transactions.slice(0, 25),
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

    if (!partnerId || typeof amountNaira !== 'number' || amountNaira <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid partnerId and positive amountNaira are required',
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
