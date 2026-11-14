import React, { useEffect, useRef, useState } from 'react';
import { Lottie } from 'lottie-react';
import { Check } from 'lucide-react';
import { playLoginSuccessChime } from '../../utils/audioSynthesis';

interface LoginSuccessOverlayProps {
  isVisible: boolean;
  userName?: string | null;
  onComplete: () => void;
  durationMs?: number;
}

const FALLBACK_SUCCESS_CHECK_LOTTIE = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 45,
  w: 300,
  h: 300,
  nm: 'Login Success Check',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Checkmark',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-36, 4], [-10, 30], [40, -24]],
                  c: false
                }
              }
            },
            {
              ty: 'tm',
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  { t: 12, s: [0], e: [100] },
                  { t: 28, s: [100] }
                ]
              },
              o: { a: 0, k: 0 },
              m: 1
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.031, 0.063, 0.118, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 14 },
              lc: 2,
              lj: 2
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 11,
      op: 45,
      st: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Badge',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [40, 40, 100], e: [106, 106, 100] },
            { t: 12, s: [106, 106, 100], e: [100, 100, 100] },
            { t: 18, s: [100, 100, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            { d: 1, ty: 'el', s: { a: 0, k: [146, 146] }, p: { a: 0, k: [0, 0] } },
            { ty: 'fl', c: { a: 0, k: [0.518, 0.878, 0, 1] }, o: { a: 0, k: 100 }, r: 1 },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 45,
      st: 0
    }
  ]
};

export const LoginSuccessOverlay: React.FC<LoginSuccessOverlayProps> = ({
  isVisible,
  userName,
  onComplete,
  durationMs = 1500
}) => {
  const [animationData, setAnimationData] = useState<object>(FALLBACK_SUCCESS_CHECK_LOTTIE);
  const [lottieError, setLottieError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const hasCompletedRef = useRef<boolean>(false);
  const hasPlayedAudioRef = useRef<boolean>(false);
  const onCompleteRef = useRef<() => void>(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Respect user reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Preload custom /assets/animations/success_check.json when available
  useEffect(() => {
    let active = true;
    const loadAsset = async () => {
      try {
        const res = await fetch('/assets/animations/success_check.json');
        if (!res.ok) return;
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json') && !contentType.includes('text/plain')) {
          return;
        }
        const json = await res.json();
        if (active && json && typeof json === 'object' && Array.isArray(json.layers)) {
          setAnimationData(json);
        }
      } catch {
        // Keep built-in Lottie checkmark fallback
      }
    };
    loadAsset();
    return () => {
      active = false;
    };
  }, []);

  const triggerSingleComplete = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onCompleteRef.current();
  };

  // Simultaneously trigger chime playback + 1.5s safety navigation timeout when visible
  useEffect(() => {
    if (!isVisible) {
      hasCompletedRef.current = false;
      hasPlayedAudioRef.current = false;
      return;
    }

    if (!hasPlayedAudioRef.current) {
      hasPlayedAudioRef.current = true;
      void playLoginSuccessChime();
    }

    const timeoutId = window.setTimeout(() => {
      triggerSingleComplete();
    }, durationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, durationMs]);

  if (!isVisible) return null;

  const firstName = userName?.trim().split(/\s+/)[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label="Login successful, opening Main Dashboard"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D1A]/85 backdrop-blur-md p-6 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xs rounded-3xl bg-[#0C172B] border border-[#1E304F] px-6 py-8 flex flex-col items-center text-center shadow-2xl">
        <div className="w-36 h-36 flex items-center justify-center mb-3">
          {prefersReducedMotion || lottieError ? (
            <div className="w-24 h-24 rounded-full bg-[#84E000] border-4 border-[#FF5B00]/80 flex items-center justify-center shadow-lg shadow-[#84E000]/25">
              <Check className="w-12 h-12 text-[#08101E] stroke-[3]" />
            </div>
          ) : (
            <Lottie
              src={animationData}
              loop={false}
              autoplay={true}
              subscriptions={{
                complete: triggerSingleComplete,
                error: () => setLottieError(true)
              }}
              className="w-full h-full"
            />
          )}
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          {firstName ? `Welcome back, ${firstName}` : 'Signed in successfully'}
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Opening your Main Dashboard...
        </p>
      </div>
    </div>
  );
};
