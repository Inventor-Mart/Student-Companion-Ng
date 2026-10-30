import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, Dna, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrganismItem {
  name: string;
  category: 'Vertebrate' | 'Invertebrate';
  phylum: string;
}

const ORGANISMS_DATA: OrganismItem[] = [
  { name: 'Whale', category: 'Vertebrate', phylum: 'Class Mammalia' },
  { name: 'Earthworm', category: 'Invertebrate', phylum: 'Phylum Annelida' },
  { name: 'Bat', category: 'Vertebrate', phylum: 'Flying Mammal' },
  { name: 'Shark', category: 'Vertebrate', phylum: 'Cartilaginous Fish (Chondrichthyes)' },
  { name: 'Butterfly', category: 'Invertebrate', phylum: 'Phylum Arthropoda (Insecta)' },
  { name: 'Snail', category: 'Invertebrate', phylum: 'Phylum Mollusca' },
  { name: 'Toad', category: 'Vertebrate', phylum: 'Class Amphibia' },
  { name: 'Lizard', category: 'Vertebrate', phylum: 'Class Reptilia' },
  { name: 'Spider', category: 'Invertebrate', phylum: 'Phylum Arthropoda (Arachnida)' },
  { name: 'Eagle', category: 'Vertebrate', phylum: 'Class Aves (Birds)' },
  { name: 'Jellyfish', category: 'Invertebrate', phylum: 'Phylum Cnidaria' },
  { name: 'Octopus', category: 'Invertebrate', phylum: 'Phylum Mollusca (Cephalopoda)' },
  { name: 'Crab', category: 'Invertebrate', phylum: 'Phylum Arthropoda (Crustacea)' },
  { name: 'Crocodile', category: 'Vertebrate', phylum: 'Class Reptilia' }
];

export const BioSortGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentOrganism, setCurrentOrganism] = useState<OrganismItem | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateRound = () => {
    const target = ORGANISMS_DATA[Math.floor(Math.random() * ORGANISMS_DATA.length)];
    setCurrentOrganism(target);
    setFeedback(null);
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
      onAwardXP(xpReward, 'Bio-Sort Classifier');
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

  const handleClassify = (chosenCategory: 'Vertebrate' | 'Invertebrate') => {
    if (!currentOrganism || isGameOver) return;

    if (chosenCategory === currentOrganism.category) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      generateRound();
    }, 200);
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-teal-950 border border-teal-500/80 mx-auto flex items-center justify-center text-teal-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Taxonomy Sorted! 🦠</h2>
            <p className="text-xs text-slate-400 mt-0.5">Living Things Classification</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Correct Organisms</span>
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
              className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors shadow-sm"
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

        <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-950 border border-teal-700 rounded-xl text-xs font-mono font-bold text-teal-300">
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
        {currentOrganism && (
          <div className="w-full space-y-6 text-center">
            {/* Organism Card */}
            <div
              className={`p-6 rounded-3xl border shadow-md space-y-2 transition-all ${
                feedback === 'correct'
                  ? 'bg-emerald-950/70 border-emerald-500'
                  : feedback === 'wrong'
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Dna className="w-4 h-4" />
                <span>Classify Organism</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentOrganism.name}
              </div>
              <span className="text-xs text-slate-400 block font-mono">
                {currentOrganism.phylum}
              </span>
            </div>

            {/* Binary Sorting Triggers */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleClassify('Vertebrate')}
                className="py-5 px-3 rounded-2xl bg-slate-900 hover:bg-emerald-950/70 active:scale-95 border border-slate-800 hover:border-emerald-500 text-white transition-all shadow-sm flex flex-col items-center justify-center gap-1"
              >
                <span className="font-extrabold text-base sm:text-lg text-emerald-400">VERTEBRATE</span>
                <span className="text-[10px] text-slate-400">Has Backbone</span>
              </button>

              <button
                onClick={() => handleClassify('Invertebrate')}
                className="py-5 px-3 rounded-2xl bg-slate-900 hover:bg-indigo-950/70 active:scale-95 border border-slate-800 hover:border-indigo-500 text-white transition-all shadow-sm flex flex-col items-center justify-center gap-1"
              >
                <span className="font-extrabold text-base sm:text-lg text-indigo-400">INVERTEBRATE</span>
                <span className="text-[10px] text-slate-400">No Backbone</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
