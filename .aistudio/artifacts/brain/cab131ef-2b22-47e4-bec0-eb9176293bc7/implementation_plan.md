# Cloud Firestore Past Questions Storage & Educator Past Question Importer

Architecture and implementation plan to store thousands of authentic JAMB, WAEC, and NECO past questions in Cloud Firestore with on-demand client streaming, hybrid offline fallback caching for the CBT Simulator, and a dedicated PIN-gated Educator/Admin Importer Portal supporting bulk JSON uploads and smart text auto-parsing.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed through Phase 1 clarification:
> - **Portal Location**: Dedicated Educator & Admin Portal tab accessible from the navigation bar, secured with a customizable security PIN gate (default `2026` or administrator email).
> - **Bulk Ingestion Formats**: Dual-engine ingestion supporting both structured **JSON file uploads** and **Structured Text Paste with Auto-Parser** (smart extraction of question stems, options A–D, answer keys, and Chief Examiner explanations).
> - **CBT Streaming & Resilience**: **Hybrid Caching Architecture** where the CBT simulator queries Cloud Firestore on-demand with local LRU caching and seamlessly falls back to the curated offline bank if network is degraded or offline.

---

## 1. Overview & Core Concept

### What It Does
1. **Cloud Firestore Storage**: Establishes a scalable Firestore schema (`/pastQuestions` and `/pastQuestionPapers`) capable of holding thousands of past exam questions across 15+ years for all JAMB UTME, WAEC SSCE, and NECO subjects, complete with comprehension passages, topics, options, and step-by-step Chief Examiner explanations.
2. **On-Demand CBT Streaming Engine**: Enhances the 4-subject JAMB CBT Simulator to dynamically fetch and stream authentic questions for any selected subject and examination year from Firestore with intelligent local memory/IndexedDB caching and instant zero-latency offline fallback.
3. **Dedicated Educator & Admin Importer**: An intuitive, high-efficiency teacher portal guarded by a secure PIN gate. Enables secondary school educators and administrators to:
   - Paste raw past examination text (from past booklets, Word documents, or PDFs) and let the auto-parser regex engine extract questions, options (A–D), correct answer tags, and explanations.
   - Upload full JSON papers directly.
   - Preview, edit, and fine-tune questions live in an interactive card carousel.
   - Batch-commit 40 to 60 questions per paper directly to Cloud Firestore in atomic batches.
   - Inspect, search, and manage existing papers in the live Firestore archive.

### Target Audience & Persona
- **Educators & Content Curators**: School teachers, JAMB CBT center administrators, and content reviewers uploading authentic past examination papers.
- **University Aspirants & Candidates**: Students preparing for JAMB UTME, WAEC, and NECO who need access to realistic, multi-year exam papers with instant question loading and zero downtime.

---

## 2. User Experience & Visual Design

### A. Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EDUCATOR / ADMIN WORKFLOW                       │
│                                                                        │
│   [Aspirant / Top Nav]                                                 │
│            │                                                           │
│            ▼                                                           │
│   ┌──────────────────┐      Valid PIN                                  │
│   │  PIN Access Gate │ ──────────────────► ┌─────────────────────────┐ │
│   │ (4-digit keypad) │                     │ Educator Importer Hub   │ │
│   └──────────────────┘                     │ - Metadata Setup        │ │
│                                            │ - Upload / Paste Mode   │ │
│                                            └────────────┬────────────┘ │
│                                                         │              │
│       ┌─────────────────────────────────────────────────┴────────┐     │
│       ▼                                                          ▼     │
│  [JSON Upload]                                            [Smart Text] │
│  Drop .json paper                                         Paste raw Qs │
│       │                                                          │     │
│       └─────────────────────────┬────────────────────────────────┘     │
│                                 ▼                                      │
│                  ┌─────────────────────────────┐                       │
│                  │  Live Validation & Preview  │                       │
│                  │  - Edit question & options  │                       │
│                  │  - Verify answer keys       │                       │
│                  └──────────────┬──────────────┘                       │
│                                 ▼                                      │
│                  ┌─────────────────────────────┐                       │
│                  │ Batch Commit to Cloud       │                       │
│                  │ Firestore (Atomic Chunks)   │                       │
│                  └─────────────────────────────┘                       │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Educator Entry Flow**:
   - Educator clicks **"Educator Portal"** in the navigation header or Aspirant dashboard.
   - If not authenticated as admin, a sleek PIN keypad appears requesting the 4-digit master PIN (`2026`). Upon verification, the portal unlocks and remembers session authorization.
2. **Importing Past Questions**:
   - **Step 1: Paper Header**: Select Exam (`JAMB UTME`, `WAEC SSCE`, `NECO`), Subject (`Mathematics`, `Use of English`, `Physics`, etc.), Year (`2008`–`2026`), and default time limit.
   - **Step 2: Source Input**:
     - *Text Paste Mode*: Paste raw exam booklet text. The smart parser automatically handles typical Nigerian past question formatting:
       `1. The SI unit of electric flux is... A. Weber B. Henry C. Volt-meter D. Tesla ANSWER: C EXPLANATION: ... TOPIC: ...`
     - *JSON Upload Mode*: Select a `.json` file formatted with question arrays.
   - **Step 3: Interactive Verification**: The UI renders a structured questions list showing parsed items, color-coded answer selections, detected topics, and warnings for missing fields. Educators can click any item to edit text inline.
   - **Step 4: Publish**: Single click triggers a Firestore batch write with real-time progress indicator (`15/40 uploaded... 100% complete`).
3. **CBT Candidate Streaming Flow**:
   - Student selects target year (e.g., `2023`) and 4 exam subjects in `AspirantCBTSimulator.tsx`.
   - The engine queries the Firestore `pastQuestions` collection.
   - A discreet status chip indicates `Cloud Streamed (40 questions)` or `Cached Offline`.
   - If offline or network lags, questions instantly fall back to the bundled question bank without interrupting the student's exam timer.

### B. Visual Identity & Theme
- **Color Palette**:
  - Dominant Surfaces: Emerald Deep Slate (`#064e3b` / `emerald-950`), Clean Card White (`#ffffff`), and Muted Slate (`#f8fafc`).
  - Accent Highlights: Nigerian Emerald Green (`#059669` / `emerald-600`), Amber Warning (`#d97706`), and Cobalt Blue (`#2563eb`).
- **Zero-Pill Discipline**: All question tags, years, and metadata render as clean, unboxed typography with dot separators (`JAMB UTME · 2024 · Calculus · 40 Questions`).
- **Educator Layout**: Generous two-column workbench on desktop ($1200\text{px}$ container) with source input on the left and live parsed card preview on the right.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid Client-Side Storage with Firestore Streaming
- **Approach**: Combine Cloud Firestore collection queries with an in-memory/localStorage cache layer and instant fallback to `jambPastQuestionsData.ts`.
- **Why**: Many Nigerian students experience intermittent 3G/4G connectivity. A purely cloud-dependent CBT engine would fail if a student's network drops during a 120-minute timed mock. Hybrid caching gives 100% uninterrupted exam reliability while allowing cloud updates.
- **Alternatives Considered**: Pure offline storage (cannot scale past a few years without bloating bundle size) vs Pure Firestore streaming (fails during network loss).

### Decision 2: Dual-Input Auto-Parser (Regex + JSON)
- **Approach**: Build a resilient client-side regex parser that extracts question stems, multi-line options (A/B/C/D), answer keys, and explanations from unformatted pasted text.
- **Why**: Teachers and exam centers usually possess past questions in Microsoft Word, PDF, or text files. Forcing them to convert everything to JSON manually creates friction. The auto-parser lets them paste directly from standard Nigerian past question booklet formats.

### Decision 3: PIN-Gated Educator Access
- **Approach**: Dedicated PIN modal (`2026`) with administrative email checks (`wowrealities@gmail.com` / `martorefe@gmail.com`).
- **Why**: Allows teachers and administrators to rapidly manage past questions on school lab computers or mobile devices without requiring complex OAuth logins for every quick question update, while maintaining administrative control.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TECHNICAL ARCHITECTURE                          │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                      Cloud Firestore                         │     │
│   │                                                              │     │
│   │   /pastQuestions/{id}                                        │     │
│   │   - examType: "JAMB" | "WAEC" | "NECO"                       │     │
│   │   - subject: "Mathematics"                                   │     │
│   │   - year: 2024                                               │     │
│   │   - question, options, correctAnswer, explanation, topic     │     │
│   │                                                              │     │
│   │   /pastQuestionPapers/{id}                                   │     │
│   │   - paperTitle, examType, subject, year, totalQuestions      │     │
│   └──────────────────────────────┬───────────────────────────────┘     │
│                                  │                                     │
│                     read/query   │   write/batch (Admin)               │
│                                  ▼                                     │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                   Question Service Layer                     │     │
│   │                 (src/services/questionService.ts)            │     │
│   │  - streamQuestionsBySubjectAndYear()                         │     │
│   │  - batchUploadQuestions()                                    │     │
│   │  - fetchAvailableCloudPapers()                               │     │
│   │  - Local Memory & Storage Cache                              │     │
│   │  - Fallback to bundled jambPastQuestionsData.ts              │     │
│   └──────────────────────┬───────────────────────┬───────────────┘     │
│                          │                       │                     │
│                          ▼                       ▼                     │
│   ┌──────────────────────────────┐   ┌───────────────────────────┐     │
│   │   AspirantCBTSimulator.tsx   │   │  EducatorQuestionPortal   │     │
│   │  - On-demand streaming      │   │  - PIN Gate               │     │
│   │  - 4-subject 120-min test    │   │  - Smart Text Parser      │     │
│   │  - Solution Review mode      │   │  - JSON Upload            │     │
│   │  - Connection status chip    │   │  - Paper Archive Manager  │     │
│   └──────────────────────────────┘   └───────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Models & Schema (`firebase-blueprint.json` & `firestore.rules`)

1. **`PastQuestion` Entity**:
   - `id`: string (e.g. `jamb_mathematics_2024_q1`)
   - `examType`: string (`JAMB`, `WAEC`, `NECO`)
   - `subject`: string (max 100 chars)
   - `year`: number (2000–2030)
   - `question`: string (max 5000 chars)
   - `options`: array of strings (exactly 4 options, each $\le 500$ chars)
   - `correctAnswer`: number (0 to 3)
   - `explanation`: string (max 3000 chars)
   - `topic`: string (max 150 chars)
   - `passage`: string (optional, max 5000 chars)
   - `createdAt`: string
   - `uploadedBy`: string

2. **`PastQuestionPaper` Entity**:
   - `id`: string (e.g. `jamb_mathematics_2024`)
   - `examType`: string
   - `subject`: string
   - `year`: number
   - `title`: string
   - `questionCount`: number
   - `updatedAt`: string

3. **Security Rules (`firestore.rules`)**:
   - `allow read`: Public or authenticated student reads allowed for `/pastQuestions` and `/pastQuestionPapers` (read-only for candidates).
   - `allow write`: Restricted to `isAdmin()` (`wowrealities@gmail.com` or admin record in Firestore) to prevent unauthorized database tampering.

---

## 5. Implementation Steps (Execution Phase)

1. **Database & Security Blueprint**:
   - Add `PastQuestion` and `PastQuestionPaper` schemas to `firebase-blueprint.json`.
   - Update `firestore.rules` with strict entity validation functions (`isValidPastQuestion`, `isValidPastQuestionPaper`), allow reads for students, and enforce admin-only write permissions.
2. **Service Layer (`src/services/questionService.ts`)**:
   - Implement `streamQuestionsBySubjectAndYear(examType, subject, year)`.
   - Implement client caching layer with fallback to `jambPastQuestionsData.ts`.
   - Implement `uploadPastQuestionsBatch(paper, questions)`.
   - Implement smart text parser with robust regex handling multiple Nigerian past paper text formats.
3. **Educator & Admin Importer Component (`src/components/admin/EducatorQuestionImporter.tsx`)**:
   - Secure PIN authentication modal (`2026`).
   - Paper metadata configuration (Exam, Subject, Year, Duration).
   - Dual upload controls: Bulk JSON file dropper and raw text paste area.
   - Interactive live preview workbench with inline question/option editing.
   - Batch progress uploader writing in chunks of 500 documents.
   - Existing paper inventory list with count badges and delete/test actions.
4. **CBT Simulator Integration (`src/components/student/aspirant/AspirantCBTSimulator.tsx`)**:
   - Wire `streamQuestionsBySubjectAndYear` into the exam startup sequence.
   - Add cloud-sync status indicator to the exam header.
   - Update the subject selector to show available cloud years alongside bundled years.
5. **Navigation & Global Routing**:
   - Add "Educator Portal" button in the Aspirant Dashboard and Header.
   - Mount portal in `App.tsx` routing.
6. **Verification & Quality Gate**:
   - Run `compile_applet` and `lint_applet`.
   - Test text parsing with sample JAMB past question snippets.
   - Verify dev server health and responsiveness.
