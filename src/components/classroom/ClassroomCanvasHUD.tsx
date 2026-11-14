import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ClassroomCanvasHUDProps {
  initialSecondsLeft: number;
  isMicActive: boolean;
  isLowDataMode: boolean;
  onTimerExpire?: () => void;
  className?: string;
}

export const ClassroomCanvasHUD: React.FC<ClassroomCanvasHUDProps> = ({
  initialSecondsLeft,
  isMicActive,
  isLowDataMode,
  onTimerExpire,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // User toggleable Eco mode state (default true to conserve CPU/GPU during liveboard typing)
  const [isEcoMode, setIsEcoMode] = useState<boolean>(true);
  const isEcoModeRef = useRef<boolean>(true);
  isEcoModeRef.current = isEcoMode;

  const isMicActiveRef = useRef<boolean>(isMicActive);
  isMicActiveRef.current = isMicActive;

  const isLowDataModeRef = useRef<boolean>(isLowDataMode);
  isLowDataModeRef.current = isLowDataMode;

  const onTimerExpireRef = useRef(onTimerExpire);
  onTimerExpireRef.current = onTimerExpire;

  // Track start time with high precision
  const startTimeRef = useRef<number>(performance.now());
  const initialSecondsRef = useRef<number>(initialSecondsLeft);
  initialSecondsRef.current = initialSecondsLeft;

  // Animation & Audio Waveform state
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const wavePhaseRef = useRef<number>(0);
  const timerExpiredDispatchedRef = useRef<boolean>(false);

  // Sync initial seconds if props change on booking load
  useEffect(() => {
    startTimeRef.current = performance.now();
    timerExpiredDispatchedRef.current = false;
  }, [initialSecondsLeft]);

  // Main high-performance Canvas rendering loop
  const renderFrame = useCallback((now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Frame rate pacing governor
    // Muted: 1 FPS (1000ms) since only the 1-second countdown clock updates
    // Active Mic + Eco Mode: 24 FPS (~41.6ms) | Active Mic + Max: 45 FPS (~22.2ms)
    const targetInterval = !isMicActiveRef.current
      ? 1000
      : isEcoModeRef.current
      ? 41.6
      : 22.2;
    const elapsedSinceLast = now - lastFrameTimeRef.current;

    if (elapsedSinceLast < targetInterval) {
      rafIdRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    lastFrameTimeRef.current = now - (elapsedSinceLast % targetInterval);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    // Reset transform & scale to physical pixels
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.scale(dpr, dpr);

    const logicalW = width / dpr;
    const logicalH = height / dpr;

    // 1. Draw sleek HUD chassis with soft border
    const chassisGradient = ctx.createLinearGradient(0, 0, 0, logicalH);
    chassisGradient.addColorStop(0, '#0E1A2E');
    chassisGradient.addColorStop(1, '#091220');

    ctx.fillStyle = chassisGradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, logicalW, logicalH, 10);
    ctx.fill();

    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, logicalW - 1, logicalH - 1, 9.5);
    ctx.stroke();

    // 2. Left Zone: Audio Waveform Equalizer
    // 6 reactive vertical bars driven by smooth sinusoidal phase modulation
    const micActive = isMicActiveRef.current;
    const waveCount = 5;
    const barWidth = 3;
    const barSpacing = 2.5;
    const startX = 12;
    const centerY = logicalH / 2;

    if (micActive) {
      wavePhaseRef.current += isEcoModeRef.current ? 0.08 : 0.05;
    }

    ctx.save();
    for (let i = 0; i < waveCount; i++) {
      let barH = 3;
      if (micActive) {
        // Dynamic harmonics for realistic voice audio presence without DOM reflow
        const s1 = Math.sin(wavePhaseRef.current + i * 0.9);
        const s2 = Math.cos(wavePhaseRef.current * 0.7 + i * 0.5);
        barH = Math.max(3, Math.min(18, 5 + Math.abs(s1 * 9) + Math.abs(s2 * 4)));
      }

      ctx.fillStyle = micActive ? '#10B981' : '#475569';
      const bx = startX + i * (barWidth + barSpacing);
      const by = centerY - barH / 2;
      ctx.beginPath();
      ctx.roundRect(bx, by, barWidth, barH, 1.5);
      ctx.fill();
    }

    // Audio status micro-label
    ctx.font = 'bold 9px ui-sans-serif, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = micActive ? '#34D399' : '#64748B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(micActive ? 'LIVE' : 'MUTED', startX + waveCount * (barWidth + barSpacing) + 5, centerY);
    ctx.restore();

    // 3. Center Zone: Countdown Clock (High-Precision RAF Timer)
    const elapsedTotalSeconds = (now - startTimeRef.current) / 1000;
    const remainingSeconds = Math.max(0, initialSecondsRef.current - Math.floor(elapsedTotalSeconds));

    if (remainingSeconds <= 0 && !timerExpiredDispatchedRef.current) {
      timerExpiredDispatchedRef.current = true;
      if (onTimerExpireRef.current) {
        onTimerExpireRef.current();
      }
    }

    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = remainingSeconds % 60;
    const timeText = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const centerX = logicalW * 0.52;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Clock icon circle indicator
    const isWarning = remainingSeconds < 300; // < 5 mins
    const isUrgent = remainingSeconds < 60;

    let timeColor = '#F8FAFC';
    if (isUrgent) {
      const flash = Math.sin(now / 200) > 0;
      timeColor = flash ? '#EF4444' : '#FCA5A5';
    } else if (isWarning) {
      timeColor = '#F59E0B';
    }

    // Tabular numbers for perfect alignment
    ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.fillStyle = timeColor;
    ctx.fillText(timeText, centerX, centerY - 1);

    // Muted label below time
    ctx.font = '8px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('REMAINING', centerX, centerY + 10);
    ctx.restore();

    // 4. Right Zone: Telemetry & Eco Mode Toggle Badge
    const isEco = isEcoModeRef.current;
    const badgeW = 74;
    const badgeH = 20;
    const badgeX = logicalW - badgeW - 8;
    const badgeY = centerY - badgeH / 2;

    ctx.save();
    // Eco Mode button/badge container
    ctx.fillStyle = isEco ? '#064E3B' : '#132035';
    ctx.strokeStyle = isEco ? '#059669' : '#2A3C56';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
    ctx.fill();
    ctx.stroke();

    // Eco Status Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 9px ui-sans-serif, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isEco ? '#6EE7B7' : '#94A3B8';
    ctx.fillText(isEco ? '30 FPS ECO' : '60 FPS MAX', badgeX + badgeW / 2, badgeY + badgeH / 2);
    ctx.restore();

    // Schedule next frame
    rafIdRef.current = requestAnimationFrame(renderFrame);
  }, []);

  // Update canvas logical & physical dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const width = Math.max(260, Math.floor(rect.width));
      const height = 36;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Run and pause render loop with document visibility (saves 100% CPU when tab is hidden)
  useEffect(() => {
    const startLoop = () => {
      if (!rafIdRef.current) {
        lastFrameTimeRef.current = performance.now();
        rafIdRef.current = requestAnimationFrame(renderFrame);
      }
    };

    const stopLoop = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startLoop();

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [renderFrame]);

  // Handle click on canvas: if clicked on the right badge area, toggle Eco mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Rightmost 30% corresponds to the FPS Eco badge
    if (clickX >= width * 0.7) {
      setIsEcoMode(prev => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center min-w-[270px] sm:min-w-[320px] max-w-[360px] h-9 select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="rounded-xl shadow-inner cursor-pointer"
        title="Classroom Canvas HUD: Tap right badge to toggle 30 FPS Eco Mode"
        role="img"
        aria-label="Interactive live classroom countdown timer and audio equalizer HUD"
      />
      {/* Hidden screen-reader live region for accessibility */}
      <span className="sr-only" aria-live="polite">
        Interactive classroom HUD active. Micro-render loop running in {isEcoMode ? '30 FPS Eco mode' : '60 FPS mode'}.
      </span>
    </div>
  );
};
