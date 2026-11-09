import React, { useState, useEffect } from 'react';
import {
  CurrentAffairsQuestion,
  NIGERIA_CURRENT_AFFAIRS_BANK,
  WORLD_CURRENT_AFFAIRS_BANK,
  fetchNextEndlessQuestions
} from '../../../data/currentAffairsData';
import { playSound } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  Globe,
  MapPin,
  Heart,
  Flame,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CurrentAffairsGameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

export const CurrentAffairsGame: React.FC<CurrentAffairsGameProps> = ({ onExit, onAwardXP }) => {
  const [selectedScope, setSelectedScope] = useState<'nigeria' | 'world' | null>(null);
  const [questionQueue, setQuestionQueue] = useState<CurrentAffairsQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [earnedXP, setEarnedXP] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isPrefetching, setIsPrefetching] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'SELECT_SCOPE' | 'PLAYING' | 'GAME_OVER'>('SELECT_SCOPE');

  // Start selected scope with shuffled questions
  const handleSelectScope = async (scope: 'nigeria' | 'world') => {
    setSelectedScope(scope);
    const initialPool = scope === 'nigeria' ? NIGERIA_CURRENT_AFFAIRS_BANK : WORLD_CURRENT_AFFAIRS_BANK;
    const shuffled = [...initialPool].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    setCurrentQuestionIndex(0);
    setLives(3);
    setStreak(0);
    setTotalAnswered(0);
    setEarnedXP(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setGameState('PLAYING');

    // Background prefetch from Gemini AI to ensure endless stream
    prefetchMore(scope, shuffled.map(q => q.id));
  };

  const prefetchMore = async (scope: 'nigeria' | 'world', existingIds: string[]) => {
    if (isPrefetching) return;
    setIsPrefetching(true);
    try {
      const more = await fetchNextEndlessQuestions(scope, existingIds);
      if (more.length > 0) {
        setQuestionQueue(prev => [...prev, ...more]);
      }
    } catch {}
    setIsPrefetching(false);
  };

  const currentQ = questionQueue[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (hasAnswered || gameState !== 'PLAYING' || !currentQ) return;

    setSelectedOption(index);
    setHasAnswered(true);
    setTotalAnswered(prev => prev + 1);

    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      playSound.correct();
      const points = 30 + Math.min(streak * 5, 50);
      setEarnedXP(prev => prev + points);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        if (next % 5 === 0) {
          playSound.levelUp();
          try {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
          } catch {}
        }
        return next;
      });
      onAwardXP(points, `Current Affairs: ${selectedScope === 'nigeria' ? 'Nigeria' : 'World'} Streak`);
    } else {
      playSound.incorrect();
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setStreak(0);

      if (remainingLives <= 0) {
        playSound.gameOver();
        setTimeout(() => setGameState('GAME_OVER'), 1800);
      }
    }

    // Check if we need more endless questions
    if (questionQueue.length - currentQuestionIndex <= 4 && selectedScope) {
      prefetchMore(selectedScope, questionQueue.map(q => q.id));
    }
  };

  const handleNextQuestion = () => {
    if (lives <= 0) {
      setGameState('GAME_OVER');
      return;
    }

    setSelectedOption(null);
    setHasAnswered(false);

    if (currentQuestionIndex + 1 < questionQueue.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (selectedScope) {
      // Loop backup bank
      const backup = selectedScope === 'nigeria' ? NIGERIA_CURRENT_AFFAIRS_BANK : WORLD_CURRENT_AFFAIRS_BANK;
      setQuestionQueue(prev => [...prev, ...[...backup].sort(() => Math.random() - 0.5)]);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // 1. SCOPE SELECTION VIEW
  if (gameState === 'SELECT_SCOPE') {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-5 text-center text-slate-100 bg-[#070D18]">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3 shadow-xl shadow-emerald-500/10">
          <Globe className="w-8 h-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-50 tracking-tight">
          Endless Current Affairs Master
        </h1>
        <p className="text-xs text-slate-400 mt-1.5 max-w-sm leading-relaxed">
          Challenge your general knowledge with an infinite question stream. Select your championship track:
        </p>

        {/* Scope Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mt-6">
          {/* Track 1: Nigeria */}
          <button
            type="button"
            onClick={() => handleSelectScope('nigeria')}
            className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all text-left flex flex-col justify-between group shadow-lg cursor-pointer hover:scale-[1.02]"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <span>Nigeria</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                  36 States
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                National history, governance, constitution, leaders, mineral wealth & cultural heritage.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Start Nigeria Run</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Track 2: The World */}
          <button
            type="button"
            onClick={() => handleSelectScope('world')}
            className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 transition-all text-left flex flex-col justify-between group shadow-lg cursor-pointer hover:scale-[1.02]"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <span>The World</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 font-mono">
                  Global
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                World capitals, international organizations (UN, AU), geopolitics, landmarks & science discoveries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Start World Run</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <button
          onClick={onExit}
          className="mt-6 py-2 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Back to Games Hub
        </button>
      </div>
    );
  }

  // 2. GAME OVER VIEW
  if (gameState === 'GAME_OVER') {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto text-slate-100 bg-[#070D18] animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/10">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-50">Current Affairs Run Finished</h2>
        <p className="text-xs text-slate-400 mt-1">
          {selectedScope === 'nigeria' ? 'Nigeria Governance & History Track' : 'World Geopolitics & Capitals Track'}
        </p>

        <div className="w-full my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-left">
          <div className="flex justify-between text-slate-400">
            <span>Questions Solved:</span>
            <span className="text-slate-100 font-bold font-mono">{totalAnswered} Questions</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Longest Streak:</span>
            <span className="text-amber-400 font-bold font-mono">{bestStreak} in a row</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Total XP Earned:</span>
            <span className="text-emerald-400 font-bold font-mono">+{earnedXP} XP</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => handleSelectScope(selectedScope || 'nigeria')}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setGameState('SELECT_SCOPE')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Change Track
            </button>
            <button
              onClick={onExit}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Exit to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. ACTIVE PLAYING VIEW
  return (
    <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-y-auto select-none">
      {/* Top HUD */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={() => setGameState('SELECT_SCOPE')}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Track</span>
        </button>

        {/* Scope Pill */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
          {selectedScope === 'nigeria' ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nigeria Track</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-cyan-400">
              <Globe className="w-3.5 h-3.5" />
              <span>World Track</span>
            </span>
          )}
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono text-[11px]">Q#{totalAnswered + 1}</span>
        </div>

        {/* Lives & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-700/50 rounded-xl px-2.5 py-1 text-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold font-mono">{streak}</span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3].map(heartIndex => (
              <Heart
                key={heartIndex}
                className={`w-4 h-4 transition-all ${
                  heartIndex <= lives
                    ? 'text-rose-500 fill-rose-500 scale-100'
                    : 'text-slate-700 scale-90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Arena */}
      {currentQ ? (
        <div className="flex-1 flex flex-col justify-between p-4 max-w-md mx-auto w-full space-y-4">
          {/* Question Prompt Card */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-emerald-400">
                {currentQ.category}
              </span>
              <span className="font-mono text-slate-500">Streak Multiplier: ×{1 + Math.floor(streak / 3)}</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
                } else {
                  btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      hasAnswered && isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : hasAnswered && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Educational Explanation Box (Shown after answering) */}
          {hasAnswered && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <span>Fact & Background:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
          Loading next question stream...
        </div>
      )}
    </div>
  );
};
