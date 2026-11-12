import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CBTExam } from '../../types';
import { getOfficialSubjectsForClass, get12WeekTopicsForDrill } from '../../data/curriculumData';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  Timer,
  BookOpen,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Database,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Wallet,
  CreditCard,
  AlertCircle,
  X,
  FileText,
  GraduationCap,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface TermlyDrillHubProps {
  onStartExam: (exam: CBTExam) => void;
  onOpenUnlockModal: (subject: string) => void;
}

const CLASS_OPTIONS = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
const TERM_OPTIONS = [
  { id: '2nd Term', label: '2nd Term (Current Academic Term)' },
  { id: '1st Term', label: '1st Term' },
  { id: '3rd Term', label: '3rd Term' }
];

type CertificateBoard = 'BECE' | 'WAEC' | 'NECO' | 'JAMB';

// Parse raw or nested error messages into clean student-friendly messages
const formatDrillErrorMessage = (rawError?: string | null): string => {
  if (!rawError) return 'Failed to initialize examination paper. Please try again.';
  const str = String(rawError).trim();
  try {
    const parsed = JSON.parse(str);
    if (parsed.error && parsed.error.message) {
      return formatDrillErrorMessage(parsed.error.message);
    }
    if (parsed.message) {
      return formatDrillErrorMessage(parsed.message);
    }
  } catch {}

  if (
    str.includes('503') ||
    str.includes('high demand') ||
    str.includes('UNAVAILABLE') ||
    str.includes('spikes in demand')
  ) {
    return 'The AI examination engine is experiencing temporary high demand across national curriculum servers. Spikes are brief.';
  }

  if (str.includes('429') || str.includes('quota') || str.includes('RESOURCE_EXHAUSTED')) {
    return 'Examination generation capacity is temporarily saturated. Please wait a brief moment.';
  }

  return str;
};

// Check if error is transient (qualifying for automatic countdown retry)
const isTransientDrillError = (rawError?: string | null): boolean => {
  if (!rawError) return false;
  const str = String(rawError).toLowerCase();
  return (
    str.includes('503') ||
    str.includes('high demand') ||
    str.includes('unavailable') ||
    str.includes('temporarily') ||
    str.includes('spikes') ||
    str.includes('network') ||
    str.includes('timeout') ||
    str.includes('429')
  );
};

export const TermlyDrillHub: React.FC<TermlyDrillHubProps> = ({ onStartExam, onOpenUnlockModal }) => {
  const {
    student,
    currentUser,
    currentUserProfile,
    parentWallet,
    fetchOrGenerateTermlyDrill,
    fetchOrGenerateCertificateDrill,
    deductWalletForFreshDrill,
    isSubjectExamUnlocked
  } = useApp();

  const defaultClass = (student?.classLevel && CLASS_OPTIONS.includes(student.classLevel))
    ? student.classLevel
    : 'SS 3';

  const [selectedClass, setSelectedClass] = useState<string>(defaultClass);
  const [selectedTerm, setSelectedTerm] = useState<'1st Term' | '2nd Term' | '3rd Term'>('2nd Term');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');

  // Examination Mode: TERMLY or CERTIFICATE
  const isJSS3 = selectedClass === 'JSS 3';
  const isSS3 = selectedClass === 'SS 3';
  const hasCertificateOption = isJSS3 || isSS3;

  const [drillMode, setDrillMode] = useState<'TERMLY' | 'CERTIFICATE'>('TERMLY');
  const [selectedSS3Board, setSelectedSS3Board] = useState<'WAEC' | 'NECO' | 'JAMB'>('WAEC');

  // Determine active board when in CERTIFICATE mode
  const activeBoard: CertificateBoard = isJSS3 ? 'BECE' : selectedSS3Board;

  const [isTopicsExpanded, setIsTopicsExpanded] = useState<boolean>(false);
  const [isCachedInFirestore, setIsCachedInFirestore] = useState<boolean | null>(null);
  const [checkingCache, setCheckingCache] = useState<boolean>(false);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

  // Fresh Paper Modal
  const [isFreshModalOpen, setIsFreshModalOpen] = useState<boolean>(false);
  const [freshPayMethod, setFreshPayMethod] = useState<'wallet' | 'paystack'>('wallet');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // If student changes class away from JSS 3 or SS 3, fall back to TERMLY mode
  useEffect(() => {
    if (!hasCertificateOption && drillMode === 'CERTIFICATE') {
      setDrillMode('TERMLY');
    }
  }, [selectedClass, hasCertificateOption, drillMode]);

  // 1. Get official subjects offered in that specific class
  const classSubjects = useMemo(() => {
    return getOfficialSubjectsForClass(selectedClass, student?.stream);
  }, [selectedClass, student?.stream]);

  // Keep selectedSubject valid when class changes
  useEffect(() => {
    if (classSubjects.length > 0 && !classSubjects.includes(selectedSubject)) {
      setSelectedSubject(classSubjects[0]);
    }
  }, [classSubjects, selectedSubject]);

  // 2. Lesson note topics for termly syllabus
  const syllabusTopics = useMemo(() => {
    return get12WeekTopicsForDrill(selectedClass, selectedTerm, selectedSubject);
  }, [selectedClass, selectedTerm, selectedSubject]);

  // 3. Computed board specifications & standards
  const currentExamSpec = useMemo(() => {
    if (drillMode === 'TERMLY') {
      return {
        title: `${selectedClass} ${selectedSubject} · ${selectedTerm} Drill`,
        boardBadge: 'NERDC Termly Drill',
        questionsCount: 40,
        durationMinutes: 45,
        xpReward: 200,
        freshFeeNaira: 500,
        standardsLabel: 'Weeks 1 to 12 Lesson Notes · 3–4 Questions per Week',
        collection: 'termly_drills',
        docId: `${selectedClass}_${selectedTerm}_${selectedSubject}`.toLowerCase().replace(/[^a-z0-9_-]/g, '_')
      };
    }

    if (activeBoard === 'BECE') {
      return {
        title: `BECE Junior WAEC · ${selectedSubject}`,
        boardBadge: 'Official BECE National Standard',
        questionsCount: 60,
        durationMinutes: 60,
        xpReward: 250,
        freshFeeNaira: 1000,
        standardsLabel: 'Complete 3-Year Junior Secondary NERDC Syllabus (JSS 1–3)',
        collection: 'certificate_drills',
        docId: `bece_${selectedSubject.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`
      };
    }

    if (activeBoard === 'WAEC') {
      return {
        title: `WAEC WASSCE Objective Paper 1 · ${selectedSubject}`,
        boardBadge: 'Official WAEC Standard',
        questionsCount: 50,
        durationMinutes: 60,
        xpReward: 250,
        freshFeeNaira: 500,
        standardsLabel: 'Senior Secondary WASSCE Syllabus (SS 1–3) · Chief Examiner Standard',
        collection: 'certificate_drills',
        docId: `waec_${selectedSubject.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`
      };
    }

    if (activeBoard === 'NECO') {
      return {
        title: `NECO SSCE Objective Paper 1 · ${selectedSubject}`,
        boardBadge: 'Official NECO Standard',
        questionsCount: 60,
        durationMinutes: 60,
        xpReward: 250,
        freshFeeNaira: 500,
        standardsLabel: 'National Examinations Council SSCE Standards (SS 1–3)',
        collection: 'certificate_drills',
        docId: `neco_${selectedSubject.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`
      };
    }

    // Default JAMB
    return {
      title: `JAMB UTME Computer-Based Test · ${selectedSubject}`,
      boardBadge: 'Official JAMB UTME Standard',
      questionsCount: 60,
      durationMinutes: 45,
      xpReward: 300,
      freshFeeNaira: 500,
      standardsLabel: 'Official JAMB UTME Syllabus · 45-Second Speed-Solving & Traps',
      collection: 'certificate_drills',
      docId: `jamb_${selectedSubject.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`
    };
  }, [drillMode, activeBoard, selectedClass, selectedTerm, selectedSubject]);

  // 4. Check Firestore cache status in real-time
  useEffect(() => {
    let active = true;
    const checkFirestore = async () => {
      setCheckingCache(true);
      try {
        const docRef = doc(db, currentExamSpec.collection, currentExamSpec.docId);
        const snap = await getDoc(docRef);
        if (active) {
          setIsCachedInFirestore(snap.exists());
        }
      } catch (e) {
        if (active) {
          setIsCachedInFirestore(false);
        }
      } finally {
        if (active) setCheckingCache(false);
      }
    };

    checkFirestore();
    return () => { active = false; };
  }, [currentExamSpec.collection, currentExamSpec.docId]);

  // Reset error and countdown when user changes exam filters
  useEffect(() => {
    setErrorMessage(null);
    setRetryCountdown(null);
  }, [selectedClass, selectedTerm, selectedSubject, drillMode, activeBoard]);

  // Launch or generate drill
  const handleLaunchDrill = async (forceFresh = false) => {
    setErrorMessage(null);
    setRetryCountdown(null);

    // Check single-subject / exam access
    if (!isSubjectExamUnlocked(selectedSubject)) {
      onOpenUnlockModal(selectedSubject);
      return;
    }

    setIsGenerating(true);
    setGenerationStep(
      forceFresh
        ? `Synthesizing fresh ${currentExamSpec.questionsCount}-question paper...`
        : (isCachedInFirestore ? 'Loading verified drill from Firestore...' : `Generating ${currentExamSpec.questionsCount} questions via AI...`)
    );

    try {
      let res: { success: boolean; drill?: CBTExam; error?: string };

      if (drillMode === 'TERMLY') {
        res = await fetchOrGenerateTermlyDrill({
          classLevel: selectedClass,
          term: selectedTerm,
          subject: selectedSubject,
          forceFresh,
          topicsContext: syllabusTopics
        });
      } else {
        res = await fetchOrGenerateCertificateDrill({
          board: activeBoard,
          classLevel: selectedClass,
          subject: selectedSubject,
          forceFresh
        });
      }

      if (!res.success || !res.drill) {
        const cleanErr = formatDrillErrorMessage(res.error);
        setErrorMessage(cleanErr);
        if (isTransientDrillError(res.error)) {
          setRetryCountdown(5);
        } else {
          setRetryCountdown(null);
        }
        setIsGenerating(false);
        return;
      }

      setRetryCountdown(null);
      setIsCachedInFirestore(true);
      setIsGenerating(false);
      onStartExam(res.drill);
    } catch (err: any) {
      const cleanErr = formatDrillErrorMessage(err?.message);
      setErrorMessage(cleanErr);
      if (isTransientDrillError(err?.message)) {
        setRetryCountdown(5);
      } else {
        setRetryCountdown(null);
      }
      setIsGenerating(false);
    }
  };

  // Automatic retry countdown handler
  useEffect(() => {
    if (retryCountdown === null) return;
    if (retryCountdown > 0) {
      const timer = setTimeout(() => {
        setRetryCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (retryCountdown === 0) {
      setRetryCountdown(null);
      handleLaunchDrill(false);
    }
  }, [retryCountdown]);

  // Fresh Paper Pay & Generate Handler
  const handleFreshPaperCheckout = async () => {
    setPaymentError(null);
    setIsProcessingPayment(true);
    const activeFee = currentExamSpec.freshFeeNaira;

    if (freshPayMethod === 'wallet') {
      const success = await deductWalletForFreshDrill(selectedSubject, activeFee, drillMode === 'CERTIFICATE' ? activeBoard : 'Termly');
      if (!success) {
        setPaymentError(`Insufficient Parent Escrow Wallet balance (₦${(parentWallet?.balanceNaira || 0).toLocaleString()} available, ₦${activeFee.toLocaleString()} required). Please choose Paystack or fund your wallet.`);
        setIsProcessingPayment(false);
        return;
      }

      setIsProcessingPayment(false);
      setIsFreshModalOpen(false);
      await handleLaunchDrill(true);
      return;
    }

    // Paystack popup flow
    if (typeof (window as any).PaystackPop === 'undefined') {
      setPaymentError('Paystack checkout script is not loaded yet. Please refresh or pay with Parent Wallet.');
      setIsProcessingPayment(false);
      return;
    }

    let activeKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
    if (!activeKey) {
      try {
        const saved = localStorage.getItem('sc_gateway_keys');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.paystackPublicKey) activeKey = parsed.paystackPublicKey;
        }
      } catch (e) {}
    }
    if (!activeKey) {
      activeKey = 'pk_test_placeholder_key';
    }

    const txRef = `PSTK_DRILL_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const payerEmail = currentUserProfile?.email || currentUser?.email || 'parent@studentcompanion.ng';

    const handler = (window as any).PaystackPop.setup({
      key: activeKey,
      email: payerEmail,
      amount: activeFee * 100, // in kobo
      currency: 'NGN',
      ref: txRef,
      metadata: {
        custom_fields: [
          { display_name: 'Student Name', variable_name: 'student_name', value: student.name || 'Student' },
          { display_name: 'Purpose', variable_name: 'purpose', value: `Fresh ${drillMode === 'CERTIFICATE' ? activeBoard : 'Termly'} Drill: ${selectedSubject}` }
        ]
      },
      callback: function(response: { reference: string }) {
        (async () => {
          try {
            await fetch('/api/paystack/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: response.reference,
                amountNaira: activeFee,
                email: payerEmail,
                studentName: student.name,
                purpose: 'certificate_drill_regeneration',
                board: drillMode === 'CERTIFICATE' ? activeBoard : 'TERMLY',
                subject: selectedSubject
              })
            });
          } catch (e) {
            console.warn('Backend payment verification logged:', e);
          }
          setIsProcessingPayment(false);
          setIsFreshModalOpen(false);
          await handleLaunchDrill(true);
        })();
      },
      onClose: function() {
        setIsProcessingPayment(false);
      }
    });

    handler.openIframe();
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950/60 p-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 uppercase tracking-wider">
                {currentExamSpec.boardBadge}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300 font-semibold">{currentExamSpec.title}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              Select Your Subject & Take the Official {currentExamSpec.questionsCount}-Question Drill
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentExamSpec.standardsLabel} · Official {currentExamSpec.durationMinutes}-minute time allocation
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {checkingCache ? (
              <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Checking Firestore...
              </span>
            ) : isCachedInFirestore ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-800">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Saved in Firestore</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Synthesizes via AI</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Mode Switcher for Terminal Classes (JSS 3 & SS 3) */}
      {hasCertificateOption && (
        <div className="bg-slate-950/90 px-4 pt-3 pb-2 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedClass} Examination Track:</span>
            </span>

            {/* Mode Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setDrillMode('TERMLY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  drillMode === 'TERMLY'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Termly Drill (40q · 45m)</span>
              </button>

              <button
                type="button"
                onClick={() => setDrillMode('CERTIFICATE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  drillMode === 'CERTIFICATE'
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>
                  {isJSS3 ? 'BECE Junior Drill (60q · 60m)' : 'Certificate Board Drill'}
                </span>
              </button>
            </div>
          </div>

          {/* SS 3 Board Sub-Selector (WAEC, NECO, JAMB) */}
          {isSS3 && drillMode === 'CERTIFICATE' && (
            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-800/80 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">Choose Certificate Board:</span>
              {(['WAEC', 'NECO', 'JAMB'] as const).map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedSS3Board(b)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedSS3Board === b
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {b === 'WAEC' && 'WAEC WASSCE (50q · 60m)'}
                  {b === 'NECO' && 'NECO SSCE (60q · 60m)'}
                  {b === 'JAMB' && 'JAMB UTME (60q · 45m)'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Selectors Bar */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Class Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Class</span>
            </label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {CLASS_OPTIONS.map(cls => (
                <option key={cls} value={cls} className="bg-slate-900 text-white">
                  {cls} {cls === student.classLevel ? '(Your Class)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Academic Term / Board Cycle */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{drillMode === 'TERMLY' ? 'Academic Term' : 'Examination Series'}</span>
            </label>
            {drillMode === 'TERMLY' ? (
              <select
                value={selectedTerm}
                onChange={e => setSelectedTerm(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
              >
                {TERM_OPTIONS.map(term => (
                  <option key={term.id} value={term.id} className="bg-slate-900 text-white">
                    {term.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold flex items-center justify-between">
                <span>{activeBoard} National Examination Cycle</span>
                <span className="text-[10px] text-slate-500 uppercase">Official</span>
              </div>
            )}
          </div>

          {/* 3. Class-Specific Subject Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Subject ({classSubjects.length} Offered)</span>
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-semibold focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {classSubjects.map(sub => (
                <option key={sub} value={sub} className="bg-slate-900 text-white">
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drill Meta & Spec Bar */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Timer className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{currentExamSpec.durationMinutes} Minutes</span>
              <span className="text-slate-500 text-[11px]">(Official Speed Timing)</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-white">{currentExamSpec.questionsCount} Objective Questions</span>
              <span className="text-slate-500 text-[11px]">(4 Options: A, B, C, D)</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-amber-300">+{currentExamSpec.xpReward} XP</span>
              <span className="text-slate-500 text-[11px]">Reward</span>
            </div>
          </div>

          {drillMode === 'TERMLY' && (
            <button
              type="button"
              onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{isTopicsExpanded ? 'Hide' : 'View'} Weeks 1–12 Lesson Syllabus</span>
              {isTopicsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Collapsible Lesson Note Topics Breakdown (for Termly Drill) */}
        {drillMode === 'TERMLY' && isTopicsExpanded && (
          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-800 pb-1.5">
              <span>{selectedClass} {selectedSubject} · {selectedTerm} Lesson Note Plan</span>
              <span className="text-emerald-400">~3 to 4 Questions per Week</span>
            </div>
            {syllabusTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {syllabusTopics.map((top, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2"
                  >
                    <span className="font-bold text-emerald-400 shrink-0">W{idx + 1}</span>
                    <span className="truncate">{top.replace(/^Week \d+:\s*/, '')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 py-2">
                Standard comprehensive 12-week NERDC curriculum topics covering foundational principles, intermediate problem-solving, and advanced termly assessment will be tested across questions 1 to 40.
              </div>
            )}
          </div>
        )}

        {/* Error / Recovery Notification */}
        {errorMessage && (
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="font-medium text-slate-200 leading-relaxed">{errorMessage}</p>

              {retryCountdown !== null ? (
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Auto-retrying in <span className="font-mono tabular-nums text-white font-bold">{retryCountdown}s</span>...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRetryCountdown(null);
                        handleLaunchDrill(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] cursor-pointer transition-colors"
                    >
                      Retry Now
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRetryCountdown(null);
                        setErrorMessage(null);
                      }}
                      className="text-slate-400 hover:text-white text-[11px] cursor-pointer transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleLaunchDrill(false)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] cursor-pointer transition-colors"
                  >
                    Retry Generation
                  </button>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-slate-400 hover:text-white text-[11px] cursor-pointer transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generation Progress Indicator */}
        {isGenerating && (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {generationStep}
              </span>
              <span className="text-[11px] text-slate-400">
                {currentExamSpec.questionsCount} Questions · {currentExamSpec.durationMinutes} Mins
              </span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="text-xs text-slate-400">
            {isCachedInFirestore ? (
              <span>
                Verified paper cached in Firestore collection <code className="text-emerald-400 text-[11px]">/{currentExamSpec.collection}/{currentExamSpec.docId}</code>.
              </span>
            ) : (
              <span>
                Paper will be downloaded and saved to your Firestore database for instant reuse.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Generate Fresh Paper Button with Dynamic Fee */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => {
                setPaymentError(null);
                setIsFreshModalOpen(true);
              }}
              className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-all border border-slate-700 disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Fresh Paper · ₦{currentExamSpec.freshFeeNaira.toLocaleString()}</span>
            </button>

            {/* Main CTA: Start Drill */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => handleLaunchDrill(false)}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {isGenerating
                  ? 'Compiling Drill...'
                  : `Start ${currentExamSpec.durationMinutes}-Min ${drillMode === 'CERTIFICATE' ? activeBoard : 'Termly'} Drill`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fresh Paper Modal with Dynamic Pricing (₦1,000 BECE / ₦500 WAEC, NECO, JAMB, Termly) */}
      {isFreshModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Generate Fresh {currentExamSpec.questionsCount}-Question Paper
                </h3>
              </div>
              <button
                onClick={() => setIsFreshModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                An examination paper is currently saved in your Firestore for <strong className="text-white">{currentExamSpec.title}</strong>.
              </p>
              <p className="text-slate-400">
                To compile a completely unique, brand-new set of {currentExamSpec.questionsCount} objective questions adhering strictly to {currentExamSpec.boardBadge} specifications and replace the saved copy in Firestore, a <strong className="text-emerald-400">₦{currentExamSpec.freshFeeNaira.toLocaleString()} paper compilation fee</strong> applies.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Payment Channel
              </label>

              <div className="grid grid-cols-2 gap-2">
                {/* Option 1: Parent Escrow Wallet */}
                <button
                  type="button"
                  onClick={() => setFreshPayMethod('wallet')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    freshPayMethod === 'wallet'
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold">Parent Wallet</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Balance: ₦{(parentWallet?.balanceNaira || 0).toLocaleString()}
                  </div>
                </button>

                {/* Option 2: Paystack Checkout */}
                <button
                  type="button"
                  onClick={() => setFreshPayMethod('paystack')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    freshPayMethod === 'paystack'
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold">Paystack</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Card / Transfer / USSD
                  </div>
                </button>
              </div>
            </div>

            {paymentError && (
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-3 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p>{paymentError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsFreshModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleFreshPaperCheckout}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer transition-all shadow-md disabled:opacity-50"
              >
                {isProcessingPayment ? 'Processing...' : `Pay ₦${currentExamSpec.freshFeeNaira.toLocaleString()} & Generate`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
