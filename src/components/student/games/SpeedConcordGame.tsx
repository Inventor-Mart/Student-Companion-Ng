import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Timer, Flame, RotateCcw, ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConcordQuestion {
  sentence: string;
  correctOption: string;
  wrongOption: string;
  ruleExplanation: string;
}

const CONCORD_QUESTIONS: ConcordQuestion[] = [
  {
    sentence: 'Neither the principal nor the teachers ___ at the assembly hall.',
    correctOption: 'were',
    wrongOption: 'was',
    ruleExplanation: 'Rule of Proximity: When subjects are joined by "neither... nor", the verb agrees with the closer subject ("teachers" -> plural "were").'
  },
  {
    sentence: 'Bread and butter ___ his customary morning meal.',
    correctOption: 'is',
    wrongOption: 'are',
    ruleExplanation: 'Singular Idea / Unit: When two nouns express a collective single idea (food combination), a singular verb is required.'
  },
  {
    sentence: 'The committee ___ reached a unanimous decision.',
    correctOption: 'has',
    wrongOption: 'have',
    ruleExplanation: 'Collective Noun as a Unit: When the committee acts unanimously as one single body, the singular verb "has" is used.'
  },
  {
    sentence: 'Ten thousand naira ___ a reasonable price for this scientific calculator.',
    correctOption: 'is',
    wrongOption: 'are',
    ruleExplanation: 'Quantity & Money: Specific sums of money, periods of time, and distances take a singular verb when considered as a total amount.'
  },
  {
    sentence: 'The governor, accompanied by his commissioners, ___ arrived in Lagos.',
    correctOption: 'has',
    wrongOption: 'have',
    ruleExplanation: 'Parenthetical Additions: Phrases like "accompanied by" or "as well as" do not alter the number of the true subject ("The governor" -> "has").'
  },
  {
    sentence: 'The police ___ patrolling the streets during the holiday.',
    correctOption: 'are',
    wrongOption: 'is',
    ruleExplanation: '"Police" is an inherently plural collective noun in English and consistently requires a plural verb ("are").'
  },
  {
    sentence: 'One of the girls who ___ in King’s College debate team won the gold medal.',
    correctOption: 'participate',
    wrongOption: 'participates',
    ruleExplanation: 'Relative Pronoun Concord: "Who" refers back to the antecedent plural noun "girls", requiring the plural verb "participate".'
  },
  {
    sentence: 'Every boy and girl in the school ___ a Student Companion account.',
    correctOption: 'has',
    wrongOption: 'have',
    ruleExplanation: 'Distributive Words: "Each", "every", and "either" take a singular verb even when compounding multiple subjects.'
  },
  {
    sentence: 'Measles ___ an infectious viral disease affecting children.',
    correctOption: 'is',
    wrongOption: 'are',
    ruleExplanation: 'Names of diseases (measles, mumps) and disciplines (physics, economics) ending in -s take a singular verb.'
  },
  {
    sentence: 'Either Chidi or his cousins ___ the keys to the laboratory.',
    correctOption: 'have',
    wrongOption: 'has',
    ruleExplanation: 'Rule of Proximity: The plural subject "his cousins" is closest to the verb slot, so plural "have" is correct.'
  }
];

export const SpeedConcordGame: React.FC<{
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}> = ({ onExit, onAwardXP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<ConcordQuestion | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [lastExplanation, setLastExplanation] = useState<string | null>(null);

  const generateRound = () => {
    const q = CONCORD_QUESTIONS[Math.floor(Math.random() * CONCORD_QUESTIONS.length)];
    setCurrentQ(q);
    setOptions(Math.random() > 0.5 ? [q.correctOption, q.wrongOption] : [q.wrongOption, q.correctOption]);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    const xpReward = Math.max(50, scoreRef.current * 20);
    setTimeout(() => {
      onAwardXP(xpReward, 'Speed Concord');
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

  const handleAnswer = (chosen: string) => {
    if (!currentQ || isGameOver) return;

    if (chosen === currentQ.correctOption) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setLastExplanation(null);
    } else {
      setStreak(0);
      setLastExplanation(currentQ.ruleExplanation);
    }

    generateRound();
  };

  if (isGameOver) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 space-y-4 touch-pan-y text-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 max-w-sm w-full space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/80 mx-auto flex items-center justify-center text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Grammar Drill Finished! ✍️</h2>
            <p className="text-xs text-slate-400 mt-0.5">WAEC Concord Proficiency</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Correct Rules</span>
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
                setLastExplanation(null);
                generateRound();
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
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center justify-center max-w-sm mx-auto w-full space-y-5">
        {currentQ && (
          <div className="w-full space-y-5 text-center">
            {/* Sentence Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Fill the Correct Verb</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.sentence}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="py-4 px-3 rounded-2xl bg-slate-900 hover:bg-emerald-950/70 active:scale-95 border border-slate-800 hover:border-emerald-500 text-white font-bold text-lg transition-all shadow-sm"
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Last Rule Feedback if Missed */}
            {lastExplanation && (
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-3 text-left text-xs text-amber-200 space-y-1">
                <span className="font-bold text-amber-400 block text-[11px]">Grammar Rule Reminder:</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">{lastExplanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
