import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS } from '../../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { compressImage } from '../../lib/storage';
import { NigerianClassLevel } from '../../types';
import { ExamPrepUnlockModal } from './exam-prep/ExamPrepUnlockModal';
import {
  Flame,
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
  Bell
} from 'lucide-react';
import { AspirantDashboard } from './aspirant/AspirantDashboard';
import { SchoolMaterial } from '../../types';
import { playSound } from '../../utils/audioSynthesis';
import { motion, AnimatePresence } from 'motion/react';

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
    checkStudentFeatureAccess
  } = useApp();

  const [isLinkSchoolModalOpen, setIsLinkSchoolModalOpen] = useState(false);
  const [inputSchoolCode, setInputSchoolCode] = useState('');
  const [linkFeedback, setLinkFeedback] = useState<string | null>(null);
  const [isExamPrepModalOpen, setIsExamPrepModalOpen] = useState(false);
  const [isCopiedLinkCode, setIsCopiedLinkCode] = useState(false);
  const [isParentLinkInfoOpen, setIsParentLinkInfoOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [audioScrubProgress, setAudioScrubProgress] = useState(42);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Staggered pop sound trigger on initial mount
  useEffect(() => {
    const soundTimers: any[] = [];
    for (let i = 0; i < 6; i++) {
      const timer = setTimeout(() => {
        playSound.tilePop(i);
      }, 100 + i * 85);
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

  // Determine current class drill & topic
  const currentTopic = NIGERIAN_CURRICULUM_TOPICS[0];

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
    return <AspirantDashboard />;
  }

  // Motion container and item animation variants for staggered cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 35 },
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

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100 bg-[#101C34] min-h-screen">
      {/* =========================================================================
          TOP HEADER: Profile, Rank Trophy, XP Bar & Streak Flame (Exact Image 1/2)
         ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pt-1 pb-1">
        <div className="flex items-center gap-3">
          {/* Avatar with Circular Ring */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                avatarFileInputRef.current?.click();
              }}
              className="relative group w-13 h-13 rounded-full overflow-hidden ring-3 ring-[#84CC16] hover:ring-[#A3E635] shadow-[0_0_15px_rgba(132,204,22,0.4)] transition-all cursor-pointer flex items-center justify-center bg-slate-900"
              title="Click avatar to update photo"
            >
              {student.uniformPhotoUrl ? (
                <img
                  src={student.uniformPhotoUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#101C34] flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                  {getInitials(displayName)}
                </div>
              )}

              {/* Hover overlay with camera icon */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                <Camera className="w-4 h-4 text-[#84CC16]" />
              </div>
            </button>

            {student.uniformVerified && (
              <div
                className="absolute -bottom-0.5 -right-0.5 bg-[#84CC16] text-slate-950 rounded-full p-0.5 shadow-md"
                title="Uniform Verified Scholar"
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
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

          {/* Student Class & Rank Title + XP Progress Bar */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                <span>{student.classLevel} Scholar</span>
                <span className="text-sm">🏆</span>
              </h1>
            </div>

            {/* Glowing Lime Green XP Bar */}
            <div className="mt-1 flex items-center gap-2">
              <div className="relative w-36 h-5 rounded-full bg-[#0D1527] border border-slate-700/80 p-0.5 overflow-hidden shadow-inner flex items-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(15, (student.xp / 1000) * 100))}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#84CC16] via-[#A3E635] to-[#84CC16] shadow-[0_0_8px_#84CC16]"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black font-mono tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {student.xp.toLocaleString()}/1,000 XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Header: Living Flame Streak & Offline Switch */}
        <div className="flex items-center gap-2.5">
          {/* Animated Living Streak Flame Badge */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              filter: [
                'drop-shadow(0 0 4px rgba(255,91,0,0.4))',
                'drop-shadow(0 0 10px rgba(255,91,0,0.7))',
                'drop-shadow(0 0 4px rgba(255,91,0,0.4))'
              ]
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1.5 bg-[#18264A] border border-[#FF5B00]/60 rounded-2xl px-3 py-1.5 text-white shadow-lg cursor-pointer"
            onClick={() => {
              playSound.tileTap();
            }}
          >
            <Flame className="w-5 h-5 text-[#FF5B00] fill-[#FF5B00]" />
            <span className="text-sm font-extrabold font-mono tabular-nums text-white">
              {student.streakDays || 3}
            </span>
          </motion.div>

          {/* Quick Class Switcher Pill */}
          <div className="relative">
            <select
              value={student.classLevel}
              onChange={(e) => {
                playSound.tileTap();
                updateStudentClass(e.target.value as NigerianClassLevel, student.stream || 'Science');
              }}
              className="bg-[#18264A] text-[11px] font-bold text-[#84CC16] border border-[#84CC16]/40 rounded-xl px-2.5 py-1.5 cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-[#84CC16]"
            >
              {(['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'] as NigerianClassLevel[]).map(c => (
                <option key={c} value={c} className="bg-[#101C34] text-white">
                  {c}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[#84CC16]">
              ▾
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN HUB TILES: Staggered Cascade Bento Grid (Exact Image 1 Style)
         ========================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3.5"
      >
        {/* TILE 1: LESSON NOTES (Hero Full-Width Card - Electric Orange Gradient) */}
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
          {/* Subtle Background Radial & Contour Lines */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-white/80 block">
                {student.classLevel} Syllabus · Week 4
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Lesson Notes
              </h2>
              <p className="text-xs font-medium text-white/90 mt-1 max-w-[220px] line-clamp-1">
                {currentTopic.topicTitle}
              </p>
            </div>

            {/* 3D Animated Open Books with Gears Visual */}
            <div className="relative w-28 h-20 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: [0, 8, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* 3D Book Graphic */}
                <div className="w-20 h-14 bg-white rounded-xl shadow-xl border-2 border-orange-200 transform -rotate-3 p-1.5 flex flex-col justify-between">
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

              {/* Floating Decorative Gears */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
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

            {/* Scrub Slider */}
            <div className="flex-1 relative flex items-center">
              <div className="w-full h-2.5 rounded-full bg-black/20 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-[#84CC16] rounded-full transition-all"
                  style={{ width: `${audioScrubProgress}%` }}
                />
              </div>
              {/* Scrub thumb */}
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
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5B00]/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-[#FF5B00] uppercase tracking-wider">
                  CBT Drills
                </span>
                <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-md border border-amber-400/20">
                  +50 XP
                </span>
              </div>
              <h3 className="text-lg font-black text-white tracking-tight leading-tight">
                Interactive Quizzes
              </h3>
            </div>

            {/* Concentric Progress Rings Visual (Matching Image 1) */}
            <div className="my-3 flex items-center justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer Ring - Lime Green */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#1E293B"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
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

                {/* Inner Ring - Electric Orange */}
                <svg className="absolute w-20 h-20 -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#1E293B"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
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

                {/* Center Checkmark */}
                <div className="absolute w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 stroke-[3] text-slate-950" />
                </div>
              </div>
            </div>

            {/* Topic Stats Bullet Points */}
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
            {/* TILE 3: AI STUDY COACH (Vibrant Lime Green with 3D Robot Face) */}
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-950 tracking-tight leading-tight">
                    AI Study Coach
                  </h3>
                  <p className="text-[11px] font-bold text-slate-900/90 mt-0.5">
                    Ask any question 24/7
                  </p>
                </div>
              </div>

              {/* 3D Cute Friendly Robot Face Graphic */}
              <div className="mt-2 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  {/* Robot Head */}
                  <div className="w-24 h-16 rounded-2xl bg-white border-3 border-slate-900 shadow-xl flex flex-col items-center justify-center relative p-1">
                    {/* Glowing Digital Cyan Eyes */}
                    <div className="flex items-center justify-around w-16">
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.05, 0.1] }}
                        className="w-4 h-4 rounded-md bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.05, 0.1] }}
                        className="w-4 h-4 rounded-md bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                      />
                    </div>
                    {/* Robot Smile */}
                    <div className="w-6 h-1 rounded-full bg-slate-800 mt-1.5" />

                    {/* Headphones on sides */}
                    <div className="absolute -left-2 w-3 h-8 rounded-full bg-slate-900" />
                    <div className="absolute -right-2 w-3 h-8 rounded-full bg-slate-900" />
                  </div>
                </motion.div>
              </div>

              {/* Pulsing Audio Waves */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {[4, 10, 16, 8, 14, 6].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h}px`, `${h * 1.5}px`, `${h}px`] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
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
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  National Cup
                </span>
                <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  ₦50k Pool
                </span>
              </div>

              <h4 className="text-sm font-black text-white tracking-tight mt-0.5">
                Weekly Challenges
              </h4>

              {/* Golden Laurel Star Shield Visual */}
              <div className="my-2 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-b from-yellow-400 to-amber-600 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white border-2 border-yellow-200"
                >
                  <Star className="w-8 h-8 fill-white stroke-none drop-shadow" />
                </motion.div>
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

        {/* 2-COLUMN LOWER ROW: Tutor Marketplace & Hub Details */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* TILE 5: TUTOR MARKETPLACE (Compass & Ratings) */}
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
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-2">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Tutor Marketplace
              </h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                {'★★★★☆'}
                <span className="text-[10px] text-slate-400 ml-1">4.8 (120)</span>
              </div>
            </div>

            {/* Tutor Face Stack */}
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

          {/* TILE: INTERACTIVE WHITEBOARD / CLASSROOM ENTRY */}
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
              <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] mb-2">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-tight">
                Live Whiteboard
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Instant digital canvas for math & science tutoring
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-[#84CC16]">
              <span>Enter Classroom</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* TILE 6: GAMES HUB (Wide Arcade Card - Deep Purple / Retro Arcade Visual) */}
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
          {/* Subtle Arcade Radial Lighting */}
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                Brain Training & Arcade
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Games Hub
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-[200px]">
                Math Sprint, Bio Sort, Chemical Periodic Table, Speed Concord & Tetris
              </p>
            </div>

            {/* Arcade Cabinet & Controller Graphic */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-20 rounded-xl bg-gradient-to-b from-purple-700 to-indigo-900 border-2 border-purple-300 shadow-lg flex flex-col items-center justify-between p-1.5"
              >
                <div className="w-full h-7 bg-slate-950 rounded border border-purple-400/50 flex items-center justify-center text-[8px] font-mono text-emerald-400 font-bold">
                  ★ PLAY
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </motion.div>

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

        {/* QUICK PARENT LINK & SCHOOL VOUCHER */}
        <motion.div
          variants={tileVariants}
          className="p-3.5 rounded-2xl bg-[#0E172B] border border-slate-800 flex items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-300 block">
                Parent Link Code: <span className="font-mono text-white font-black">{studentLinkCode}</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Share with parent for progress reports
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyLinkCode}
            className="py-1.5 px-3 rounded-xl bg-[#18264A] hover:bg-[#223667] text-[#84CC16] font-bold text-xs flex items-center gap-1.5 border border-[#84CC16]/40 cursor-pointer active:scale-95 transition-all"
          >
            {isCopiedLinkCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopiedLinkCode ? 'Copied' : 'Copy'}</span>
          </button>
        </motion.div>
      </motion.div>

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
