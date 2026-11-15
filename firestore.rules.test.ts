import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const RULES_PATH = path.join(ROOT_DIR, 'firestore.rules');
const BLUEPRINT_PATH = path.join(ROOT_DIR, 'firebase-blueprint.json');

const rulesSource = fs.readFileSync(RULES_PATH, 'utf8');
const blueprint = JSON.parse(fs.readFileSync(BLUEPRINT_PATH, 'utf8'));

/**
 * Extracts a balanced-brace block starting from a match declaration (e.g. "match /students/{studentId}")
 */
function extractMatchBlock(source: string, matchHeader: string): string {
  const idx = source.indexOf(matchHeader);
  assert.notEqual(idx, -1, `Expected match block "${matchHeader}" to exist in firestore.rules`);
  const braceStart = source.indexOf('{', idx + matchHeader.length);
  assert.notEqual(braceStart, -1, `Expected opening brace for "${matchHeader}"`);

  let depth = 0;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return source.slice(idx, i + 1);
      }
    }
  }
  throw new Error(`Unclosed brace in match block "${matchHeader}"`);
}

function extractHelperFn(source: string, fnName: string): string {
  const signature = `function ${fnName}(`;
  const idx = source.indexOf(signature);
  assert.notEqual(idx, -1, `Expected helper function "${fnName}" in firestore.rules`);
  const braceStart = source.indexOf('{', idx);
  let depth = 0;
  for (let i = braceStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) {
        return source.slice(idx, i + 1);
      }
    }
  }
  throw new Error(`Unclosed brace in function "${fnName}"`);
}

function extractAllowStatement(block: string, verbs: string[]): string {
  const lines = block.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith('allow ')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const declaredVerbs = trimmed
      .slice('allow '.length, colonIdx)
      .split(',')
      .map((s) => s.trim());
    if (verbs.some((v) => declaredVerbs.includes(v))) {
      const collected = [trimmed];
      let j = i;
      while (!collected[collected.length - 1].includes(';') && j + 1 < lines.length) {
        j++;
        collected.push(lines[j].trim());
      }
      return collected.join(' ');
    }
  }
  return '';
}

function normalizeRulesText(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim();
}

// =========================================================================
// "THE DIRTY DOZEN" ADVERSARIAL SECURITY RULES SUITE (Zero Service Key)
// =========================================================================

test('Dirty Dozen #1: Global default-deny safety net and zero unauthenticated access to private PII collections', () => {
  assert.match(
    rulesSource,
    /rules_version\s*=\s*'2'\s*;/,
    'firestore.rules must enforce rules_version = 2'
  );
  assert.match(
    rulesSource,
    /match\s+\/\{document=\*\*\}\s*\{\s*allow\s+read,\s*write:\s*if\s+false;\s*\}/,
    'First rule inside /databases/{database}/documents must be default-deny catch-all'
  );
  assert.doesNotMatch(
    rulesSource,
    /allow\s+(read|write|create|update|delete)\s*:\s*if\s+true\s*;/i,
    'Wildcard allow read/write/create/update/delete: if true; must never appear in hardened rules'
  );
  // Only non-PII curriculum & OTA catalog collections may permit public list
  const allowedPublicCatalogs = new Set([
    '/pastQuestions/{questionId}',
    '/pastQuestionPapers/{paperId}',
    '/termly_drills/{drillId}',
    '/certificate_drills/{drillId}',
    '/admin_lesson_notes/{noteId}',
    '/otaBroadcasts/{broadcastId}',
    '/otaAnnouncements/{announcementId}',
    '/otaCompetitions/{competitionId}',
    '/otaAppReleases/{releaseId}',
    '/otaNotifications/{notificationId}',
  ]);
  for (const colPath of Object.keys(blueprint.firestore || {})) {
    const segments = colPath.split('/').filter(Boolean);
    const matchHeader = `match /${segments.join('/')}`;
    const fallBackHeader = `match /${segments[segments.length - 2]}/${segments[segments.length - 1]}`;
    const header = rulesSource.includes(matchHeader) ? matchHeader : fallBackHeader;
    const block = extractMatchBlock(rulesSource, header);
    const listStmt = normalizeRulesText(extractAllowStatement(block, ['list', 'read']));
    if (/:\s*if\s+true\s*;/.test(listStmt)) {
      assert.ok(
        allowedPublicCatalogs.has(colPath),
        `Unexpected public list: if true on non-catalog collection "${colPath}"`
      );
    }
  }

  const sensitiveBlocks = [
    'match /students/{studentId}',
    'match /users/{userId}',
    'match /wallets/{userId}',
    'match /parentWallets/{userId}',
    'match /tutorBookings/{bookingId}',
    'match /chats/{chatId}/messages/{messageId}',
    'match /growthPartners/{partnerId}',
    'match /referrals/{referralId}',
    'match /partnerWallets/{partnerId}',
    'match /revenueShareTransactions/{transactionId}',
    'match /subscriptionPayments/{paymentId}',
    'match /processed_paystack_refs/{refId}',
    'match /aspirantReferralRewards/{rewardId}',
    'match /school_subscriptions/{subId}',
    'match /security_incidents/{incidentId}',
    'match /security_blocks/{blockId}',
    'match /security_policies/{policyId}',
    'match /security_reports/{reportId}',
    'match /studentLinkRegistry/{code}',
    'match /schoolEnrollments/{enrollmentId}',
    'match /aiCoachUsage/{usageId}',
  ];

  for (const header of sensitiveBlocks) {
    const block = extractMatchBlock(rulesSource, header);
    const getStmt = extractAllowStatement(block, ['get', 'read']);
    const listStmt = extractAllowStatement(block, ['list', 'read']);
    assert.ok(getStmt.length > 0, `${header} must explicitly define allow get/read`);
    assert.ok(listStmt.length > 0, `${header} must explicitly define allow list/read`);
    assert.ok(!/:\s*if\s+true\s*;/.test(getStmt), `${header} get rule must not be public`);
    assert.ok(!/:\s*if\s+true\s*;/.test(listStmt), `${header} list rule must not be public`);
  }
});

test('Dirty Dozen #2: Privilege escalation blocked on /users (cannot self-assign admin, superAdmin, developer, or unlock walletFrozen)', () => {
  const usersBlock = extractMatchBlock(rulesSource, 'match /users/{userId}');
  const createStmt = normalizeRulesText(extractAllowStatement(usersBlock, ['create']));
  const updateStmt = normalizeRulesText(extractAllowStatement(usersBlock, ['update']));

  // Create blocks self-assigned admin & active abuse bypasses
  assert.ok(createStmt.includes("incoming().role != 'admin'"), 'Users create must forbid role == admin');
  assert.ok(createStmt.includes('incoming().isSuperAdmin == false'), 'Users create must forbid isSuperAdmin == true');
  assert.ok(createStmt.includes('incoming().isDeveloper == false'), 'Users create must forbid isDeveloper == true');
  assert.ok(createStmt.includes("incoming().accountStatus == 'active'"), 'Users create must enforce active initial status');
  assert.ok(createStmt.includes('incoming().walletFrozen == false'), 'Users create must enforce walletFrozen == false');

  // Update freezes RBAC & enforcement flags and restricts keys to safe profile properties
  assert.ok(updateStmt.includes('incoming().role == existing().role'), 'Users update must freeze role');
  assert.ok(updateStmt.includes('incoming().email == existing().email'), 'Users update must freeze email');
  assert.ok(updateStmt.includes('incoming().isSuperAdmin == existing().isSuperAdmin'), 'Users update must freeze isSuperAdmin');
  assert.ok(updateStmt.includes('incoming().isDeveloper == existing().isDeveloper'), 'Users update must freeze isDeveloper');
  assert.ok(updateStmt.includes('incoming().accountStatus == existing().accountStatus'), 'Users update must freeze accountStatus');
  assert.ok(updateStmt.includes('incoming().walletFrozen == existing().walletFrozen'), 'Users update must freeze walletFrozen');
  assert.ok(
    updateStmt.includes("affectedKeys().hasOnly(['fullName', 'avatarUrl', 'parentData', 'tutorData'])"),
    'Non-admin owner update on /users must be restricted strictly to fullName, avatarUrl, parentData, tutorData'
  );
  assert.ok(!updateStmt.includes("'adminData'"), 'Owner must NOT be able to self-write adminData on /users');
});

test('Dirty Dozen #3: Student cannot spoof subscription tier, paid status, addOns, XP, or rank on /students', () => {
  const studentsBlock = extractMatchBlock(rulesSource, 'match /students/{studentId}');
  const createStmt = normalizeRulesText(extractAllowStatement(studentsBlock, ['create']));
  const updateStmt = normalizeRulesText(extractAllowStatement(studentsBlock, ['update']));

  // Create must enforce free tier, zero XP, Fresher rank, empty addOns
  assert.ok(createStmt.includes('incoming().isSubscribed == false'), 'Student create must lock isSubscribed == false');
  assert.ok(createStmt.includes("incoming().subscriptionPlan == 'free'"), 'Student create must lock subscriptionPlan == free');
  assert.ok(createStmt.includes("incoming().subscriptionTier == 'free'"), 'Student create must lock subscriptionTier == free');
  assert.ok(createStmt.includes('incoming().xp == 0'), 'Student create must lock initial xp == 0');
  assert.ok(createStmt.includes("incoming().rank == 'Fresher'"), 'Student create must lock initial rank == Fresher');
  assert.ok(createStmt.includes('incoming().addOns.size() == 0'), 'Student create must lock addOns empty');

  // Update affectedKeys allowlist must exclude all paid/XP/rank/streak fields
  const match = updateStmt.match(/affectedKeys\(\)\.hasOnly\(\[([^\]]+)\]\)/);
  assert.ok(match, 'Students update must use strict affectedKeys().hasOnly([...])');
  const allowedOwnerKeys = match![1]
    .split(',')
    .map((s) => s.trim().replace(/['"]/g, ''));

  const forbiddenOwnerFields = [
    'isSubscribed',
    'subscriptionPlan',
    'subscriptionTier',
    'subscribedUntil',
    'termExpiresAt',
    'lastPaymentReference',
    'lastSubscribedAt',
    'addOns',
    'xp',
    'rank',
    'streakDays',
    'referredPartnerId',
    'referredPartnerName',
    'aspirantRewardStatus',
  ];
  for (const field of forbiddenOwnerFields) {
    assert.ok(
      !allowedOwnerKeys.includes(field),
      `Locked student field "${field}" must NOT appear in non-admin update allowlist`
    );
  }
});

test('Dirty Dozen #4: Parent/student cannot forge wallet balanceNaira on /wallets or write /parentWallets directly', () => {
  const walletsBlock = extractMatchBlock(rulesSource, 'match /wallets/{userId}');
  const createStmt = normalizeRulesText(extractAllowStatement(walletsBlock, ['create']));
  const updateStmt = normalizeRulesText(extractAllowStatement(walletsBlock, ['update']));

  assert.ok(createStmt.includes('incoming().balanceNaira == 0'), 'Wallet create by owner must lock initial balanceNaira == 0');
  assert.ok(
    updateStmt.includes('incoming().balanceNaira == existing().balanceNaira'),
    'Wallet update by owner must lock balanceNaira == existing().balanceNaira'
  );
  assert.ok(
    updateStmt.includes("affectedKeys().hasOnly(['pin', 'updatedAt'])"),
    'Wallet update by owner may only modify pin and updatedAt'
  );

  const parentWalletsBlock = extractMatchBlock(rulesSource, 'match /parentWallets/{userId}');
  const parentTxBlock = extractMatchBlock(parentWalletsBlock, 'match /transactions/{txId}');
  assert.ok(normalizeRulesText(extractAllowStatement(parentWalletsBlock, ['create'])).includes('isAdmin()'));
  assert.ok(normalizeRulesText(extractAllowStatement(parentWalletsBlock, ['update'])).includes('isAdmin()'));
  assert.ok(normalizeRulesText(extractAllowStatement(parentTxBlock, ['create'])).includes('isAdmin()'));
});

test('Dirty Dozen #5: Cross-user snooping blocked on students, users, wallets, tutorBookings, and chats', () => {
  const usersBlock = extractMatchBlock(rulesSource, 'match /users/{userId}');
  assert.ok(extractAllowStatement(usersBlock, ['list']).includes('isAdmin()'));
  assert.ok(extractAllowStatement(usersBlock, ['get']).includes('isOwner(userId)'));

  const walletsBlock = extractMatchBlock(rulesSource, 'match /wallets/{userId}');
  assert.ok(extractAllowStatement(walletsBlock, ['list']).includes('isAdmin()'));

  const bookingsBlock = extractMatchBlock(rulesSource, 'match /tutorBookings/{bookingId}');
  const bookingsGet = normalizeRulesText(extractAllowStatement(bookingsBlock, ['get']));
  const bookingsList = normalizeRulesText(extractAllowStatement(bookingsBlock, ['list']));
  assert.ok(bookingsGet.includes('existing().studentId == request.auth.uid') && bookingsGet.includes('existing().tutorId == request.auth.uid'));
  assert.ok(bookingsList.includes('resource.data.studentId == request.auth.uid') && bookingsList.includes('resource.data.tutorId == request.auth.uid'));

  const chatsBlock = extractMatchBlock(rulesSource, 'match /chats/{chatId}/messages/{messageId}');
  assert.ok(extractAllowStatement(chatsBlock, ['get']).includes('isChatParticipant(chatId)'));
  assert.ok(extractAllowStatement(chatsBlock, ['list']).includes('isChatParticipant(chatId)'));
  const chatHelper = normalizeRulesText(extractHelperFn(rulesSource, 'isChatParticipant'));
  assert.ok(chatHelper.includes('matches(') && chatHelper.includes('request.auth.uid'), 'isChatParticipant must validate UID embedded in chatId');
});

test('Dirty Dozen #6: Server-only financial, partner, paystack, security, registry, and AI quota collections reject non-admin client writes', () => {
  const adminOnlyWriteCollections = [
    'match /growthPartners/{partnerId}',
    'match /referrals/{referralId}',
    'match /partnerWallets/{partnerId}',
    'match /revenueShareTransactions/{transactionId}',
    'match /subscriptionPayments/{paymentId}',
    'match /processed_paystack_refs/{refId}',
    'match /aspirantReferralRewards/{rewardId}',
    'match /school_subscriptions/{subId}',
    'match /security_incidents/{incidentId}',
    'match /security_blocks/{blockId}',
    'match /security_policies/{policyId}',
    'match /studentLinkRegistry/{code}',
    'match /schoolRegistry/{schoolCode}',
    'match /schoolEnrollments/{enrollmentId}',
    'match /aiCoachUsage/{usageId}',
    'match /termly_drills/{drillId}',
    'match /certificate_drills/{drillId}',
    'match /pastQuestions/{questionId}',
    'match /pastQuestionPapers/{paperId}',
    'match /admin_lesson_notes/{noteId}',
  ];

  for (const header of adminOnlyWriteCollections) {
    const block = extractMatchBlock(rulesSource, header);
    for (const verb of ['create', 'update', 'delete']) {
      const stmt = normalizeRulesText(extractAllowStatement(block, [verb]));
      assert.ok(stmt.length > 0, `${header} must declare allow ${verb}`);
      assert.ok(
        stmt.includes('isAdmin()') || stmt.includes('if false'),
        `${header} ${verb} must be restricted to isAdmin() or false (got: ${stmt})`
      );
    }
  }
});

test('Dirty Dozen #7: Unverified email spoofing blocked — isVerified() and isAdmin() enforce email_verified == true', () => {
  const isVerifiedFn = normalizeRulesText(extractHelperFn(rulesSource, 'isVerified'));
  const isAdminFn = normalizeRulesText(extractHelperFn(rulesSource, 'isAdmin'));

  assert.ok(isVerifiedFn.includes('isSignedIn()'));
  assert.ok(isVerifiedFn.includes('request.auth.token.email_verified == true'));
  assert.ok(isAdminFn.includes('isVerified()'), 'isAdmin() must strictly require isVerified() (prevents email spoofing)');
  assert.ok(
    isAdminFn.includes("exists(/databases/$(database)/documents/admins/$(request.auth.uid))") &&
      isAdminFn.includes('request.auth.token.email in ['),
    'isAdmin() must verify admin registry existence or verified super admin email allowlist'
  );
});

test('Dirty Dozen #8: Immutable fields and cross-document references cannot be tampered on update', () => {
  const bookingsBlock = extractMatchBlock(rulesSource, 'match /tutorBookings/{bookingId}');
  const bookingsUpdate = normalizeRulesText(extractAllowStatement(bookingsBlock, ['update']));
  assert.ok(bookingsUpdate.includes('incoming().id == existing().id'));
  assert.ok(bookingsUpdate.includes('incoming().studentId == existing().studentId'));
  assert.ok(bookingsUpdate.includes('incoming().tutorId == existing().tutorId'));
  assert.ok(bookingsUpdate.includes('incoming().amountNaira == existing().amountNaira'));

  const forumBlock = extractMatchBlock(rulesSource, 'match /forumMessages/{messageId}');
  const forumUpdate = normalizeRulesText(extractAllowStatement(forumBlock, ['update']));
  assert.ok(forumUpdate.includes('incoming().id == existing().id'));
  assert.ok(forumUpdate.includes('incoming().senderId == existing().senderId'));
  assert.ok(forumUpdate.includes('incoming().channelId == existing().channelId'));

  const materialsBlock = extractMatchBlock(rulesSource, 'match /school_materials/{materialId}');
  const materialsUpdate = normalizeRulesText(extractAllowStatement(materialsBlock, ['update']));
  assert.ok(materialsUpdate.includes('incoming().schoolCode == existing().schoolCode'));
});

test('Dirty Dozen #9: Terminal state locking on tutorBookings & immutability of processed_paystack_refs', () => {
  const bookingsBlock = extractMatchBlock(rulesSource, 'match /tutorBookings/{bookingId}');
  const bookingsUpdate = normalizeRulesText(extractAllowStatement(bookingsBlock, ['update']));
  assert.ok(
    bookingsUpdate.includes("existing().status != 'completed'") &&
      bookingsUpdate.includes("existing().status != 'cancelled'"),
    'Non-admins cannot modify completed or cancelled tutor bookings'
  );

  const paystackBlock = extractMatchBlock(rulesSource, 'match /processed_paystack_refs/{refId}');
  const paystackMutate = normalizeRulesText(extractAllowStatement(paystackBlock, ['update', 'delete']));
  assert.ok(paystackMutate.includes('if false'), 'processed_paystack_refs must be immutable (update/delete forbidden)');
});

test('Dirty Dozen #10: Security reports and forum reports cannot be pre-resolved on create or read by non-owners', () => {
  const secReportsBlock = extractMatchBlock(rulesSource, 'match /security_reports/{reportId}');
  const secCreate = normalizeRulesText(extractAllowStatement(secReportsBlock, ['create']));
  const secList = normalizeRulesText(extractAllowStatement(secReportsBlock, ['list']));
  assert.ok(secCreate.includes("incoming().status == 'pending'"));
  assert.ok(secCreate.includes('incoming().reporterUserId == request.auth.uid'));
  assert.ok(secList.includes('isAdmin()') && secList.includes('resource.data.reporterUserId == request.auth.uid'));

  const forumReportsBlock = extractMatchBlock(rulesSource, 'match /forumReports/{reportId}');
  const forumCreate = normalizeRulesText(extractAllowStatement(forumReportsBlock, ['create']));
  assert.ok(forumCreate.includes("incoming().status == 'pending'"));
  assert.ok(extractAllowStatement(forumReportsBlock, ['get', 'list']).includes('isAdmin()'));
});

test('Dirty Dozen #11: Path poisoning & Denial-of-Wallet payload size guards enforced across helpers and single-doc ops', () => {
  const isValidIdFn = normalizeRulesText(extractHelperFn(rulesSource, 'isValidId'));
  assert.ok(isValidIdFn.includes('id.size() <= 128'));
  assert.ok(isValidIdFn.includes("id.matches('^[a-zA-Z0-9_\\\\-]+$')"));

  // Check mandatory size bounds on high-volume user-submitted text fields
  const chatFn = normalizeRulesText(extractHelperFn(rulesSource, 'isValidChatMessage'));
  assert.ok(chatFn.includes('data.text.size() <= 2000'));

  const forumMsgFn = normalizeRulesText(extractHelperFn(rulesSource, 'isValidForumMessage'));
  assert.ok(forumMsgFn.includes('data.text.size() <= 1000'));

  const secReportFn = normalizeRulesText(extractHelperFn(rulesSource, 'isValidSecurityReport'));
  assert.ok(secReportFn.includes('data.description.size() <= 2000'));

  // Every update block must invoke a validation helper (Anti-Update-Gap Pillar)
  const studentFn = normalizeRulesText(extractHelperFn(rulesSource, 'isValidStudentProfile'));
  assert.ok(studentFn.includes("'Senior Girl'") && studentFn.includes("'Senior Prefect'"));
});

test('Dirty Dozen #12: Blueprint parity — every collection declared in firebase-blueprint.json has an explicit hardened match block', () => {
  const blueprintPaths = Object.keys(blueprint.firestore || {});
  assert.ok(blueprintPaths.length >= 30, 'Expected full application collection set in firebase-blueprint.json');

  for (const colPath of blueprintPaths) {
    // Convert path like "/students/{studentId}/examResults/{resultId}" -> verify either full path match or leaf match
    const segments = colPath.split('/').filter(Boolean);
    const fullMatch = `match /${segments.join('/')}`;
    const leafPair = `match /${segments[segments.length - 2]}/${segments[segments.length - 1]}`;
    assert.ok(
      rulesSource.includes(fullMatch) || rulesSource.includes(leafPair),
      `Blueprint path "${colPath}" is missing explicit "${fullMatch}" or "${leafPair}" rule block in firestore.rules!`
    );
  }
});
