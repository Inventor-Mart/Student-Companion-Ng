import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import {
  consumeApkBridgeRedirectIdToken,
  FIREBASE_AUTH_CONSOLE_URL,
  FIREBASE_PROJECT_ID,
  signInGoogleInCustomTabBridge
} from '../../lib/firebase';

const APK_BRIDGE_STATE_STORAGE_KEY = 'sc_apk_bridge_oauth_state';

function buildAndroidCallbackUrl(params: {
  idToken?: string;
  state?: string;
  error?: string;
}): string {
  const query = new URLSearchParams();
  if (params.idToken) query.set('id_token', params.idToken);
  if (params.state) query.set('state', params.state);
  if (params.error) query.set('error', params.error);
  return `studentcompanion://auth-callback?${query.toString()}`;
}

export const ApkGoogleAuthBridge: React.FC = () => {
  const [status, setStatus] = useState<'ready' | 'loading' | 'success' | 'error'>('ready');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [stateParam, setStateParam] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = new URLSearchParams(window.location.search);
    const urlState = search.get('state') || '';
    let resolvedState = urlState;
    if (urlState) {
      try {
        window.sessionStorage.setItem(APK_BRIDGE_STATE_STORAGE_KEY, urlState);
      } catch {
        // Ignore storage error
      }
    } else {
      try {
        resolvedState = window.sessionStorage.getItem(APK_BRIDGE_STATE_STORAGE_KEY) || '';
      } catch {
        resolvedState = '';
      }
    }
    setStateParam(resolvedState);

    let active = true;
    consumeApkBridgeRedirectIdToken()
      .then((idToken) => {
        if (!active || !idToken) return;
        const targetUrl = buildAndroidCallbackUrl({ idToken, state: resolvedState });
        setCallbackUrl(targetUrl);
        setStatus('success');
        try {
          window.sessionStorage.removeItem(APK_BRIDGE_STATE_STORAGE_KEY);
        } catch {
          // Ignore storage error
        }
        window.location.replace(targetUrl);
      })
      .catch((err: any) => {
        if (!active) return;
        const code = err?.code || 'auth/unknown';
        const domain = typeof window !== 'undefined' ? window.location.hostname : '';
        if (code === 'auth/unauthorized-domain') {
          setErrorMessage(
            `Firebase project "${FIREBASE_PROJECT_ID}" does not have "${domain}" listed in Authorized domains yet.`
          );
        } else {
          setErrorMessage(err?.message || 'Unable to complete Google Sign-In. Please try again.');
        }
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  const handleStartGoogleAuth = async () => {
    if (status === 'loading') return;
    setErrorMessage(null);
    setStatus('loading');

    if (stateParam) {
      try {
        window.sessionStorage.setItem(APK_BRIDGE_STATE_STORAGE_KEY, stateParam);
      } catch {
        // Ignore storage error
      }
    }

    try {
      const { idToken } = await signInGoogleInCustomTabBridge();
      const targetUrl = buildAndroidCallbackUrl({ idToken, state: stateParam });
      setCallbackUrl(targetUrl);
      setStatus('success');
      try {
        window.sessionStorage.removeItem(APK_BRIDGE_STATE_STORAGE_KEY);
      } catch {
        // Ignore storage error
      }
      window.location.replace(targetUrl);
    } catch (err: any) {
      const code = err?.code || 'auth/unknown';
      const domain = typeof window !== 'undefined' ? window.location.hostname : '';
      if (code === 'auth/unauthorized-domain') {
        setErrorMessage(
          `Firebase project "${FIREBASE_PROJECT_ID}" rejected "${domain}" (${code}). Add "${domain}" under Authorized domains at ${FIREBASE_AUTH_CONSOLE_URL}.`
        );
      } else if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setErrorMessage('Google account selection was closed before finishing. Tap the button below to try again.');
      } else {
        setErrorMessage(err?.message || 'Google Sign-In failed in Chrome. Please retry.');
      }
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#101C34] text-white flex flex-col items-center justify-center px-6 py-10 font-sans">
      <div className="w-full max-w-md rounded-3xl bg-[#0C172B] border border-[#1E304F] p-7 shadow-2xl space-y-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-14 flex items-center justify-center">
            <svg viewBox="0 0 100 85" className="w-full h-full" fill="none">
              <path d="M12 55L50 68L88 55V24L50 36L12 24V55Z" stroke="#FF5B00" strokeWidth="4" strokeLinejoin="round" />
              <path d="M20 50L50 62L80 50V30L50 42L20 30V50Z" stroke="#84E000" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M50 42V62" stroke="#84E000" strokeWidth="3" />
              <polygon points="50,4 78,16 50,28 22,16" fill="#84E000" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Student Companion Google Sign-In</h1>
            <p className="text-xs text-slate-300 mt-1">
              Signing in via Chrome for Android APK security compliance
            </p>
          </div>
        </div>

        {status === 'success' && callbackUrl ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/80 text-emerald-200 text-sm flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#84E000] shrink-0" />
              <span>Google account verified. Returning to Student Companion…</span>
            </div>
            <a
              href={callbackUrl}
              className="w-full min-h-[48px] py-3.5 px-5 rounded-full bg-[#84E000] hover:bg-[#96F716] text-[#070D18] font-bold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap"
            >
              <span>Return to Student Companion</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-rose-950/85 border border-rose-700 text-rose-200 text-xs text-left flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleStartGoogleAuth}
              disabled={status === 'loading'}
              className="w-full min-h-[52px] py-3.5 px-6 rounded-full bg-[#84E000] hover:bg-[#96F716] active:scale-[0.98] disabled:opacity-75 text-[#070D18] font-black text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-[#84E000]/25 transition-all cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin stroke-[2.5]" />
                  <span>Connecting to Google…</span>
                </>
              ) : (
                <span>Continue with Google Account</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#84E000] shrink-0" />
              <span>Protected handoff back to your installed Student Companion app</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
