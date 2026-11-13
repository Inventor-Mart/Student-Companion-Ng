import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS } from '../../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { compressImage } from '../../lib/storage';
import { NigerianClassLevel, OTAFeatureKey } from '../../types';
import { ExamPrepUnlockModal } from './exam-prep/ExamPrepUnlockModal';
import { FeatureMaintenanceGate } from '../common/FeatureMaintenanceView';
import {
  Flame,
  Wrench,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Camera,
  Play,
  Gamepad2,
  Users,
  CheckCircle2,
  Trophy,
  Atom,
  GraduationCap,
  Sparkles,
  KeyRound,
  Copy,
  Check,
  Compass,
  Star,
  Clock,
  Radio,
  Sliders,
  ChevronRight,
  Wifi,
  WifiOff,
  Bell,
  MessageSquare,
  Calendar,
  Lock,
  X,
  HelpCircle,
  FileText,
  School,
  CheckCircle
} from 'lucide-react';
import { AspirantDashboard } from './aspirant/AspirantDashboard';
import { SchoolMaterial } from '../../types';
import { playSound } from '../../utils/audioSynthesis';
import { motion, AnimatePresence } from 'motion/react';
import { NairaText, NairaSign } from '../../utils/currency';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    currentUserProfile,
    setActiveStudentTab,
    openNoteReader,
    startExam,
    setIsUniformModalOpen,
    updateStudentAvatar,
    updateStudentClass,
    tutorBookings,
    launchVirtualClassroom,
    examPrepState,
    schoolMaterials,
    linkStudentToSchool,
    openStudentSubscriptionModal,
    checkStudentFeatureAccess,
    isFeaturePaused
  } = useApp();

  const renderMaintenanceBadge = (featureKey: OTAFeatureKey) => {
    if (!isFeaturePaused(featureKey)) return null;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/95 border border-amber-400/70 text-amber-300 text-[10px] font-black uppercase tracking-wider shadow-sm shrink-0">
        <Wrench className="w-3 h-3" />
        <span>Maintenance</span>
      </span>
    );
  };

  const [isLinkSchoolModalOpen, setIsLinkSchoolModalOpen] = useState(false);
  const [inputSchoolCode, setInputSchoolCode] = useState('');
  const [linkFeedback, setLinkFeedback] = useState<string | null>(null);
  const [isExamPrepModalOpen, setIsExamPrepModalOpen] = useState(false);
  const [isCopiedLinkCode, setIsCopiedLinkCode] = useState(false);
  const [isParentLinkInfoOpen, setIsParentLinkInfoOpen] = useState(false);
  const [audioScrubProgress, setAudioScrubProgress] = useState(42);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Staggered pop sound trigger on initial mount
  useEffect(() => {
    const soundTimers: any[] = [];
    for (let i = 0; i < 8; i++) {
      const timer = setTimeout(() => {
        playSound.tilePop(i);
      }, 80 + i * 75);
      soundTimers.push(timer);
    }
    return () => soundTimers.forEach(clearTimeout);
  }, []);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const studentLinkCode = student.studentLinkCode || 'STU-8K2D';

  const handleCopyLinkCode = () => {
    playSound.tileTap();
    try {
      navigator.clipboard.writeText(studentLinkCode);
      setIsCopiedLinkCode(true);
      setTimeout(() => setIsCopiedLinkCode(false), 2500);
    } catch {
      setIsCopiedLinkCode(true);
      setTimeout(() => setIsCopiedLinkCode(false), 2500);
    }
  };

  const handleLinkSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound.tileTap();
    if (!inputSchoolCode.trim()) return;

    const success = linkStudentToSchool(inputSchoolCode.trim());
    if (success) {
      setLinkFeedback(`✓ Linked to school code ${inputSchoolCode.trim().toUpperCase()}!`);
      setTimeout(() => {
        setIsLinkSchoolModalOpen(false);
        setLinkFeedback(null);
        setInputSchoolCode('');
      }, 1500);
    } else {
      setLinkFeedback('✗ Could not link to school code. Please check and try again.');
    }
  };

  const displayName = student.name || currentUserProfile?.fullName || 'Scholar';
  const displaySchool = student.school || 'Secondary School';

  const getInitials = (name?: string | null): string => {
    if (!name || !name.trim()) return 'S';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'S';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 256, 0.7);
        if (compressed) {
          updateStudentAvatar(compressed);
        }
      } catch (err) {
        console.warn('Avatar compression error:', err);
      }
    }
  };

  // Rank progression details
  const getRankProgress = (xp: number) => {
    if (xp >= 15000) return { target: 20000, nextRank: 'Senior Prefect', percent: 100 };
    if (xp >= 7500) return { target: 15000, nextRank: 'Senior Boy', percent: Math.round(((xp - 7500) / 7500) * 100) };
    if (xp >= 2500) return { target: 7500, nextRank: 'Prefect', percent: Math.round(((xp - 2500) / 5000) * 100) };
    return { target: 2500, nextRank: 'Scholar', percent: Math.round((xp / 2500) * 100) };
  };

  const rankProgress = getRankProgress(student.xp);

  // Determine current class drill & topic
  const currentTopic = NIGERIAN_CURRICULUM_TOPICS[0];
  const verifiedReadIds = student.completedReadNoteIds || [];
  const verifiedLogs = student.verifiedReadingLogs || [];
  const verifiedNotesCount = verifiedReadIds.length;
  const verifiedStudyMinutes = Math.max(
    0,
    Math.round(verifiedLogs.reduce((acc, l) => acc + (l.activeSeconds || 0), 0) / 60)
  );

  const getDrillConfig = (classLevel: string) => {
    if (classLevel === 'SS 3') {
      const exam = CBT_EXAMS_DATABASE.find(e => e.classLevel === 'SS 3') || CBT_EXAMS_DATABASE[0];
      return { title: 'JAMB / WAEC Drill', subtitle: 'Timed national exam mock', exam };
    }
    if (classLevel === 'JSS 3') {
      const exam = CBT_EXAMS_DATABASE.find(e => e.classLevel === 'JSS 3') || CBT_EXAMS_DATABASE[0];
      return { title: 'BECE Junior Drill', subtitle: 'Junior secondary mock', exam };
    }
    const exam = CBT_EXAMS_DATABASE.find(e => e.classLevel === classLevel) || CBT_EXAMS_DATABASE[0];
    return { title: 'Termly Assessment', subtitle: `${classLevel} Continuous Assessment`, exam };
  };

  const drillConfig = getDrillConfig(student.classLevel);

  // Dedicated Aspirant Hub for University Aspirants
  if (student.classLevel === 'University Aspirant') {
    return (
      <FeatureMaintenanceGate featureKey="aspirant_hub">
        <AspirantDashboard />
      </FeatureMaintenanceGate>
    );
  }

  // Motion animation variants for staggered cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.03
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 22
      }
    }
  };

  const currentPlan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');

  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y text-slate-100 bg-[#101C34]">
      {/* =========================================================================
          RESTORED TOP PROFILE, RANK STATUS, TIER PILL & SCHOOL LINK HEADER
         ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#142343] to-[#0A1222] border-2 border-[#84CC16]/70 rounded-3xl p-4 sm:p-5 shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_30px_rgba(132,204,22,0.25)] space-y-3.5">
        {/* Ambient glowing radial lights in corners */}
        <div className="absolute -top-14 -left-14 w-40 h-40 bg-[#84CC16]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 -right-14 w-44 h-44 bg-[#FF5B00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Profile Row: Signature Image 1 Layout */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* 3D Glowing Avatar Halo */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  avatarFileInputRef.current?.click();
                }}
                className="relative group w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#84CC16] ring-offset-2 ring-offset-[#101C34] shadow-[0_0_24px_rgba(132,204,22,0.65)] transition-all cursor-pointer flex items-center justify-center bg-slate-900"
                title="Click avatar to update photo"
              >
                {student.uniformPhotoUrl ? (
                  <img
                    src={student.uniformPhotoUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#101C34] flex items-center justify-center text-white font-black text-lg tracking-wider">
                    {getInitials(displayName)}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                  <Camera className="w-5 h-5 text-[#84CC16]" />
                </div>
              </button>

              {student.uniformVerified && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 bg-[#84CC16] text-slate-950 rounded-full p-1 shadow-[0_0_10px_#84CC16]"
                  title="Uniform Verified Scholar"
                >
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}

              <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </div>

            {/* Name, Rank Badge & Signature Image 1 XP Capsule */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-sm truncate">
                  {displayName}
                </h2>
                <span className="text-xs font-black text-[#84CC16] bg-[#84CC16]/20 border border-[#84CC16]/60 rounded-xl px-2.5 py-0.5 shadow-[0_0_10px_rgba(132,204,22,0.3)] flex items-center gap-1">
                  {student.classLevel} {student.rank || 'Scholar'} 🏆
                </span>
              </div>

              {/* Reference Image 1: Signature XP Progress Capsule */}
              <div className="flex items-center gap-2">
                <div className="relative w-40 sm:w-56 h-6 bg-[#0B1323] rounded-full p-0.5 border border-[#84CC16]/60 shadow-inner overflow-hidden flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(10, rankProgress.percent))}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[#84CC16] via-[#A3E635] to-[#84CC16] shadow-[0_0_12px_#84CC16]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black font-mono text-slate-950 tracking-wide select-none drop-shadow-xs">
                    {student.xp.toLocaleString()} / 1,000 XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header: Glowing Living Streak Flame */}
          <div className="flex flex-col items-end shrink-0 relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 6px rgba(255,91,0,0.5))',
                  'drop-shadow(0 0 14px rgba(255,91,0,0.8))',
                  'drop-shadow(0 0 6px rgba(255,91,0,0.5))'
                ]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF5B00] to-[#E04F00] border border-orange-300/40 rounded-2xl px-3.5 py-1.5 text-white shadow-[0_4px_16px_rgba(255,91,0,0.4)] cursor-pointer"
              onClick={() => {
                playSound.tileTap();
              }}
              title="Daily Study Streak"
            >
              <Flame className="w-5 h-5 text-white fill-white drop-shadow-sm" />
              <span className="text-base font-black font-mono tabular-nums text-white">
                {student.streakDays || 3}
              </span>
            </motion.div>
            <span className="text-[10px] text-orange-300 font-extrabold mt-1">Study Streak</span>
          </div>
        </div>

        {/* Secondary Row: Tier Package Button & School Code Link */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Restored Subscription Tier Pill Button */}
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                openStudentSubscriptionModal();
              }}
              className={`text-xs font-black px-3 py-1 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md ${
                currentPlan === 'elite'
                  ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-200 border-purple-400 shadow-purple-500/30'
                  : currentPlan === 'standard'
                  ? 'bg-[#84CC16]/25 text-[#84CC16] border-[#84CC16] shadow-[#84CC16]/30'
                  : currentPlan === 'basic'
                  ? 'bg-blue-950 text-blue-300 border-blue-400 shadow-blue-500/20'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500 shadow-amber-500/20 hover:bg-amber-900'
              }`}
              title="Click to view subscription packages"
            >
              {currentPlan === 'elite' ? '👑 Elite Scholar' : currentPlan === 'standard' ? '★ Standard Plan' : currentPlan === 'basic' ? 'Basic Plan' : 'Free Tier (Upgrade) ★'}
            </button>

            {/* School & Link School Code */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="font-semibold text-slate-200">
                {displaySchool}
              </span>
              {student.schoolCode ? (
                <span className="text-[10px] font-mono font-bold text-[#84CC16] bg-[#84CC16]/15 border border-[#84CC16]/40 rounded-lg px-2 py-0.5">
                  Code: {student.schoolCode}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setIsLinkSchoolModalOpen(true);
                  }}
                  className="text-[11px] font-black text-[#84CC16] hover:text-[#A3E635] underline cursor-pointer bg-[#84CC16]/10 px-2.5 py-0.5 rounded-lg border border-[#84CC16]/30"
                >
                  + Link School Code
                </button>
              )}
            </div>
          </div>

          {/* Aspirant Hub Switch */}
          <button
            type="button"
            onClick={() => {
              playSound.tileTap();
              updateStudentClass('University Aspirant', 'Science');
            }}
            className="text-[11px] text-amber-300 font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 px-2.5 py-1 rounded-xl border border-amber-500/40 shrink-0 cursor-pointer transition-all shadow-xs"
          >
            ★ Aspirant Hub
          </button>
        </div>

        {/* Quick Class Switcher (JSS 1 through SS 3) */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider shrink-0">
            <GraduationCap className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>Class:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {(['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'] as NigerianClassLevel[]).map((lvl) => {
              const isActive = student.classLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    updateStudentClass(lvl, lvl.startsWith('JSS') ? 'Junior' : (student.stream === 'Junior' ? 'Science' : (student.stream || 'Science')));
                  }}
                  className={`py-1 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#84CC16] text-slate-950 shadow-[0_0_12px_rgba(132,204,22,0.5)] border border-[#A3E635]'
                      : 'bg-[#101C34] text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Restored Parent Link Code Voucher Strip */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2.5 flex-wrap relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.3)]">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">
                  Parent Link Code
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setIsParentLinkInfoOpen(true);
                  }}
                  className="text-[10px] text-[#84CC16] hover:underline cursor-pointer font-bold"
                >
                  How to link?
                </button>
              </div>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                Share this code with your parent to link their guardian portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono font-black text-xs tracking-wider text-[#84CC16] bg-[#0C1527] px-3 py-1 rounded-xl border border-[#84CC16]/40 shadow-inner select-all">
              {studentLinkCode}
            </span>
            <button
              type="button"
              onClick={handleCopyLinkCode}
              className="py-1 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] active:scale-95 text-slate-950 text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-[0_0_10px_rgba(132,204,22,0.4)]"
              title="Copy link code"
            >
              {isCopiedLinkCode ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
              <span>{isCopiedLinkCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN HUBS: Staggered Cascade Bento Grid (Image 1 Style)
         ========================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3.5"
      >
        {/* TILE 1: LESSON NOTES (Hero Card - Electric Orange Gradient) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            playSound.tileTap();
            openNoteReader(currentTopic);
          }}
          className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#FF5B00] via-[#FF6E1A] to-[#FF5B00] shadow-[0_12px_28px_rgba(255,91,0,0.35)] border-2 border-white/20 cursor-pointer select-none group"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-white/80 block">
                  {student.classLevel} Syllabus · Week {currentTopic.weekNumber}
                </span>
                {renderMaintenanceBadge('lesson_notes')}
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Lesson Notes
              </h2>
              <p className="text-xs font-medium text-white/90 mt-1 max-w-[240px] line-clamp-1">
                {currentTopic.topicTitle}
              </p>
              <p className="text-[11px] font-mono tabular-nums font-bold text-white/85 mt-1">
                {verifiedNotesCount} verified read · {verifiedStudyMinutes}m active study
              </p>
            </div>

            {/* 3D Animated Open Books with Calmed Gears Visual */}
            <div className="relative w-28 h-20 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: [0, 4, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-20 h-14 bg-white rounded-xl shadow-xl border-2 border-orange-200 transform -rotate-2 p-1.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-orange-100 pb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
                    <span className="text-[8px] font-bold text-slate-700">NERDC</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-200 rounded w-full" />
                    <div className="h-1 bg-slate-200 rounded w-3/4" />
                  </div>
                  <div className="flex justify-end">
                    <div className="w-5 h-5 rounded-full bg-[#84CC16] flex items-center justify-center text-slate-950 shadow-md">
                      <Play className="w-2.5 h-2.5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-1 -right-1 text-yellow-300 drop-shadow-md text-base"
              >
                ⚙️
              </motion.div>
            </div>
          </div>

          {/* Interactive Scrub Bar with Play Button */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-3 relative z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playSound.tileTap();
                setIsPlayingAudio(!isPlayingAudio);
              }}
              className="w-8 h-8 rounded-full bg-white text-[#FF5B00] shadow-md flex items-center justify-center hover:scale-105 transition-transform shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#FF5B00] ml-0.5" />
            </button>

            <div className="flex-1 relative flex items-center">
              <div className="w-full h-2.5 rounded-full bg-black/20 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-[#84CC16] rounded-full transition-all"
                  style={{ width: `${audioScrubProgress}%` }}
                />
              </div>
              <div
                className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#84CC16] shadow-md -translate-x-1/2 cursor-pointer hover:scale-125 transition-transform"
                style={{ left: `${audioScrubProgress}%` }}
              />
            </div>

            <span className="text-[11px] font-bold text-white font-mono">
              12:45
            </span>
          </div>
        </motion.div>

        {/* 2-COLUMN ASYMMETRIC GRID: Quizzes & Coach */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* TILE 2: INTERACTIVE QUIZZES (Multi-Ring Donut Visual) */}
          <motion.div
            variants={tileVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound.tileTap();
              startExam(drillConfig.exam);
            }}
            className="rounded-3xl p-4 bg-gradient-to-b from-[#1C1428] to-[#120E1E] border-2 border-[#FF5B00]/40 hover:border-[#FF5B00] shadow-xl flex flex-col justify-between cursor-pointer select-none group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-[#FF5B00] uppercase tracking-wider">
                  CBT Drills
                </span>
                {isFeaturePaused('cbt_quizzes') ? (
                  renderMaintenanceBadge('cbt_quizzes')
                ) : (
                  <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-md border border-amber-400/20">
                    +50 XP
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-white tracking-tight leading-tight">
                Interactive Quizzes
              </h3>
            </div>

            {/* Concentric Progress Rings Visual */}
            <div className="my-3 flex items-center justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#1E293B"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#84CC16"
                    strokeWidth="8"
                    strokeDasharray="289"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <svg className="absolute w-20 h-20 -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#1E293B"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#FF5B00"
                    strokeWidth="8"
                    strokeDasharray="201"
                    strokeDashoffset="60"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 stroke-[3] text-slate-950" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  <span>Mathematics</span>
                </span>
                <span className="font-bold text-[#84CC16] font-mono">85%</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
                  <span>English Lang</span>
                </span>
                <span className="font-bold text-[#FF5B00] font-mono">72%</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: AI Study Coach & Weekly Challenges */}
          <div className="flex flex-col gap-3.5">
            {/* TILE 3: AI STUDY COACH (Calmed Gentle Robot Float) */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound.tileTap();
                setActiveStudentTab('ai-coach');
              }}
              className="rounded-3xl p-4 bg-gradient-to-br from-[#84CC16] via-[#65A30D] to-[#4D7C0F] text-slate-950 shadow-xl border-2 border-white/20 cursor-pointer select-none group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <h3 className="text-lg font-black text-slate-950 tracking-tight leading-tight">
                    AI Study Coach
                  </h3>
                  {renderMaintenanceBadge('ai_study_coach')}
                </div>
                <p className="text-[11px] font-bold text-slate-900/90 mt-0.5">
                  Ask any question 24/7
                </p>
              </div>

              {/* 3D Cute Friendly Robot Face Graphic with Gentle 5s Hover */}
              <div className="mt-2 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="w-24 h-16 rounded-2xl bg-white border-3 border-slate-900 shadow-xl flex flex-col items-center justify-center relative p-1">
                    <div className="flex items-center justify-around w-16">
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.05, 0.1] }}
                        className="w-4 h-4 rounded-md bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.05, 0.1] }}
                        className="w-4 h-4 rounded-md bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                      />
                    </div>
                    <div className="w-6 h-1 rounded-full bg-slate-800 mt-1.5" />
                    <div className="absolute -left-2 w-3 h-8 rounded-full bg-slate-900" />
                    <div className="absolute -right-2 w-3 h-8 rounded-full bg-slate-900" />
                  </div>
                </motion.div>
              </div>

              {/* Soft Audio Wave indicator */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {[6, 12, 18, 10, 14, 8].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h}px`, `${h * 1.3}px`, `${h}px`] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1 rounded-full bg-slate-950"
                  />
                ))}
              </div>
            </motion.div>

            {/* TILE 4: WEEKLY CHALLENGES (Star Shield & Timer) */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound.tileTap();
                setActiveStudentTab('competitions');
              }}
              className="rounded-3xl p-3.5 bg-gradient-to-b from-[#18264A] to-[#0E172B] border-2 border-indigo-500/40 hover:border-indigo-400 shadow-xl cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  National Cup
                </span>
                {isFeaturePaused('competitions') ? (
                  renderMaintenanceBadge('competitions')
                ) : (
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                    ₦50k Pool
                  </span>
                )}
              </div>

              <h4 className="text-sm font-black text-white tracking-tight mt-0.5">
                Weekly Challenges
              </h4>

              <div className="my-2 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-yellow-400 to-amber-600 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white border-2 border-yellow-200">
                  <Star className="w-8 h-8 fill-white stroke-none drop-shadow" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>⏱️ 2:00:00 Left</span>
              </div>

              <button
                type="button"
                className="w-full mt-2 py-1 px-2 rounded-xl bg-white text-slate-950 text-[10px] font-black hover:bg-slate-100 transition-colors shadow-sm"
              >
                Join Week 2 Challenge
              </button>
            </motion.div>
          </div>
        </div>

        {/* 2-COLUMN LOWER ROW: Tutor Marketplace & Whiteboard */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* TILE 5: TUTOR MARKETPLACE */}
          <motion.div
            variants={tileVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound.tileTap();
              setActiveStudentTab('tutors');
            }}
            className="rounded-3xl p-4 bg-[#14203D] border-2 border-blue-500/30 hover:border-blue-400 shadow-xl cursor-pointer select-none group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Compass className="w-5 h-5" />
                </div>
                {renderMaintenanceBadge('tutor_marketplace')}
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Tutor Marketplace
              </h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                {'★★★★☆'}
                <span className="text-[10px] text-slate-400 ml-1">4.8 (120)</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#14203D] bg-emerald-600 text-[9px] font-bold flex items-center justify-center text-white">
                  AO
                </div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#14203D] bg-purple-600 text-[9px] font-bold flex items-center justify-center text-white">
                  EM
                </div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#14203D] bg-amber-600 text-[9px] font-bold flex items-center justify-center text-white">
                  BK
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#84CC16]">
                +10 Verified
              </span>
            </div>
          </motion.div>

          {/* TILE: INTERACTIVE WHITEBOARD */}
          <motion.div
            variants={tileVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound.tileTap();
              launchVirtualClassroom(`live-${student.id || Date.now()}`, 'student');
            }}
            className="rounded-3xl p-4 bg-gradient-to-br from-[#101C34] to-[#1C2C4E] border-2 border-[#84CC16]/30 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16]">
                  <Radio className="w-5 h-5" />
                </div>
                {renderMaintenanceBadge('virtual_classroom')}
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Live Whiteboard
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Digital canvas for math & science tutoring
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-[#84CC16]">
              <span>Enter Classroom</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* TILE 6: GAMES HUB (Wide Arcade Card) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            playSound.tileTap();
            setActiveStudentTab('games');
          }}
          className="rounded-3xl p-5 bg-gradient-to-r from-[#1E1238] via-[#2A164D] to-[#1E1238] border-2 border-purple-500/40 hover:border-purple-400 shadow-xl cursor-pointer select-none group relative overflow-hidden"
        >
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  Brain Training & Arcade
                </span>
                {renderMaintenanceBadge('games_hub')}
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Games Hub
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-[200px]">
                12 Subject Games: Math Sprint, Bio Sort, Spelling Bee & Tetris
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-14 h-20 rounded-xl bg-gradient-to-b from-purple-700 to-indigo-900 border-2 border-purple-300 shadow-lg flex flex-col items-center justify-between p-1.5">
                <div className="w-full h-7 bg-slate-950 rounded border border-purple-400/50 flex items-center justify-center text-[8px] font-mono text-emerald-400 font-bold">
                  ★ PLAY
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>
              <div className="text-2xl">🎮</div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-purple-800/60 flex items-center justify-between text-xs font-bold text-purple-300">
            <span>Play 12 Subject Games · Earn Streak XP</span>
            <span className="flex items-center gap-1 text-white">
              <span>Launch Arcade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </motion.div>

        {/* =========================================================================
            SCROLLABLE EXPANSION HUBS: ALL FEATURES FROM "MORE" IN BOLD GRIDS
           ========================================================================= */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
              <span>More Learning Hubs & Tools</span>
            </span>
            <span className="text-[10px] text-slate-400">Scroll to explore all</span>
          </div>

          {/* 2-COLUMN GRID: STEM Formulas & NERDC Syllabus */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* TILE 7: STEM FORMULAS SHEET */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound.tileTap();
                setActiveStudentTab('formulas');
              }}
              className="rounded-3xl p-4 bg-gradient-to-br from-[#1D1433] to-[#120B24] border-2 border-purple-500/40 hover:border-purple-400 shadow-xl cursor-pointer select-none group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Atom className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  {renderMaintenanceBadge('science_formulas')}
                </div>
                <h3 className="text-base font-black text-white tracking-tight leading-tight">
                  STEM Formulas
                </h3>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                  Physics, Math & Chemistry equations with KaTeX symbols
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-purple-900/60 flex items-center justify-between text-[10px] font-bold text-purple-300">
                <span className="font-mono">E = mc² · F = ma</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* TILE 8: NERDC SYLLABUS & SCHEME OF WORK */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound.tileTap();
                setActiveStudentTab('syllabus');
              }}
              className="rounded-3xl p-4 bg-gradient-to-br from-[#112433] to-[#0A1620] border-2 border-cyan-500/40 hover:border-cyan-400 shadow-xl cursor-pointer select-none group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <BookOpen className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  {renderMaintenanceBadge('lesson_notes')}
                </div>
                <h3 className="text-base font-black text-white tracking-tight leading-tight">
                  NERDC Syllabus
                </h3>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                  Termly Schemes of Work & weekly breakdown for {student.classLevel}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-cyan-900/60 flex items-center justify-between text-[10px] font-bold text-cyan-300 tabular-nums">
                <span>{verifiedNotesCount > 0 ? `${verifiedNotesCount} Verified · Weeks 1–12` : 'Weeks 1–12'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2-COLUMN GRID: Prepare For Exam & Student Forum */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* TILE 9: PREPARE FOR EXAM */}
          <motion.div
            variants={tileVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound.tileTap();
              setActiveStudentTab('exam-prep');
            }}
            className="rounded-3xl p-4 bg-gradient-to-br from-[#241A12] to-[#140E0A] border-2 border-amber-500/40 hover:border-amber-400 shadow-xl cursor-pointer select-none group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                {renderMaintenanceBadge('exam_prep')}
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Prepare For Exam
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                SC AI Daily Study Calendar, diagnostic profiler & tutor credits
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-amber-900/60 flex items-center justify-between text-[10px] font-bold text-amber-300">
              <span>{examPrepState?.isUnlocked ? 'Timetable Active' : '₦4,000 Credits'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* TILE 10: STUDENT COMMUNITY FORUM */}
          <motion.div
            variants={tileVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playSound.tileTap();
              setActiveStudentTab('community');
            }}
            className="rounded-3xl p-4 bg-gradient-to-br from-[#12241D] to-[#0A1612] border-2 border-[#84CC16]/40 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16]">
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                </div>
                {renderMaintenanceBadge('community_forum')}
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Student Forum
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Ask tough questions, discuss past questions & study in groups
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-emerald-900/60 flex items-center justify-between text-[10px] font-bold text-[#84CC16]">
              <span>Active Peer Threads</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* TILE 11: NATIONAL COMPETITIONS ARENA (Full-Width Card) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            playSound.tileTap();
            setActiveStudentTab('competitions');
          }}
          className="rounded-3xl p-4 bg-gradient-to-r from-[#18264A] via-[#241A12] to-[#18264A] border-2 border-yellow-500/40 hover:border-yellow-400 shadow-xl cursor-pointer select-none group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-black text-white tracking-tight">
                    Competitions & League
                  </h3>
                  <span className="text-[10px] font-black bg-[#FF5B00] text-slate-950 px-2 py-0.5 rounded-full uppercase">
                    Prizes
                  </span>
                  {renderMaintenanceBadge('competitions')}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  3-Day Academic Championship: Smartphones, tablets & inter-school trophies!
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </motion.div>

        {/* TILE 12: UNIFORM AI VERIFICATION (Scholar Identity) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            playSound.tileTap();
            setIsUniformModalOpen(true);
          }}
          className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/40 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-black text-white">Uniform AI Verification</h3>
                {student.uniformVerified ? (
                  <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-1.5 py-0.2 rounded-full uppercase">
                    Verified
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-700 uppercase">
                    Pending
                  </span>
                )}
                {renderMaintenanceBadge('uniform_verification')}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {student.uniformVerified
                  ? 'Your student uniform is verified with TRCN school credentials.'
                  : 'Snap your school uniform to earn the Verified Scholar badge and unlock bonuses.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="py-1.5 px-3 rounded-xl bg-[#84CC16] text-slate-950 text-xs font-black shadow-sm shrink-0"
          >
            {student.uniformVerified ? 'View' : 'Verify'}
          </button>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          LINK SCHOOL CODE MODAL
         ========================================================================= */}
      {isLinkSchoolModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/40 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-black text-sm">
                <School className="w-4 h-4 text-[#84CC16]" />
                <span>Link to Your School</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsLinkSchoolModalOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your school’s unique 6-character code (e.g. <strong>KNGS-LA</strong> or <strong>QC-YABA</strong>) provided by your school administrator to unlock official school curriculum notes and homework.
            </p>

            <form onSubmit={handleLinkSchoolSubmit} className="space-y-3">
              <input
                type="text"
                value={inputSchoolCode}
                onChange={(e) => setInputSchoolCode(e.target.value.toUpperCase())}
                placeholder="e.g. KNGS-LA"
                maxLength={10}
                className="w-full bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-xl px-3 py-2.5 text-center font-mono font-black text-sm text-[#84CC16] uppercase tracking-widest placeholder-slate-500 focus:outline-none"
              />

              {linkFeedback && (
                <p className={`text-xs font-bold text-center ${linkFeedback.startsWith('✓') ? 'text-[#84CC16]' : 'text-red-400'}`}>
                  {linkFeedback}
                </p>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsLinkSchoolModalOpen(false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#84CC16] text-slate-950 text-xs font-black cursor-pointer hover:bg-[#A3E635] shadow-md shadow-[#84CC16]/20"
                >
                  Link School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PARENT LINK CODE INFO MODAL
         ========================================================================= */}
      {isParentLinkInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/40 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-black text-sm">
                <KeyRound className="w-4 h-4 text-[#84CC16]" />
                <span>Parent Link Voucher</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsParentLinkInfoOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                Your parent or guardian can monitor your academic progress, authorize tutor sessions, and review exam scores in real-time.
              </p>
              <div className="p-3 rounded-2xl bg-[#14203D] border border-slate-700/80 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Your Unique Voucher Code</span>
                <span className="text-base font-black font-mono text-[#84CC16] tracking-widest">{studentLinkCode}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Parent signs up/logs in choosing the <strong>Parent</strong> persona.</li>
                <li>Goes to <strong>Link Ward</strong> in their Parent Dashboard.</li>
                <li>Inputs code <strong>{studentLinkCode}</strong> to link instantly.</li>
              </ol>
            </div>

            <button
              type="button"
              onClick={() => {
                handleCopyLinkCode();
                setIsParentLinkInfoOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#84CC16] text-slate-950 text-xs font-black cursor-pointer hover:bg-[#A3E635]"
            >
              Copy Code & Close
            </button>
          </div>
        </div>
      )}

      {/* Subscription Modal Container */}
      {isExamPrepModalOpen && (
        <ExamPrepUnlockModal
          isOpen={isExamPrepModalOpen}
          onClose={() => setIsExamPrepModalOpen(false)}
        />
      )}
    </div>
  );
};
