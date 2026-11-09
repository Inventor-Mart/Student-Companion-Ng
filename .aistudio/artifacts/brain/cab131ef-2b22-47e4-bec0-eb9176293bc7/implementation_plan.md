# University Aspirant Hub (WAEC, NECO & JAMB School Leavers)

A dedicated, goal-oriented learning class and countdown dashboard tailored specifically for secondary school leavers preparing for **JAMB UTME, WAEC (WASSCE), and NECO SSCE** to secure university admission in Nigeria.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **New Class Classification**: Added as a first-class selection (`University Aspirant`) in the class level switcher, transforming the student interface into a countdown-driven **Aspirant Hub**.
> - **Countdown Architecture**: Shifts from traditional 13-week secondary school terms to backward-counting exam timelines (`Days left until JAMB UTME / WAEC / NECO`).
> - **Three-Tier Subscription Model**:
>   - **Free (The Hook)**: 2 recent years of past questions, formulas unlocked, leaderboard view-only.
>   - **Aspirant Basic (₦5,000/mo)**: 15+ years past questions (2008–present), full topic notes, unlimited topical CBT simulator.
>   - **Aspirant Elite (₦10,000/mo)**: 24/7 AI Coach, "Prepare for Exam" AI drill sergeant daily timetable, National Weekend Mock Tournaments with cash/airtime prizes.

---

## 1. Overview & Core Concept

- **What It Does**: Provides Nigerian school leavers who have graduated secondary school but haven't yet gained university admission with a high-stakes, time-sensitive prep ecosystem.
- **Target Persona**: Aspirants retaking or aiming for top scores in JAMB UTME (280+ target), WAEC GCE/WASSCE, or NECO, competing for competitive courses (Medicine, Law, Engineering, Nursing, Computer Science) across Nigerian federal and state universities.
- **Core Loop**:
  $$\text{Select 4 UTME Subjects} \longrightarrow \text{Read Summary Note} \longrightarrow \text{Topical CBT Practice} \longrightarrow \text{Review AI Explanations} \longrightarrow \text{National Weekend Mock}$$

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Aspirant Onboarding & Goal Setup**:
   - Aspirant selects `University Aspirant` from class options.
   - Sets target exams: **JAMB UTME** (Official Date: April 2026), **WAEC** (May 2026), **NECO** (June 2026).
   - Inputs target Nigerian university (e.g., UNILAG, UI, OAU, ABU, UNN, UNIBEN) and desired course (e.g., Medicine & Surgery, Law, Mechanical Engineering, Software Engineering).
   - Selects 4 JAMB subject combination (English + 3 electives).

2. **Goal-Oriented Countdown Dashboard**:
   - Giant backward-counting digital calendar showing exact days, hours, and minutes remaining until the first target exam.
   - Target Score Tracker (e.g. `Current Average: 245 / Target: 310`).
   - Daily "Drill Sergeant" Study Blocks: 2 reading sessions, 1 topical CBT drill, 1 past question speed test.

3. **JAMB CBT Simulator Engine**:
   - Strict reproduction of actual JAMB Computer Based Test interface:
     - Top timer counting down from 2 hours.
     - 4-subject navigation tabs (Use of English 60 questions, Subjects 2–4 with 40 questions each = 180 total questions).
     - Color-coded question matrix grid: Green (Answered), Slate (Unanswered), Purple (Flagged for Review), Amber (Active).
     - Muscle-memory keyboard hotkeys (`A, B, C, D` for options, `N` for Next, `P` for Previous, `R` for Review, `S` for Submit).

4. **Admission & University Guide Hub**:
   - Searchable directory of Nigerian Federal, State, and accredited private universities.
   - Departmental cut-off marks (Merit, Catchment, ELDS) for top courses.
   - Official JAMB Brochure subject combination checker (prevents disqualification mistakes).
   - Post-UTME screening formats and past format drill links.

5. **National Weekend Mock Tournaments**:
   - Replacing termly school competitions for aspirants.
   - Every Saturday/Sunday: Timed 4-subject UTME mock taken simultaneously by aspirants nationwide.
   - Live national leaderboard with state and university faculty filters.
   - Top 10 scorers win airtime (₦2,000–₦5,000) or cash data subsidies.

6. **Tiered Monthly Subscription Switcher**:
   - Clean Nigerian checkout (Paystack, Bank Transfer, Parent Wallet) for:
     - **Free Tier**
     - **Aspirant Basic (₦5,000/month)**
     - **Aspirant Elite (₦10,000/month)**
   - Includes feature comparison table with zero-pill visual discipline.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Integration with Existing Class Architecture vs Separate App**
  - *Chosen Approach*: Add `University Aspirant` directly into `NigerianClassLevel` (`JSS 1` - `SS 3` + `University Aspirant`).
  - *Why*: Allows seamless switching without data loss. Students finishing SS 3 naturally transition to Aspirant with their XP, streak, and wallet intact.
- **Decision 2: 4-Subject UTME Architecture**
  - *Chosen Approach*: Aspirant profiles store `targetJambSubjects: [string, string, string, string]`, automatically configuring their daily drills and full 180-question mock exams.
- **Decision 3: Drill Sergeant AI Persona**
  - *Chosen Approach*: The AI coach adopts a focused, disciplined tone calibrated for competitive exam success (identifying weak topics like Organic Chemistry, Coordinate Geometry, Concord).

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             AppContext.tsx                                  │
│  - student.classLevel: 'University Aspirant'                                │
│  - aspirantProfile: { targetUniversity, targetCourse, targetJambSubjects,   │
│                       examDates: { jamb, waec, neco }, tier: 'free'|'basic'|'elite' }│
│  - aspirantMocks: WeekendMockTournament[]                                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│  AspirantDashboard    │   │  AspirantCBTEngine    │   │   UniversityGuideHub  │
│  - Countdown Timer    │   │  - Real JAMB Matrix   │   │  - Cut-Off Marks      │
│  - Drill Sergeant AI  │   │  - 4-Subject Tabs     │   │  - Subject Combinator │
│  - Daily Plan Blocks  │   │  - 15+ Yrs Database   │   │  - Post-UTME Tips     │
└───────────────────────┘   └───────────────────────┘   └───────────────────────┘
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       ▼
                    ┌───────────────────────────────────────┐
                    │       AspirantTierModal.tsx           │
                    │  - Free vs Basic vs Elite             │
                    │  - Monthly Paystack / Bank Transfer   │
                    └───────────────────────────────────────┘
```

### Affected Components & Modules
1. `src/types/index.ts`: Extend `NigerianClassLevel` with `'University Aspirant'`, add `AspirantProfile`, `AspirantTier`, `UniversityAdmissionInfo`.
2. `src/data/universityAdmissionData.ts`: Database of Nigerian universities (UNILAG, UI, OAU, ABU, UNN, UNIBEN, LASU, FUTA, etc.), cut-off marks, and JAMB subject combinations.
3. `src/data/cbtExamData.ts`: Expand 15+ years of WAEC, NECO, and JAMB past questions across core subjects.
4. `src/components/student/aspirant/AspirantDashboard.tsx`: Goal-oriented countdown dashboard and Drill Sergeant daily study plan.
5. `src/components/student/aspirant/AspirantCBTSimulator.tsx`: Genuine 4-subject JAMB UTME exam engine with question matrix and timer.
6. `src/components/student/aspirant/UniversityAdmissionGuide.tsx`: Cut-off marks and subject combination verification.
7. `src/components/student/aspirant/NationalMockTournaments.tsx`: High-stakes weekend mock tournament with live leaderboard.
8. `src/components/student/aspirant/AspirantSubscriptionModal.tsx`: Monthly plan selection (Free, Basic ₦5k, Elite ₦10k) with Paystack and Bank Transfer.
9. `src/components/student/ClassSelectorModal.tsx` & `src/components/student/StudentDashboard.tsx`: Support Aspirant class switching and dynamic hub rendering.

## Implementation Complete
- [x] All 10 phases successfully implemented, integrated, and verified.
- [x] Compilation and TypeScript linting passed with 0 errors.
- [x] Dev server restarted and fully operational.
