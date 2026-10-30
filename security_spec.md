# Security Specification: Student Companion Firebase Integration

## 1. Data Invariants

1. **Student Isolation & Ownership**: A student document (`/students/{studentId}`) can only be created or modified by the authenticated user whose `request.auth.uid == studentId`, with `request.auth.token.email_verified == true`.
2. **Identity Integrity**: No user may forge another user's identity (`ownerId` / `studentId` / `userId`).
3. **Immutability of Core Fields**: `studentId`, `createdAt`, `originalOwnerId` cannot be mutated once written.
4. **Denial of Wallet & Boundary Protection**: All string fields must adhere to strict length boundaries (e.g., names <= 100 chars, school <= 150 chars, state <= 50 chars, IDs <= 128 chars matching `^[a-zA-Z0-9_\-]+$`).
5. **No Blind Blanket Reads**: Listing users or collections without ownership checks or query constraints is strictly blocked.
6. **Parent Wallet Isolation**: A wallet document (`/wallets/{userId}`) is strictly readable and writable only by the wallet owner (`request.auth.uid == userId`) or an authorized verified admin.
7. **Exam Results Subcollection Parent Invariant**: An exam result can only exist under `/students/{studentId}/examResults/{resultId}` if the student document exists and `request.auth.uid == studentId`.
8. **Tutor Bookings Access Control**: Only the student who created the booking or the assigned tutor or an admin can view the booking. Updates to parent approval must only be permitted by authorized parents/admins.
9. **Chat Message Integrity**: Messages in `/chats/{chatId}/messages/{messageId}` can only be authored by authenticated participants whose `request.auth.uid` matches the sender ID.
10. **Admin Bootstrap Gate**: Only users present in `/admins/{adminId}` or verified matching `martorefe@gmail.com` can perform administrative overrides.

---

## 2. The "Dirty Dozen" Payloads (Designed to Break Identity, Integrity, and State)

1. **Payload 1 (Ghost Field / Shadow Update Attack)**:
   ```json
   {
     "id": "std-attacker",
     "name": "Attacker",
     "school": "Lagos High",
     "classLevel": "SS 3",
     "stream": "Science",
     "xp": 5000,
     "rank": "Scholar",
     "streakDays": 10,
     "lastStudyDate": "2026-10-29",
     "isAdmin": true, // GHOST FIELD PRIVILEGE ESCALATION
     "isVerified": true
   }
   ```
2. **Payload 2 (Unverified Email Spoof Attack)**:
   Request with `request.auth.token.email = "martorefe@gmail.com"` but `request.auth.token.email_verified = false` attempting to write to `/admins/admin-01`.
3. **Payload 3 (ID Poisoning Attack)**:
   Attempting to write with a document ID exceeding 128 characters or containing script characters: `../../etc/passwd` or a 2KB buffer.
4. **Payload 4 (Orphaned Subcollection Result Attack)**:
   Attempting to create `/students/non-existent-user/examResults/res-01` without a valid parent student record.
5. **Payload 5 (Cross-Account Exam Result Forgery)**:
   User `uid_alice` attempting to post exam results to `/students/uid_bob/examResults/res-02`.
6. **Payload 6 (Wallet Drain / Negative Balance Attack)**:
   Directly updating `/wallets/victim-id` with `balanceNaira: -999999` from an unauthorized user.
7. **Payload 7 (Terminal State Reopening on Tutor Booking)**:
   Attempting to revert a booking with `status: "completed"` back to `"pending_parent"` or modifying historical booking fee.
8. **Payload 8 (Chat Impersonation Attack)**:
   User `uid_student` sending a message with `sender: "tutor"` and spoofing tutor's user ID.
9. **Payload 9 (Denial-of-Wallet 10MB String Bomb)**:
   Attempting to send a `topicTitle` or `summary` string of 2MB size to trigger Firestore storage and read cost explosions.
10. **Payload 10 (Blanket List Scraping Attack)**:
    Unrestricted query `collection(db, 'wallets')` without document filtering to scrape balances of all parents.
11. **Payload 11 (Temporal Integrity Forgery Attack)**:
    Providing client-forged future timestamp `createdAt: "2099-01-01T00:00:00Z"` instead of server timestamp `request.time`.
12. **Payload 12 (Immortality Violation Attack)**:
    Attempting to update an existing student record with an altered `studentId` or `originalOwnerId`.

---

## 3. Test Runner Specification (`firestore.rules.test.ts`)

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'sonorous-heading-pn2tx',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Zero-Trust Firestore Security Specification - The Dirty Dozen', () => {
  it('P1: Rejects ghost fields and privilege escalation (isAdmin injection)', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(
      aliceDb.doc('students/alice').set({
        id: 'alice',
        name: 'Alice',
        school: 'Queens College',
        classLevel: 'SS 2',
        stream: 'Science',
        xp: 100,
        rank: 'Scholar',
        streakDays: 1,
        lastStudyDate: '2026-10-29',
        isAdmin: true, // Ghost field
      })
    );
  });

  it('P2: Rejects unverified email attempting admin creation', async () => {
    const unverifiedAdmin = testEnv.authenticatedContext('fake-admin', {
      email: 'martorefe@gmail.com',
      email_verified: false,
    }).firestore();
    await assertFails(
      unverifiedAdmin.doc('admins/fake-admin').set({
        email: 'martorefe@gmail.com',
        role: 'superadmin',
      })
    );
  });

  it('P3: Rejects ID poisoning with invalid characters or excessive length', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    const maliciousId = 'a'.repeat(200);
    await assertFails(
      aliceDb.doc(`students/${maliciousId}`).set({
        id: maliciousId,
        name: 'Alice',
      })
    );
  });

  it('P4 & P5: Rejects writing exam results to another user student subcollection', async () => {
    const bobDb = testEnv.authenticatedContext('bob', { email: 'bob@school.ng', email_verified: true }).firestore();
    await assertFails(
      bobDb.doc('students/alice/examResults/res-01').set({
        id: 'res-01',
        examId: 'utme-phy-01',
        score: 85,
        totalQuestions: 100,
        percentage: 85,
      })
    );
  });

  it('P6: Rejects unauthorized access to parent wallets', async () => {
    const attackerDb = testEnv.authenticatedContext('attacker', { email: 'att@school.ng', email_verified: true }).firestore();
    await assertFails(
      attackerDb.doc('wallets/victim-parent').set({
        balanceNaira: -50000,
      })
    );
  });

  it('P7: Rejects reverting completed tutor booking status', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(
      aliceDb.doc('tutorBookings/completed-booking').update({
        status: 'pending_parent',
      })
    );
  });

  it('P8: Rejects chat sender impersonation', async () => {
    const studentDb = testEnv.authenticatedContext('student1', { email: 'std@school.ng', email_verified: true }).firestore();
    await assertFails(
      studentDb.doc('chats/chat1/messages/m1').set({
        id: 'm1',
        senderId: 'tutor1', // Forged sender
        text: 'Hello',
      })
    );
  });

  it('P9: Rejects oversized text bombs (>10KB string payload)', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(
      aliceDb.doc('students/alice').set({
        id: 'alice',
        name: 'a'.repeat(2000), // > 100 chars
        school: 'Kings College',
      })
    );
  });

  it('P10: Rejects blanket read on wallets collection', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(aliceDb.collection('wallets').get());
  });

  it('P11: Rejects client-forged timestamp', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(
      aliceDb.doc('students/alice').set({
        id: 'alice',
        name: 'Alice',
        createdAt: '2099-01-01T00:00:00Z',
      })
    );
  });

  it('P12: Rejects mutating immutable owner / student ID', async () => {
    const aliceDb = testEnv.authenticatedContext('alice', { email: 'alice@school.ng', email_verified: true }).firestore();
    await assertFails(
      aliceDb.doc('students/alice').update({
        id: 'different-id',
      })
    );
  });
});
```
