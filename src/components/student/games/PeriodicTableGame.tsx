import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, FlaskConical } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ElementItem {
  name: string;
  symbol: string;
  atomicNumber: number;
  group: string;
}

const ELEMENTS_DATA: ElementItem[] = [
  { name: 'Potassium', symbol: 'K', atomicNumber: 19, group: 'Alkali Metal (from Kalium)' },
  { name: 'Sodium', symbol: 'Na', atomicNumber: 11, group: 'Alkali Metal (from Natrium)' },
  { name: 'Iron', symbol: 'Fe', atomicNumber: 26, group: 'Transition Metal (from Ferrum)' },
  { name: 'Lead', symbol: 'Pb', atomicNumber: 82, group: 'Post-transition Metal (from Plumbum)' },
  { name: 'Gold', symbol: 'Au', atomicNumber: 79, group: 'Precious Metal (from Aurum)' },
  { name: 'Silver', symbol: 'Ag', atomicNumber: 47, group: 'Precious Metal (from Argentum)' },
  { name: 'Copper', symbol: 'Cu', atomicNumber: 29, group: 'Transition Metal (from Cuprum)' },
  { name: 'Tin', symbol: 'Sn', atomicNumber: 50, group: 'Post-transition Metal (from Stannum)' },
  { name: 'Mercury', symbol: 'Hg', atomicNumber: 80, group: 'Liquid Metal (from Hydrargyrum)' },
  { name: 'Tungsten', symbol: 'W', atomicNumber: 74, group: 'Refractory Metal (from Wolfram)' },
  { name: 'Antimony', symbol: 'Sb', atomicNumber: 51, group: 'Metalloid (from Stibium)' },
  { name: 'Phosphorus', symbol: 'P', atomicNumber: 15, group: 'Reactive Nonmetal' },
  { name: 'Calcium', symbol: 'Ca', atomicNumber: 20, group: 'Alkaline Earth Metal' },
  { name: 'Magnesium', symbol: 'Mg', atomicNumber: 12, group: 'Alkaline Earth Metal' },
  { name: 'Zinc', symbol: 'Zn', atomicNumber: 30, group: 'Transition Metal' },
  { name: 'Chlorine', symbol: 'Cl', atomicNumber: 17, group: 'Halogen' },
  { name: 'Fluorine', symbol: 'F', atomicNumber: 9, group: 'Most Electronegative Halogen' },
  { name: 'Bromine', symbol: 'Br', atomicNumber: 35, group: 'Liquid Halogen' },
  { name: 'Iodine', symbol: 'I', atomicNumber: 53, group: 'Solid Subliming Halogen' },
  { name: 'Aluminum', symbol: 'Al', atomicNumber: 13, group: 'Amphoteric Metal' },
  { name: 'Silicon', symbol: 'Si', atomicNumber: 14, group: 'Semiconductor Metalloid' },
  { name: 'Manganese', symbol: 'Mn', atomicNumber: 25, group: 'Transition Metal (KMnO4)' }
];

export const PeriodicTableGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentElement, setCurrentElement] = useState<ElementItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const generateRound = () => {
    const target = ELEMENTS_DATA[Math.floor(Math.random() * ELEMENTS_DATA.length)];
    const optionsSet = new Set<string>([target.symbol]);

    while (optionsSet.size < 4) {
      const randomEl = ELEMENTS_DATA[Math.floor(Math.random() * ELEMENTS_DATA.length)];
      optionsSet.add(randomEl.symbol);
    }

    setCurrentElement(target);
    setOptions(Array.from(optionsSet).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateRound();
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const xpReward = Math.max(50, scoreRef.current * 18);
    setTimeout(() => {
      onAwardXP(xpReward, 'Periodic Table Rush');
    }, 0);
    try {
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    } catch {}
  }, [onAwardXP]);

  // Timer loop
  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, timeLeft, handleGameOver]);

  const handleSelectSymbol = (symbol: string) => {
    if (!currentElement || isGameOver) return;

    if (symbol === currentElement.symbol) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    generateRound();
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/80 mx-auto flex items-center justify-center text-cyan-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Lab Session Complete! 🧪</h2>
            <p className="text-xs text-slate-400 mt-0.5">Chemical Symbol Mastery</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Correct Matches</span>
              <span className="text-lg font-bold text-white font-mono">{score}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">XP Earned</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">+{Math.max(50, score * 18)} XP</span>
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
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow-sm"
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

        <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950 border border-cyan-700 rounded-xl text-xs font-mono font-bold text-cyan-300">
          <Timer className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
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
      <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-6">
        {currentElement && (
          <div className="w-full space-y-6 text-center">
            {/* Element Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <FlaskConical className="w-4 h-4" />
                <span>Element #{currentElement.atomicNumber}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentElement.name}
              </div>
              <span className="text-xs text-slate-400 block font-mono">
                {currentElement.group}
              </span>
            </div>

            {/* Symbols Selection */}
            <div className="grid grid-cols-2 gap-3">
              {options.map((sym, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSymbol(sym)}
                  className="py-4 px-3 rounded-2xl bg-slate-900 hover:bg-cyan-950/60 active:scale-95 border border-slate-800 hover:border-cyan-500 text-white font-mono text-2xl font-black transition-all shadow-sm"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
