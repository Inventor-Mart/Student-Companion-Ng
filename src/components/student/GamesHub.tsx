import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gamepad2,
  Trophy,
  Play,
  Zap,
  Timer,
  Award,
  FlaskConical,
  BookOpen,
  MapPin,
  Dna,
  Binary,
  Volume2,
  Globe,
  Boxes,
  Sparkles,
  Coffee,
  Flame,
  Gem
} from 'lucide-react';

import { MathSprintGame } from './games/MathSprintGame';
import { PeriodicTableGame } from './games/PeriodicTableGame';
import { SpeedConcordGame } from './games/SpeedConcordGame';
import { WordScrambleGame } from './games/WordScrambleGame';
import { NigerianGeoGame } from './games/NigerianGeoGame';
import { FormulaMasterGame } from './games/FormulaMasterGame';
import { BioSortGame } from './games/BioSortGame';
import { SpellingBeeGame } from './games/SpellingBeeGame';
import { CurrentAffairsGame } from './games/CurrentAffairsGame';
import { TetrisGame } from './games/TetrisGame';
import { Match3Game } from './games/Match3Game';
import { SnakeGame } from './games/SnakeGame';

type GameId =
  | 'hub'
  | 'snake'
  | 'tetris'
  | 'match_3'
  | 'spelling_bee'
  | 'current_affairs'
  | 'math_sprint'
  | 'periodic_table'
  | 'speed_concord'
  | 'word_scramble'
  | 'nigerian_geo'
  | 'formula_master'
  | 'bio_sort';

export const GamesHub: React.FC = () => {
  const { student, addStudentXP } = useApp();
  const [activeGame, setActiveGame] = useState<GameId>('hub');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'RELAX' | 'STEM' | 'ARTS' | 'CIVICS'>('ALL');

  if (activeGame === 'snake') {
    return <SnakeGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'tetris') {
    return <TetrisGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'match_3') {
    return <Match3Game onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'spelling_bee') {
    return <SpellingBeeGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'current_affairs') {
    return <CurrentAffairsGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'math_sprint') {
    return <MathSprintGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'periodic_table') {
    return <PeriodicTableGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'speed_concord') {
    return <SpeedConcordGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'word_scramble') {
    return <WordScrambleGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'nigerian_geo') {
    return <NigerianGeoGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'formula_master') {
    return <FormulaMasterGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  if (activeGame === 'bio_sort') {
    return <BioSortGame onExit={() => setActiveGame('hub')} onAwardXP={addStudentXP} />;
  }

  const allGames = [
    {
      id: 'math_sprint' as GameId,
      title: 'WAEC Math Sprint',
      subject: 'Mathematics',
      category: 'STEM',
      description: '60-second rapid mental arithmetic, powers & linear equations',
      duration: '60 Seconds',
      xpReward: 150,
      icon: Zap,
      accentColor: 'text-purple-400',
      bgBorder: 'border-purple-800/40 from-slate-900 to-purple-950/40',
      btnColor: 'bg-purple-600 hover:bg-purple-500'
    },
    {
      id: 'spelling_bee' as GameId,
      title: 'National Spelling Bee',
      subject: 'English & Vocabulary',
      category: 'ARTS',
      description: 'Infinite-level spelling tournament with speech pronunciation, definitions & progressive difficulty',
      duration: 'Endless Run (3 Lives)',
      xpReward: 300,
      icon: Volume2,
      accentColor: 'text-amber-400',
      bgBorder: 'border-amber-500/40 from-slate-900 via-slate-900 to-amber-950/40',
      btnColor: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black'
    },
    {
      id: 'periodic_table' as GameId,
      title: 'Periodic Table Rush',
      subject: 'Chemistry',
      category: 'STEM',
      description: 'Match element names to Latin & modern symbols (e.g. Potassium → K, Lead → Pb)',
      duration: '45 Seconds',
      xpReward: 180,
      icon: FlaskConical,
      accentColor: 'text-cyan-400',
      bgBorder: 'border-cyan-800/40 from-slate-900 to-cyan-950/40',
      btnColor: 'bg-cyan-600 hover:bg-cyan-500'
    },
    {
      id: 'speed_concord' as GameId,
      title: 'Speed Concord',
      subject: 'English Language',
      category: 'ARTS',
      description: 'Trap hunter for tricky WAEC subject-verb agreement rules & collective nouns',
      duration: '45 Seconds',
      xpReward: 200,
      icon: BookOpen,
      accentColor: 'text-emerald-400',
      bgBorder: 'border-emerald-800/40 from-slate-900 to-emerald-950/40',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500'
    },
    {
      id: 'word_scramble' as GameId,
      title: 'WAEC Word Scramble',
      subject: 'Vocabulary & Literature',
      category: 'ARTS',
      description: 'Unscramble high-yield academic terminology from clues and definitions',
      duration: '60 Seconds',
      xpReward: 250,
      icon: Binary,
      accentColor: 'text-amber-400',
      bgBorder: 'border-amber-800/40 from-slate-900 to-amber-950/40',
      btnColor: 'bg-amber-600 hover:bg-amber-500'
    },
    {
      id: 'nigerian_geo' as GameId,
      title: 'Nigerian Geo & Civics Blitz',
      subject: 'Civic Education & History',
      category: 'CIVICS',
      description: 'Test recall on Nigeria’s 36 states, capitals, historical slogans & mineral wealth',
      duration: '45 Seconds',
      xpReward: 180,
      icon: MapPin,
      accentColor: 'text-emerald-400',
      bgBorder: 'border-emerald-800/40 from-slate-900 to-emerald-950/40',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500'
    },
    {
      id: 'formula_master' as GameId,
      title: 'Formula Master',
      subject: 'Physics & Calculations',
      category: 'STEM',
      description: 'Pair physics & math physical quantities with their formulas and SI units',
      duration: '45 Seconds',
      xpReward: 200,
      icon: Zap,
      accentColor: 'text-blue-400',
      bgBorder: 'border-blue-800/40 from-slate-900 to-blue-950/40',
      btnColor: 'bg-blue-600 hover:bg-blue-500'
    },
    {
      id: 'bio_sort' as GameId,
      title: 'Bio-Sort Classifier',
      subject: 'Biology & Living Things',
      category: 'STEM',
      description: 'Rapid taxonomy sorting: classify animals into Vertebrate vs Invertebrate phyla',
      duration: '45 Seconds',
      xpReward: 180,
      icon: Dna,
      accentColor: 'text-teal-400',
      bgBorder: 'border-teal-800/40 from-slate-900 to-teal-950/40',
      btnColor: 'bg-teal-600 hover:bg-teal-500'
    },
    {
      id: 'current_affairs' as GameId,
      title: 'Endless Current Affairs',
      subject: 'Civics, History & Global Affairs',
      category: 'CIVICS',
      description: 'Infinite quiz stream: choose Nigeria (36 states, leaders, history) or The World (geopolitics, capitals)',
      duration: 'Endless Run (3 Lives)',
      xpReward: 300,
      icon: Globe,
      accentColor: 'text-emerald-400',
      bgBorder: 'border-emerald-500/40 from-slate-900 via-slate-900 to-teal-950/40',
      btnColor: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black'
    },
    {
      id: 'snake' as GameId,
      title: 'Classic Arcade Snake',
      subject: 'Relaxation & Reflex Training',
      category: 'RELAX',
      description: 'Classic slither action with speed-scaling difficulty, touch gestures, thumb D-pad & high-score tracking',
      duration: 'Endless Slither',
      xpReward: 150,
      icon: Flame,
      accentColor: 'text-emerald-400',
      bgBorder: 'border-emerald-500/40 from-slate-900 via-slate-900 to-emerald-950/40',
      btnColor: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black'
    },
    {
      id: 'tetris' as GameId,
      title: 'Block Drop: Tetris',
      subject: 'Relaxation & Spatial Logic',
      category: 'RELAX',
      description: 'Stack and rotate classic falling bricks, complete lines, hold pieces, and unwind from intense study sessions',
      duration: 'Endless Run',
      xpReward: 150,
      icon: Boxes,
      accentColor: 'text-cyan-400',
      bgBorder: 'border-cyan-500/40 from-slate-900 via-slate-900 to-cyan-950/40',
      btnColor: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black'
    },
    {
      id: 'match_3' as GameId,
      title: 'Match-3 Gem Blitz',
      subject: 'Relaxation & Jewel Strategy',
      category: 'RELAX',
      description: 'Endless chill jewel matching puzzle with chain cascades, laser power gems, rainbow stars & hint finder',
      duration: 'Endless Chill',
      xpReward: 150,
      icon: Gem,
      accentColor: 'text-pink-400',
      bgBorder: 'border-pink-500/40 from-slate-900 via-slate-900 to-pink-950/40',
      btnColor: 'bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-400 hover:to-rose-300 text-slate-950 font-black'
    }
  ];

  const filteredGames = allGames.filter(g => {
    if (filterCategory === 'ALL') return true;
    return g.category === filterCategory;
  });

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Games & Relaxation Hub</span>
            <span className="text-[10px] text-cyan-400 font-normal px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center gap-1">
              <Coffee className="w-3 h-3" /> Study Breaks
            </span>
          </h2>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {allGames.length} Games Available
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Reinforce academic mastery or refresh your brain with addictive casual relaxation games
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'ALL', label: `All (${allGames.length})` },
          { id: 'RELAX', label: 'Relax & Breaks ☕' },
          { id: 'STEM', label: 'STEM & Science' },
          { id: 'ARTS', label: 'English & Literature' },
          { id: 'CIVICS', label: 'Civics & Geography' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterCategory === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Games Cards Grid */}
      <div className="space-y-3">
        {filteredGames.map(game => {
          const Icon = game.icon;

          return (
            <div
              key={game.id}
              className={`bg-gradient-to-br ${game.bgBorder} rounded-2xl p-4 border space-y-3 shadow-sm transition-all`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center ${game.accentColor} shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-white">{game.title}</h3>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className={`text-[11px] font-semibold ${game.accentColor}`}>
                        {game.subject}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 font-mono bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/60 shrink-0">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{game.xpReward} XP</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/70">
                <span className="flex items-center gap-1 font-mono">
                  <Timer className="w-3.5 h-3.5" />
                  {game.duration}
                </span>

                <button
                  onClick={() => setActiveGame(game.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 ${game.btnColor} text-white text-xs font-bold rounded-xl transition-colors shadow-sm`}
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Play Game</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
