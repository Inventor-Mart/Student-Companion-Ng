# Unified SC AI Brand Identity Across All Application Features

Comprehensive brand alignment replacing all generic "AI" mentions, "Ask AI", and external "Gemini" references with Student Companion's native **"SC AI"** brand across all navigation bars, dashboards, exam preparation hubs, uniform verification modals, and marketing pages.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following brand guidelines were confirmed through Phase 1 clarification:
> - **Compact Label Standardization**: Use **"SC AI Coach"** and **"SC AI Drill"** consistently across all bottom navigation tabs, quick action buttons, and mobile chips to guarantee zero layout wrapping or truncation.
> - **100% Proprietary Brand Identity**: Eradicate all user-facing mentions of "Gemini", "Gemini AI", or "Powered by Gemini". Every intelligent capability is presented strictly under the proprietary **"SC AI"** umbrella.

---

## 1. Overview & Core Concept

### What It Does
Audits and refactors every user-facing label, header, tooltip, button, and description across the application to project an authoritative, unified Nigerian educational technology brand:
1. **SC AI Study Coach**: Replaces "Gemini AI Study Coach" and "AI Coach" across the chat interface, curriculum reader, and syllabus explainers.
2. **SC AI Drill Sergeant**: Replaces "AI Drill Sergeant" and "AI Drill" across the University Aspirant Dashboard, daily high-yield schedules, and subscription tiers.
3. **SC AI Daily Study Calendar**: Replaces "AI Daily Study Calendar" and "Daily AI Timetable" across the JSS 1–SS 3 Exam Prep Hub, diagnostic quiz, and parent payment cards.
4. **SC AI Uniform Verification**: Replaces generic "AI Uniform Verification" and "Our AI verifies..." in the camera badge scanner.
5. **SC AI Diagnostic Profiler**: Replaces "AI Diagnostic Profiler" in syllabus diagnostic tests.
6. **SC AI Powered**: Replaces "Gemini AI Powered" in landing pages, growth partner invitations, and footer badges.

---

## 2. User Experience & Visual Design

### Feature Branding Matrix

```
┌─────────────────────────────────┬───────────────────────────────┬─────────────────────────────┐
│ Current Generic / Model Label   │ Target SC AI Unified Brand    │ Primary Locations           │
├─────────────────────────────────┼───────────────────────────────┼─────────────────────────────┤
│ Gemini AI Study Coach           │ SC AI Study Coach             │ AiStudyCoach, SchemeOfWork  │
│ AI Coach (Nav / Button)         │ SC AI Coach                   │ StudentBottomNav, Hubs      │
│ AI Drill Sergeant / AI Drill    │ SC AI Drill Sergeant / Drill  │ AspirantDashboard, BottomNav│
│ AI Daily Study Calendar         │ SC AI Daily Study Calendar    │ PrepareForExamHub, Parent   │
│ AI Uniform Verification         │ SC AI Uniform Verification    │ StudentDashboard, Camera    │
│ AI Diagnostic Profiler          │ SC AI Diagnostic Profiler     │ DiagnosticQuizModal         │
│ Gemini AI Powered (Badge)       │ SC AI Powered                 │ KnowMorePage, Landing       │
│ Ask AI Coach                    │ Ask SC AI Coach               │ AiStudyCoach action button  │
└─────────────────────────────────┴───────────────────────────────┴─────────────────────────────┘
```

### Visual & Layout Discipline
- **Zero Pill / No Candy Badges**: Labels integrate seamlessly into the domain typography using clean unboxed text and subtle typographic dividers (`SC AI Study Coach · 24/7 Syllabus Solver`).
- **Touch Targets & Single-Line Navigation**: Bottom navigation item labels (`SC AI Coach`, `SC AI Drill`) remain compact to preserve 48px touch targets without horizontal text wrapping on small mobile viewports.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Proprietary "SC AI" Brand Over Generic AI or External Models
- **Chosen Approach**: All features use "SC AI" (e.g. SC AI Coach, SC AI Drill, SC AI Profiler).
- **Why**: White-labeling the intelligence engine under Student Companion builds strong brand equity, institutional trust among Nigerian secondary schools and parents, and eliminates generic "AI slop" or confusion about external vendors.
- **Alternatives Considered**: Retaining "Gemini AI" branding (risks looking like a raw tech wrapper rather than an end-to-end Nigerian educational platform).

### Decision 2: Dual Full/Compact Label Hierarchy
- **Chosen Approach**: Full descriptive titles in page headers and modal banners (e.g., *SC AI Study Coach*, *SC AI Drill Sergeant*), with succinct labels on mobile tabs and buttons (*SC AI Coach*, *SC AI Drill*).
- **Why**: Maximizes cognitive clarity without crowding high-density thumb-zone navigation.

---

## 4. Technical Architecture & File Modification Scope

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SC AI BRAND REFACTOR SCOPE                      │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ Student Core Navigation & Header                             │     │
│   │ - StudentBottomNav.tsx ('SC AI Coach', 'SC AI Drill')        │     │
│   │ - StudentDashboard.tsx ('SC AI Uniform', 'SC AI Calendar')   │     │
│   │ - SchemeOfWorkHub.tsx ('SC AI Coach' explainer button)       │     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                  │                                     │
│   ┌──────────────────────────────┴───────────────────────────────┐     │
│   │                                                              │     │
│   ▼                                                              ▼     │
│ ┌─────────────────────────────┐    ┌─────────────────────────────────┐ │
│ │ University Aspirant Hub     │    │ Exam Prep & Diagnostic Modules  │ │
│ │ - AspirantDashboard.tsx     │    │ - PrepareForExamHub.tsx         │ │
│ │   ('SC AI Drill Sergeant')  │    │   ('SC AI Daily Study Calendar')│ │
│ │ - AspirantSubscriptionModal │    │ - DiagnosticQuizModal.tsx       │ │
│ │   ('SC AI 24/7 Coaching')   │    │   ('SC AI Diagnostic Profiler') │ │
│ └─────────────────────────────┘    │ - ExamPrepUnlockModal.tsx       │ │
│                                    │ - AIUniformVerification.tsx     │ │
│                                    │   ('SC AI Uniform Verification')│ │
│                                    └─────────────────────────────────┘ │
│                                  │                                     │
│   ┌──────────────────────────────┴───────────────────────────────┐     │
│   │ Portals & Public Pages                                       │     │
│   │ - AiStudyCoach.tsx ('SC AI Study Coach', 'Ask SC AI Coach')  │     │
│   │ - KnowMorePage.tsx ('SC AI Powered', 'SC AI Study Coach')    │     │
│   │ - ParentPortal.tsx ('SC AI Daily Timetable')                 │     │
│   │ - GrowthPartnerPortal.tsx ('SC AI tutoring')                 │     │
│   └──────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Execution Steps

1. **AI Study Coach Module (`src/components/student/AiStudyCoach.tsx`)**:
   - Replace "Gemini AI Study Coach" title with **"SC AI Study Coach"**.
   - Update prompt placeholder and action button to **"Ask SC AI Coach"**.
   - Update error states and loading tips to reference SC AI.
2. **Navigation Tabs (`src/components/student/StudentBottomNav.tsx`)**:
   - Update `label: 'AI Coach'` $\to$ **`label: 'SC AI Coach'`** (for both Senior and Aspirant navigation).
   - Update `label: 'AI Drill'` $\to$ **`label: 'SC AI Drill'`**.
3. **University Aspirant Hub (`AspirantDashboard.tsx` & `AspirantSubscriptionModal.tsx`)**:
   - Update "AI Drill Sergeant: Today's High-Yield Schedule" $\to$ **"SC AI Drill Sergeant: Today's High-Yield Schedule"**.
   - Update "Unlock 24/7 AI Drill Plan" $\to$ **"Unlock 24/7 SC AI Drill Plan"**.
   - Update "AI Explanation Review" $\to$ **"SC AI Explanation Review"**.
   - Update subscription modal benefit bullets to reference "SC AI Study Coach 24/7" and "SC AI Drill Sergeant".
4. **Exam Prep Hub & Diagnostic Profiler (`PrepareForExamHub.tsx`, `DiagnosticQuizModal.tsx`, `ExamPrepUnlockModal.tsx`)**:
   - Update header and benefit cards to **"SC AI Daily Study Calendar & Tutor Booking"**.
   - Update "AI Diagnostic Profiler" $\to$ **"SC AI Diagnostic Profiler"**.
   - Update "Daily AI Timetable" $\to$ **"Daily SC AI Timetable"**.
5. **AI Uniform Verification Scanner (`AIUniformVerification.tsx` & `StudentDashboard.tsx`)**:
   - Update title and prompt to **"SC AI Uniform Verification"** and "Our SC AI verifies your school uniform...".
   - Update scanning overlay status text to reference SC AI verification.
6. **Curriculum Scheme of Work (`SchemeOfWorkHub.tsx`)**:
   - Update topic explanation button: "Ask SC AI Study Coach to explain this topic" / **"SC AI Coach"**.
7. **Parent & Partner Portals & Landing Pages (`ParentPortal.tsx`, `GrowthPartnerPortal.tsx`, `KnowMorePage.tsx`)**:
   - Update "Prepare For Exam · AI Daily Timetable" $\to$ **"Prepare For Exam · SC AI Daily Timetable"**.
   - Update growth partner invite copy to reference **"SC AI tutoring"**.
   - Update KnowMorePage feature cards: "Gemini AI Study Coach" $\to$ **"SC AI Study Coach"**, "Gemini AI Powered" $\to$ **"SC AI Powered"**.
8. **Verification & Quality Gate**:
   - Run `compile_applet` and `lint_applet` together to verify zero syntax/type regressions.
   - Verify all viewports render single-line labels without overflow.
