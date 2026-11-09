import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, Zap, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, getSoundMuted, toggleSoundMuted } from '../../../utils/audioSynthesis';

interface FormulaCard {
  quantity: string;
  formula: string;
  siUnit: string;
}

const FORMULAS_DATA: FormulaCard[] = [
  { quantity: 'Newton’s Second Law (Force)', formula: 'F = m · a', siUnit: 'Newtons (N)' },
  { quantity: 'Kinetic Energy', formula: 'Ek = ½ m · v²', siUnit: 'Joules (J)' },
  { quantity: 'Gravitational Potential Energy', formula: 'Ep = m · g · h', siUnit: 'Joules (J)' },
  { quantity: 'Ohm’s Law (Potential Difference)', formula: 'V = I · R', siUnit: 'Volts (V)' },
  { quantity: 'Pressure on a Surface', formula: 'P = F / A', siUnit: 'Pascals (Pa)' },
  { quantity: 'Wave Speed Equation', formula: 'v = f · λ', siUnit: 'Meters / second (m/s)' },
  { quantity: 'Electrical Power', formula: 'P = I · V = I² · R', siUnit: 'Watts (W)' },
  { quantity: 'Linear Momentum', formula: 'p = m · v', siUnit: 'kg · m/s' },
  { quantity: 'Density of a Substance', formula: 'ρ = m / V', siUnit: 'kg / m³' },
  { quantity: 'Simple Pendulum Period', formula: 'T = 2π √(l / g)', siUnit: 'Seconds (s)' },
  { quantity: 'Capacitance of a Capacitor', formula: 'C = Q / V', siUnit: 'Farads (F)' }
];

export const FormulaMasterGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<FormulaCard | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  const generateRound = () => {
    const target = FORMULAS_DATA[Math.floor(Math.random() * FORMULAS_DATA.length)];
    const optionsSet = new Set<string>([target.formula]);

    while (optionsSet.size < 4) {
      const rand = FORMULAS_DATA[Math.floor(Math.random() * FORMULAS_DATA.length)];
      optionsSet.add(rand.formula);
    }

    setCurrentCard(target);
    setOptions(Array.from(optionsSet).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateRound();
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    playSound.gameOver();
    const xpReward = Math.max(50, scoreRef.current * 20);
    setTimeout(() => {
      onAwardXP(xpReward, 'Formula Master');
    }, 0);
    try {
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    } catch {}
  }, [onAwardXP]);

  // Timer loop with soft ticking & 5-second urgency beep
  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = Math.max(0, prev - 1);
        if (next > 0) {
          if (next <= 5) {
            playSound.timerBeep(next);
          } else {
            playSound.timerTick();
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, timeLeft, handleGameOver]);

  const handleAnswer = (chosen: string) => {
    if (!currentCard || isGameOver) return;

    if (chosen === currentCard.formula) {
      playSound.correct();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      playSound.buzz();
      setStreak(0);
    }

    generateRound();
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-blue-950 border border-blue-500/80 mx-auto flex items-center justify-center text-blue-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Formulas Mastered! 📐</h2>
            <p className="text-xs text-slate-400 mt-0.5">Physics & Calculation Recall</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Formulas Matched</span>
              <span className="text-lg font-bold text-white font-mono">{score}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">XP Earned</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">+{Math.max(50, score * 20)} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setTimeLeft(45);
                setScore(0);
                setStreak(0);
                setIsGameOver(false);
                generateRound();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>

            <button
              onClick={onExit}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit</span>
        </button>

        <div className={`flex items-center gap-1.5 px-3 py-1 border rounded-xl text-xs font-mono font-bold transition-all ${
          timeLeft <= 5 ? 'bg-amber-950 border-amber-500 text-amber-300 animate-pulse' : 'bg-blue-950 border-blue-700 text-blue-300'
        }`}>
          <Timer className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsMuted(toggleSoundMuted())}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <span className="text-white font-bold">{score} pts</span>
          {streak >= 3 && (
            <span className="flex items-center gap-0.5 text-amber-400 text-[11px] font-bold">
              <Flame className="w-3 h-3 fill-amber-400" />
              {streak}x
            </span>
          )}
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-6">
        {currentCard && (
          <div className="w-full space-y-5 text-center">
            {/* Quantity Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Match Formula ({currentCard.siUnit})</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentCard.quantity}
              </div>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="py-4 px-2 rounded-2xl bg-slate-900 hover:bg-blue-950/70 active:scale-95 border border-slate-800 hover:border-blue-500 text-white font-mono text-base font-bold transition-all shadow-sm flex items-center justify-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
