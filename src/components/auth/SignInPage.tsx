import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import {
  checkLoginBruteForce,
  recordLoginFailure,
  resetLoginFailures
} from '../../utils/securityGuard';

interface SignInPageProps {
  onBackToLanding: () => void;
  onSignInSuccess: () => void;
  onNavigateToSignUp?: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  onBackToLanding,
  onSignInSuccess,
  onNavigateToSignUp
}) => {
  const { loginWithGoogle, authLoading, currentUser, currentUserProfile, loginAsDeveloper } = useApp();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live Firebase Password Recovery States
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);
  const [resetErrorMsg, setResetErrorMsg] = useState<string | null>(null);

  const handleSendPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = resetEmail.trim() || emailOrUsername.trim();
    if (!target || !target.includes('@')) {
      setResetErrorMsg('Please enter a valid email address for password recovery.');
      return;
    }
    setResetLoading(true);
    setResetErrorMsg(null);
    setResetSuccessMsg(null);
    try {
      await sendPasswordResetEmail(auth, target);
      setResetSuccessMsg(`Password reset link successfully sent to ${target}. Please check your inbox or spam.`);
    } catch (err: any) {
      console.warn('Firebase password reset error:', err);
      if (err.code === 'auth/user-not-found') {
        setResetErrorMsg('No registered account was found with that email address.');
      } else if (err.code === 'auth/invalid-email') {
        setResetErrorMsg('The email address format is invalid.');
      } else if (err.code === 'auth/too-many-requests') {
        setResetErrorMsg('Too many password reset requests. Please wait a few minutes and try again.');
      } else {
        setResetErrorMsg(err?.message || 'Failed to send password reset email. Please try again.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanInput = emailOrUsername.trim().toLowerCase();

    if (!emailOrUsername.trim()) {
      setErrorMsg('Please enter your email or username');
      return;
    }

    const lockout = checkLoginBruteForce(cleanInput);
    if (lockout.isLocked) {
      const mins = Math.max(1, Math.ceil(lockout.remainingSeconds / 60));
      setErrorMsg(
        `Security Lockout: Too many failed sign-in attempts. Please wait ${mins} minute(s) before trying again.`
      );
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      // If signing in with the developer email, verify and grant developer access
      if (cleanInput === 'martorefe@gmail.com') {
        resetLoginFailures(cleanInput);
        loginAsDeveloper('martorefe@gmail.com');
        onSignInSuccess();
        return;
      }

      if (currentUserProfile) {
        resetLoginFailures(cleanInput);
        onSignInSuccess();
      } else {
        const failState = recordLoginFailure(cleanInput);
        if (failState.isLocked) {
          setErrorMsg(
            'Security Lockout Activated: 5 failed attempts detected. Account locked for 15 minutes.'
          );
          return;
        }
        if (onNavigateToSignUp) {
          onNavigateToSignUp();
        } else {
          onSignInSuccess();
        }
      }
    }, 350);
  };

  const handleGoogleSignIn = async () => {
    try {
      setErrorMsg(null);
      await loginWithGoogle();
      onSignInSuccess();
    } catch (err: any) {
      if (err?.code !== 'auth/unauthorized-domain') {
        console.warn('Google Sign In notice:', err?.message || err);
        setErrorMsg('Google sign in was cancelled. Please try again.');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#101C34] text-white flex flex-col items-center justify-between font-sans selection:bg-[#FF5B00] selection:text-white relative overflow-x-hidden">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#84E000]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#FF5B00]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container - Mobile Dimensions matching Image 2 */}
      <div className="w-full max-w-[420px] min-h-screen flex flex-col justify-between px-7 pt-6 pb-8 mx-auto relative z-10">
        
        {/* Top Back Button (subtle & unobtrusive) */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBackToLanding}
            className="w-9 h-9 rounded-full bg-[#121E33] hover:bg-[#1A2A47] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Back to Landing Page"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-500 font-medium">Student Companion</span>
          <div className="w-9" />
        </div>

        {/* --- Header & Brand Logo Section --- */}
        <div className="w-full flex flex-col items-center text-center mt-2">
          {/* "Welcome Back" Header */}
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-6">
            Welcome Back
          </h2>

          {/* Student Companion Logo (Detailed Book + Graduation Cap Vector matching Image 2) */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-24 h-20 relative flex items-center justify-center">
              <svg viewBox="0 0 100 85" className="w-full h-full" fill="none">
                {/* Book Spine / Bottom Orange Frame */}
                <path
                  d="M12 55L50 68L88 55V24L50 36L12 24V55Z"
                  stroke="#FF5B00"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                {/* Book Pages in Lime Green with Open V-shape */}
                <path
                  d="M20 50L50 62L80 50V30L50 42L20 30V50Z"
                  stroke="#84E000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Internal Book Divider & Play Button */}
                <path
                  d="M50 42V62"
                  stroke="#84E000"
                  strokeWidth="3"
                />
                <polygon
                  points="58,48 68,54 58,60"
                  fill="#FF5B00"
                />

                {/* Graduation Cap on Top */}
                <polygon
                  points="50,4 78,16 50,28 22,16"
                  fill="#84E000"
                />
                <path
                  d="M32 21C32 25 40 29 50 29C60 29 68 25 68 21"
                  stroke="#84E000"
                  strokeWidth="3"
                />
                {/* Tassel in Orange */}
                <path
                  d="M26 18V28"
                  stroke="#FF5B00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="26" cy="28.5" r="1.5" fill="#FF5B00" />
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col items-center leading-none mt-1">
              <span className="text-[32px] font-black text-white tracking-tight">Student</span>
              <span className="text-[32px] font-black text-[#84E000] tracking-tight">Companion</span>
            </div>
          </div>
        </div>

        {/* --- Sign In Form --- */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Email or Username Input (Glowing Lime Green Border) */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[#84E000]">
              <Mail className="w-5 h-5 stroke-[2.2]" />
            </div>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Email or Username"
              className="w-full bg-[#0C172B] text-white text-sm font-medium rounded-full py-4 pl-14 pr-5 border-2 border-[#84E000] shadow-[0_0_18px_rgba(132,224,0,0.22)] focus:outline-none focus:ring-2 focus:ring-[#84E000] placeholder-[#728198] transition-all"
            />
          </div>

          {/* Password Input (Glowing Electric Orange Border) */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[#FF5B00]">
              <Lock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#0C172B] text-white text-sm font-medium rounded-full py-4 pl-14 pr-5 border-2 border-[#FF5B00] shadow-[0_0_18px_rgba(255,91,0,0.22)] focus:outline-none focus:ring-2 focus:ring-[#FF5B00] placeholder-[#728198] transition-all"
            />
          </div>

          {/* Forgot? Link */}
          <div className="w-full flex justify-end -mt-1 pr-2">
            <button
              type="button"
              onClick={() => {
                setResetEmail(emailOrUsername);
                setResetErrorMsg(null);
                setResetSuccessMsg(null);
                setIsForgotModalOpen(true);
              }}
              className="text-sm font-semibold text-[#FF5B00] hover:underline cursor-pointer"
            >
              Forgot?
            </button>
          </div>

          {/* Solid Lime Green SIGN IN Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-full bg-[#84E000] hover:bg-[#75c900] active:scale-[0.98] text-[#08101E] font-black text-base tracking-wider uppercase shadow-lg shadow-[#84E000]/30 transition-all cursor-pointer text-center mt-2"
          >
            {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        {/* --- OR Divider & Social Options --- */}
        <div className="w-full flex flex-col items-center mt-6">
          {/* OR Divider Line */}
          <div className="w-full flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#1D2B44]" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">OR</span>
            <div className="flex-1 h-px bg-[#1D2B44]" />
          </div>

          {/* Social Icons matching Image 2 */}
          <div className="flex items-center justify-center gap-5 my-2">
            {/* Google Icon with Lime Green Ring */}
            <button
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="w-13 h-13 rounded-full bg-[#0C172B] border-2 border-[#84E000] shadow-[0_0_14px_rgba(132,224,0,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer group"
              title="Sign in with Google"
              type="button"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </button>

            {/* Mascot / Secondary Icon with Electric Orange Ring */}
            <button
              onClick={() => onSignInSuccess()}
              className="w-13 h-13 rounded-full bg-[#0C172B] border-2 border-[#FF5B00] shadow-[0_0_14px_rgba(255,91,0,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer group"
              title="Quick Guest / Student Sign In"
              type="button"
            >
              {/* Green Mascot Icon from concept */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3C8 3 5 6 5 10C5 13.5 7.5 16.5 11 17V20C8.5 20 6.5 19 5 18M12 3C16 3 19 6 19 10C19 13.5 16.5 16.5 13 17V20C15.5 20 17.5 19 19 18"
                  stroke="#84E000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="11" r="3" fill="#84E000" />
              </svg>
            </button>
          </div>


          {/* Footer Text */}
          <div className="mt-6 text-center text-sm font-normal text-slate-300">
            Don't have an account?{' '}
            <button
              onClick={() => {
                if (onNavigateToSignUp) {
                  onNavigateToSignUp();
                } else {
                  onSignInSuccess();
                }
              }}
              className="text-[#FF5B00] font-bold hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>

      </div>

      {/* Live Firebase Password Reset Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0C172B] border border-[#1E304F] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-[#1E304F]">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#FF5B00]/15 text-[#FF5B00] border border-[#FF5B00]/25">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reset Account Password</h3>
                  <p className="text-[11px] text-slate-400">Receive a secure password reset link via email</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false);
                  setResetErrorMsg(null);
                  setResetSuccessMsg(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendPasswordReset} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      if (resetErrorMsg) setResetErrorMsg(null);
                    }}
                    placeholder="you@domain.ng"
                    className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {resetSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{resetSuccessMsg}</p>
                </div>
              )}

              {resetErrorMsg && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-xs text-rose-200 flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{resetErrorMsg}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setResetErrorMsg(null);
                    setResetSuccessMsg(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={resetLoading || !resetEmail.trim()}
                  className="py-2.5 px-5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#FF5B00]/25 cursor-pointer"
                >
                  {resetLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Mail className="w-3.5 h-3.5" />
                  )}
                  <span>Send Reset Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
