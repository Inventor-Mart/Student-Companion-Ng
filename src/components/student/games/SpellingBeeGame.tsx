import React, { useState, useEffect, useRef } from 'react';
import { getWordForLevel, SpellingWord } from '../../../data/spellingBeeData';
import { playSound, speakText } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Heart,
  Flame,
  Award,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send,
  Delete,
  Trophy
} from 'lucide-react';

interface SpellingBeeGameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

export const SpellingBeeGame: React.FC<SpellingBeeGameProps> = ({ onExit, onAwardXP }) => {
  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [earnedXP, setEarnedXP] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [gameState, setGameState] = useState<'PLAYING' | 'FEEDBACK_CORRECT' | 'FEEDBACK_WRONG' | 'GAME_OVER'>('PLAYING');
  const [currentWord, setCurrentWord] = useState<SpellingWord>(() => getWordForLevel(1));
  const [showDefinition, setShowDefinition] = useState<boolean>(true);
  const [showSentence, setShowSentence] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Load new word and speak on level change
  useEffect(() => {
    if (gameState === 'PLAYING') {
      const word = getWordForLevel(level);
      setCurrentWord(word);
      setInputValue('');
      setShowSentence(false);
      // Auto-pronounce word upon entering new level
      handleSpeakWord(word.word);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [level, gameState]);

  const handleSpeakWord = async (textToSpeak?: string) => {
    const text = textToSpeak || currentWord.word;
    setIsSpeaking(true);
    await speakText(text, 0.85);
    setIsSpeaking(false);
  };

  const handleSpeakDefinition = async () => {
    setIsSpeaking(true);
    await speakText(currentWord.definition, 0.95);
    setIsSpeaking(false);
  };

  const handleSpeakSentence = async () => {
    setIsSpeaking(true);
    const spokenSentence = currentWord.sentence.replace('_____', currentWord.word);
    await speakText(spokenSentence, 0.95);
    setIsSpeaking(false);
  };

  const handleSubmit = () => {
    if (!inputValue.trim() || gameState !== 'PLAYING') return;

    const cleanedInput = inputValue.trim().toUpperCase();
    const isCorrect = cleanedInput === currentWord.word.toUpperCase();

    if (isCorrect) {
      playSound.correct();
      const points = 50 + level * 10;
      setEarnedXP(prev => prev + points);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      onAwardXP(points, `Spelled "${currentWord.word}" (Level ${level})`);

      if (level % 5 === 0) {
        playSound.levelUp();
        try {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }

      setGameState('FEEDBACK_CORRECT');
      setTimeout(() => {
        setLevel(prev => prev + 1);
        setGameState('PLAYING');
      }, 1400);
    } else {
      playSound.buzz();
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setStreak(0);

      if (remainingLives <= 0) {
        playSound.gameOver();
        setGameState('GAME_OVER');
      } else {
        setGameState('FEEDBACK_WRONG');
      }
    }
  };

  const handlePass = () => {
    if (gameState !== 'PLAYING') return;
    playSound.buzz();
    const remainingLives = lives - 1;
    setLives(remainingLives);
    setStreak(0);

    if (remainingLives <= 0) {
      playSound.gameOver();
      setGameState('GAME_OVER');
    } else {
      setGameState('FEEDBACK_WRONG');
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setLives(3);
    setStreak(0);
    setEarnedXP(0);
    setInputValue('');
    setGameState('PLAYING');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const appendLetter = (char: string) => {
    if (gameState === 'PLAYING') {
      setInputValue(prev => prev + char);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const removeLetter = () => {
    if (gameState === 'PLAYING') {
      setInputValue(prev => prev.slice(0, -1));
      if (inputRef.current) inputRef.current.focus();
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-y-auto select-none">
      {/* 1. Header HUD */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hub</span>
        </button>

        {/* Level Indicator */}
        <div className="flex items-center gap-2">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">Difficulty</span>
            <div className="text-sm font-black text-emerald-400 font-mono tracking-tight">
              Level {level}
            </div>
          </div>
        </div>

        {/* Lives & Streak */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-700/50 rounded-xl px-2.5 py-1 text-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold font-mono">{streak}</span>
          </div>

          {/* 3 Lives */}
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

      {/* 2. Main Arena View */}
      {gameState === 'GAME_OVER' ? (
        /* GAME OVER SCREEN */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-4 shadow-xl shadow-rose-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-50">Spelling Bee Run Complete</h2>
          <p className="text-xs text-slate-400 mt-1">
            You reached <strong className="text-emerald-400">Level {level}</strong> in the National Spelling Bee tournament!
          </p>

          <div className="w-full my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-left">
            <div className="flex justify-between text-slate-400">
              <span>Final Level:</span>
              <span className="text-slate-100 font-bold font-mono">Level {level}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Longest Streak:</span>
              <span className="text-amber-400 font-bold font-mono">{bestStreak} correct in a row</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total XP Earned:</span>
              <span className="text-emerald-400 font-bold font-mono">+{earnedXP} XP</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-slate-400">
              <span>Last Word:</span>
              <span className="text-slate-200 font-bold tracking-wider">{currentWord.word}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={onExit}
              className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Exit to Hub
            </button>
            <button
              onClick={handleRestart}
              className="flex-[2] py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE PLAYING VIEW */
        <div className="flex-1 flex flex-col justify-between p-4 max-w-md mx-auto w-full space-y-4">
          {/* Word Audio Speaker Deck */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md text-center space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-emerald-400 uppercase tracking-wider">{currentWord.partOfSpeech}</span>
              {currentWord.origin && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Origin: {currentWord.origin}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="font-mono">{currentWord.word.length} Letters</span>
            </div>

            {/* Pronunciation Button */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => handleSpeakWord()}
                disabled={isSpeaking}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                  isSpeaking
                    ? 'bg-emerald-400 text-slate-950 scale-105 shadow-emerald-500/40 ring-4 ring-emerald-500/30'
                    : 'bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20 hover:scale-105'
                }`}
                title="Hear Word Pronunciation"
              >
                <Volume2 className={`w-9 h-9 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </button>
              <div className="text-[11px] text-slate-400 mt-2 font-medium">
                {isSpeaking ? 'Speaking word...' : 'Tap to hear word pronounced'}
              </div>
            </div>

            {/* Phonetic & Clues */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSpeakDefinition}
                className="py-1 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                <span>Hear Definition</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSentence(true);
                  handleSpeakSentence();
                }}
                className="py-1 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Context Sentence</span>
              </button>
            </div>

            {/* Definition Box */}
            {showDefinition && (
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Definition:</span>
                "{currentWord.definition}"
              </div>
            )}

            {/* Sentence Clue Box */}
            {showSentence && (
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-amber-700/40 text-xs text-amber-200/90 leading-relaxed text-left animate-in fade-in duration-150">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-0.5">Context Sentence:</span>
                "{currentWord.sentence}"
              </div>
            )}
          </div>

          {/* Feedback Overlay if Answered */}
          {gameState === 'FEEDBACK_CORRECT' && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-3 animate-in zoom-in-95 duration-150">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-300">Spell-Perfect! +{50 + level * 10} XP</div>
                <div className="text-sm font-black text-slate-100 tracking-wider font-mono">{currentWord.word}</div>
              </div>
            </div>
          )}

          {gameState === 'FEEDBACK_WRONG' && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-start justify-between gap-3 animate-in zoom-in-95 duration-150">
              <div className="flex items-start gap-2.5">
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-rose-300">Incorrect Spelling (-1 Life)</div>
                  <div className="text-sm font-black text-slate-100 tracking-wider font-mono mt-0.5">
                    Correct: <span className="text-emerald-400">{currentWord.word}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Phonetic: {currentWord.phonetic}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLevel(prev => prev + 1);
                  setGameState('PLAYING');
                }}
                className="py-1 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 shrink-0 cursor-pointer"
              >
                Next Word
              </button>
            </div>
          )}

          {/* 3. Input & Letter Entry Zone */}
          <div className="space-y-3">
            {/* Text Input Box */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                onKeyDown={handleKeyPress}
                placeholder="TYPE SPELLING HERE..."
                disabled={gameState !== 'PLAYING'}
                maxLength={30}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 border-2 border-slate-700 focus:border-emerald-500 text-center text-lg sm:text-xl font-mono font-black tracking-widest text-slate-100 placeholder:text-slate-600 focus:outline-none shadow-inner transition-colors"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <Delete className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Action Buttons: Pass & Submit */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePass}
                disabled={gameState !== 'PLAYING'}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer shrink-0"
              >
                Pass (-1 Life)
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!inputValue.trim() || gameState !== 'PLAYING'}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                <span>Submit Spelling</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
