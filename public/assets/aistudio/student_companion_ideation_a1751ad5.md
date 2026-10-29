# Student Companion: Product Specification & Strategic Overview

Student Companion represents a strong, locally tailored EdTech solution for the Nigerian market, effectively blending curriculum-aligned content (WAEC, NECO, JAMB, PUTME) with gamification and a tutoring marketplace.

## Idea Evaluation & Improvements
* **Target the Payer (Parents):** While students are the end-users, parents or guardians hold the purchasing power. The app must include a Parent Dashboard where they can monitor progress, pay for subscriptions, and authorize physical tutoring sessions.
* **Offline-First Architecture:** Data costs and network reliability are significant hurdles in Nigeria. Lesson notes, schemes of work, and quizzes should be downloadable for offline use, syncing XP and progress once the user reconnects.
* **Tutor Safety & Vetting:** Allowing students to book physical tutors introduces severe liability and safety risks. Implementing mandatory background checks, identity verification (NIN), and requiring parental consent/booking for physical sessions is non-negotiable.
* **Freemium Model:** A strictly paid app will face high friction in adoption. Offer the scheme of work and basic quizzes for free, gating premium lesson notes, weekly challenges, and the tutoring marketplace behind a subscription.
* **AI Verification for Uniforms:** To manage the "profile picture in school uniform" XP bonus at scale, integrate a lightweight AI image classification API to automatically detect uniforms, reducing manual admin work.

## Product Ideation

### Problem Statement
Nigerian secondary school students lack access to an engaging, gamified platform that standardizes the national curriculum (JSS1-SS3, WAEC, NECO, JAMB) while bridging the gap between digital self-study and vetted, on-demand physical/online tutoring.

### Target Audience
* **Primary Users:** Secondary school students (JSS1-SS3) and university aspirants.
* **Economic Buyers:** Parents and guardians.
* **Partners:** Independent tutors, secondary schools, and educational content creators.

### Unique Value Proposition (UVP)
A single, gamified hub that combines the official Nigerian syllabus with competitive learning, rewarding students for engagement while offering a secure marketplace for localized online and physical tutoring.

### Monetization Strategy
* **B2C Subscriptions:** Monthly/termly/yearly plans for full access to premium lesson notes, weekly challenges, and advanced quizzes.
* **Marketplace Commission:** A percentage cut from every online or physical tutor booking.
* **B2B Licensing:** White-labeling or partnering with schools to upload their specific notes and track their students' performance.

## Product Requirement Document (PRD)

| Specification | Details |
| :--- | :--- |
| **Product Name** | Student Companion |
| **Platforms** | Android (Native) & Progressive Web App (PWA) |
| **Target Release** | 6 Nov 2026 |

### 1. User Roles & Personas
* **Student:** Consumes content, plays games, earns XP, and requests tutors.
* **Parent/Guardian:** Funds the wallet, pays subscriptions, approves physical tutoring, and views analytics.
* **Tutor:** Manages bookings, conducts online/offline sessions, and tracks earnings.
* **School Admin:** Manages enrolled students, uploads custom school notes, and monitors inter-school competition standings.
* **Super Admin:** Oversees platform health, verifies tutors, manages payouts, and configures weekly/termly challenges.

### 2. Functional Requirements

**Core Learning Module**
* **Syllabus Integration:** Digital scheme of work categorized by class (JSS1 - SS3) and subject.
* **Lesson Notes:** Interactive text, images, and embedded video modules directly tied to the scheme of work.
* **Assessment Engine:** Automated quizzes following lesson notes, formatted to mimic WAEC, NECO, and JAMB CBT (Computer Based Test) environments.

**Gamification & Engagement Engine**
* **XP & Leveling System:** Students earn XP for reading notes, passing quizzes, logging in daily, and setting a verified school uniform profile picture.
* **Leaderboards & Competitions:**
    * *Student of the Week:* Automated spotlight based on weekly XP accumulation.
    * *Weekly Challenges:* High-stakes quizzes with tangible prizes (e.g., airtime, branded merchandise).
    * *Termly Competitions:* Inter-school and intra-class tournaments.
* **Gaming Hub:** Educational mini-games (e.g., spelling bees, math puzzles) and casual arcade games (unlocked via XP to prevent distraction).

**Tutoring Marketplace**
* **Tutor Discovery:** Search algorithms to find tutors based on subject, location, rating, and availability.
* **Booking System:** Options to book tutors for online sessions (in-app video/chat) or physical sessions (hourly, daily, weekly, or topic-based).
* **Parental Authorization:** Mandatory approval flow to the Parent Dashboard for physical tutoring requests.
* **Session Management:** Scheduling, calendar syncing, and in-app messaging (phone numbers masked for safety).

**Partnerships & Growth**
* **Referral System:** Unique referral codes generating bonus XP for students or wallet credits for parents upon successful subscription conversions.
* **Partner Portals:** Dedicated dashboards for School Partners and Tutor Partners to track engagement, student volume, and revenue share.

### 3. Non-Functional Requirements
* **Offline Accessibility:** Core lesson notes and the scheme of work must be cached locally on the device using Service Workers (PWA) and local SQLite (Android).
* **Security & Compliance:** End-to-end encryption for in-app messaging. Strict KYC (Know Your Customer) and NIN verification for all registered tutors.
* **Performance:** The Android app size must remain under 25MB to accommodate entry-level smartphones prevalent in the region. The UI must be highly responsive to mimic native experiences on the PWA.
* **Payment Gateway Integration:** Integration with reliable Nigerian payment processors (e.g., Paystack, Flutterwave) for seamless subscription and escrow management for tutor payments.