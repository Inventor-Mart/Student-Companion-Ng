import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, Lightbulb, Delete, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WordItem {
  word: string;
  hint: string;
  subject: string;
}

const WORDS_DATA: WordItem[] = [
  { word: 'METAPHOR', hint: 'Figure of speech comparing two unlike things directly', subject: 'Literature' },
  { word: 'MEIOSIS', hint: 'Reduction cellular division yielding four haploid gametes', subject: 'Biology' },
  { word: 'OSMOSIS', hint: 'Diffusion of water across a semi-permeable membrane', subject: 'Biology / Science' },
  { word: 'ALLOTROPY', hint: 'Existence of an element in different physical forms (e.g. Diamond)', subject: 'Chemistry' },
  { word: 'MONOPOLY', hint: 'Market structure dominated by a single exclusive seller', subject: 'Economics' },
  { word: 'PARABOLA', hint: 'The geometric curved path traced by a projectile in flight', subject: 'Physics / Math' },
  { word: 'CATALYST', hint: 'Substance accelerating a chemical reaction without being consumed', subject: 'Chemistry' },
  { word: 'SOLILOQUY', hint: 'Dramatic speech delivered by an actor alone on stage', subject: 'Literature' },
  { word: 'ECOSYSTEM', hint: 'Biological community interacting with physical environment', subject: 'Biology' },
  { word: 'HYPOTHESIS', hint: 'A testable scientific proposition or educated guess', subject: 'Science' }
];

export const WordScrambleGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentWordItem, setCurrentWordItem] = useState<WordItem | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<{ id: number; char: string; used: boolean }[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const shuffleWord = (word: string) => {
    const chars = word.split('');
    let shuffled = [...chars];
    // Ensure it's not identical to original
    while (shuffled.join('') === word && word.length > 2) {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    }
    return shuffled.map((char, index) => ({ id: index, char, used: false }));
  };

  const setupNextWord = (nextIdx?: number) => {
    const idx = nextIdx !== undefined ? nextIdx : Math.floor(Math.random() * WORDS_DATA.length);
    const item = WORDS_DATA[idx % WORDS_DATA.length];
    setCurrentWordItem(item);
    setScrambledLetters(shuffleWord(item.word));
    setSelectedIndices([]);
    setWordIndex(idx);
  };

  useEffect(() => {
    setupNextWord();
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const xpReward = Math.max(50, scoreRef.current * 25);
    setTimeout(() => {
      onAwardXP(xpReward, 'WAEC Word Scramble');
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

  const handleTapLetter = (letterIndex: number) => {
    if (selectedIndices.includes(letterIndex) || isGameOver || !currentWordItem) return;

    const newSelected = [...selectedIndices, letterIndex];
    setSelectedIndices(newSelected);

    // Check if word is complete
    if (newSelected.length === currentWordItem.word.length) {
      const constructedWord = newSelected.map(i => scrambledLetters[i].char).join('');
      if (constructedWord === currentWordItem.word) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
        setTimeout(() => {
          setupNextWord(wordIndex + 1);
        }, 300);
      } else {
        // Incorrect word, reset selection
        setTimeout(() => {
          setSelectedIndices([]);
          setStreak(0);
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    if (selectedIndices.length === 0) return;
    setSelectedIndices(prev => prev.slice(0, prev.length - 1));
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-500/80 mx-auto flex items-center justify-center text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Scramble Completed! 🔤</h2>
            <p className="text-xs text-slate-400 mt-0.5">Vocabulary & Scientific Terminology</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Words Solved</span>
              <span className="text-lg font-bold text-white font-mono">{score}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">XP Earned</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">+{Math.max(50, score * 25)} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setTimeLeft(60);
                setScore(0);
                setStreak(0);
                setIsGameOver(false);
                setupNextWord(0);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>

            <button
              onClick={onExit}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors shadow-sm"
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

        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950 border border-amber-700 rounded-xl text-xs font-mono font-bold text-amber-300">
          <Timer className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-white font-bold">{score} solved</span>
          {streak >= 2 && (
            <span className="flex items-center gap-0.5 text-amber-400 text-[11px] font-bold">
              <Flame className="w-3 h-3 fill-amber-400" />
              {streak}x
            </span>
          )}
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-6">
        {currentWordItem && (
          <div className="w-full space-y-5 text-center">
            {/* Clue Card */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>{currentWordItem.subject} Clue</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{currentWordItem.hint}"
              </p>
            </div>

            {/* Answer Slots Display */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-[48px]">
              {Array.from({ length: currentWordItem.word.length }).map((_, idx) => {
                const selectedCharIndex = selectedIndices[idx];
                const char = selectedCharIndex !== undefined ? scrambledLetters[selectedCharIndex].char : '';

                return (
                  <div
                    key={idx}
                    className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-black text-lg transition-all ${
                      char
                        ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-sm'
                        : 'bg-slate-900 border-slate-700 text-transparent'
                    }`}
                  >
                    {char || '·'}
                  </div>
                );
              })}
            </div>

            {/* Scrambled Letter Tiles */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
              {scrambledLetters.map((item, idx) => {
                const isUsed = selectedIndices.includes(idx);

                return (
                  <button
                    key={item.id}
                    disabled={isUsed}
                    onClick={() => handleTapLetter(idx)}
                    className={`w-11 h-12 rounded-xl font-mono text-lg font-black transition-all shadow-sm flex items-center justify-center ${
                      isUsed
                        ? 'opacity-20 pointer-events-none bg-slate-900 border border-slate-800 text-slate-600'
                        : 'bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600 text-white hover:border-amber-400'
                    }`}
                  >
                    {item.char}
                  </button>
                );
              })}
            </div>

            {/* Action Bar (Backspace & Clear) */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleBackspace}
                disabled={selectedIndices.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Delete className="w-3.5 h-3.5" />
                <span>Undo Letter</span>
              </button>
              <button
                onClick={() => setSelectedIndices([])}
                disabled={selectedIndices.length === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-400 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
