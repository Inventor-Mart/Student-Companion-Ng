import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

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

    const response = await ai.models.generateContent({
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

    const response = await ai.models.generateContent({
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

// Vite Middleware for Dev or Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
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
