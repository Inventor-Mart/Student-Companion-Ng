import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
import { SchoolMaterial, NigerianClassLevel } from '../../types';
import { DeviceImageUploader } from './DeviceImageUploader';
import {
  Building2,
  Trophy,
  Users,
  Award,
  Upload,
  CheckCircle2,
  Plus,
  BookOpen,
  TrendingUp,
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
  Unlock,
  ExternalLink,
  ShieldCheck,
  KeyRound,
  Filter,
  Eye,
  X,
  CreditCard,
  Clock
} from 'lucide-react';

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
    subscribeSchoolAdmin
  } = useApp();

  const [activeTab, setActiveTab] = useState<'publishing' | 'materials' | 'students' | 'standings'>('publishing');
  
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
  const verificationStatus = currentUserProfile?.adminData?.verificationStatus || (isSuperAdmin ? 'verified' : 'pending_verification');
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
  const [studentSubscriptionFilter, setStudentSubscriptionFilter] = useState<'all' | 'paid' | 'free'>('all');

  const handleDirectSchoolSubscription = async (plan: 'monthly' | 'termly') => {
    setPaystackError(null);
    setIsProcessingPaystack(true);

    if (typeof (window as any).PaystackPop === 'undefined') {
      setPaystackError('Paystack checkout SDK is loading. Please check network connectivity and try again.');
      setIsProcessingPaystack(false);
      return;
    }

    const amountNaira = plan === 'termly' ? 42000 : 15000;
    const payerEmail = currentUserProfile?.email || 'admin@school.edu.ng';
    const txRef = `SCHL_${plan.toUpperCase()}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    let activeKey = 'pk_test_e5be598dc42f3a5332f170c0c0e5a6e87f6e8d1a';
    try {
      const configRes = await fetch('/api/paystack/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.publicKey) {
          activeKey = configData.publicKey;
        }
      }
    } catch {
      // fallback
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
        callback: async (response: { reference: string }) => {
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
              await subscribeSchoolAdmin(plan, response.reference);
              setPaymentSuccessReceipt({
                reference: response.reference,
                amount: amountNaira,
                plan: plan === 'termly' ? 'Termly Pass (3 Months)' : 'Monthly Pass',
                expiresAt: verifyData.expiresAt || new Date(Date.now() + (plan === 'termly' ? 90 : 30) * 86400000).toISOString()
              });
            } else {
              setPaystackError(verifyData.error || 'Payment reference verification failed at backend.');
            }
          } catch (err: any) {
            setPaystackError(err?.message || 'Network error verifying Paystack transaction');
          } finally {
            setIsProcessingPaystack(false);
          }
        },
        onClose: () => {
          setIsProcessingPaystack(false);
        }
      });

      handler.openIframe();
    } catch (err: any) {
      console.error('Paystack popup error:', err);
      setPaystackError(err?.message || 'Failed to open Paystack payment window');
      setIsProcessingPaystack(false);
    }
  };

  // Find active school stats from leaderboard
  const activeSchoolStats = SCHOOL_LEADERBOARD_DATA.find(
    s => s.schoolName.toLowerCase() === selectedSchool.toLowerCase()
  ) || SCHOOL_LEADERBOARD_DATA[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(adminSchoolCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `📚 Official ${selectedSchool} Portal Access\n\nDear Students & Parents,\nPlease link your Student Companion account with our official institutional code: *${adminSchoolCode}*\n\nOnce linked, you will receive our WAEC/NECO lesson notes, homework assignments, term projects, and past question CBT practice drills.\n\nSign up or enter code in profile at: https://studentcompanion.ng`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (!isVerified) return;

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
      dueDate: (materialType === 'assignment' || materialType === 'project') ? dueDate : undefined,
      maxScore: (materialType === 'assignment' || materialType === 'project' || materialType === 'past_question') ? parseInt(maxScore) || 20 : undefined,
      examBoard: materialType === 'past_question' ? examBoard : undefined,
      attachmentUrl: attachmentUrl || undefined,
      attachmentName: attachmentName || (attachmentUrl ? `${subject}_Curriculum_Document.pdf` : undefined),
      authorName: `${adminName} (${designation})`
    });

    setPublishSuccess(true);
    setTitle('');
    setContent('');
    setAttachmentUrl('');
    setAttachmentName('');

    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('materials');
    }, 1800);
  };

  // Filter school materials for this school
  const currentSchoolMaterials = schoolMaterials.filter(
    m => m.schoolCode.toUpperCase() === adminSchoolCode.toUpperCase() ||
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
    ...(student?.name && student.schoolCode === adminSchoolCode
      ? [{ ...student, isCurrentAccount: true }]
      : []),
    ...registeredStudents
      .filter(s => s.id !== student?.id && s.schoolCode === adminSchoolCode)
      .map(s => ({ ...s, isCurrentAccount: false }))
  ];

  const filteredStudents = combinedStudents.filter(std => {
    if (studentClassFilter === 'junior' && !std.classLevel.startsWith('JSS')) return false;
    if (studentClassFilter === 'senior' && !std.classLevel.startsWith('SS')) return false;
    const isPaid = std.isSubscribed === true ||
      (Boolean(std.subscriptionTier) && std.subscriptionTier !== 'free') ||
      (Boolean(std.subscribedUntil) && new Date(std.subscribedUntil!) > new Date());
    if (studentSubscriptionFilter === 'paid' && !isPaid) return false;
    if (studentSubscriptionFilter === 'free' && isPaid) return false;
    return true;
  });

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Super Admin Switch Banner */}
      {isSuperAdmin && (
        <div className="bg-purple-950/60 border border-purple-700/60 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-200">
              Viewing as <strong>School Administrator</strong>. Super Admin privilege detected.
            </span>
          </div>
          <button
            onClick={() => switchRole('admin')}
            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-[11px] transition-colors cursor-pointer shrink-0 ml-2"
          >
            Super Admin Console &rarr;
          </button>
        </div>
      )}

      {/* Institutional Verification Gate & Qualification Banner */}
      {!isVerified ? (
        metrics.isQualifiedForReview ? (
          <div className="bg-indigo-950/70 border border-indigo-500/80 rounded-2xl p-4.5 space-y-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-900/80 border border-indigo-500 flex items-center justify-center text-indigo-300 shrink-0 shadow">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white">
                    Accreditation Qualification Threshold Met!
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
                    {metrics.paidStudents >= 50
                      ? `${metrics.paidStudents} Subscribed Students Affiliated`
                      : 'Direct Institutional Subscription Active'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700">
                    Super Admin Review In Progress
                  </span>
                </div>
                <p className="text-xs text-indigo-200/90 leading-relaxed">
                  Your school has satisfied the prerequisite qualification criteria! Authorized Super Admins are reviewing your uploaded CAC registration and Ministry of Education documents in the administrative console to activate full lesson note and past question publishing features.
                </p>
                {metrics.hasActiveDirectSubscription && metrics.directSubscriptionExpiresAt && (
                  <div className="text-[11px] text-purple-300 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      Direct institutional subscription active through: <strong>{new Date(metrics.directSubscriptionExpiresAt).toLocaleDateString()}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl p-4.5 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-600/70 flex items-center justify-center text-amber-300 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">
                      Institutional Accreditation Qualification Gate
                    </h3>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      Pending Qualification
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Schools require at least 50 subscribed students (not on the free tier) OR a direct subscription before verification can be finalized and curriculum features unlocked.
                  </p>
                </div>
              </div>
            </div>

            {/* Pathway A: Live Subscribed Students Progress Tracker */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Pathway A: Student Subscription Quota (Minimum 50 Subscribed)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Students link via your 6-character code <strong className="font-mono text-purple-300">{adminSchoolCode}</strong> upon signup or profile update.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-emerald-400">
                    {metrics.paidStudents} / 50
                  </span>
                  <span className="text-[10px] text-slate-500 block">Subscribed Scholars</span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((metrics.paidStudents / 50) * 100))}%` }}
                />
              </div>

              {/* Metrics Breakdown Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Subscribed (Non-Free Tier)</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{metrics.paidStudents}</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Free Tier Linked Students</span>
                  <span className="font-bold text-slate-400 font-mono text-sm">{metrics.freeStudents}</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">More Subscribed Needed</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">{Math.max(0, 50 - metrics.paidStudents)}</span>
                </div>
              </div>
            </div>

            {/* Pathway B: Direct Institutional Paystack Subscription */}
            <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-purple-200 block flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                    <span>Pathway B: Direct Institutional Subscription</span>
                  </span>
                  <span className="text-[11px] text-purple-300/80">
                    Bypass the 50-student threshold with direct school subscription via live Paystack checkout.
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 self-start sm:self-auto">
                  Instant Qualification
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Monthly Plan */}
                <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 hover:border-purple-700/60 transition-colors flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Monthly School Access</span>
                      <span className="text-xs font-bold text-purple-300 font-mono">₦15,000 / mo</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      30 days of accredited institutional publishing access for curriculum notes, homework assignments, and past exams.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDirectSchoolSubscription('monthly')}
                    disabled={isProcessingPaystack}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700 disabled:opacity-50"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{isProcessingPaystack ? 'Connecting...' : 'Subscribe Monthly (₦15,000)'}</span>
                  </button>
                </div>

                {/* Termly Plan */}
                <div className="bg-gradient-to-br from-purple-950/90 to-indigo-950/90 p-3.5 rounded-xl border border-purple-600/80 flex flex-col justify-between space-y-3 relative shadow-sm">
                  <span className="absolute -top-2 right-3 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-600">
                    Recommended · Save ₦3,000
                  </span>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Full Term Pass</span>
                      <span className="text-xs font-bold text-emerald-300 font-mono">₦42,000 / term</span>
                    </div>
                    <p className="text-[10px] text-purple-200/80 mt-1 leading-relaxed">
                      90 days coverage covering an entire secondary school term across JSS 1 through SS 3 with full CBT broadcast drills.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDirectSchoolSubscription('termly')}
                    disabled={isProcessingPaystack}
                    className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isProcessingPaystack ? 'Connecting...' : 'Subscribe Full Term (₦42,000)'}</span>
                  </button>
                </div>
              </div>

              {/* Paystack Error */}
              {paystackError && (
                <div className="p-2.5 bg-rose-950/80 border border-rose-800 rounded-lg text-[11px] text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{paystackError}</span>
                </div>
              )}

              {/* Payment Success Receipt */}
              {paymentSuccessReceipt && (
                <div className="p-3 bg-emerald-950/90 border border-emerald-600 rounded-xl text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Payment Verified &amp; Direct Subscription Activated!</span>
                  </div>
                  <div className="text-[11px] text-emerald-300/90 flex items-center gap-3 flex-wrap">
                    <span>Plan: <strong>{paymentSuccessReceipt.plan}</strong></span>
                    <span>Amount: <strong>₦{paymentSuccessReceipt.amount.toLocaleString()}</strong></span>
                    <span>Ref: <strong className="font-mono">{paymentSuccessReceipt.reference}</strong></span>
                    <span>Valid until: <strong>{new Date(paymentSuccessReceipt.expiresAt).toLocaleDateString()}</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="bg-emerald-950/40 border border-emerald-600/60 rounded-2xl p-3 flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-900/80 border border-emerald-600 flex items-center justify-center text-emerald-300 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-emerald-300 block">
                Ministry of Education &amp; National Examination Board Accredited
              </span>
              <span className="text-[11px] text-slate-400">
                Full institutional publishing privileges unlocked for {selectedSchool} ({metrics.hasActiveDirectSubscription ? 'Direct Institutional Subscription Active' : `${metrics.paidStudents} Subscribed Scholars`}).
              </span>
            </div>
          </div>
        </div>
      )}

      {/* School Header Card & Code Sharing Hub */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {selectedSchool}
                </h2>
                <span className="text-[10px] font-semibold text-purple-300 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">
                  {schoolType}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {designation} · {adminName}
              </p>
              <span className="text-[10px] text-slate-500 block">
                Official Curriculum Publishing Studio, Student Linking &amp; Academic Standings
              </span>
            </div>
          </div>

          {/* School Selector Dropdown */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 self-start w-full sm:w-auto">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Administer School Context:
            </label>
            <div className="relative">
              <select
                value={selectedSchool}
                onChange={e => setSelectedSchool(e.target.value)}
                className="w-full sm:w-64 bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 pr-8"
              >
                {availableSchools.map(sch => (
                  <option key={sch} value={sch}>
                    {sch}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 6-Character School Code & WhatsApp Share Hub */}
        <div className="bg-[#0A1220] p-3.5 rounded-xl border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-700/60 flex items-center justify-center text-purple-300 shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Your Institutional Student Link Code
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-mono font-black text-purple-300 tracking-wider">
                  {adminSchoolCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to School WhatsApp / PTA</span>
            </button>
          </div>
        </div>

        {/* School KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-800/80">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">National League Rank</span>
            <span className="text-sm font-black text-amber-400 font-mono">Rank #{activeSchoolStats.rank}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Published Materials</span>
            <span className="text-sm font-black text-purple-300 font-mono">
              {currentSchoolMaterials.length} Items
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Linked Scholars</span>
            <span className="text-sm font-black text-emerald-400 font-mono">
              {filteredStudents.length} Active
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Average CBT Accuracy</span>
            <span className="text-sm font-black text-indigo-300 font-mono">{activeSchoolStats.averageAccuracy}%</span>
          </div>
        </div>

        {/* Primary Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'publishing', label: 'Publishing Studio', icon: Upload },
            { id: 'materials', label: `Materials (${currentSchoolMaterials.length})`, icon: BookOpen },
            { id: 'students', label: `Student Roster (${filteredStudents.length})`, icon: Users },
            { id: 'standings', label: 'Academic League', icon: Trophy }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CURRICULUM PUBLISHING STUDIO */}
      {activeTab === 'publishing' && (
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-purple-400" />
                <span>Publish Institutional Curriculum Material</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create institutional lesson notes, assignments, term projects, or past question CBT drills for {selectedSchool}.
              </p>
            </div>

            {!isVerified && (
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Publishing Locked</span>
              </span>
            )}
          </div>

          {/* Material Category Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Material Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: 'lesson_note', label: 'Lesson Note', desc: 'Curriculum notes' },
                { type: 'assignment', label: 'Assignment', desc: 'Due date & marks' },
                { type: 'project', label: 'Term Project', desc: 'STEM / Exhibition' },
                { type: 'past_question', label: 'Past Question', desc: 'CBT Drills' }
              ].map(item => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setMaterialType(item.type as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    materialType === item.type
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-sm ring-1 ring-purple-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold block">{item.label}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Target Subject <span className="text-purple-400">*</span>
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
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
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Target Class Level <span className="text-purple-400">*</span>
                </label>
                <select
                  value={classLevel}
                  onChange={e => setClassLevel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
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
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Term</label>
                  <select
                    value={term}
                    onChange={e => setTerm(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Week</label>
                  <select
                    value={week}
                    onChange={e => setWeek(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Material Title / Topic Headline <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. WAEC Review: Differential Calculus & Rates of Change"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Conditional fields for Assignments / Projects / Past Questions */}
            {(materialType === 'assignment' || materialType === 'project') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>Submission Due Date:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Maximum Marks / Score:</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxScore}
                    onChange={e => setMaxScore(e.target.value)}
                    placeholder="20"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {materialType === 'past_question' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Examination Board:
                  </label>
                  <select
                    value={examBoard}
                    onChange={e => setExamBoard(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="WAEC">WAEC (West African Examinations Council)</option>
                    <option value="JAMB">JAMB UTME (University Matriculation)</option>
                    <option value="NECO">NECO (National Examinations Council)</option>
                    <option value="BECE">BECE (Basic Education Certificate Exam)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Question Count / Total Score:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxScore}
                    onChange={e => setMaxScore(e.target.value)}
                    placeholder="25"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Detailed Lesson Notes / Assignment Instructions <span className="text-purple-400">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Enter rich curriculum summary, step-by-step formulas, assignment questions, or project guidelines..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 leading-relaxed font-sans"
              />
            </div>

            {/* Document / Worksheet Attachment Upload */}
            <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Worksheet / Curriculum Attachment (Optional)</span>
                </label>
                <span className="text-[10px] text-slate-500">PDF, Notes, Worksheet</span>
              </div>
              <input
                type="text"
                value={attachmentName}
                onChange={e => setAttachmentName(e.target.value)}
                placeholder="Attachment Label (e.g. Calculus_Problem_Set.pdf)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
              <DeviceImageUploader
                currentImageUrl={attachmentUrl}
                onImageChange={setAttachmentUrl}
              />
            </div>

            <button
              type="submit"
              disabled={!isVerified}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                isVerified
                  ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
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
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Material published successfully! Redirecting to materials ledger...</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 2: PUBLISHED MATERIALS LEDGER */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Published Curriculum Library ({filteredMaterials.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Institutional lesson notes, assignments, and past question drills accessible to students linked to {adminSchoolCode}.
              </p>
            </div>

            {/* Filter Chips */}
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
                  onClick={() => setMaterialFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                    materialFilter === f.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredMaterials.map(mat => {
              const typeColor =
                mat.type === 'lesson_note'
                  ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                  : mat.type === 'assignment'
                  ? 'bg-amber-950 text-amber-300 border-amber-700'
                  : mat.type === 'project'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-sky-950 text-sky-300 border-sky-700';

              const typeLabel =
                mat.type === 'lesson_note'
                  ? 'Lesson Note'
                  : mat.type === 'assignment'
                  ? 'Assignment'
                  : mat.type === 'project'
                  ? 'Term Project'
                  : 'Past Question Drill';

              return (
                <div
                  key={mat.id}
                  className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${typeColor}`}>
                          {typeLabel}
                        </span>
                        <span className="text-xs font-semibold text-purple-300">
                          {mat.subject}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs text-slate-300">
                          {mat.classLevel}
                        </span>
                        {mat.term && (
                          <>
                            <span className="text-slate-500">·</span>
                            <span className="text-xs text-slate-400">{mat.term} ({mat.week})</span>
                          </>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {mat.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setPreviewMaterial(mat)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Read Note"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSchoolMaterial(mat.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs transition-colors cursor-pointer"
                        title="Delete material"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mat.content}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>By: {mat.authorName}</span>
                      {mat.dueDate && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className="text-amber-400 font-medium">Due: {mat.dueDate}</span>
                        </>
                      )}
                      {mat.maxScore && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className="text-emerald-400 font-mono font-medium">{mat.maxScore} Marks</span>
                        </>
                      )}
                      {mat.examBoard && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className="text-sky-300 font-semibold">{mat.examBoard} Exam Drill</span>
                        </>
                      )}
                    </div>

                    {mat.attachmentName && (
                      <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{mat.attachmentName}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredMaterials.length === 0 && (
              <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-3">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-xs font-bold text-slate-300">No materials published yet</h4>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Click the Publishing Studio tab to create your first institutional lesson note, homework assignment, or past question drill.
                </p>
                <button
                  onClick={() => setActiveTab('publishing')}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Open Publishing Studio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: LINKED STUDENT ROSTER */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Scholars Linked to {selectedSchool} ({filteredStudents.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Secondary students who entered code <span className="font-mono font-bold text-purple-300">{adminSchoolCode}</span> to sync assignments &amp; uniform verifications.
                </p>
              </div>

              {/* Class & Subscription Filter Chips */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'All Classes' },
                    { id: 'junior', label: 'Junior (JSS)' },
                    { id: 'senior', label: 'Senior (SS)' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setStudentClassFilter(c.id as any)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                        studentClassFilter === c.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
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
                      onClick={() => setStudentSubscriptionFilter(f.id as any)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                        studentSubscriptionFilter === f.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-2">
            {filteredStudents.map((std, idx) => {
              const isPaid = std.isSubscribed === true ||
                (Boolean(std.subscriptionTier) && std.subscriptionTier !== 'free') ||
                (Boolean(std.subscribedUntil) && new Date(std.subscribedUntil!) > new Date());

              return (
                <div
                  key={std.id || idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    (std as any).isCurrentAccount
                      ? 'bg-emerald-950/40 border-emerald-600/70 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      (std as any).isCurrentAccount
                        ? 'bg-emerald-900 border border-emerald-700 text-emerald-300'
                        : 'bg-purple-950/80 border border-purple-800/80 text-purple-300'
                    }`}>
                      {std.name ? std.name.charAt(0) : 'S'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-xs">{std.name}</span>
                        {(std as any).isCurrentAccount && (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                            Current Account
                          </span>
                        )}
                        {isPaid ? (
                          <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-700">
                            ✓ Subscribed
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                            Free Tier
                          </span>
                        )}
                        {std.uniformVerified && (
                          <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" />
                            <span>Uniform Verified</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {std.classLevel} · School Code: <span className="font-mono text-purple-300">{adminSchoolCode}</span> · Rank: {std.rank || 'Scholar'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0 ml-2">
                    <span className="font-bold text-emerald-400 text-sm block">
                      {std.xp.toLocaleString()} XP
                    </span>
                    <span className="text-[10px] text-amber-400 block">
                      {std.streakDays || 1}d streak 🔥
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredStudents.length === 0 && (
              <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">No students linked yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Students link their accounts by entering your 6-character School Code <strong className="font-mono text-purple-300">{adminSchoolCode}</strong> upon signup or directly in their profile dashboard. Share your code via WhatsApp PTA broadcast to populate this roster.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer shadow"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share School Code to WhatsApp PTA</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: INTER-SCHOOL LEAGUE STANDINGS */}
      {activeTab === 'standings' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              National Secondary School Academic League
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Term 2 Standings</span>
          </div>

          <div className="space-y-2">
            {SCHOOL_LEADERBOARD_DATA.map(sch => {
              const isSelected = sch.schoolName.toLowerCase() === selectedSchool.toLowerCase();
              return (
                <div
                  key={sch.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500/80 shadow-md ring-1 ring-purple-500'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                        sch.rank === 1
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : sch.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : sch.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sch.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-white text-xs">{sch.schoolName}</span>
                        {isSelected && (
                          <span className="text-[9px] font-bold text-purple-300 bg-purple-950 px-1.5 rounded border border-purple-700">
                            Current View
                          </span>
                        )}
                        {sch.rank === 1 && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 rounded border border-amber-800">
                            🏆 Gold Cup Leader
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {sch.state} State · {sch.studentCount} Scholars · {sch.averageAccuracy}% Avg Accuracy
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0 ml-2">
                    <span className="font-bold text-emerald-400 text-sm block">
                      {sch.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">Total XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Material Detail Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                  {previewMaterial.subject} · {previewMaterial.classLevel}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {previewMaterial.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMaterial(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>By: {previewMaterial.authorName}</span>
                {previewMaterial.dueDate && (
                  <>
                    <span>·</span>
                    <span className="text-amber-400 font-semibold">Due: {previewMaterial.dueDate}</span>
                  </>
                )}
                {previewMaterial.maxScore && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-400 font-mono font-semibold">{previewMaterial.maxScore} Marks</span>
                  </>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {previewMaterial.content}
              </div>

              {previewMaterial.attachmentName && (
                <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white">{previewMaterial.attachmentName}</span>
                  </div>
                  <span className="text-[10px] text-purple-300 font-medium">Download Ready</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setPreviewMaterial(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
