# ₦1,000 Single-Subject "Take Exam" Pass for Secondary School Classes

Affordable micro-pass architecture providing secondary school students (JSS 1 to SS 3) who cannot afford the comprehensive ₦15,000 Prepare for Exam plan with an a la carte **"Take Exam" option at ₦1,000 per subject**, granting full-term access, unlimited CBT retakes, and step-by-step solutions across both the Prepare for Exam unlock modal and CBT examination catalog.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product requirements and parameters were confirmed through Phase 1 clarification:
> - **Access Scope & Duration**: Unlocking a subject for **₦1,000 grants full term access with unlimited retakes** for that subject's CBT drills, past papers, and Chief Examiner explanations.
> - **Placement Locations**: The ₦1,000 option will be prominently presented in two primary locations:
>   1. **Inside the Prepare for Exam Unlock Modal**: As an accessible, budget-friendly tier alongside the full ₦15,000 roadmap pass.
>   2. **Inside CBT Exam Catalogs & Cards (`CBTEngine.tsx`)**: As a direct "Take Exam (₦1,000)" pass on locked subject exam cards with instant single-click checkout.
> - **Universal Subject Availability**: Applicable to **any secondary school subject** (Mathematics, English Language, Biology, Chemistry, Physics, Economics, Government, Civic Education, Basic Science, Agricultural Science, etc.).

---

## 1. Overview & Core Concept

### What It Does
1. **Democratized Assessment Access**: Removes the ₦15,000 barrier for families seeking targeted preparation for a specific upcoming term test, mock exam, or certificate subject (e.g. a student struggling only in Mathematics or preparing for SS 3 WAEC Chemistry).
2. **Flexible Dual-Tier Architecture**:
   - **Full Pass (₦15,000)**: Unlocks the full SC AI daily study timetable across all subjects, ₦4,000 in included tutor credits, and unlimited exams for all subjects.
   - **Single-Subject "Take Exam" Pass (₦1,000 per subject)**: Unlocks that chosen subject with unlimited CBT practice sessions, question matrix, real-time timer, and review explanations for the entire term.
3. **Multi-Channel Checkout**: Supports instant deduction from Parent Digital Wallet (₦1,000), direct Paystack checkout, or Nigerian automated bank transfer with instant verification.

### Target Audience & Persona
- **Nigerian Secondary Students (JSS 1 – SS 3)**: Students needing to drill a specific difficult subject without buying a full-curriculum package.
- **Budget-Conscious Parents**: Parents seeking affordable, immediate academic evaluation tools for their wards at micro-price points.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        "TAKE EXAM" ACCESS FLOWS                        │
│                                                                        │
│   ENTRY POINT 1: Prepare For Exam Modal                                │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ Choose Your Exam Prep Access:                                │     │
│   │ [ Full ₦15k Pass ]        [ ₦1,000 Single Subject Pass (NEW) ]│     │
│   │ - All subjects            - Pick 1 subject from dropdown     │     │
│   │ - Timetable + ₦4k tutor   - Full term access & retakes       │     │
│   └───────────────────────────┬──────────────────────────────────┘     │
│                               │                                        │
│   ENTRY POINT 2: CBT Engine   ▼                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ Mathematics (SS 2 Term Mock)                                 │     │
│   │ Status: Locked                                               │     │
│   │ [ Take Exam · ₦1,000 ] ────► Instant Checkout Modal          │     │
│   │                              - Parent Wallet (₦1,000)        │     │
│   │                              - Paystack / Bank Transfer      │     │
│   └───────────────────────────┬──────────────────────────────────┘     │
│                               │                                        │
│                               ▼                                        │
│                  ┌─────────────────────────────┐                       │
│                  │ Instant Subject Activation  │                       │
│                  │ - Saved to AppContext & DB  │                       │
│                  │ - "Unlocked · Retakes Free" │                       │
│                  │ - Direct Launch to CBT Exam │                       │
│                  └─────────────────────────────┘                       │
└────────────────────────────────────────────────────────────────────────┘
```

### Visual & Layout Discipline
- **Zero Pill / No Candy Badges**: Unlocked status displayed as clean typography with subtle dot separators (`Mathematics · Term Pass Active · Unlimited Retakes`).
- **Clear Value Contrast**: The modal clearly highlights:
  - *Full Pass*: ₦15,000 (All subjects + Timetable + ₦4,000 tutor credits).
  - *Single Subject Pass*: ₦1,000 (Full-term exam access for 1 selected subject).
- **Subject Selector**: Clean, searchable or scrollable dropdown/chip grid displaying all official secondary subjects with class level indicators.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Unlimited Retakes for the Entire Term
- **Chosen Approach**: Once a student pays ₦1,000 for a subject, they can take and retake any exams in that subject as many times as they want during the term.
- **Why**: Cognitive learning in secondary school requires repetition and mistake-review. Limiting ₦1,000 to a single sitting would penalize students whose device batteries die or who need to practice multiple times to achieve mastery.

### Decision 2: Synergistic Full Pass Upgrades
- **Chosen Approach**: If a student already paid for 1 or 2 single-subject passes and later decides to unlock the full ₦15,000 plan, the full pass seamlessly covers all remaining subjects and activates the daily timetable.
- **Why**: Keeps the pricing model fair, transparent, and additive without friction.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA & STATE ARCHITECTURE                       │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                     ExamPrepState Interface                  │     │
│   │  isUnlocked: boolean                (Full ₦15k pass)         │     │
│   │  unlockedSubjectExams: string[]     (List of unlocked subs)  │     │
│   │  tutorCreditsNaira: number                                   │     │
│   │  completedBlockIds: string[]                                 │     │
│   └──────────────────────────────┬───────────────────────────────┘     │
│                                  │                                     │
│                                  ▼                                     │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                      AppContext Methods                      │     │
│   │  - unlockSingleSubjectExam(subject: string, paymentMethod)   │     │
│   │  - isSubjectExamUnlocked(subject: string): boolean           │     │
│   │    => returns true if isUnlocked OR in unlockedSubjectExams  │     │
│   └──────────────────────┬───────────────────────┬───────────────┘     │
│                          │                       │                     │
│                          ▼                       ▼                     │
│   ┌──────────────────────────────┐   ┌───────────────────────────┐     │
│   │  ExamPrepUnlockModal.tsx     │   │  CBTEngine.tsx            │     │
│   │  - Dual tier switcher        │   │  - Unlocked badge checks  │     │
│   │  - ₦15k vs ₦1k subject pick  │   │  - "Take Exam · ₦1,000"   │     │
│   │  - Wallet/Paystack/Transfer  │   │  - Quick single-sub modal │     │
│   └──────────────────────────────┘   └───────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model Updates
1. **`src/types/index.ts`**:
   Extend `ExamPrepState`:
   ```typescript
   export interface ExamPrepState {
     isUnlocked: boolean;
     unlockedAt?: string;
     tutorCreditsNaira: number;
     diagnosticProfile?: DiagnosticProfile;
     activeCalendar?: StudyCalendar | null;
     completedBlockIds: string[];
     unlockedSubjectExams?: string[]; // Array of subject names unlocked via ₦1,000 pass
   }
   ```
2. **`src/data/examPrepCurriculumData.ts`**:
   ```typescript
   export const UNLOCK_FEE_NAIRA = 15000;
   export const SINGLE_SUBJECT_EXAM_FEE_NAIRA = 1000;
   ```

---

## 5. Execution Steps

1. **State & Types (`src/types/index.ts` & `src/data/examPrepCurriculumData.ts`)**:
   - Add `unlockedSubjectExams?: string[]` to `ExamPrepState`.
   - Export `SINGLE_SUBJECT_EXAM_FEE_NAIRA = 1000`.
2. **Context Engine (`src/context/AppContext.tsx`)**:
   - Implement `unlockSingleSubjectExam(subject: string)` with parent wallet deduction, mock payment handling, haptic/audio confirmation, and persistence.
   - Implement `isSubjectExamUnlocked(subject: string): boolean` helper checking both full pass and subject array.
3. **Enhance Prepare For Exam Modal (`src/components/student/exam-prep/ExamPrepUnlockModal.tsx`)**:
   - Add a segmented toggle:
     - `[ Full Prepare For Exam Pass · ₦15,000 ]`
     - `[ Single Subject 'Take Exam' Pass · ₦1,000 ]`
   - In Single Subject mode, provide an intuitive subject selector dropdown with the student's class subjects.
   - Update payment summary to ₦1,000 with Wallet, Bank Transfer, and Paystack options.
4. **CBT Engine Integration (`src/components/student/CBTEngine.tsx`)**:
   - Evaluate whether each exam's subject is unlocked via `isSubjectExamUnlocked(exam.subject)`.
   - If locked, render a high-visibility button: **"Take Exam (₦1,000)"**.
   - Clicking opens the single-subject unlock checkout pre-filled with that exam's subject.
   - If unlocked, render standard **"Start CBT (Unlocked)"** with instant launch.
5. **Verification & Quality Gate**:
   - Run `compile_applet` and `lint_applet` together.
   - Verify purchase flow with Parent Wallet balance and Bank Transfer.
   - Confirm unlocked subjects persist across page reloads.
