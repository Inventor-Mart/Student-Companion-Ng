import React, { useEffect, useState } from 'react';
import { Lottie } from 'lottie-react';
import { GraduationCap, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationMs = 3000
}) => {
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // 1. Try to fetch the Lottie animation asset
  useEffect(() => {
    let isMounted = true;
    const loadLottie = async () => {
      try {
        // Try absolute URL first, then relative path
        const res = await fetch('/assets/animations/splash_logo.json');
        if (!res.ok) {
          throw new Error('Animation file not found');
        }
        const data = await res.json();
        if (isMounted && data && typeof data === 'object') {
          setAnimationData(data);
        }
      } catch (err) {
        if (isMounted) {
          setLoadFailed(true);
        }
      }
    };

    loadLottie();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Automated 3-second navigation timer with smooth fade out
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(0, durationMs - 400));

    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  // 3. Instant skip on tap/click
  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 150);
  };

  return (
    <div
      onClick={handleSkip}
      onTouchStart={handleSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          handleSkip();
        }
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#070D1A] select-none cursor-pointer transition-opacity duration-300 ease-out overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Student Companion Splash Screen, tap anywhere to enter"
    >
      {/* Ambient Radial Illumination */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(14, 165, 233, 0.18) 0%, rgba(2, 132, 199, 0.05) 45%, transparent 70%)'
        }}
      />

      {/* Top Spacer */}
      <div className="w-full flex justify-end items-center">
        <span className="text-[11px] font-medium tracking-wider text-slate-500 hover:text-slate-300 transition-colors">
          Tap anywhere to skip
        </span>
      </div>

      {/* Centered Brand & Lottie Widget */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        {/* Lottie Animation or Glowing Insignia Fallback */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
          {/* Subtle Outer Glow Aura */}
          <div className="absolute inset-4 rounded-full bg-sky-500/10 filter blur-xl animate-pulse" />

          {animationData && !loadFailed ? (
            <Lottie
              src={animationData}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          ) : (
            /* Elegant glowing animated insignia fallback */
            <div className="relative flex items-center justify-center w-36 h-36 rounded-3xl bg-slate-900/60 border border-sky-500/30 shadow-2xl shadow-sky-950/50 backdrop-blur-sm group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-600/30 to-emerald-500/20 blur-md animate-pulse" />
              <div className="relative flex flex-col items-center justify-center text-sky-400">
                <GraduationCap className="w-14 h-14 text-sky-300 animate-bounce" style={{ animationDuration: '2.5s' }} />
                <Sparkles className="w-4 h-4 text-emerald-300 absolute top-4 right-4 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Primary Application Brand Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-display">
          Student Companion
        </h1>

        {/* Academic Subtitle */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
          Nigerian Secondary & University Aspirant Learning Suite
        </p>
      </div>

      {/* Bottom Attribution: Powered by WoW Tech */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 pb-4">
        <div className="w-8 h-0.5 bg-sky-500/20 rounded-full mb-1" />
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-sky-300/70 font-sans">
          Powered by WoW Tech
        </span>
      </div>
    </div>
  );
};
