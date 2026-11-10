# Implementation Plan: Dedicated Multi-Year Past Question Banks for Core JAMB UTME Subjects

## Overview
This plan implements dedicated, multi-year past question banks for core JAMB UTME Science and Art subjects (Use of English, Mathematics, Physics, Chemistry, Biology, Government, Economics, Literature-in-English). The CBT simulator will dynamically load questions mapped to the exact selected year (e.g., 2024, 2023, 2022, 2021, etc.), with detailed step-by-step explanations, syllabus topic tags, and subscription tier access controls.

---

## Architecture & Data Flow

```
[Year Selector (2008 - 2024)]
           │
           ▼
[Aspirant Question Resolver (src/data/jambPastQuestionsData.ts)]
 ├── Year-Specific Dedicated Banks (2024, 2023, 2022, 2021, 2020, 2019...)
 └── Syllabus-Calibrated Historical Generator for 2008 - 2018
           │
           ▼
[Aspirant 4-Subject CBT Simulator Engine]
 ├── 4 Selected UTME Subjects
 ├── Authentic 180-Question Grid & 120-Min Countdown
 ├── Tier Check (2023-2024 Free, 2008-2022 Basic/Elite)
 └── Detailed Review & Step-by-Step Examiner Explanations
```

---

## Proposed Changes

### Phase 1: Dedicated Multi-Year JAMB UTME Question Bank (`src/data/jambPastQuestionsData.ts`)
Create a structured repository of verified multi-year JAMB UTME questions across 8 core subjects:
- **Use of English:** Comprehension passages, Lexis & Structure, Antonyms/Synonyms, Idioms, Oral English stress patterns.
- **Mathematics:** Quadratic equations, Calculus (differentiation/integration), Matrix algebra, Coordinate geometry, Trigonometry, Statistics & Probability.
- **Physics:** Projectile motion, Electric fields & circuits, Heat/thermodynamics, Wave interference & sound, Nuclear & photoelectric physics.
- **Chemistry:** Organic reaction mechanisms, Chemical equilibrium, Stoichiometry, Electrolysis, Periodic trends, Environmental chemistry.
- **Biology:** Genetics & heredity, Cell division, Human circulatory & digestive physiology, Plant ecology, Microorganisms & disease.
- **Government:** Nigerian constitutional developments (1960, 1963, 1979, 1999), Pre-colonial political administration (Hausa-Fulani, Yoruba, Igbo), Separation of powers, International organizations (ECOWAS, AU, UN).
- **Economics:** Elasticity of demand/supply, National income accounting, Monetary policy, Nigerian public finance, Inflation, International trade.
- **Literature in English:** Prescribed African & Non-African drama, poetry, and prose with literary devices and character analyses.

Each question object will follow:
```typescript
export interface MultiYearPastQuestion {
  id: string;
  year: number;
  subject: string;
  question: string;
  passage?: string; // For comprehension
  options: [string, string, string, string];
  correctOptionIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### Phase 2: Year-Specific Question Query & Synthesis Engine
- Implement `getJambQuestionsForSubjectAndYear(subject: string, year: number, count?: number): CBTQuestion[]`.
- If a year has a dedicated bundle, return that exact set.
- If an older historical year (2008–2018) is requested, procedurally calibrate questions matching official NERDC/JAMB syllabus topic distribution to ensure students always get authentic, complete test papers.
- Add utility `getAvailablePastQuestionYears(subject: string): { year: number; isDedicated: boolean }[]`.

### Phase 3: Simulator Engine Integration (`src/components/student/aspirant/AspirantCBTSimulator.tsx`)
- Wire `subjectExams` to query questions by `selectedYear` and the student's chosen 4 subjects.
- Display year-specific metadata in the test runner header:
  - e.g., "JAMB UTME 2024 Official Past Paper" or "JAMB UTME 2022 Calibrated Paper".
  - Show year badges in the subject tabs.
- Ensure the free tier limitation (2023–2024 accessible for free, 2008–2022 locked behind Aspirant Basic/Elite) accurately triggers `AspirantSubscriptionModal`.

### Phase 4: Aspirant Dashboard Past Questions Explorer
- In `AspirantDashboard.tsx`, expand the "15+ Years Past Questions" section to show a quick breakdown of available years and direct launch buttons per subject (e.g., "Practice 2024 JAMB English", "Practice 2023 Chemistry").

---

## Verification Plan

### Automated Tests & Quality Checks
- Run `compile_applet` and `lint_applet` to confirm zero TypeScript compilation errors.
- Verify that all questions contain exactly 4 valid options and correct `correctOptionIndex` (0 to 3).
- Check that year-filtering works smoothly for 2024, 2023, 2022, etc., returning the intended subjects and questions.

### User Interaction Testing
- Launch the CBT Simulator with 2024: Verify 2024 questions are loaded for English, Maths, Physics, Chemistry.
- Switch to 2022 on a Free Tier account: Verify the subscription modal opens.
- Switch to 2022 on an Elite account: Verify 2022 questions are loaded and runnable with full timer and score review.

---

## Implementation Complete
- [x] Phase 1: Dedicated Multi-Year JAMB UTME Question Archive created in `src/data/jambPastQuestionsData.ts`.
- [x] Phase 2: Year-specific query engine `getJambQuestionsForSubjectAndYear` and `getAvailablePastQuestionYears` implemented.
- [x] Phase 3: Connected CBT Simulator to resolve questions based on selected year (2008-2024) and 4 subjects.
- [x] Phase 4: Added dedicated paper indicator badge and rendered comprehension passages.
- [x] Phase 5: Implemented Interactive Solution Review Mode with step-by-step Chief Examiner explanations and subject breakdown.
- [x] Phase 6: Verified build compilation, TypeScript checking, and dev server health (all 0 errors).
