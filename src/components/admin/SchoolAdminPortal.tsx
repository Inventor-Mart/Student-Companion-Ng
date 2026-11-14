import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
import { SchoolMaterial, NigerianClassLevel } from '../../types';
import { DeviceImageUploader } from './DeviceImageUploader';
import { motion, AnimatePresence } from 'motion/react';
import { playSound, toggleSoundMuted, getSoundMuted } from '../../utils/audioSynthesis';
import {
  LayoutDashboard,
  Trophy,
  Users,
  Award,
  Upload,
  CheckCircle2,
  Plus,
  BookOpen,
  School,
  FileText,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  Trash2,
  Calendar,
  Lock,
  KeyRound,
  Eye,
  X,
  CreditCard,
  Clock,
  Volume2,
  VolumeX
} from 'lucide-react';

type SchoolTab = 'overview' | 'publishing' | 'materials' | 'students';
type SchoolSheet = 'accreditation' | 'school-code' | 'league' | null;

export const SchoolAdminPortal: React.FC = () => {
  const {
    currentUserProfile,
    student,
    isSuperAdmin,
    switchRole,
    schoolMaterials,
    publishSchoolMaterial,
    deleteSchoolMaterial,
    allRegisteredUsers,
    getSchoolAccreditationMetrics,
    subscribeSchoolAdmin,
    pendingPortalTab,
    clearPendingPortalTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<SchoolTab>('overview');

  useEffect(() => {
    if (!pendingPortalTab) return;
    if (pendingPortalTab.tab === 'school_overview') setActiveTab('overview');
    else if (pendingPortalTab.tab === 'school_publishing') setActiveTab('publishing');
    else if (pendingPortalTab.tab === 'school_materials') setActiveTab('materials');
    else if (pendingPortalTab.tab === 'school_students') setActiveTab('students');
    if (pendingPortalTab.tab.startsWith('school_')) {
      clearPendingPortalTab();
    }
  }, [pendingPortalTab, clearPendingPortalTab]);
  const [activeSheet, setActiveSheet] = useState<SchoolSheet>(null);
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  // Publishing Studio Form States
  const [materialType, setMaterialType] = useState<'lesson_note' | 'assignment' | 'project' | 'past_question'>('lesson_note');
  const [subject, setSubject] = useState<string>('Mathematics');
  const [classLevel, setClassLevel] = useState<NigerianClassLevel | 'All Classes'>('SS 3');
  const [term, setTerm] = useState<'First Term' | 'Second Term' | 'Third Term'>('Second Term');
  const [week, setWeek] = useState<string>('Week 4');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('2026-11-28');
  const [maxScore, setMaxScore] = useState<string>('20');
  const [examBoard, setExamBoard] = useState<'WAEC' | 'JAMB' | 'NECO' | 'BECE'>('WAEC');
  const [attachmentUrl, setAttachmentUrl] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);
  const [previewMaterial, setPreviewMaterial] = useState<SchoolMaterial | null>(null);

  // Materials filter
  const [materialFilter, setMaterialFilter] = useState<'all' | 'lesson_note' | 'assignment' | 'project' | 'past_question'>('all');

  // Student filter
  const [studentClassFilter, setStudentClassFilter] = useState<'all' | 'junior' | 'senior'>('all');
  const [studentSubscriptionFilter, setStudentSubscriptionFilter] = useState<'all' | 'paid' | 'free'>('all');

  // Copy code toast
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Multi-school administration selector
  const availableSchools = SCHOOL_LEADERBOARD_DATA.map(s => s.schoolName);
  const adminSchoolCode = currentUserProfile?.adminData?.schoolCode || 'SCHL88';
  const defaultSchool =
    currentUserProfile?.adminData?.schoolName ||
    (student?.school && student.school !== 'Secondary School' ? student.school : "King's College Lagos");

  const [selectedSchool, setSelectedSchool] = useState<string>(defaultSchool);

  const adminName = currentUserProfile?.fullName || 'School Administrator';
  const schoolType = currentUserProfile?.adminData?.schoolType || 'Federal Unity College';
  const designation = currentUserProfile?.adminData?.designation || 'Principal / Head of School';

  // Verification Gate Status
  const verificationStatus =
    currentUserProfile?.adminData?.verificationStatus || (isSuperAdmin ? 'verified' : 'pending_verification');
  const isVerified = verificationStatus === 'verified' || isSuperAdmin;

  // School Accreditation Metrics & Gate
  const metrics = getSchoolAccreditationMetrics(adminSchoolCode);
  const [isProcessingPaystack, setIsProcessingPaystack] = useState<boolean>(false);
  const [paystackError, setPaystackError] = useState<string | null>(null);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<{
    reference: string;
    amount: number;
    plan: string;
    expiresAt: string;
  } | null>(null);

  // Staggered audio pop cascade
  useEffect(() => {
    const count = activeTab === 'overview' ? 6 : 3;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          playSound.tilePop(i);
        }, 70 + i * 75)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);

  const handleToggleMute = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  const handleDirectSchoolSubscription = async (plan: 'monthly' | 'termly') => {
    playSound.tileTap();
    setPaystackError(null);
    setIsProcessingPaystack(true);

    if (typeof (window as any).PaystackPop === 'undefined') {
      playSound.buzz();
      setPaystackError('Paystack checkout SDK is loading. Please check network connectivity and try again.');
      setIsProcessingPaystack(false);
      return;
    }

    const amountNaira = plan === 'termly' ? 42000 : 15000;
    const payerEmail = currentUserProfile?.email || 'admin@school.edu.ng';
    const txRef = `SCHL_${plan.toUpperCase()}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    let activeKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
    try {
      const configRes = await fetch('/api/paystack/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.publicKey) {
          activeKey = configData.publicKey;
        }
      }
    } catch {
      // ignore
    }

    if (!activeKey) {
      playSound.buzz();
      setIsProcessingPaystack(false);
      setPaystackError(
        'Paystack live payment gateway is not yet configured. Please configure your Paystack Public Key in Admin settings.'
      );
      return;
    }

    try {
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(amountNaira * 100),
        currency: 'NGN',
        ref: txRef,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'School Name', variable_name: 'school_name', value: selectedSchool },
            { display_name: 'School Code', variable_name: 'school_code', value: adminSchoolCode },
            { display_name: 'Plan', variable_name: 'plan', value: plan },
            { display_name: 'Purpose', variable_name: 'purpose', value: 'school_direct_subscription' }
          ]
        },
        callback: function (response: { reference: string }) {
          (async () => {
            setIsProcessingPaystack(true);
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira,
                  email: payerEmail,
                  adminId: currentUserProfile?.id,
                  schoolName: selectedSchool,
                  schoolCode: adminSchoolCode,
                  plan,
                  purpose: 'school_direct_subscription'
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                playSound.levelUp();
                await subscribeSchoolAdmin(plan, response.reference);
                setPaymentSuccessReceipt({
                  reference: response.reference,
                  amount: amountNaira,
                  plan: plan === 'termly' ? 'Termly Pass (3 Months)' : 'Monthly Pass',
                  expiresAt:
                    verifyData.expiresAt ||
                    new Date(Date.now() + (plan === 'termly' ? 90 : 30) * 86400000).toISOString()
                });
              } else {
                playSound.buzz();
                setPaystackError(verifyData.error || 'Payment reference verification failed at backend.');
              }
            } catch (err: any) {
              playSound.buzz();
              setPaystackError(err?.message || 'Network error verifying Paystack transaction');
            } finally {
              setIsProcessingPaystack(false);
            }
          })();
        },
        onClose: function () {
          setIsProcessingPaystack(false);
        }
      });

      handler.openIframe();
    } catch (err: any) {
      playSound.buzz();
      console.error('Paystack popup error:', err);
      setPaystackError(err?.message || 'Failed to open Paystack payment window');
      setIsProcessingPaystack(false);
    }
  };

  // Find active school stats from leaderboard
  const activeSchoolStats =
    SCHOOL_LEADERBOARD_DATA.find(s => s.schoolName.toLowerCase() === selectedSchool.toLowerCase()) ||
    SCHOOL_LEADERBOARD_DATA[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(adminSchoolCode);
    playSound.correct();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleWhatsAppShare = () => {
    playSound.tileTap();
    const text = encodeURIComponent(
      `📚 Official ${selectedSchool} Portal Access\n\nDear Students & Parents,\nPlease link your Student Companion account with our official institutional code: *${adminSchoolCode}*\n\nOnce linked, you will receive our WAEC/NECO lesson notes, homework assignments, term projects, and past question CBT practice drills.\n\nSign up or enter code in profile at: https://studentcompanion.ng`
    );
    const link = document.createElement('a');
    link.href = `https://api.whatsapp.com/send?text=${text}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      playSound.buzz();
      return;
    }
    if (!isVerified) {
      playSound.buzz();
      return;
    }

    publishSchoolMaterial({
      schoolCode: adminSchoolCode,
      schoolName: selectedSchool,
      type: materialType,
      title: title.trim(),
      subject,
      classLevel,
      term,
      week,
      content: content.trim(),
      dueDate: materialType === 'assignment' || materialType === 'project' ? dueDate : undefined,
      maxScore:
        materialType === 'assignment' || materialType === 'project' || materialType === 'past_question'
          ? parseInt(maxScore) || 20
          : undefined,
      examBoard: materialType === 'past_question' ? examBoard : undefined,
      attachmentUrl: attachmentUrl || undefined,
      attachmentName: attachmentName || (attachmentUrl ? `${subject}_Curriculum_Document.pdf` : undefined),
      authorName: `${adminName} (${designation})`
    });

    playSound.correct();
    setPublishSuccess(true);
    setTitle('');
    setContent('');
    setAttachmentUrl('');
    setAttachmentName('');

    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('materials');
    }, 1500);
  };

  // Filter school materials for this school
  const currentSchoolMaterials = schoolMaterials.filter(
    m =>
      m.schoolCode.toUpperCase() === adminSchoolCode.toUpperCase() ||
      m.schoolName.toLowerCase().includes(selectedSchool.toLowerCase())
  );

  const filteredMaterials = currentSchoolMaterials.filter(m => {
    if (materialFilter === 'all') return true;
    return m.type === materialFilter;
  });

  // Collect ONLY live registered students who entered this school code
  const registeredStudents = allRegisteredUsers
    .filter(u => u.role === 'student' && u.studentData)
    .map(u => u.studentData!);

  const combinedStudents = [
    ...(student?.name && student.schoolCode === adminSchoolCode ? [{ ...student, isCurrentAccount: true }] : []),
    ...registeredStudents
      .filter(s => s.id !== student?.id && s.schoolCode === adminSchoolCode)
      .map(s => ({ ...s, isCurrentAccount: false }))
  ];

  const totalSchoolVerifiedReads = combinedStudents.reduce(
    (acc, std) => acc + ((std.completedReadNoteIds || []).length || (std.verifiedReadingLogs || []).length),
    0
  );
  const totalSchoolVerifiedMinutes = Math.round(
    combinedStudents.reduce(
      (acc, std) => acc + (std.verifiedReadingLogs || []).reduce((sum, l) => sum + (l.activeSeconds || 0), 0),
      0
    ) / 60
  );

  const filteredStudents = combinedStudents.filter(std => {
    if (studentClassFilter === 'junior' && !std.classLevel.startsWith('JSS')) return false;
    if (studentClassFilter === 'senior' && !std.classLevel.startsWith('SS')) return false;
    const isPaid =
      std.isSubscribed === true ||
      (Boolean(std.subscriptionTier) && std.subscriptionTier !== 'free') ||
      (Boolean(std.subscribedUntil) && new Date(std.subscribedUntil!) > new Date());
    if (studentSubscriptionFilter === 'paid' && !isPaid) return false;
    if (studentSubscriptionFilter === 'free' && isPaid) return false;
    return true;
  });

  // Animation variants for staggered Bento cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.065,
        delayChildren: 0.03
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
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
    <div className="flex-1 min-h-0 h-full w-full flex flex-col bg-[#101C34] text-slate-100 overflow-hidden relative">
      {/* =========================================================================
          MAIN SCROLLABLE VIEWPORT (Full Bottom Clearance on All Devices)
         ========================================================================= */}
      <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y">
        {/* Super Admin Switch Banner */}
        {isSuperAdmin && (
          <div className="bg-[#14203D] border-2 border-[#FF5B00]/50 rounded-2xl p-3 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span className="text-slate-200">
                Viewing as <strong className="text-white">School Administrator</strong>. Super Admin privilege detected.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                switchRole('admin');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-black text-[11px] transition-colors cursor-pointer shrink-0 ml-2"
            >
              Super Admin Console &rarr;
            </button>
          </div>
        )}

        {/* Top School Hero Banner */}
        <div className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#142343] to-[#0A1222] border-2 border-[#84CC16]/60 rounded-3xl p-4 shadow-[0_14px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(132,204,22,0.18)] space-y-3">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#FF5B00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5B00] to-[#E04F00] flex items-center justify-center text-white ring-2 ring-[#84CC16] shadow-lg shrink-0">
                <School className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                    {selectedSchool}
                  </h2>
                  <span className="text-[10px] font-black text-[#84CC16] bg-[#84CC16]/15 px-2 py-0.5 rounded-xl border border-[#84CC16]/50">
                    {schoolType}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {designation} · <strong className="text-white">{adminName}</strong>
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Official Curriculum Publishing Studio, Student Linking &amp; Academic Standings
                </span>
              </div>
            </div>

            {/* Administer School Context Selector */}
            <div className="bg-[#0D1527] p-2 rounded-2xl border border-slate-700 self-start w-full sm:w-auto shrink-0">
              <label className="text-[9px] uppercase font-black text-slate-400 block mb-1">
                Administer School Context:
              </label>
              <div className="relative">
                <select
                  value={selectedSchool}
                  onChange={e => {
                    playSound.tileTap();
                    setSelectedSchool(e.target.value);
                  }}
                  className="w-full sm:w-52 bg-[#14203D] border border-slate-700 text-white text-xs font-bold rounded-xl px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:border-[#84CC16] pr-7"
                >
                  {availableSchools.map(sch => (
                    <option key={sch} value={sch}>
                      {sch}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#84CC16] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: OVERVIEW BENTO GRID
           ===================================================================== */}
        {activeTab === 'overview' && (
          <motion.div
            key="school-overview-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            {/* FULL-WIDTH HERO BENTO TILE: ACCREDITATION GATE OR UNLOCKED STATUS */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveSheet('accreditation');
              }}
              className={`relative overflow-hidden rounded-3xl p-5 border-2 shadow-xl cursor-pointer select-none group ${
                isVerified
                  ? 'bg-gradient-to-r from-[#12241D] via-[#142B22] to-[#0D1C17] border-[#84CC16]/70'
                  : metrics.isQualifiedForReview
                  ? 'bg-gradient-to-r from-[#14203D] to-[#1A2A52] border-[#84CC16]/60'
                  : 'bg-gradient-to-r from-[#FF5B00] via-[#FF6E1A] to-[#E84D00] border-white/25 shadow-[0_14px_32px_rgba(255,91,0,0.35)]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {isVerified ? (
                      <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-white" />
                    )}
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                      {isVerified
                        ? 'Ministry of Education & National Examination Board Accredited'
                        : metrics.isQualifiedForReview
                        ? 'Accreditation Qualification Threshold Met!'
                        : 'Institutional Accreditation Qualification Gate'}
                    </h3>
                  </div>

                  <p className="text-xs text-white/90 mt-1 leading-relaxed">
                    {isVerified
                      ? `Full institutional publishing privileges unlocked for ${selectedSchool} (${
                          metrics.hasActiveDirectSubscription
                            ? 'Direct Institutional Subscription Active'
                            : `${metrics.paidStudents} Subscribed Scholars`
                        }).`
                      : metrics.isQualifiedForReview
                      ? 'Authorized Super Admins are reviewing your documents to activate full curriculum publishing.'
                      : `Pathway A: ${metrics.paidStudents} / 50 Subscribed Scholars · Pathway B: Direct Institutional Subscription`}
                  </p>
                </div>

                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-xl shrink-0 ${
                    isVerified
                      ? 'bg-[#84CC16] text-slate-950'
                      : metrics.isQualifiedForReview
                      ? 'bg-[#84CC16]/20 text-[#84CC16] border border-[#84CC16]/50'
                      : 'bg-[#101C34] text-[#84CC16] border border-[#84CC16]/60'
                  }`}
                >
                  {isVerified
                    ? 'Accredited'
                    : metrics.isQualifiedForReview
                    ? 'Review In Progress'
                    : 'Pending Qualification'}
                </span>
              </div>

              {!isVerified && !metrics.isQualifiedForReview && (
                <div className="w-full bg-[#101C34]/60 rounded-full h-2.5 overflow-hidden border border-white/20 p-0.5 mt-3">
                  <div
                    className="bg-[#84CC16] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((metrics.paidStudents / 50) * 100))}%` }}
                  />
                </div>
              )}

              <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] font-bold text-white/95">
                <span>
                  {isVerified
                    ? 'Tap to view accreditation quota & institutional subscription options'
                    : 'Tap to open Pathway A (50-Student Quota) & Pathway B (Direct Paystack Pass)'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* 2-COLUMN BENTO ROW: STUDENT LINK CODE & NATIONAL LEAGUE RANK */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* YOUR INSTITUTIONAL STUDENT LINK CODE */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('school-code');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <KeyRound className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleCopyCode();
                      }}
                      className="text-[10px] font-black bg-[#0D1527] hover:bg-[#18294A] text-[#84CC16] border border-[#84CC16]/40 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-white tracking-tight leading-tight">
                    Your Institutional Student Link Code
                  </h3>
                  <div className="text-lg font-mono font-black text-[#84CC16] tracking-wider mt-1">
                    {adminSchoolCode}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>WhatsApp PTA Share</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* NATIONAL SECONDARY SCHOOL ACADEMIC LEAGUE */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('league');
                }}
                className="rounded-3xl p-4 bg-gradient-to-br from-[#261812] to-[#140E0B] border-2 border-[#FF5B00]/50 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Trophy className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-white bg-[#FF5B00] px-2 py-0.5 rounded-lg">
                      Rank #{activeSchoolStats.rank}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-white tracking-tight leading-tight">
                    National Secondary School Academic League
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 font-mono tabular-nums">
                    Avg Accuracy: <strong className="text-[#84CC16]">{activeSchoolStats.averageAccuracy}%</strong>
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#FF5B00]/25 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>Term 2 Standings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* 2-COLUMN BENTO ROW: PUBLISHED MATERIALS & LINKED SCHOLARS */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* PUBLISHED MATERIALS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('materials');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <BookOpen className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#0D1527] border border-[#84CC16]/40 px-2 py-0.5 rounded-lg">
                      {currentSchoolMaterials.length} Items
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white tracking-tight">Published Curriculum Library</h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    Notes, assignments, projects &amp; past question drills for {adminSchoolCode}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>Open Materials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* LINKED SCHOLARS ROSTER */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('students');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-white bg-[#0D1527] border border-slate-700 px-2 py-0.5 rounded-lg">
                      {filteredStudents.length} Active
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white tracking-tight">
                    Scholars Linked to {selectedSchool}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 tabular-nums">
                    {metrics.paidStudents} Subscribed · {totalSchoolVerifiedReads} Verified Reads
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>Open Student Roster</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* FULL-WIDTH BENTO TILE: PUBLISHING STUDIO LAUNCHER */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveTab('publishing');
              }}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF5B00] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#FF5B00]/30">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white tracking-tight">
                        Publish Institutional Curriculum Material
                      </h3>
                      {!isVerified && (
                        <span className="text-[10px] font-black text-[#FF5B00] bg-[#0D1527] px-2 py-0.2 rounded-lg border border-[#FF5B00]/40 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Publishing Locked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 truncate">
                      Lesson Note · Assignment · Term Project · Past Question CBT Drills
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#84CC16] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 2: PUBLISHING STUDIO
           ===================================================================== */}
        {activeTab === 'publishing' && (
          <motion.div
            key="school-publishing-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#14203D] rounded-3xl p-5 border-2 border-[#84CC16]/45 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#FF5B00]" />
                  <span>Publish Institutional Curriculum Material</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Create institutional lesson notes, assignments, term projects, or past question CBT drills for {selectedSchool}.
                </p>
              </div>

              {!isVerified && (
                <span className="text-xs font-black text-[#FF5B00] flex items-center gap-1 shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Publishing Locked</span>
                </span>
              )}
            </div>

            {/* Material Category Bento Tiles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-300 block">
                Material Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { type: 'lesson_note', label: 'Lesson Note', desc: 'Curriculum notes' },
                  { type: 'assignment', label: 'Assignment', desc: 'Due date & marks' },
                  { type: 'project', label: 'Term Project', desc: 'STEM / Exhibition' },
                  { type: 'past_question', label: 'Past Question', desc: 'CBT Drills' }
                ].map(item => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setMaterialType(item.type as any);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-97 ${
                      materialType === item.type
                        ? 'bg-[#84CC16] border-[#A3E635] text-slate-950 shadow-md shadow-[#84CC16]/25'
                        : 'bg-[#0D1527] border-slate-800 text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-black block">{item.label}</span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        materialType === item.type ? 'text-slate-900 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">
                    Target Subject <span className="text-[#FF5B00]">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                  >
                    <option value="Mathematics">General Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Civic Education">Civic Education</option>
                    <option value="Further Mathematics">Further Mathematics</option>
                    <option value="Government">Government</option>
                    <option value="Basic Science">Basic Science</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">
                    Target Class Level <span className="text-[#FF5B00]">*</span>
                  </label>
                  <select
                    value={classLevel}
                    onChange={e => setClassLevel(e.target.value as any)}
                    className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                  >
                    <option value="All Classes">All Secondary Classes</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1">Term</label>
                    <select
                      value={term}
                      onChange={e => setTerm(e.target.value as any)}
                      className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    >
                      <option value="First Term">First Term</option>
                      <option value="Second Term">Second Term</option>
                      <option value="Third Term">Third Term</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1">Week</label>
                    <select
                      value={week}
                      onChange={e => setWeek(e.target.value)}
                      className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    >
                      {Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map(w => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Material Title / Topic Headline <span className="text-[#FF5B00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. WAEC Review: Differential Calculus & Rates of Change"
                  className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84CC16]"
                />
              </div>

              {(materialType === 'assignment' || materialType === 'project') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0D1527] rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#84CC16]" />
                      <span>Submission Due Date:</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#FF5B00]" />
                      <span>Maximum Marks / Score:</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={maxScore}
                      onChange={e => setMaxScore(e.target.value)}
                      placeholder="20"
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                </div>
              )}

              {materialType === 'past_question' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0D1527] rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1">Examination Board:</label>
                    <select
                      value={examBoard}
                      onChange={e => setExamBoard(e.target.value as any)}
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    >
                      <option value="WAEC">WAEC (West African Examinations Council)</option>
                      <option value="JAMB">JAMB UTME (University Matriculation)</option>
                      <option value="NECO">NECO (National Examinations Council)</option>
                      <option value="BECE">BECE (Basic Education Certificate Exam)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1">Question Count / Total Score:</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={maxScore}
                      onChange={e => setMaxScore(e.target.value)}
                      placeholder="25"
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Detailed Lesson Notes / Assignment Instructions <span className="text-[#FF5B00]">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Enter rich curriculum summary, step-by-step formulas, assignment questions, or project guidelines..."
                  className="w-full bg-[#0D1527] border-2 border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84CC16] leading-relaxed"
                />
              </div>

              <div className="space-y-2 p-3 bg-[#0D1527] rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#84CC16]" />
                    <span>Worksheet / Curriculum Attachment (Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-400">PDF, Notes, Worksheet</span>
                </div>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  placeholder="Attachment Label (e.g. Calculus_Problem_Set.pdf)"
                  className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84CC16]"
                />
                <DeviceImageUploader currentImageUrl={attachmentUrl} onImageChange={setAttachmentUrl} />
              </div>

              <button
                type="submit"
                disabled={!isVerified}
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isVerified
                    ? 'bg-[#FF5B00] hover:bg-[#e05000] text-white cursor-pointer shadow-[#FF5B00]/25'
                    : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isVerified ? (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Publish Material to {selectedSchool} Scholars</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Publishing Locked (Accreditation Verification Required)</span>
                  </>
                )}
              </button>

              {publishSuccess && (
                <div className="p-3 rounded-2xl bg-[#142B22] border border-[#84CC16]/60 text-[#84CC16] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Material published successfully! Redirecting to materials ledger...</span>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 3: PUBLISHED CURRICULUM LIBRARY
           ===================================================================== */}
        {activeTab === 'materials' && (
          <motion.div
            key="school-materials-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <div className="bg-[#14203D] rounded-3xl p-4 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h3 className="text-sm font-black text-white">
                    Published Curriculum Library ({filteredMaterials.length})
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Institutional lesson notes, assignments, and past question drills accessible to students linked to {adminSchoolCode}.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'lesson_note', label: 'Notes' },
                    { id: 'assignment', label: 'Assignments' },
                    { id: 'project', label: 'Projects' },
                    { id: 'past_question', label: 'Past Questions' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setMaterialFilter(f.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-colors cursor-pointer shrink-0 ${
                        materialFilter === f.id
                          ? 'bg-[#84CC16] text-slate-950'
                          : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredMaterials.map(mat => {
                const typeLabel =
                  mat.type === 'lesson_note'
                    ? 'Lesson Note'
                    : mat.type === 'assignment'
                    ? 'Assignment'
                    : mat.type === 'project'
                    ? 'Term Project'
                    : 'Past Question Drill';

                return (
                  <motion.div
                    key={mat.id}
                    variants={tileVariants}
                    className="bg-[#14203D] rounded-3xl p-4 border-2 border-slate-800 hover:border-[#84CC16]/60 space-y-3 shadow-md transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40 uppercase">
                            {typeLabel}
                          </span>
                          <span className="text-xs font-bold text-[#84CC16]">{mat.subject}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-xs text-slate-200">{mat.classLevel}</span>
                        </div>
                        <h4 className="text-sm font-black text-white tracking-tight">{mat.title}</h4>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setPreviewMaterial(mat);
                          }}
                          className="p-2 rounded-xl bg-[#0D1527] hover:bg-[#18294A] text-[#84CC16] border border-[#84CC16]/40 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title="Read Note"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            deleteSchoolMaterial(mat.id);
                          }}
                          className="p-2 rounded-xl bg-[#0D1527] hover:bg-[#FF5B00]/20 text-slate-400 hover:text-[#FF5B00] border border-slate-700 text-xs transition-colors cursor-pointer"
                          title="Delete material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{mat.content}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>By: {mat.authorName}</span>
                        {mat.dueDate && <span className="text-[#FF5B00] font-bold">· Due: {mat.dueDate}</span>}
                        {mat.maxScore && <span className="text-[#84CC16] font-mono font-bold">· {mat.maxScore} Marks</span>}
                      </div>
                      {mat.attachmentName && (
                        <span className="text-[11px] font-bold text-[#84CC16] flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{mat.attachmentName}</span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredMaterials.length === 0 && (
              <div className="bg-[#14203D] rounded-3xl p-8 text-center border-2 border-slate-800 space-y-3">
                <BookOpen className="w-10 h-10 text-[#FF5B00] mx-auto" />
                <h4 className="text-xs font-black text-white">No materials published yet</h4>
                <p className="text-[11px] text-slate-300 max-w-sm mx-auto">
                  Click the Publishing Studio tab to create your first institutional lesson note, homework assignment, or past question drill.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setActiveTab('publishing');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black transition-colors cursor-pointer"
                >
                  Open Publishing Studio
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* =====================================================================
            TAB 4: LINKED STUDENT ROSTER
           ===================================================================== */}
        {activeTab === 'students' && (
          <motion.div
            key="school-students-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <div className="bg-[#14203D] rounded-3xl p-4 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-white">
                    Scholars Linked to {selectedSchool} ({filteredStudents.length})
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Secondary students who entered code{' '}
                    <span className="font-mono font-black text-[#84CC16]">{adminSchoolCode}</span> to sync assignments &amp; uniform verifications.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: 'All Classes' },
                      { id: 'junior', label: 'Junior (JSS)' },
                      { id: 'senior', label: 'Senior (SS)' }
                    ].map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setStudentClassFilter(c.id as any);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-colors cursor-pointer ${
                          studentClassFilter === c.id
                            ? 'bg-[#FF5B00] text-white'
                            : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: `All (${combinedStudents.length})` },
                      { id: 'paid', label: `Subscribed (${metrics.paidStudents})` },
                      { id: 'free', label: `Free Tier (${metrics.freeStudents})` }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setStudentSubscriptionFilter(f.id as any);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-colors cursor-pointer ${
                          studentSubscriptionFilter === f.id
                            ? 'bg-[#84CC16] text-slate-950'
                            : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Institutional Verified Reading Report Summary */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                <div className="bg-[#0D1527] rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Scholars Linked</span>
                  <span className="text-sm font-black font-mono tabular-nums text-white">{combinedStudents.length}</span>
                </div>
                <div className="bg-[#0D1527] rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Verified Notes Read</span>
                  <span className="text-sm font-black font-mono tabular-nums text-[#84CC16]">{totalSchoolVerifiedReads}</span>
                </div>
                <div className="bg-[#0D1527] rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Verified Study Time</span>
                  <span className="text-sm font-black font-mono tabular-nums text-[#FF5B00]">{totalSchoolVerifiedMinutes}m</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredStudents.map((std, idx) => {
                const isPaid =
                  std.isSubscribed === true ||
                  (Boolean(std.subscriptionTier) && std.subscriptionTier !== 'free') ||
                  (Boolean(std.subscribedUntil) && new Date(std.subscribedUntil!) > new Date());
                const stdReadCount =
                  (std.completedReadNoteIds || []).length || (std.verifiedReadingLogs || []).length;
                const stdStudyMinutes = Math.round(
                  (std.verifiedReadingLogs || []).reduce((acc, log) => acc + (log.activeSeconds || 0), 0) / 60
                );

                return (
                  <div
                    key={std.id || idx}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-xs transition-all ${
                      (std as any).isCurrentAccount
                        ? 'bg-[#12241D] border-[#84CC16]/70 shadow-sm'
                        : 'bg-[#14203D] border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          (std as any).isCurrentAccount
                            ? 'bg-[#84CC16] text-slate-950'
                            : 'bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]'
                        }`}
                      >
                        {std.name ? std.name.charAt(0) : 'S'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-white text-xs truncate">{std.name}</span>
                          {isPaid ? (
                            <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-1.5 py-0.2 rounded">
                              ✓ Subscribed
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-300 bg-[#0D1527] px-1.5 py-0.2 rounded border border-slate-700">
                              Free Tier
                            </span>
                          )}
                          {std.uniformVerified && (
                            <span className="text-[9px] font-bold text-[#84CC16] bg-[#0D1527] px-1.5 py-0.2 rounded border border-[#84CC16]/40 flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              <span>Uniform Verified</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-300 block mt-0.5 tabular-nums">
                          {std.classLevel} · <span className="text-[#84CC16] font-semibold">{stdReadCount} verified notes</span>
                          {stdStudyMinutes > 0 ? ` (${stdStudyMinutes}m)` : ''} · {std.rank || 'Scholar'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0 ml-2 tabular-nums">
                      <span className="font-black text-[#84CC16] text-sm block">{std.xp.toLocaleString()} XP</span>
                      <span className="text-[10px] text-[#FF5B00] font-bold block">{std.streakDays || 1}d streak</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredStudents.length === 0 && (
              <div className="bg-[#14203D] rounded-3xl p-8 text-center border-2 border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-[#FF5B00] mx-auto" />
                <h4 className="text-sm font-black text-white">No students linked yet</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Students link their accounts by entering your 6-character School Code{' '}
                  <strong className="font-mono text-[#84CC16]">{adminSchoolCode}</strong> upon signup or directly in their profile dashboard.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2.5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share School Code to WhatsApp PTA</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* =========================================================================
          MATCHING NAVY & LIME BOTTOM NAVIGATION DOCK (Overview · Studio · Materials · Roster)
         ========================================================================= */}
      <nav className="w-full bg-[#0D1527]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shrink-0 z-30 select-none relative shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />

        {[
          { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, badge: 0 },
          { id: 'publishing' as const, label: 'Studio', icon: Upload, badge: 0 },
          { id: 'materials' as const, label: 'Materials', icon: BookOpen, badge: currentSchoolMaterials.length },
          { id: 'students' as const, label: 'Roster', icon: Users, badge: filteredStudents.length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSound.tileTap();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive ? 'text-[#84CC16] font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="schoolActiveTabIndicator"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-[#84CC16] shadow-[0_0_12px_#84CC16]"
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#84CC16] scale-110 drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF5B00] text-white text-[9px] font-black flex items-center justify-center shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 leading-none">{tab.label}</span>
            </button>
          );
        })}

        {/* Sound FX Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl active:scale-90 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#84CC16]" />
          )}
        </button>
      </nav>

      {/* =========================================================================
          TAP-TO-OPEN DETAIL SHEETS (Accreditation · School Code · Academic League)
         ========================================================================= */}
      <AnimatePresence>
        {activeSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSound.tileTap();
                setActiveSheet(null);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring' as const, damping: 28, stiffness: 320 }}
              className="relative w-full max-w-lg bg-[#101C34] border-2 border-[#84CC16]/50 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-10 max-h-[86vh] overflow-y-auto space-y-4"
            >
              {/* SHEET 1: ACCREDITATION GATE (PATHWAY A & PATHWAY B) */}
              {activeSheet === 'accreditation' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          Institutional Accreditation Qualification Gate
                        </h3>
                        <span className="text-[11px] text-slate-400">Pathway A &amp; Pathway B</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pathway A */}
                  <div className="bg-[#14203D] p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-black text-white block">
                          Pathway A: Student Subscription Quota (Minimum 50 Subscribed)
                        </span>
                        <span className="text-[11px] text-slate-300">
                          School Code: <strong className="font-mono text-[#84CC16]">{adminSchoolCode}</strong>
                        </span>
                      </div>
                      <span className="text-sm font-black font-mono text-[#84CC16] shrink-0">
                        {metrics.paidStudents} / 50
                      </span>
                    </div>

                    <div className="w-full bg-[#0D1527] rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                      <div
                        className="bg-gradient-to-r from-[#FF5B00] to-[#84CC16] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.round((metrics.paidStudents / 50) * 100))}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-[#0D1527] p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Subscribed</span>
                        <span className="font-black text-[#84CC16] font-mono">{metrics.paidStudents}</span>
                      </div>
                      <div className="bg-[#0D1527] p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Free Tier</span>
                        <span className="font-black text-slate-200 font-mono">{metrics.freeStudents}</span>
                      </div>
                      <div className="bg-[#0D1527] p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Needed</span>
                        <span className="font-black text-[#FF5B00] font-mono">
                          {Math.max(0, 50 - metrics.paidStudents)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pathway B */}
                  <div className="bg-[#14203D] p-4 rounded-2xl border border-[#84CC16]/45 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-black text-white flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>Pathway B: Direct Institutional Subscription</span>
                        </span>
                        <span className="text-[11px] text-slate-300">
                          Bypass the 50-student threshold via live Paystack checkout.
                        </span>
                      </div>
                      <span className="text-[10px] text-[#84CC16] font-mono font-bold bg-[#0D1527] px-2 py-0.5 rounded border border-[#84CC16]/40 shrink-0">
                        Instant Qualification
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#0D1527] p-3.5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white">Monthly School Access</span>
                            <span className="text-xs font-black text-[#FF5B00] font-mono">₦15,000 / mo</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                            30 days of accredited institutional publishing access.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDirectSchoolSubscription('monthly')}
                          disabled={isProcessingPaystack}
                          className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{isProcessingPaystack ? 'Connecting...' : 'Subscribe Monthly (₦15,000)'}</span>
                        </button>
                      </div>

                      <div className="bg-[#0D1527] p-3.5 rounded-2xl border-2 border-[#84CC16]/60 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white">Full Term Pass</span>
                            <span className="text-xs font-black text-[#84CC16] font-mono">₦42,000 / term</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                            90 days full coverage across JSS 1–SS 3 · Save ₦3,000.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDirectSchoolSubscription('termly')}
                          disabled={isProcessingPaystack}
                          className="w-full py-2 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isProcessingPaystack ? 'Connecting...' : 'Subscribe Full Term (₦42,000)'}</span>
                        </button>
                      </div>
                    </div>

                    {paystackError && (
                      <div className="p-2.5 bg-[#FF5B00]/15 border border-[#FF5B00]/60 rounded-xl text-[11px] text-orange-200 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-[#FF5B00]" />
                        <span>{paystackError}</span>
                      </div>
                    )}

                    {paymentSuccessReceipt && (
                      <div className="p-3 bg-[#12241D] border border-[#84CC16] rounded-xl text-xs text-lime-200 space-y-1">
                        <div className="flex items-center gap-2 font-black text-[#84CC16]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Payment Verified &amp; Direct Subscription Activated!</span>
                        </div>
                        <div className="text-[11px] flex items-center gap-3 flex-wrap">
                          <span>Plan: {paymentSuccessReceipt.plan}</span>
                          <span>Amount: ₦{paymentSuccessReceipt.amount.toLocaleString()}</span>
                          <span className="font-mono">Ref: {paymentSuccessReceipt.reference}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* SHEET 2: INSTITUTIONAL STUDENT LINK CODE & WHATSAPP PTA */}
              {activeSheet === 'school-code' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Your Institutional Student Link Code</h3>
                        <span className="text-[11px] text-slate-400">{selectedSchool}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#14203D] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <span className="text-2xl font-mono font-black text-[#84CC16] tracking-wider">
                      {adminSchoolCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3.5 py-2 rounded-xl bg-[#0D1527] hover:bg-[#18294A] text-white text-xs font-black border border-[#84CC16]/40 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#84CC16]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full py-3 px-4 rounded-2xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B00]/25 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share to School WhatsApp / PTA</span>
                  </button>
                </>
              )}

              {/* SHEET 3: NATIONAL SECONDARY SCHOOL ACADEMIC LEAGUE (STANDINGS) */}
              {activeSheet === 'league' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          National Secondary School Academic League
                        </h3>
                        <span className="text-[11px] text-[#84CC16] font-mono">Term 2 Standings</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {SCHOOL_LEADERBOARD_DATA.map(sch => {
                      const isSelected = sch.schoolName.toLowerCase() === selectedSchool.toLowerCase();
                      return (
                        <div
                          key={sch.rank}
                          className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-[#12241D] border-[#84CC16]'
                              : 'bg-[#14203D] border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                                sch.rank === 1
                                  ? 'bg-[#FF5B00] text-white'
                                  : sch.rank === 2
                                  ? 'bg-[#84CC16] text-slate-950'
                                  : 'bg-[#0D1527] text-slate-300 border border-slate-700'
                              }`}
                            >
                              {sch.rank}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-black text-white truncate">{sch.schoolName}</span>
                                {isSelected && (
                                  <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-1.5 rounded">
                                    Current View
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-300 block">
                                {sch.state} State · {sch.studentCount} Scholars · {sch.averageAccuracy}% Avg Accuracy
                              </span>
                            </div>
                          </div>

                          <div className="text-right font-mono shrink-0 ml-2">
                            <span className="font-black text-[#84CC16] block">
                              {sch.totalPoints.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">Total XP</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Material Detail Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/50 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-black text-[#FF5B00] uppercase tracking-wider block">
                  {previewMaterial.subject} · {previewMaterial.classLevel}
                </span>
                <h3 className="text-base font-black text-white mt-1">{previewMaterial.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setPreviewMaterial(null);
                }}
                className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap">
                <span>By: {previewMaterial.authorName}</span>
                {previewMaterial.dueDate && (
                  <span className="text-[#FF5B00] font-bold">· Due: {previewMaterial.dueDate}</span>
                )}
                {previewMaterial.maxScore && (
                  <span className="text-[#84CC16] font-mono font-bold">· {previewMaterial.maxScore} Marks</span>
                )}
              </div>

              <div className="bg-[#14203D] p-4 rounded-2xl border border-slate-800 text-xs text-slate-100 whitespace-pre-wrap leading-relaxed">
                {previewMaterial.content}
              </div>

              {previewMaterial.attachmentName && (
                <div className="p-3 bg-[#14203D] border border-[#84CC16]/40 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#84CC16]" />
                    <span className="text-xs font-bold text-white">{previewMaterial.attachmentName}</span>
                  </div>
                  <span className="text-[10px] text-[#84CC16] font-bold">Download Ready</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                setPreviewMaterial(null);
              }}
              className="w-full py-2.5 bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 rounded-xl text-xs font-black transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
