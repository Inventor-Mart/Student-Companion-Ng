import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

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

export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Initial connection boot test
testConnection();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('unauthorized-domain')) {
      const err = new Error('auth/unauthorized-domain');
      (err as any).code = 'auth/unauthorized-domain';
      (err as any).domain = typeof window !== 'undefined' ? window.location.hostname : '';
      throw err;
    }
    console.warn('Google Sign In:', error?.message || error);
    throw error;
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

export async function logOut() {
  try {
    await signOut(auth);
    disconnectGoogleMedia();
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}

