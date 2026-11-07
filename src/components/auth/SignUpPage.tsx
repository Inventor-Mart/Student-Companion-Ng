import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, NigerianClassLevel, AcademicStream } from '../../types';
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Building2,
  ArrowLeft,
  Check,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  BookOpen,
  Award,
  DollarSign,
  MapPin,
  ChevronRight,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { NairaSign } from '../../utils/currency';

interface SignUpPageProps {
  onBackToSignIn: () => void;
  onSignUpSuccess: () => void;
  initialRole?: UserRole | null;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onBackToSignIn,
  onSignUpSuccess,
  initialRole
}) => {
  const { registerNewUser, targetSignUpRole } = useApp();

  const effectiveRole = initialRole || targetSignUpRole;
  const [step, setStep] = useState<1 | 2 | 3>(effectiveRole ? 2 : 1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(effectiveRole || 'student');

  // Common Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email Verification States
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [emailDeliveryError, setEmailDeliveryError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [codeNotification, setCodeNotification] = useState<string | null>(null);

  // Student Fields
  const [classLevel, setClassLevel] = useState<NigerianClassLevel>('SS 3');
  const [stream, setStream] = useState<AcademicStream>('Science');
  const [targetExam, setTargetExam] = useState<'WAEC' | 'JAMB_UTME' | 'NECO' | 'BECE' | 'INTERNAL'>('WAEC');
  const [schoolName, setSchoolName] = useState('');
  const [state, setState] = useState('Lagos');

  const isCertificateClass = (level: NigerianClassLevel): boolean => {
    return level === 'JSS 3' || level === 'SS 3';
  };

  const handleClassLevelChange = (val: NigerianClassLevel) => {
    setClassLevel(val);
    if (val.startsWith('JSS')) {
      setStream('Junior');
    } else if (stream === 'Junior') {
      setStream('Science');
    }

    if (val === 'JSS 3') {
      setTargetExam('BECE');
    } else if (val === 'SS 3') {
      setTargetExam(prev => (prev === 'BECE' || prev === 'INTERNAL' ? 'WAEC' : prev));
    } else {
      setTargetExam('INTERNAL');
    }
  };

  // Parent Fields
  const [phone, setPhone] = useState('');
  const [wardName, setWardName] = useState('');
  const [pin, setPin] = useState('');

  // Tutor Fields
  const [subjectSpecialization, setSubjectSpecialization] = useState('');
  const [qualification, setQualification] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [teachingMode, setTeachingMode] = useState<'both' | 'online' | 'physical'>('both');

  // Admin Fields
  const [adminSchoolName, setAdminSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('Private College');

  const roleCards: {
    role: UserRole;
    title: string;
    badge: React.ReactNode;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      role: 'student',
      title: 'Student',
      badge: 'JSS 1 – SS 3',
      description: 'Study curriculum notes, practice CBT exams, and earn XP badges.',
      icon: <GraduationCap className="w-6 h-6 text-[#84E000]" />,
      color: 'border-[#84E000]/60 hover:border-[#84E000]'
    },
    {
      role: 'parent',
      title: 'Parent / Guardian',
      badge: 'Safe & Verified',
      description: 'Monitor learning progress and approve vetted home & online tutors.',
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5B00]" />,
      color: 'border-[#FF5B00]/60 hover:border-[#FF5B00]'
    },
    {
      role: 'tutor',
      title: 'Educator / Tutor',
      badge: (
        <span className="inline-flex items-center gap-0.5">
          Earn <NairaSign />
        </span>
      ),
      description: 'Offer structured 1-on-1 tutoring sessions and track earnings.',
      icon: <Users className="w-6 h-6 text-sky-400" />,
      color: 'border-sky-500/60 hover:border-sky-400'
    },
    {
      role: 'growth_partner',
      title: 'Growth Partner',
      badge: '10% RevShare',
      description: 'Refer schools & students, earn 10% lifetime revenue share on every payment.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/60 hover:border-emerald-400'
    },
    {
      role: 'admin',
      title: 'School Administrator',
      badge: 'Institutional',
      description: 'Track inter-school rankings, student performance, and WAEC metrics.',
      icon: <Building2 className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/60 hover:border-purple-400'
    }
  ];

  useEffect(() => {
    if (step === 3 && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, resendTimer]);

  const sendVerificationCode = async (targetEmail: string): Promise<boolean> => {
    setIsSendingCode(true);
    setVerificationError(null);
    setEmailDeliveryError(null);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setResendTimer(30);

    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'Student';

    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          code,
          name: displayName,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success && result.delivered) {
        const providerText = result.provider === 'gmail-smtp' ? 'Gmail' : 'Email Service';
        setCodeNotification(`Verification code successfully sent to ${targetEmail} via ${providerText}. Check your inbox or spam.`);
        setEmailDeliveryError(null);
        return true;
      } else {
        const errorMsg = result.error || `Unable to deliver verification code to ${targetEmail}. Please check that the email address is correct.`;
        setEmailDeliveryError(errorMsg);
        setVerificationError(errorMsg);
        setCodeNotification(null);
        return false;
      }
    } catch (err) {
      console.warn('Network issue calling verification service:', err);
      const networkError = 'Network error: Unable to contact verification server. Please check your internet connection.';
      setEmailDeliveryError(networkError);
      setVerificationError(networkError);
      setCodeNotification(null);
      return false;
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleProceedToVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst || !trimmedLast) {
      setNameError('Both First Name and Last Name are compulsory to complete registration.');
      return;
    }
    setNameError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setNameError('Please enter a valid email address for verification.');
      return;
    }

    setEmailDeliveryError(null);
    const delivered = await sendVerificationCode(trimmedEmail);
    if (delivered) {
      setInputCode('');
      setStep(3);
    }
  };

  const handleVerifyAndCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputCode.trim() !== verificationCode) {
      setVerificationError('Invalid 6-digit code. Please enter the verification code sent to your email.');
      return;
    }

    setVerificationError(null);

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const computedFullName = `${trimmedFirst} ${trimmedLast}`;

    if (selectedRole === 'student') {
      registerNewUser('student', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        classLevel,
        stream,
        school: schoolName.trim() || 'Secondary School',
        targetExam
      });
    } else if (selectedRole === 'parent') {
      registerNewUser('parent', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim(),
        wardName: wardName.trim(),
        pin: pin.trim() || '1234'
      });
    } else if (selectedRole === 'tutor') {
      registerNewUser('tutor', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim(),
        subjects: [subjectSpecialization],
        qualification: qualification.trim(),
        hourlyRateNaira: parseInt(hourlyRate) || 3500,
        teachingMode
      });
    } else if (selectedRole === 'growth_partner') {
      registerNewUser('growth_partner', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim()
      });
    } else {
      registerNewUser('admin', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        schoolName: adminSchoolName.trim() || 'Secondary School',
        schoolType
      });
    }

    onSignUpSuccess();
  };

  return (
    <div className="w-full min-h-screen bg-[#101C34] text-white flex flex-col items-center justify-between font-sans selection:bg-[#FF5B00] selection:text-white relative overflow-x-hidden p-4 sm:p-6">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#84E000]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#FF5B00]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl mx-auto flex flex-col justify-between min-h-[90vh] relative z-10 py-2">
        
        {/* Top Header */}
        <header className="w-full flex items-center justify-between pb-4 border-b border-[#1E304F]">
          <button
            onClick={onBackToSignIn}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>

          <div className="flex flex-col items-end leading-none">
            <span className="text-xs font-bold text-white tracking-tight">Student Companion</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Powered by WoW Tech</span>
          </div>
        </header>

        {/* Content Box */}
        <div className="w-full my-6 bg-[#0B1526]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#1A2C49] shadow-2xl">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1E304F]">
            <div>
              <span className="text-[11px] font-bold text-[#84E000] uppercase tracking-wider block">
                Step {step} of 3
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {step === 1
                  ? 'Select Your Account Role'
                  : step === 2
                  ? `Complete Your ${roleCards.find(r => r.role === selectedRole)?.title} Profile`
                  : 'Verify Your Email Address'}
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full transition-all ${step === 1 ? 'bg-[#84E000] scale-110' : 'bg-[#1E304F]'}`} />
              <div className={`w-3 h-3 rounded-full transition-all ${step === 2 ? 'bg-[#84E000] scale-110' : 'bg-[#1E304F]'}`} />
              <div className={`w-3 h-3 rounded-full transition-all ${step === 3 ? 'bg-[#84E000] scale-110' : 'bg-[#1E304F]'}`} />
            </div>
          </div>

          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-3.5">
              <p className="text-xs text-slate-300 mb-2">
                Choose the role that best describes how you will use the Student Companion platform:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roleCards.map((rc) => {
                  const isSelected = selectedRole === rc.role;
                  return (
                    <button
                      key={rc.role}
                      type="button"
                      onClick={() => setSelectedRole(rc.role)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? `${rc.color} bg-[#14233C] shadow-lg shadow-black/40 scale-[1.01]`
                          : 'border-[#1C2F4D] bg-[#0E1B30] hover:bg-[#12223D]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2.5 rounded-xl bg-[#091222]">
                          {rc.icon}
                        </div>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#84E000] flex items-center justify-center text-slate-950">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[9px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                            {rc.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-sm mb-1">{rc.title}</h3>
                        <p className="text-[11px] text-slate-400 leading-snug">{rc.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3.5 rounded-full bg-[#84E000] hover:bg-[#75c900] active:scale-[0.98] text-[#0A1322] font-black text-sm tracking-wider uppercase shadow-lg shadow-[#84E000]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Profile Setup</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}

          {/* STEP 2: ROLE-SPECIFIC FORM */}
          {step === 2 && (
            <form onSubmit={handleProceedToVerification} className="space-y-4">
              
              {/* Active Role Indicator Banner with Change Role button */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#091222] border border-[#1A2C49]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#14233C]">
                    {roleCards.find(r => r.role === selectedRole)?.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Creating Account For</span>
                    <span className="text-sm font-bold text-white">
                      {roleCards.find(r => r.role === selectedRole)?.title}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#84E000] hover:underline px-2.5 py-1 rounded-lg bg-[#84E000]/10 hover:bg-[#84E000]/20 transition-all cursor-pointer"
                >
                  Change Role
                </button>
              </div>

              {/* Account Credentials */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                  Login Credentials
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      First Name <span className="text-[#84E000] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (nameError) setNameError(null);
                        }}
                        placeholder="e.g. Amina"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Last Name / Surname <span className="text-[#84E000] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          if (nameError) setNameError(null);
                        }}
                        placeholder="e.g. Okon"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {nameError && (
                  <div className="text-[11px] text-amber-300 bg-amber-950/70 border border-amber-800/80 p-2.5 rounded-xl flex items-center gap-2">
                    <span>{nameError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.ng"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ROLE SPECIFIC FIELDS */}
              {selectedRole === 'student' && (
                <div className="space-y-3 pt-3 border-t border-[#1E304F]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                    Academic Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Class Level</label>
                      <select
                        value={classLevel}
                        onChange={(e) => handleClassLevelChange(e.target.value as NigerianClassLevel)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="JSS 1">JSS 1 (Junior 1)</option>
                        <option value="JSS 2">JSS 2 (Junior 2)</option>
                        <option value="JSS 3">JSS 3 (BECE Certificate Class)</option>
                        <option value="SS 1">SS 1 (Senior 1)</option>
                        <option value="SS 2">SS 2 (Senior 2)</option>
                        <option value="SS 3">SS 3 (WAEC / JAMB / NECO Certificate Class)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Academic Stream</label>
                      <select
                        value={stream}
                        disabled={classLevel.startsWith('JSS')}
                        onChange={(e) => setStream(e.target.value as AcademicStream)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors disabled:opacity-50"
                      >
                        {classLevel.startsWith('JSS') ? (
                          <option value="Junior">Junior Secondary (General)</option>
                        ) : (
                          <>
                            <option value="Science">Science (Physics, Chem, Bio, Further Maths)</option>
                            <option value="Non-Science">Commercial / Arts & Humanities</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Target Examination
                        </label>
                        {!isCertificateClass(classLevel) && (
                          <span className="text-[10px] font-medium text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Certificate classes only</span>
                          </span>
                        )}
                        {classLevel === 'JSS 3' && (
                          <span className="text-[10px] font-semibold text-[#84E000] bg-[#84E000]/10 px-1.5 py-0.5 rounded">
                            Junior Cert
                          </span>
                        )}
                        {classLevel === 'SS 3' && (
                          <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                            Senior Cert
                          </span>
                        )}
                      </div>

                      {/* Locked for Non-Certificate Classes (JSS 1, 2 and SS 1, 2) */}
                      {!isCertificateClass(classLevel) ? (
                        <div>
                          <div className="w-full bg-[#060D17] border border-dashed border-[#1E304F] rounded-xl py-2.5 px-3 text-xs text-slate-400 flex items-center justify-between cursor-not-allowed select-none">
                            <span className="truncate">Internal School Curriculum (Terminal Exams)</span>
                            <Lock className="w-3.5 h-3.5 text-amber-400/80 shrink-0 ml-1.5" />
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                            Locked for {classLevel}. External target exams unlock in graduating classes (<strong className="text-slate-400">JSS 3</strong> &amp; <strong className="text-slate-400">SS 3</strong>).
                          </p>
                        </div>
                      ) : classLevel === 'JSS 3' ? (
                        /* Unlocked for JSS 3: Limited to BECE */
                        <div>
                          <select
                            value={targetExam === 'BECE' ? 'BECE' : 'BECE'}
                            onChange={(e) => setTargetExam(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          >
                            <option value="BECE">BECE (Junior WAEC / Basic Education Certificate)</option>
                          </select>
                          <p className="text-[10px] text-[#84E000] mt-1">
                            Junior WAEC curriculum &amp; past question mock series enabled.
                          </p>
                        </div>
                      ) : (
                        /* Unlocked for SS 3: Limited to WAEC, JAMB UTME, and NECO */
                        <div>
                          <select
                            value={targetExam === 'BECE' || targetExam === 'INTERNAL' ? 'WAEC' : targetExam}
                            onChange={(e) => setTargetExam(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          >
                            <option value="WAEC">WAEC SSCE (Senior School Certificate Exam)</option>
                            <option value="JAMB_UTME">JAMB UTME (University Matriculation Exam)</option>
                            <option value="NECO">NECO SSCE (National Senior School Certificate)</option>
                          </select>
                          <p className="text-[10px] text-sky-400 mt-1">
                            Senior national examination question banks &amp; timed CBT modes enabled.
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">State & School</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. Federal Government College, Corona High, etc."
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PARENT SPECIFIC FIELDS */}
              {selectedRole === 'parent' && (
                <div className="space-y-3 pt-3 border-t border-[#1E304F]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                    Guardian & Security Controls
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 801 234 5678"
                          className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Ward's Student Name</label>
                      <input
                        type="text"
                        required
                        value={wardName}
                        onChange={(e) => setWardName(e.target.value)}
                        placeholder="e.g. Amina Okon"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Set 4-Digit Security PIN (For Tutor Booking Approvals)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 1234"
                      className="w-full max-w-[200px] bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-4 text-sm font-mono tracking-widest text-center text-white focus:outline-none transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Physical home address will be requested only when you book an in-person session.
                    </span>
                  </div>
                </div>
              )}

              {/* TUTOR SPECIFIC FIELDS */}
              {selectedRole === 'tutor' && (
                <div className="space-y-3 pt-3 border-t border-[#1E304F]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                    Teaching & Rate Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Specialization</label>
                      <input
                        type="text"
                        required
                        value={subjectSpecialization}
                        onChange={(e) => setSubjectSpecialization(e.target.value)}
                        placeholder="e.g. Mathematics & Further Maths"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Qualification</label>
                      <input
                        type="text"
                        required
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="e.g. B.Sc (Hons), TRCN Certified"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Hourly Rate (<NairaSign />)
                      </label>
                      <input
                        type="number"
                        required
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="3500"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Teaching Preference</label>
                      <select
                        value={teachingMode}
                        onChange={(e) => setTeachingMode(e.target.value as any)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="both">Both Online & In-Person Home</option>
                        <option value="online">Online Virtual Only</option>
                        <option value="physical">In-Person Home Lessons Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-800/40 text-[11px] text-sky-200">
                    ℹ️ Note: National Identification Number (NIN) and Bank Account details will be requested only when you list lessons publicly or withdraw earnings.
                  </div>
                </div>
              )}

              {/* ADMIN SPECIFIC FIELDS */}
              {selectedRole === 'admin' && (
                <div className="space-y-3 pt-3 border-t border-[#1E304F]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                    School Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">School Name</label>
                      <input
                        type="text"
                        required
                        value={adminSchoolName}
                        onChange={(e) => setAdminSchoolName(e.target.value)}
                        placeholder="e.g. Queen's College, Yaba"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Institution Type</label>
                      <select
                        value={schoolType}
                        onChange={(e) => setSchoolType(e.target.value)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Federal Unity School">Federal Unity College</option>
                        <option value="State Public School">State Public Secondary</option>
                        <option value="Private College">Private Secondary College</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* GROWTH PARTNER SPECIFIC FIELDS */}
              {selectedRole === 'growth_partner' && (
                <div className="space-y-3 pt-3 border-t border-[#1E304F]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block px-1">
                    Partner Commission & Payout Information
                  </span>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Contact Phone</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 801 234 5678"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200">
                    💡 <strong>10% Lifetime Revenue Share</strong>: Every student registered through your unique partner code or referral link automatically credits 10% of their subscription payments directly to your verified digital wallet with instant bank withdrawal.
                  </div>
                </div>
              )}

              {/* Email Delivery Error Banner */}
              {emailDeliveryError && (
                <div className="p-3.5 rounded-2xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 text-xs text-red-200 shadow-md">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-white block">Email Delivery Required</span>
                    <p className="text-[11px] leading-relaxed text-red-200/90">{emailDeliveryError}</p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSendingCode}
                  className="py-3 px-5 rounded-full bg-[#14233C] hover:bg-[#1E3355] text-slate-300 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  Change Role
                </button>

                <button
                  type="submit"
                  disabled={isSendingCode}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#84E000] hover:bg-[#75c900] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] text-[#0A1322] font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#84E000]/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSendingCode ? (
                    <>
                      <RefreshCw className="w-4 h-4 stroke-[3] animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Email Verification</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: MANDATORY EMAIL VERIFICATION */}
          {step === 3 && (
            <form onSubmit={handleVerifyAndCreateAccount} className="space-y-4">
              
              {/* Active Role Indicator Banner with Change Role button */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#091222] border border-[#1A2C49]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#14233C]">
                    <Mail className="w-5 h-5 text-[#84E000]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Account Activation</span>
                    <span className="text-sm font-bold text-white">
                      Mandatory Email Verification
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#84E000] hover:underline px-2.5 py-1 rounded-lg bg-[#84E000]/10 hover:bg-[#84E000]/20 transition-all cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

              {/* Dispatched Notification Banner */}
              {codeNotification && (
                <div className="p-3 rounded-2xl bg-[#091A23] border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="leading-relaxed">{codeNotification}</span>
                </div>
              )}

              <div className="text-center space-y-2 py-3 bg-[#081220] border border-[#1E304F] rounded-2xl p-4">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#14233C] border border-[#1E304F] flex items-center justify-center text-[#84E000] shadow-inner">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Enter 6-Digit Verification Code
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  We sent a 6-digit verification code to{' '}
                  <strong className="text-white font-mono break-all">{email}</strong>.
                  All accounts must verify their email address before access is granted.
                </p>
              </div>

              {/* 6-Digit Code Input Box */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={inputCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setInputCode(val);
                    if (verificationError) setVerificationError(null);
                  }}
                  placeholder="••••••"
                  autoFocus
                  className="w-full text-center text-3xl font-mono tracking-[0.5em] font-black bg-[#081220] border-2 border-[#1E304F] focus:border-[#84E000] rounded-2xl py-3.5 text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              {verificationError && (
                <div className="text-xs text-amber-300 bg-amber-950/70 border border-amber-800/80 p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{verificationError}</span>
                </div>
              )}

              {/* Resend and Change Email controls */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="hover:text-white transition-colors cursor-pointer text-xs underline"
                >
                  Change Email Address
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0 || isSendingCode}
                  onClick={() => sendVerificationCode(email.trim())}
                  className="text-[#84E000] hover:text-[#75c900] disabled:text-slate-500 font-semibold cursor-pointer disabled:cursor-not-allowed transition-colors text-xs flex items-center gap-1"
                >
                  {isSendingCode ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : resendTimer > 0 ? (
                    `Resend code in ${resendTimer}s`
                  ) : (
                    'Resend Code'
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-5 rounded-full bg-[#14233C] hover:bg-[#1E3355] text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={inputCode.length !== 6}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#84E000] hover:bg-[#75c900] disabled:opacity-50 active:scale-[0.98] text-[#0A1322] font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#84E000]/25 transition-all text-center cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Email & Activate Account</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer Link */}
        <div className="w-full text-center py-2">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onBackToSignIn}
              className="text-[#FF5B00] font-bold hover:underline cursor-pointer ml-1"
            >
              Sign In
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
