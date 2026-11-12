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
  VolumeX,
  Globe,
  Boxes,
  Sparkles,
  Coffee,
  Flame,
  Gem,
  Lock,
  ArrowRight
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
import { getSoundMuted, toggleSoundMuted, playSound } from '../../utils/audioSynthesis';
import { motion } from 'motion/react';

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
  const {
    student,
    addStudentXP,
    openStudentSubscriptionModal,
    checkStudentFeatureAccess,
    recordDailyGameAttempt
  } = useApp();
  const [activeGame, setActiveGame] = useState<GameId>('hub');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'RELAX' | 'STEM' | 'ARTS' | 'CIVICS'>('ALL');
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  const handleToggleSound = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  const handleAwardGameXP = (amount: number, reason?: string) => {
    addStudentXP({
      feature: 'games',
      baseXP: amount,
      difficulty: 'medium',
      reason: reason || 'Educational Curriculum Game'
    });
  };

  if (activeGame === 'snake') {
    return <SnakeGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'tetris') {
    return <TetrisGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'match_3') {
    return <Match3Game onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'spelling_bee') {
    return <SpellingBeeGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'current_affairs') {
    return <CurrentAffairsGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'math_sprint') {
    return <MathSprintGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'periodic_table') {
    return <PeriodicTableGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'speed_concord') {
    return <SpeedConcordGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'word_scramble') {
    return <WordScrambleGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'nigerian_geo') {
    return <NigerianGeoGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'formula_master') {
    return <FormulaMasterGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
  }

  if (activeGame === 'bio_sort') {
    return <BioSortGame onExit={() => setActiveGame('hub')} onAwardXP={handleAwardGameXP} />;
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
      accentColor: 'text-[#FF5B00]',
      cardBorder: 'border-[#FF5B00]/40 hover:border-[#FF5B00]',
      cardBg: 'from-[#1E162E] to-[#120E22]',
      btnBg: 'bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] hover:from-[#E04800] hover:to-[#FF5B00]'
    },
    {
      id: 'spelling_bee' as GameId,
      title: 'National Spelling Bee',
      subject: 'English & Vocabulary',
      category: 'ARTS',
      description: 'Infinite-level spelling tournament with speech pronunciation & definitions',
      duration: 'Endless Run',
      xpReward: 300,
      icon: Volume2,
      accentColor: 'text-[#84CC16]',
      cardBorder: 'border-[#84CC16]/40 hover:border-[#84CC16]',
      cardBg: 'from-[#12241C] to-[#0A1612]',
      btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-slate-950 font-black hover:opacity-95'
    },
    {
      id: 'periodic_table' as GameId,
      title: 'Periodic Table Rush',
      subject: 'Chemistry',
      category: 'STEM',
      description: 'Match element names to Latin & modern symbols (e.g. Potassium → K)',
      duration: '45 Seconds',
      xpReward: 180,
      icon: FlaskConical,
      accentColor: 'text-cyan-400',
      cardBorder: 'border-cyan-500/40 hover:border-cyan-400',
      cardBg: 'from-[#112433] to-[#0A1520]',
      btnBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
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
      accentColor: 'text-[#84CC16]',
      cardBorder: 'border-[#84CC16]/40 hover:border-[#84CC16]',
      cardBg: 'from-[#15261F] to-[#0D1814]',
      btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-slate-950 font-black'
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
      accentColor: 'text-[#FF5B00]',
      cardBorder: 'border-[#FF5B00]/40 hover:border-[#FF5B00]',
      cardBg: 'from-[#241A16] to-[#140E0C]',
      btnBg: 'bg-gradient-to-r from-[#FF5B00] to-[#FF7A18]'
    },
    {
      id: 'nigerian_geo' as GameId,
      title: 'Nigerian Geo Blitz',
      subject: 'Civics & History',
      category: 'CIVICS',
      description: 'Test recall on Nigeria’s 36 states, capitals, slogans & mineral wealth',
      duration: '45 Seconds',
      xpReward: 180,
      icon: MapPin,
      accentColor: 'text-[#84CC16]',
      cardBorder: 'border-[#84CC16]/40 hover:border-[#84CC16]',
      cardBg: 'from-[#12241C] to-[#0B1712]',
      btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-slate-950 font-black'
    },
    {
      id: 'formula_master' as GameId,
      title: 'Formula Master',
      subject: 'Physics & Calculations',
      category: 'STEM',
      description: 'Pair physics & math quantities with formulas and SI units',
      duration: '45 Seconds',
      xpReward: 200,
      icon: Zap,
      accentColor: 'text-[#FF5B00]',
      cardBorder: 'border-[#FF5B00]/40 hover:border-[#FF5B00]',
      cardBg: 'from-[#241818] to-[#140E0E]',
      btnBg: 'bg-gradient-to-r from-[#FF5B00] to-[#FF7A18]'
    },
    {
      id: 'bio_sort' as GameId,
      title: 'Bio-Sort Classifier',
      subject: 'Biology & Living Things',
      category: 'STEM',
      description: 'Rapid taxonomy sorting: classify animals into Vertebrate vs Invertebrate',
      duration: '45 Seconds',
      xpReward: 180,
      icon: Dna,
      accentColor: 'text-[#84CC16]',
      cardBorder: 'border-[#84CC16]/40 hover:border-[#84CC16]',
      cardBg: 'from-[#15261F] to-[#0D1814]',
      btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-slate-950 font-black'
    },
    {
      id: 'current_affairs' as GameId,
      title: 'Current Affairs & Civics',
      subject: 'National & Global',
      category: 'CIVICS',
      description: 'Fast-paced quiz on Nigerian leaders, governance, ECOWAS & national symbols',
      duration: '60 Seconds',
      xpReward: 220,
      icon: Globe,
      accentColor: 'text-amber-400',
      cardBorder: 'border-amber-500/40 hover:border-amber-400',
      cardBg: 'from-[#241D12] to-[#14100A]',
      btnBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black'
    },
    {
      id: 'snake' as GameId,
      title: 'Curriculum Snake',
      subject: 'Reflexes & Brain Refresh',
      category: 'RELAX',
      description: 'Eat academic topic orbs to grow without hitting walls. Clean, responsive & smooth.',
      duration: 'Endless Run',
      xpReward: 100,
      icon: Flame,
      accentColor: 'text-[#84CC16]',
      cardBorder: 'border-[#84CC16]/40 hover:border-[#84CC16]',
      cardBg: 'from-[#12241C] to-[#0A1612]',
      btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-slate-950 font-black'
    },
    {
      id: 'tetris' as GameId,
      title: 'Formula Block Tetris',
      subject: 'Spatial Logic & Relaxation',
      category: 'RELAX',
      description: 'Clear lines with falling tetrominoes. Smooth drop mechanics & score tracking.',
      duration: 'Endless Run',
      xpReward: 120,
      icon: Boxes,
      accentColor: 'text-purple-400',
      cardBorder: 'border-purple-500/40 hover:border-purple-400',
      cardBg: 'from-[#201433] to-[#120B1F]',
      btnBg: 'bg-gradient-to-r from-purple-600 to-indigo-600'
    },
    {
      id: 'match_3' as GameId,
      title: 'Elemental Match-3',
      subject: 'Combo Reflexes',
      category: 'RELAX',
      description: 'Swap glowing element gems to create 3-in-a-row explosions and score multipliers.',
      duration: 'Timed 90s',
      xpReward: 150,
      icon: Gem,
      accentColor: 'text-[#FF5B00]',
      cardBorder: 'border-[#FF5B00]/40 hover:border-[#FF5B00]',
      cardBg: 'from-[#26151E] to-[#160C11]',
      btnBg: 'bg-gradient-to-r from-[#FF5B00] to-[#FF7A18]'
    }
  ];

  const filteredGames = allGames.filter(g => {
    if (filterCategory === 'ALL') return true;
    return g.category === filterCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y text-slate-100 bg-[#101C34]">
      {/* =========================================================================
          GAMES HERO & ARCADE STATS (Electric Orange & Lime Green Theme)
         ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#18264A] via-[#1E1238] to-[#18264A] border-2 border-[#84CC16]/40 shadow-2xl">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-[#84CC16] bg-[#84CC16]/10 px-2 py-0.5 rounded-full border border-[#84CC16]/30 uppercase tracking-wider">
                Arcade & Brain Gym
              </span>
              <span className="text-[10px] font-bold text-[#FF5B00] bg-[#FF5B00]/10 px-2 py-0.5 rounded-full border border-[#FF5B00]/30">
                {allGames.length} Games Ready
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
              <span>Games Hub</span>
              <span>🎮</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm">
              Reinforce WAEC, NECO & JAMB concepts with rapid brain challenges and earn streak XP!
            </p>
          </div>

          {/* Quick Sound FX & Leaderboard Actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-sm ${
                isMuted
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/40 hover:bg-[#84CC16]/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#84CC16]" />}
              <span>{isMuted ? 'Muted' : 'Audio Active'}</span>
            </button>

            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 font-mono bg-amber-950/80 px-2.5 py-1 rounded-xl border border-amber-800/60">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{student.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CATEGORY FILTER TABS (Tactile Tap Sounds & Active Indicators)
         ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'ALL', label: `All Games (${allGames.length})` },
          { id: 'STEM', label: 'STEM & Calculations ⚡' },
          { id: 'ARTS', label: 'English & Vocab 📚' },
          { id: 'CIVICS', label: 'Civics & Geo 🗺️' },
          { id: 'RELAX', label: 'Brain Refresh ☕' }
        ].map(tab => {
          const isActive = filterCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSound.tileTap();
                setFilterCategory(tab.id as any);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#84CC16] text-slate-950 shadow-md shadow-[#84CC16]/20 border border-white'
                  : 'bg-[#14203D] text-slate-300 hover:text-white hover:bg-[#1A2A50] border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          GAMES BENTO GRID (2-Column Responsive Layout Matching User Images)
         ========================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
      >
        {filteredGames.map((game, idx) => {
          const Icon = game.icon;

          return (
            <motion.div
              key={game.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${game.cardBg} rounded-3xl p-4 border-2 ${game.cardBorder} shadow-xl flex flex-col justify-between space-y-3 cursor-pointer select-none group relative overflow-hidden`}
              onClick={() => {
                playSound.tileTap();
                const access = checkStudentFeatureAccess('games', { gameId: game.id });
                if (!access.hasAccess) {
                  openStudentSubscriptionModal(access.requiredPlan || 'basic');
                  return;
                }
                setActiveGame(game.id);
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-[#101C34] border border-white/10 flex items-center justify-center ${game.accentColor} shrink-0 shadow-inner group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-black text-white group-hover:text-white tracking-tight">
                          {game.title}
                        </h3>
                      </div>
                      <span className={`text-[11px] font-bold ${game.accentColor} block mt-0.5`}>
                        {game.subject}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#84CC16] font-mono bg-[#84CC16]/10 px-2 py-0.5 rounded-lg border border-[#84CC16]/30 shrink-0">
                    <Award className="w-3.5 h-3.5" />
                    <span>+{game.xpReward} XP</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-snug line-clamp-2">
                  {game.description}
                </p>
              </div>

              {/* Bottom Card Action Bar */}
              {(() => {
                const access = checkStudentFeatureAccess('games', { gameId: game.id });
                const todayStr = new Date().toISOString().split('T')[0];
                const dailyData = student.addOns?.dailyGameAttempts;
                const attemptsToday = dailyData?.date === todayStr ? (dailyData?.attempts?.[game.id] || 0) : 0;
                const isFreeDailyExhausted = (student.subscriptionPlan || 'free') === 'free' && attemptsToday >= 1;

                return (
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2.5 border-t border-white/10">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                      <Timer className="w-3.5 h-3.5 text-slate-400" />
                      {game.duration}
                    </span>

                    {!access.hasAccess ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound.tileTap();
                          openStudentSubscriptionModal(access.requiredPlan || 'basic');
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5B00] hover:bg-[#E04800] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Unlock ({access.requiredPlan === 'basic' ? 'Basic' : 'Standard'})</span>
                      </button>
                    ) : isFreeDailyExhausted ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound.tileTap();
                          openStudentSubscriptionModal('basic');
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5B00]/90 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Daily Life Used</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound.tileTap();
                          if ((student.subscriptionPlan || 'free') === 'free') {
                            recordDailyGameAttempt(game.id);
                          }
                          setActiveGame(game.id);
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 ${game.btnBg} text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer group-hover:scale-105`}
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Play Now</span>
                      </button>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
