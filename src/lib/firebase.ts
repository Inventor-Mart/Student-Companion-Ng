import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  deleteUser,
  User
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  memoryLocalCache,
  doc,
  getDocFromServer,
  type Firestore
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const firestoreDbId = (firebaseConfig as any).firestoreDatabaseId;
const isEmbeddedIframe = (() => {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
const canUsePersistentIndexedDb =
  typeof window !== 'undefined' &&
  typeof indexedDB !== 'undefined' &&
  !isEmbeddedIframe;

let firestoreDb: Firestore;
try {
  firestoreDb = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true,
      localCache: canUsePersistentIndexedDb
        ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
        : memoryLocalCache()
    },
    firestoreDbId
  );
} catch {
  try {
    firestoreDb = initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true,
        ignoreUndefinedProperties: true,
        localCache: memoryLocalCache()
      },
      firestoreDbId
    );
  } catch {
    // Fallback if Firestore was already initialized during hot reload
    firestoreDb = getFirestore(app, firestoreDbId); /* CRITICAL: The app will break without this line */
  }
}
export const db = firestoreDb;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const GOOGLE_AUTH_RETURN_TARGET_KEY = 'sc_google_auth_return_target';
export type GoogleAuthReturnTarget = 'ota_app_updates' | 'super_admin' | 'app';

export function setGoogleAuthReturnTarget(target: GoogleAuthReturnTarget): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(GOOGLE_AUTH_RETURN_TARGET_KEY, target);
  } catch {
    // Ignore storage restriction
  }
}

export function peekGoogleAuthReturnTarget(): GoogleAuthReturnTarget | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.sessionStorage.getItem(GOOGLE_AUTH_RETURN_TARGET_KEY);
    if (val === 'ota_app_updates' || val === 'super_admin' || val === 'app') {
      return val;
    }
  } catch {
    // Ignore storage restriction
  }
  return null;
}

export function clearGoogleAuthReturnTarget(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(GOOGLE_AUTH_RETURN_TARGET_KEY);
  } catch {
    // Ignore storage restriction
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function verifyFirestoreConfigViaRest(): Promise<'ok' | 'invalid_config' | 'network_unreachable'> {
  const projectId = String((firebaseConfig as any).projectId || '').trim();
  const apiKey = String((firebaseConfig as any).apiKey || '').trim();
  const databaseId = String(firestoreDbId || '(default)').trim();
  if (!projectId || !apiKey || projectId === 'remixed-project-id') {
    return 'invalid_config';
  }
  if (typeof fetch !== 'function') {
    return 'network_unreachable';
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), 5000) : null;
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/${encodeURIComponent(databaseId)}/documents/test/connection?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      ...(controller ? { signal: controller.signal } : {}),
    });
    if (response.status === 200) return 'ok';
    if (response.status === 404) {
      const bodyText = await response.text().catch(() => '');
      if (bodyText.toLowerCase().includes('database') && bodyText.toLowerCase().includes('does not exist')) {
        return 'invalid_config';
      }
      return 'ok';
    }
    if (response.status === 400 || response.status === 403) {
      const bodyText = await response.text().catch(() => '');
      if (bodyText.toLowerCase().includes('api key') || bodyText.toLowerCase().includes('project')) {
        return 'invalid_config';
      }
    }
    return 'network_unreachable';
  } catch {
    return 'network_unreachable';
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function testConnection(): Promise<void> {
  // If browser is in offline mode, skip server probe to allow smooth offline operations
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    const errCode = String((error as any)?.code || '').toLowerCase();
    const errMessage = (error instanceof Error ? error.message : String(error)).toLowerCase();
    const isTransientOfflineOrTimeout =
      errCode === 'unavailable' ||
      errCode === 'deadline-exceeded' ||
      errCode === 'aborted' ||
      errMessage.includes("didn't respond within") ||
      errMessage.includes('timeout') ||
      errMessage.includes('unavailable') ||
      errMessage.includes('the client is offline');

    if (isTransientOfflineOrTimeout) {
      const restStatus = await verifyFirestoreConfigViaRest();
      if (restStatus === 'invalid_config') {
        console.error("Please check your Firebase configuration.");
      } else {
        console.warn("Firestore realtime channel delayed; operating in offline persistence mode.");
      }
      return;
    }

    if (errMessage.includes('not found') || errMessage.includes('invalid')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Initial connection boot test with graceful debounce to allow network channel initialization
if (typeof window !== 'undefined') {
  setTimeout(() => {
    testConnection().catch(() => {});
  }, 1200);
}

export const FIREBASE_PROJECT_ID = String((firebaseConfig as any).projectId || '').trim();
export const FIREBASE_AUTH_CONSOLE_URL = FIREBASE_PROJECT_ID
  ? `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/authentication/settings`
  : 'https://console.firebase.google.com';

const DEFAULT_APK_WEB_AUTH_ORIGIN = 'https://studentcompanionng.netlify.app';
const APK_AUTH_STATE_KEY = 'sc_apk_custom_tab_oauth_state';

declare global {
  interface Window {
    StudentCompanionAndroid?: {
      isAvailable?: () => boolean;
      startGoogleSignIn?: (authUrl: string) => void;
      cancelGoogleSignIn?: () => void;
    };
    __handleApkGoogleAuthCallback?: (payload: {
      idToken?: string;
      state?: string;
      error?: string;
    }) => void;
    __handleApkGoogleAuthCancelled?: () => void;
  }
}

export function isBundledAndroidApkEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'appassets.androidplatform.net' ||
    Boolean(window.StudentCompanionAndroid?.isAvailable?.())
  );
}

export function hasAndroidCustomTabBridge(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.StudentCompanionAndroid?.isAvailable?.() &&
      typeof window.StudentCompanionAndroid?.startGoogleSignIn === 'function'
  );
}

function generateOAuthStateNonce(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // Fallback below
  }
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

function resolveApkWebAuthOrigin(): string {
  if (typeof window !== 'undefined') {
    try {
      const override = window.localStorage.getItem('sc_apk_web_auth_origin')?.trim();
      if (override && /^https:\/\/[a-z0-9.-]+$/i.test(override)) {
        return override.replace(/\/+$/, '');
      }
    } catch {
      // Ignore storage error
    }
  }
  return DEFAULT_APK_WEB_AUTH_ORIGIN;
}

function normalizeFirebaseAuthError(error: any): Error {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const code =
    error?.code ||
    (error?.message?.includes('unauthorized-domain') ? 'auth/unauthorized-domain' : undefined) ||
    'auth/unknown';
  const msg = error?.message || code;
  const wrapped = new Error(msg);
  (wrapped as any).code = code;
  (wrapped as any).domain = hostname;
  return wrapped;
}

export async function signInWithApkCustomTab(): Promise<User> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const err = new Error('Internet connection is required for Google Sign-In. Connect online or sign in with your saved Email & Password.');
    (err as any).code = 'auth/network-request-failed';
    throw err;
  }

  if (!hasAndroidCustomTabBridge()) {
    const err = new Error('Android Chrome Custom Tab bridge is unavailable on this build.');
    (err as any).code = 'auth/custom-tab-unavailable';
    throw err;
  }

  const expectedState = generateOAuthStateNonce();
  try {
    window.sessionStorage.setItem(APK_AUTH_STATE_KEY, expectedState);
  } catch {
    // Non-fatal if sessionStorage unavailable; expectedState remains in closure
  }

  const authBridgeUrl = `${resolveApkWebAuthOrigin()}/?apk_auth=1&state=${encodeURIComponent(expectedState)}`;

  return await new Promise<User>((resolve, reject) => {
    let settled = false;
    const cleanup = () => {
      window.__handleApkGoogleAuthCallback = undefined;
      window.__handleApkGoogleAuthCancelled = undefined;
      window.clearTimeout(timeoutId);
      try {
        window.sessionStorage.removeItem(APK_AUTH_STATE_KEY);
      } catch {
        // Ignore storage error
      }
    };

    const failWith = (code: string, message: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      window.StudentCompanionAndroid?.cancelGoogleSignIn?.();
      const err = new Error(message);
      (err as any).code = code;
      (err as any).domain = resolveApkWebAuthOrigin().replace(/^https?:\/\//, '');
      reject(err);
    };

    const timeoutId = window.setTimeout(() => {
      failWith('auth/popup-closed-by-user', 'Google Sign-In in Chrome timed out before completing.');
    }, 180_000);

    window.__handleApkGoogleAuthCancelled = () => {
      failWith(
        'auth/popup-closed-by-user',
        'Chrome Sign-In was closed before finishing. Tap "Continue with Google" to try again, or use Email & Password.'
      );
    };

    window.__handleApkGoogleAuthCallback = async (payload) => {
      if (settled) return;
      settled = true;
      cleanup();

      const storedState = (() => {
        try {
          return window.sessionStorage.getItem(APK_AUTH_STATE_KEY) || expectedState;
        } catch {
          return expectedState;
        }
      })();

      if (payload?.error) {
        const err = new Error(payload.error);
        (err as any).code = payload.error.includes('unauthorized-domain')
          ? 'auth/unauthorized-domain'
          : 'auth/custom-tab-failed';
        (err as any).domain = resolveApkWebAuthOrigin().replace(/^https?:\/\//, '');
        reject(err);
        return;
      }

      if (!payload?.idToken) {
        const err = new Error('Google Sign-In did not return a verification token.');
        (err as any).code = 'auth/missing-credential';
        reject(err);
        return;
      }

      if (payload.state && payload.state !== expectedState && payload.state !== storedState) {
        const err = new Error('Google Sign-In verification state mismatch. Please retry.');
        (err as any).code = 'auth/invalid-credential';
        reject(err);
        return;
      }

      try {
        const credential = GoogleAuthProvider.credential(payload.idToken);
        const result = await signInWithCredential(auth, credential);
        resolve(result.user);
      } catch (credErr: any) {
        reject(normalizeFirebaseAuthError(credErr));
      }
    };

    try {
      window.StudentCompanionAndroid?.startGoogleSignIn?.(authBridgeUrl);
    } catch (launchErr: any) {
      failWith('auth/custom-tab-failed', launchErr?.message || 'Unable to open Chrome Custom Tab for Google Sign-In.');
    }
  });
}

export async function signInGoogleInCustomTabBridge(): Promise<{ idToken: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = credential?.idToken || '';
    if (!idToken) {
      throw new Error('Google OAuth credential ID token was not returned.');
    }
    return { idToken };
  } catch (error: any) {
    const normalized = normalizeFirebaseAuthError(error);
    if ((normalized as any).code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider);
      return await new Promise(() => {
        // Redirecting current Custom Tab window
      });
    }
    throw normalized;
  }
}

export async function consumeApkBridgeRedirectIdToken(): Promise<string | null> {
  try {
    const result = await getRedirectResult(auth);
    if (!result) return null;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential?.idToken || null;
  } catch (error: any) {
    throw normalizeFirebaseAuthError(error);
  }
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    const normalized = normalizeFirebaseAuthError(error);
    console.warn('Google Sign In (Popup):', (normalized as any).code, normalized.message);
    throw normalized;
  }
}

export async function signInWithGoogleRedirect(returnTarget: GoogleAuthReturnTarget = 'app'): Promise<void> {
  setGoogleAuthReturnTarget(returnTarget);
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    const normalized = normalizeFirebaseAuthError(error);
    console.warn('Google Sign In (Redirect):', (normalized as any).code, normalized.message);
    throw normalized;
  }
}

export async function consumeGoogleRedirectResult(): Promise<{
  user: User | null;
  returnTarget: GoogleAuthReturnTarget | null;
}> {
  const returnTarget = peekGoogleAuthReturnTarget();
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      return { user: result.user, returnTarget };
    }
    return { user: null, returnTarget };
  } catch (error: any) {
    const normalized = normalizeFirebaseAuthError(error);
    console.warn('Google Redirect Result Error:', (normalized as any).code, normalized.message);
    throw normalized;
  }
}

// ==========================================
// GOOGLE DRIVE & YOUTUBE OAUTH MEDIA SCOPES
// ==========================================
export const MEDIA_SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/youtube.upload'
];

export const mediaGoogleProvider = new GoogleAuthProvider();
MEDIA_SCOPES.forEach(scope => mediaGoogleProvider.addScope(scope));

// In-memory token storage (Do NOT store in localStorage per Google Workspace guidelines)
let cachedMediaAccessToken: string | null = null;
let cachedMediaEmail: string | null = null;

export const getMediaAccessToken = (): string | null => cachedMediaAccessToken;
export const getMediaEmail = (): string | null => cachedMediaEmail;

export async function signInWithGoogleMediaScopes(): Promise<{ user: any; accessToken: string }> {
  try {
    const result = await signInWithPopup(auth, mediaGoogleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Google OAuth access token not found in authentication result');
    }
    cachedMediaAccessToken = credential.accessToken;
    cachedMediaEmail = result.user.email || null;
    return {
      user: result.user,
      accessToken: cachedMediaAccessToken
    };
  } catch (error: any) {
    if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('unauthorized-domain')) {
      const err = new Error('auth/unauthorized-domain');
      (err as any).code = 'auth/unauthorized-domain';
      (err as any).domain = typeof window !== 'undefined' ? window.location.hostname : '';
      throw err;
    }
    console.error('Google Drive & YouTube Media Auth Error:', error?.message || error);
    throw error;
  }
}

export function disconnectGoogleMedia() {
  cachedMediaAccessToken = null;
  cachedMediaEmail = null;
}

export async function registerWithFirebaseEmailVerification(params: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<{ user: User; alreadyVerified: boolean; verificationSent: boolean }> {
  const cleanEmail = String(params.email || '').trim().toLowerCase();
  const rawPassword = String(params.password || '');
  const cleanName = String(params.displayName || '').trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    const err = new Error('Please enter a valid email address.');
    (err as any).code = 'auth/invalid-email';
    throw err;
  }
  if (rawPassword.length < 6) {
    const err = new Error('Please use a password with at least 6 characters to verify with Firebase.');
    (err as any).code = 'auth/weak-password';
    throw err;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, rawPassword);
    if (cleanName) {
      await updateProfile(cred.user, { displayName: cleanName }).catch(() => {});
    }
    await sendEmailVerification(cred.user);
    return {
      user: cred.user,
      alreadyVerified: Boolean(cred.user.emailVerified),
      verificationSent: true
    };
  } catch (error: any) {
    const code = String(error?.code || '');
    if (code === 'auth/email-already-in-use') {
      try {
        const existingCred = await signInWithEmailAndPassword(auth, cleanEmail, rawPassword);
        await existingCred.user.reload().catch(() => {});
        if (existingCred.user.emailVerified) {
          return {
            user: existingCred.user,
            alreadyVerified: true,
            verificationSent: false
          };
        }
        await sendEmailVerification(existingCred.user);
        return {
          user: existingCred.user,
          alreadyVerified: false,
          verificationSent: true
        };
      } catch (signInErr: any) {
        const signInCode = String(signInErr?.code || '');
        if (signInCode === 'auth/too-many-requests') {
          const wrapped = new Error('Too many verification attempts. Please wait a few minutes or continue with Google.');
          (wrapped as any).code = 'auth/too-many-requests';
          throw wrapped;
        }
        const wrapped = new Error(
          'An account with this email already exists. Please Sign In instead, or use Continue with Google.'
        );
        (wrapped as any).code = 'auth/email-already-in-use';
        throw wrapped;
      }
    }
    if (code === 'auth/operation-not-allowed') {
      const wrapped = new Error(
        'Email/Password sign-up is not enabled in Firebase Authentication yet. You can complete sign-up instantly using Google below.'
      );
      (wrapped as any).code = 'auth/operation-not-allowed';
      throw wrapped;
    }
    if (code === 'auth/weak-password') {
      const wrapped = new Error('Password must be at least 6 characters long.');
      (wrapped as any).code = 'auth/weak-password';
      throw wrapped;
    }
    if (code === 'auth/too-many-requests') {
      const wrapped = new Error('Too many verification emails sent. Please check your inbox/spam or try again shortly.');
      (wrapped as any).code = 'auth/too-many-requests';
      throw wrapped;
    }
    throw normalizeFirebaseAuthError(error);
  }
}

export async function resendFirebaseVerificationEmail(): Promise<{ sent: boolean; alreadyVerified: boolean }> {
  const user = auth.currentUser;
  if (!user) {
    const err = new Error('Session expired. Please go back and submit your details again.');
    (err as any).code = 'auth/no-current-user';
    throw err;
  }
  await user.reload().catch(() => {});
  if (user.emailVerified) {
    return { sent: false, alreadyVerified: true };
  }
  await sendEmailVerification(user);
  return { sent: true, alreadyVerified: false };
}

export async function checkFirebaseEmailVerified(): Promise<{ verified: boolean; user: User | null }> {
  const user = auth.currentUser;
  if (!user) {
    return { verified: false, user: null };
  }
  await user.reload();
  return { verified: Boolean(auth.currentUser?.emailVerified), user: auth.currentUser };
}

export async function logOut() {
  try {
    await signOut(auth);
    disconnectGoogleMedia();
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}

export async function deleteCurrentFirebaseAuthUser(): Promise<{
  deleted: boolean;
  requiresRecentLogin?: boolean;
  error?: string;
}> {
  const user = auth.currentUser;
  if (!user) {
    return { deleted: false };
  }
  try {
    await deleteUser(user);
    disconnectGoogleMedia();
    return { deleted: true };
  } catch (error: any) {
    const code = String(error?.code || '');
    if (code === 'auth/requires-recent-login') {
      return {
        deleted: false,
        requiresRecentLogin: true,
        error: 'Recent login required to delete Firebase Auth record.'
      };
    }
    return {
      deleted: false,
      error: error?.message || 'Could not remove Firebase Auth record.'
    };
  }
}

export const USER_SESSION_TOKEN_KEY = 'sc_user_session_token_v1';

export function setUserSessionToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (token && token.trim()) {
      window.sessionStorage.setItem(USER_SESSION_TOKEN_KEY, token.trim());
    } else {
      window.sessionStorage.removeItem(USER_SESSION_TOKEN_KEY);
    }
  } catch {
    // Ignore storage restriction
  }
}

export function getUserSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.sessionStorage.getItem(USER_SESSION_TOKEN_KEY);
    return val && val.trim() ? val.trim() : null;
  } catch {
    return null;
  }
}

export async function getFirebaseAuthHeaders(): Promise<Record<string, string>> {
  try {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      if (idToken) {
        return { Authorization: `Bearer ${idToken}` };
      }
    }
  } catch {
    // Fall through cleanly
  }
  try {
    if (typeof window !== 'undefined') {
      const adminToken = window.sessionStorage.getItem('sc_ota_admin_token_v1');
      if (adminToken && adminToken.trim()) {
        return { Authorization: `Bearer ${adminToken.trim()}` };
      }
      const userToken = window.sessionStorage.getItem(USER_SESSION_TOKEN_KEY);
      if (userToken && userToken.trim()) {
        return { Authorization: `Bearer ${userToken.trim()}` };
      }
    }
  } catch {
    // Ignore storage access errors
  }
  return {};
}

