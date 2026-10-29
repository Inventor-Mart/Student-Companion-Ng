import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathQuestion {
  question: string;
  answer: number;
  options: number[];
}

export const MathSprintGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<MathQuestion | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Generate question
  const generateQuestion = (): MathQuestion => {
    const types = ['add', 'multiply', 'algebra', 'percentage'];
    const selectedType = types[Math.floor(Math.random() * types.length)];

    let qText = '';
    let answer = 0;

    if (selectedType === 'add') {
      const a = Math.floor(Math.random() * 80) + 15;
      const b = Math.floor(Math.random() * 80) + 15;
      qText = `${a} + ${b} = ?`;
      answer = a + b;
    } else if (selectedType === 'multiply') {
      const a = Math.floor(Math.random() * 12) + 4;
      const b = Math.floor(Math.random() * 12) + 3;
      qText = `${a} × ${b} = ?`;
      answer = a * b;
    } else if (selectedType === 'algebra') {
      const x = Math.floor(Math.random() * 15) + 2;
      const m = Math.floor(Math.random() * 5) + 2;
      const res = m * x;
      qText = `If ${m}x = ${res}, find x:`;
      answer = x;
    } else {
      const p = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
      const total = [200, 400, 800, 1200][Math.floor(Math.random() * 4)];
      qText = `${p}% of ${total} = ?`;
      answer = (p / 100) * total;
    }

    // Generate 4 distinct options
    const optionsSet = new Set<number>([answer]);
    while (optionsSet.size < 4) {
      const delta = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const wrong = answer + delta;
      if (wrong >= 0) optionsSet.add(wrong);
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    return { question: qText, answer, options };
  };

  useEffect(() => {
    setCurrentQ(generateQuestion());
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const xpReward = Math.max(50, scoreRef.current * 15);
    onAwardXP(xpReward, 'WAEC Math Sprint');
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
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

  const handleAnswer = (selected: number) => {
    if (!currentQ || isGameOver) return;

    if (selected === currentQ.answer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setCurrentQ(generateQuestion());
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-500/80 mx-auto flex items-center justify-center text-purple-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Sprint Finished!</h2>
            <p className="text-xs text-slate-400 mt-0.5">Speed Arithmetic Performance</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Total Correct</span>
              <span className="text-lg font-bold text-white font-mono">{score}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">XP Earned</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">+{Math.max(50, score * 15)} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setTimeLeft(60);
                setScore(0);
                setStreak(0);
                setIsGameOver(false);
                setCurrentQ(generateQuestion());
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>

            <button
              onClick={onExit}
              className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-sm"
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

        {/* Time Remaining */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-950 border border-purple-700 rounded-xl text-xs font-mono font-bold text-purple-300">
          <Timer className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        {/* Score & Streak */}
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

      {/* Main Game Stage */}
      <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-6">
        {currentQ && (
          <div className="w-full space-y-6 text-center">
            {/* Question Display */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-2">
                Rapid Mental Math
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-wider">
                {currentQ.question}
              </div>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="py-4 px-3 rounded-2xl bg-slate-900 hover:bg-purple-950/60 active:scale-95 border border-slate-800 hover:border-purple-600 text-white font-mono text-xl font-bold transition-all shadow-sm"
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
