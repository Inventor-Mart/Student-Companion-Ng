# Student Companion: Complete AI Studio Master Implementation Plan

This document serves as the master specification for "vibe coding" the Student Companion EdTech platform using Google AI Studio. It contains all context, screen lists, database requirements, and step-by-step instructions to generate the codebase in 14 days.

## 1. Project Context & Tech Stack
* **Target Audience:** Nigerian secondary school students (JSS1-SS3), WAEC, NECO, JAMB, PUTME candidates, alongside their Parents, Tutors, and Schools.
* **Core Goal:** An offline-first, gamified learning app and tutoring marketplace.
* **UI/UX Vibe:** Deep Navy Blue/Indigo (trust) + Electric Orange/Lime Green (youthful energy). Fonts: Poppins (Headers) & Roboto/Inter (Body).
* **Tech Stack:** Flutter/React Native (Cross-platform App + PWA), Supabase/Firebase (Backend/Auth), SQLite/Isar (Offline Local Storage), Node.js (Edge Functions for Payments/AI).

## 2. Complete Screen Breakdown

### A. Authentication & Onboarding
1. **Splash Screen:** Animated logo, loading offline database chunks.
2. **Role Selection:** "I am a: Student / Parent / Tutor / School Admin".
3. **Login / Sign Up:** Email/Password, Google OAuth, Phone Number OTP.
4. **Student Profile Setup:** Name, Class (JSS1-SS3), Interests.
5. **AI Uniform Verification Screen:** Camera UI prompting the student to take a selfie in their school uniform to instantly earn bonus XP.

### B. Student App Experience
6. **Main Dashboard:**
    * Top Bar: Avatar, Current Rank (Fresher -> Scholar -> Prefect -> Senior Boy/Girl), Total XP, Daily Streak 🔥.
    * Offline Toggle: Clear indicator of offline availability.
    * "Jump Back In": Resume last read note or quiz.
    * Banners: Weekly challenges and Referral Links.
7. **Syllabus / Scheme of Work Hub:** Expandable list of subjects -> topics -> subtopics.
8. **Lesson Note Reader:** Distraction-free reading, dark/light mode, embedded media, "Take Quiz" CTA at the bottom.
9. **CBT Quiz Engine:** WAEC/JAMB format simulator. Timer top right, grid of questions, Previous/Next buttons, Submit.
10. **Gamification & Leaderboard:** Global, Termly, and Inter-School leaderboards. "Student of the Week" spotlight.
11. **Games Hub:** Simple educational games (Math Runner, Spelling Bee) unlocked using XP.
12. **Tutor Marketplace - Discovery:** Search bar, subject filters, location (online/offline).
13. **Tutor Profile:** Bio, rating, reviews, hourly rate, "Book Tutor" button.
14. **Booking Flow:** Select date/time, topic, and type (physical/online). Sends request to Parent Dashboard for approval.

### C. Parent & Tutor Portals
15. **Parent Dashboard (PIN Protected):** Overview of child's XP, quiz scores, and time spent.
16. **Parent Wallet & Payments:** Paystack/Flutterwave integration to fund wallet for subscriptions and tutor bookings.
17. **Parent Approvals View:** Accept/Reject physical tutor requests.
18. **Tutor Dashboard:** Earnings overview, upcoming sessions calendar, incoming requests.
19. **In-App Messaging:** Secure chat between Tutor and Student (phone numbers masked).

## 3. Database Schema Overview

| Entity | Primary Attributes & Schema Structure |
| :--- | :--- |
| **Users** | id, role (student/parent/tutor/admin), name, email, phone, avatar_url, created_at |
| **Students** | user_id, parent_id, class_level, xp, rank, uniform_verified (boolean), streak |
| **Content** | Subjects, Topics, LessonNotes (Markdown/HTML), Quizzes (JSON array of Q&A), SchemeOfWork |
| **Tutoring** | Tutors (user_id, subjects, rate, location, kyc_status), Bookings (student_id, tutor_id, status, type, parent_approved, payment_escrow) |

## 4. The 14-Day Vibe Coding Prompts (Google AI Studio)

### Phase 1: Foundation (Days 1–4)
* **Day 1 (Architecture):** "Generate the Flutter project structure, configure Supabase auth, and build the Login/Signup screens with state management for Student/Parent/Tutor roles."
* **Day 2 (Local DB):** "Write a Flutter SQLite/Isar implementation to download and cache JSON lesson notes and scheme of work for JSS1-SS3 offline viewing."
* **Day 3 (UI Dashboard):** "Build the Student Dashboard in Flutter using Navy Blue and Electric Orange. Include an XP progress bar, Daily Streak flame, and a 'Jump Back In' card."
* **Day 4 (Syllabus/Notes UI):** "Create the Scheme of Work list view and the distraction-free Lesson Note Reader screen. Feed the 2nd-Term JSON data to render dynamically."

### Phase 2: Core Engines (Days 5–8)
* **Day 5 (CBT Quiz Engine):** "Build a CBT Quiz interface mimicking JAMB/WAEC. Include a countdown timer, question grid navigation, and automatic scoring."
* **Day 6 (Gamification Logic):** "Write the backend triggers and frontend logic to award XP upon quiz completion. Implement Nigerian school ranks based on XP thresholds."
* **Day 7 (AI Verification):** "Integrate Google Gemini Vision API. Build a camera screen where students upload a selfie, and the API checks for a school uniform to award 500 bonus XP."
* **Day 8 (Leaderboards & Games):** "Generate the SQL queries and UI for 'Student of the Week' and Termly Leaderboards. Scaffold a basic HTML5/Flutter math mini-game unlocked by XP."

### Phase 3: The Marketplace (Days 9–12)
* **Day 9 (Parent Portal & Payments):** "Build the PIN-protected Parent Dashboard. Integrate Paystack/Flutterwave API to simulate funding a wallet and buying subscriptions."
* **Day 10 (Tutor Discovery):** "Build the Tutor Search UI with filters for subject and location. Create the Tutor Profile screen showing ratings and availability."
* **Day 11 (Booking & Approvals):** "Implement the Tutor Booking flow. Create a Supabase database trigger that routes physical booking requests to the Parent Dashboard for approval."
* **Day 12 (Partners & Referrals):** "Generate the referral code logic (Student A refers Student B -> both get XP/Wallet credit). Scaffold basic School Partner analytics views."

### Phase 4: Polish & Launch (Days 13–14)
* **Day 13 (Edge Cases):** Prompt AI Studio with specific error logs or state issues (e.g., "Fix offline sync bug when reconnecting to Wi-Fi", "Optimize image loading").
* **Day 14 (Deploy):** "Generate the required manifest files, App Store/Play Store meta descriptions, and deployment scripts for Vercel (PWA) and Android APK."