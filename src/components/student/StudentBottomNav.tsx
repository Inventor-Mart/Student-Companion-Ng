import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Users, 
  User, 
  Sparkles, 
  BookOpen, 
  Atom, 
  MessageSquare, 
  Calendar, 
  Trophy, 
  X,
  ChevronUp,
  Volume2,
  VolumeX
} from 'lucide-react';
import { OTAFeatureKey } from '../../types';
import { PausedBadge } from '../common/AppUpdateGate';
import { playSound, toggleSoundMuted, getSoundMuted } from '../../utils/audioSynthesis';
import { motion, AnimatePresence } from 'motion/react';

export const StudentBottomNav: React.FC = () => {
  const { activeStudentTab, setActiveStudentTab, student, isFeatureEnabled } = useApp();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getSoundMuted());

  const handleTabClick = (tabId: any) => {
    playSound.tileTap();
    setActiveStudentTab(tabId);
    setIsMoreDrawerOpen(false);
  };

  const handleToggleMute = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  // 4 Primary tabs
  const primaryTabs: Array<{
    id: 'dashboard' | 'games' | 'tutors' | 'more';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    featureKey?: OTAFeatureKey;
  }> = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'games',
      label: 'Games',
      icon: Gamepad2,
      featureKey: 'gamesHub',
    },
    {
      id: 'tutors',
      label: 'Tutors',
      icon: Users,
      featureKey: 'tutorMarketplace',
    },
    {
      id: 'more',
      label: 'More',
      icon: User,
    },
  ];

  // Secondary hubs accessible in quick-access drawer; paused hubs remain visible with Paused indicator
  const secondaryHubs: Array<{
    id: 'ai-coach' | 'cbt' | 'exam-prep' | 'syllabus' | 'formulas' | 'community' | 'competitions';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    featureKey: OTAFeatureKey;
  }> = [
    { id: 'ai-coach', label: 'AI Study Coach', icon: Sparkles, color: 'text-[#84CC16] bg-[#84CC16]/10 border-[#84CC16]/30', featureKey: 'aiCoach' },
    { id: 'cbt', label: 'CBT Exam Drills', icon: Trophy, color: 'text-[#FF5B00] bg-[#FF5B00]/10 border-[#FF5B00]/30', featureKey: 'cbtExams' },
    { id: 'exam-prep', label: 'Prepare For Exam', icon: Calendar, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30', featureKey: 'examPrep' },
    { id: 'syllabus', label: 'Lesson Notes & NERDC', icon: BookOpen, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30', featureKey: 'lessonNotes' },
    { id: 'formulas', label: 'STEM Formulas Sheet', icon: Atom, color: 'text-purple-400 bg-purple-400/10 border-purple-400/30', featureKey: 'scienceFormulas' },
    { id: 'community', label: 'Student Forum', icon: MessageSquare, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', featureKey: 'communityForum' },
    { id: 'competitions', label: 'Competitions & League', icon: Trophy, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', featureKey: 'competitions' },
  ];

  return (
    <>
      {/* Sleek 4-Tab Bottom Dock with Lime Green Active Indicator */}
      <nav className="w-full bg-[#0D1527]/95 backdrop-blur-xl border-t border-slate-800/80 px-3 py-2 flex items-center justify-around shrink-0 z-30 select-none relative shadow-2xl">
        {/* Subtle decorative contour waves matching image 1 */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />

        {primaryTabs.map((item) => {
          const Icon = item.icon;
          const isMore = item.id === 'more';
          const isActive = isMore 
            ? isMoreDrawerOpen || (activeStudentTab !== 'dashboard' && activeStudentTab !== 'games' && activeStudentTab !== 'tutors')
            : activeStudentTab === item.id && !isMoreDrawerOpen;
          const isTabPaused = item.featureKey ? !isFeatureEnabled(item.featureKey) : false;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isMore) {
                  playSound.tileTap();
                  setIsMoreDrawerOpen(!isMoreDrawerOpen);
                } else {
                  handleTabClick(item.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#84CC16] font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {/* Vibrant Lime Green Top Glow Indicator for Active Tab */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-[#84CC16] shadow-[0_0_12px_#84CC16]"
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                />
              )}

              {isTabPaused && (
                <span className="absolute -top-1 right-1 px-1 py-0.2 rounded-full bg-amber-950 border border-amber-400/70 text-[8px] font-black text-amber-300 uppercase leading-tight">
                  Paused
                </span>
              )}

              <div
                className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#84CC16] scale-110 drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Floating Quick Mute / Sound FX Button */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg active:scale-90"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-[#84CC16]" />}
        </button>
      </nav>

      {/* "More Hubs" Drawer - Shows all learning hubs with Paused badge when paused */}
      <AnimatePresence>
        {isMoreDrawerOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring' as const, damping: 26, stiffness: 300 }}
              className="relative w-full max-w-lg mx-auto bg-[#101C34] border-t-2 border-[#84CC16]/40 rounded-t-3xl p-5 shadow-2xl z-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">All Learning Hubs</h3>
                    <p className="text-[11px] text-slate-400">Class: {student.classLevel} · {student.stream || 'General'}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMoreDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-4">
                {secondaryHubs.map((hub) => {
                  const Icon = hub.icon;
                  const isActive = activeStudentTab === hub.id;
                  const isPaused = !isFeatureEnabled(hub.featureKey);
                  return (
                    <button
                      key={hub.id}
                      onClick={() => handleTabClick(hub.id)}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer active:scale-97 ${
                        isActive
                          ? 'bg-[#18264A] border-[#84CC16] shadow-lg shadow-[#84CC16]/20'
                          : isPaused
                          ? 'bg-[#0E172B]/80 border-amber-500/40 hover:bg-[#14203D]'
                          : 'bg-[#0E172B] hover:bg-[#14203D] border-slate-800'
                      }`}
                    >
                      <div className={`p-2 rounded-xl border ${hub.color} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-white block truncate">
                          {hub.label}
                        </span>
                        {isPaused ? (
                          <div className="mt-1">
                            <PausedBadge />
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Tap to open
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
