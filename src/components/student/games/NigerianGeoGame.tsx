import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GeoQuestion {
  prompt: string;
  correctAnswer: string;
  options: string[];
}

const NIGERIAN_GEO_DATA = [
  { state: 'Taraba', capital: 'Jalingo', slogan: "Nature's Gift to the Nation" },
  { state: 'Adamawa', capital: 'Yola', slogan: 'Land of Beauty' },
  { state: 'Delta', capital: 'Asaba', slogan: 'The Big Heart' },
  { state: 'Plateau', capital: 'Jos', slogan: 'Home of Peace and Tourism' },
  { state: 'Kano', capital: 'Kano', slogan: 'Centre of Commerce' },
  { state: 'Cross River', capital: 'Calabar', slogan: "The People's Paradise" },
  { state: 'Oyo', capital: 'Ibadan', slogan: 'Pace Setter State' },
  { state: 'Enugu', capital: 'Enugu', slogan: 'Coal City State' },
  { state: 'Ogun', capital: 'Abeokuta', slogan: 'Gateway State' },
  { state: 'Benue', capital: 'Makurdi', slogan: 'Food Basket of the Nation' },
  { state: 'Rivers', capital: 'Port Harcourt', slogan: 'Treasure Base of the Nation' },
  { state: 'Kaduna', capital: 'Kaduna', slogan: 'Centre of Learning' }
];

export const NigerianGeoGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<GeoQuestion | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const generateQuestion = (): GeoQuestion => {
    const isCapitalQuestion = Math.random() > 0.4;
    const target = NIGERIAN_GEO_DATA[Math.floor(Math.random() * NIGERIAN_GEO_DATA.length)];

    if (isCapitalQuestion) {
      const prompt = `What is the state capital of ${target.state} State?`;
      const correctAnswer = target.capital;
      const optionsSet = new Set<string>([correctAnswer]);
      while (optionsSet.size < 4) {
        const rand = NIGERIAN_GEO_DATA[Math.floor(Math.random() * NIGERIAN_GEO_DATA.length)];
        optionsSet.add(rand.capital);
      }
      return { prompt, correctAnswer, options: Array.from(optionsSet).sort(() => Math.random() - 0.5) };
    } else {
      const prompt = `Which Nigerian state is officially nicknamed "${target.slogan}"?`;
      const correctAnswer = target.state;
      const optionsSet = new Set<string>([correctAnswer]);
      while (optionsSet.size < 4) {
        const rand = NIGERIAN_GEO_DATA[Math.floor(Math.random() * NIGERIAN_GEO_DATA.length)];
        optionsSet.add(rand.state);
      }
      return { prompt, correctAnswer, options: Array.from(optionsSet).sort(() => Math.random() - 0.5) };
    }
  };

  useEffect(() => {
    setCurrentQ(generateQuestion());
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const xpReward = Math.max(50, scoreRef.current * 18);
    setTimeout(() => {
      onAwardXP(xpReward, 'Nigerian Geo Blitz');
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

  const handleAnswer = (answer: string) => {
    if (!currentQ || isGameOver) return;

    if (answer === currentQ.correctAnswer) {
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
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/80 mx-auto flex items-center justify-center text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Geo Tour Complete! 🇳🇬</h2>
            <p className="text-xs text-slate-400 mt-0.5">Nigerian States & Capitals Speed</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Total Correct</span>
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
                setCurrentQ(generateQuestion());
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>

            <button
              onClick={onExit}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
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

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950 border border-emerald-700 rounded-xl text-xs font-mono font-bold text-emerald-300">
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
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-6">
        {currentQ && (
          <div className="w-full space-y-5 text-center">
            {/* Question Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Nigerian Geography & Civics</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.prompt}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="py-4 px-3 rounded-2xl bg-slate-900 hover:bg-emerald-950/70 active:scale-95 border border-slate-800 hover:border-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-sm"
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
