import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserRole,
  NigerianClassLevel,
  AcademicStream,
  ParentRelationship,
  ParentAcademicGoal,
  ParentNotificationChannel,
  LinkedWard
} from '../../types';
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
  TrendingUp,
  FileText,
  Sparkles,
  Search,
  UserCheck,
  Bell,
  Heart
} from 'lucide-react';
import { NairaSign } from '../../utils/currency';
import { DeviceImageUploader } from '../admin/DeviceImageUploader';

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
  const { registerNewUser, targetSignUpRole, allRegisteredUsers } = useApp();

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
  const [studentSchoolCode, setStudentSchoolCode] = useState('');
  const [state, setState] = useState('Lagos');

  const isCertificateClass = (level: NigerianClassLevel): boolean => {
    return level === 'JSS 3' || level === 'SS 3' || level === 'University Aspirant';
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
    } else if (val === 'University Aspirant') {
      setTargetExam(prev => (prev === 'BECE' || prev === 'INTERNAL' ? 'JAMB_UTME' : prev));
    } else {
      setTargetExam('INTERNAL');
    }
  };

  // Progressive Parent Fields (3-Stage Structured Questionnaire)
  const [parentStage, setParentStage] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [parentRelationship, setParentRelationship] = useState<ParentRelationship>('Mother');
  const [parentState, setParentState] = useState('Lagos');
  const [parentCity, setParentCity] = useState('');

  // Stage 2: Ward Linking & Academic Goals
  const [studentLinkCodeInput, setStudentLinkCodeInput] = useState('');
  const [matchedStudent, setMatchedStudent] = useState<LinkedWard | null>(null);
  const [linkSearchError, setLinkSearchError] = useState<string | null>(null);
  const [isSearchingStudent, setIsSearchingStudent] = useState(false);
  const [wardName, setWardName] = useState('');
  const [wardClassLevel, setWardClassLevel] = useState<NigerianClassLevel>('SS 3');
  const [wardSchoolName, setWardSchoolName] = useState('');
  const [parentAcademicGoals, setParentAcademicGoals] = useState<ParentAcademicGoal[]>([
    'WAEC / WASSCE Excellence',
    'JAMB UTME 300+ Target'
  ]);

  // Stage 3: Communication & Reports Preferences
  const [parentNotificationPref, setParentNotificationPref] = useState<ParentNotificationChannel>('WhatsApp');
  const [parentAllowReports, setParentAllowReports] = useState(true);
  const [parentAllowTutorAlerts, setParentAllowTutorAlerts] = useState(true);

  // Toggle helper for Parent Academic Goals
  const handleToggleAcademicGoal = (goal: ParentAcademicGoal) => {
    setParentAcademicGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  // Live lookup helper for Student Link Code / Email
  const handleLookupStudentWard = (codeOrEmail: string) => {
    const term = codeOrEmail.trim();
    if (!term) {
      setLinkSearchError('Please enter a 6-character Student Link Code or registered email.');
      return;
    }
    setLinkSearchError(null);
    setIsSearchingStudent(true);

    const isEmail = term.includes('@');
    const cleanTerm = term.toLowerCase();

    // 1. Search in all registered users
    const found = allRegisteredUsers?.find(u => {
      if (u.role !== 'student') return false;
      if (isEmail && u.email?.toLowerCase() === cleanTerm) return true;
      const code = u.studentData?.studentLinkCode?.toLowerCase() || '';
      return code === cleanTerm || code.replace(/[^a-z0-9]/gi, '') === cleanTerm.replace(/[^a-z0-9]/gi, '');
    });

    if (found && found.studentData) {
      const ward: LinkedWard = {
        studentId: found.id,
        studentName: found.fullName || found.studentData.name,
        classLevel: found.studentData.classLevel || 'SS 3',
        stream: found.studentData.stream || 'Science',
        schoolName: found.studentData.school || 'Secondary School',
        studentLinkCode: found.studentData.studentLinkCode || codeOrEmail.toUpperCase(),
        linkedAt: new Date().toISOString(),
        isPrimary: true
      };
      setMatchedStudent(ward);
      setWardName(ward.studentName);
      setWardClassLevel(ward.classLevel);
      setWardSchoolName(ward.schoolName);
    } else {
      // Recognized demo link code fallback (e.g. STU-8K2D)
      if (cleanTerm === 'stu-8k2d' || cleanTerm.replace(/[^a-z0-9]/gi, '') === 'stu8k2d') {
        const demoWard: LinkedWard = {
          studentId: 'std-demo-amina',
          studentName: 'Amina Okon',
          classLevel: 'SS 3',
          stream: 'Science',
          schoolName: "King's College Lagos",
          studentLinkCode: 'STU-8K2D',
          linkedAt: new Date().toISOString(),
          isPrimary: true
        };
        setMatchedStudent(demoWard);
        setWardName(demoWard.studentName);
        setWardClassLevel(demoWard.classLevel);
        setWardSchoolName(demoWard.schoolName);
      } else {
        setLinkSearchError(
          `No active student account found for "${term}". You can type your ward's name manually below; you can also link their account later in the Parent Portal.`
        );
      }
    }
    setIsSearchingStudent(false);
  };

  // Progressive Tutor Fields (Google Form Sections 1 to 5)
  const [tutorStage, setTutorStage] = useState<1 | 2 | 3>(1);
  const [middleName, setMiddleName] = useState('');
  const [tutorGender, setTutorGender] = useState<'Male' | 'Female' | 'Prefer not to say'>('Male');
  const [tutorCity, setTutorCity] = useState('');
  const [tutorState, setTutorState] = useState('Lagos');

  // Stage 2: Qualifications & Preferences
  const [highestEducation, setHighestEducation] = useState<'NCE' | 'B.Sc.' | 'B.Ed.' | 'M.Sc.' | 'Ph.D.' | 'Other'>('B.Sc.');
  const [institution, setInstitution] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [experienceYearsRange, setExperienceYearsRange] = useState<'0-1 years' | '1-3 years' | '3-5 years' | '5+ years'>('1-3 years');
  const [targetClasses, setTargetClasses] = useState<string[]>(['SS 3', 'WAEC/NECO Prep', 'JAMB Prep']);
  const [proficientSubjects, setProficientSubjects] = useState<string[]>(['Mathematics']);
  const [hourlyRate, setHourlyRate] = useState('3500');
  const [teachingMode, setTeachingMode] = useState<'both' | 'online' | 'physical'>('both');
  const [tutorBio, setTutorBio] = useState('');

  // Digital Readiness
  const [hasDevice, setHasDevice] = useState<boolean>(true);
  const [hasInternet, setHasInternet] = useState<boolean>(true);
  const [comfortableWithTools, setComfortableWithTools] = useState<boolean>(true);

  // Stage 3: Mandatory Safety & KYC
  const [tutorNin, setTutorNin] = useState('');
  const [headshotUrl, setHeadshotUrl] = useState('');
  const [idDocumentUrl, setIdDocumentUrl] = useState('');
  const [cvResumeUrl, setCvResumeUrl] = useState('');
  const [referee1Name, setReferee1Name] = useState('');
  const [referee1Phone, setReferee1Phone] = useState('');
  const [referee1Rel, setReferee1Rel] = useState('');
  const [referee2Name, setReferee2Name] = useState('');
  const [referee2Phone, setReferee2Phone] = useState('');
  const [referee2Rel, setReferee2Rel] = useState('');

  // Admin Fields
  const [adminSchoolName, setAdminSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('Private Secondary College');
  const [adminDesignation, setAdminDesignation] = useState('Principal / Head of School');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminState, setAdminState] = useState('Lagos');
  const [adminLga, setAdminLga] = useState('Lagos Island');
  const [adminSchoolCode, setAdminSchoolCode] = useState(() => `SCHL${Math.floor(10 + Math.random() * 90)}`);
  const [adminDocumentUrl, setAdminDocumentUrl] = useState('');

  // Growth Partner Fields (Live Application & Settlement)
  const [partnerBankName, setPartnerBankName] = useState('Guaranty Trust Bank (GTBank)');
  const [partnerAccountNumber, setPartnerAccountNumber] = useState('');
  const [partnerAccountName, setPartnerAccountName] = useState('');
  const [partnerRegion, setPartnerRegion] = useState('Lagos State');
  const [partnerReferralCode, setPartnerReferralCode] = useState(() => `GROW${Math.floor(10 + Math.random() * 90)}`);

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
      badge: 'JSS 1 – Aspirant',
      description: 'Study curriculum notes, practice WAEC & JAMB CBT mocks, and earn XP badges.',
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
        school: schoolName.trim() || (classLevel === 'University Aspirant' ? 'School Leaver / Aspirant' : 'Secondary School'),
        schoolCode: studentSchoolCode.trim().toUpperCase() || undefined,
        targetExam
      });
    } else if (selectedRole === 'parent') {
      const initialLinkedWards: LinkedWard[] = [];
      if (matchedStudent) {
        initialLinkedWards.push(matchedStudent);
      } else if (wardName.trim()) {
        initialLinkedWards.push({
          studentId: `std-ward-${Date.now()}`,
          studentName: wardName.trim(),
          classLevel: wardClassLevel,
          stream: wardClassLevel.startsWith('JSS') ? 'Junior' : 'Science',
          schoolName: wardSchoolName.trim() || 'Secondary School',
          studentLinkCode: studentLinkCodeInput.trim().toUpperCase() || 'STU-8K2D',
          linkedAt: new Date().toISOString(),
          isPrimary: true
        });
      }

      registerNewUser('parent', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim(),
        pin: pin.trim() || '1234',
        wardName: wardName.trim() || (initialLinkedWards[0]?.studentName || 'Student Ward'),
        relationship: parentRelationship,
        stateOfResidence: parentState,
        cityOrLga: parentCity.trim() || 'Lagos',
        academicGoals: parentAcademicGoals,
        notificationPreference: parentNotificationPref,
        allowAutomatedReports: parentAllowReports,
        linkedWards: initialLinkedWards,
        classLevel: wardClassLevel,
        schoolName: wardSchoolName.trim() || 'Secondary School',
        studentLinkCode: studentLinkCodeInput.trim().toUpperCase() || 'STU-8K2D'
      });
    } else if (selectedRole === 'tutor') {
      const fullLegalName = middleName.trim()
        ? `${trimmedFirst} ${middleName.trim()} ${trimmedLast}`
        : computedFullName;

      registerNewUser('tutor', {
        name: fullLegalName,
        firstName: trimmedFirst,
        middleName: middleName.trim(),
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim(),
        gender: tutorGender,
        city: tutorCity.trim() || 'Lagos',
        state: tutorState,
        highestEducation,
        institution: institution.trim() || 'University of Lagos',
        courseOfStudy: courseOfStudy.trim() || 'Education & Science',
        experienceYearsRange,
        targetClasses,
        subjects: proficientSubjects.length > 0 ? proficientSubjects : ['Mathematics'],
        proficientSubjects,
        hourlyRateNaira: parseInt(hourlyRate) || 3500,
        hourlyRate: parseInt(hourlyRate) || 3500,
        teachingMode,
        bio: tutorBio.trim() || `${proficientSubjects.join(' & ')} educator with ${experienceYearsRange} experience.`,
        tagline: `${proficientSubjects.slice(0, 2).join(' & ')} Specialist (${experienceYearsRange})`,
        digitalReadiness: {
          hasDevice,
          hasInternet,
          comfortableWithTools
        },
        nin: tutorNin.trim(),
        idDocumentUrl,
        cvResumeUrl,
        avatarUrl: headshotUrl,
        guarantors: [
          ...(referee1Name.trim() ? [{ name: referee1Name.trim(), phone: referee1Phone.trim(), relationship: referee1Rel.trim() || 'Colleague' }] : []),
          ...(referee2Name.trim() ? [{ name: referee2Name.trim(), phone: referee2Phone.trim(), relationship: referee2Rel.trim() || 'Referee' }] : [])
        ],
        onboardingStage: tutorStage
      });
    } else if (selectedRole === 'growth_partner') {
      registerNewUser('growth_partner', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        phone: phone.trim(),
        bankName: partnerBankName,
        accountNumber: partnerAccountNumber.trim(),
        accountName: partnerAccountName.trim() || computedFullName,
        region: partnerRegion,
        referralCode: partnerReferralCode
      });
    } else {
      registerNewUser('admin', {
        name: computedFullName,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: email.trim(),
        schoolName: adminSchoolName.trim() || 'Secondary School',
        schoolType,
        designation: adminDesignation,
        phone: adminPhone.trim(),
        state: adminState,
        lga: adminLga,
        schoolCode: adminSchoolCode,
        documentUrl: adminDocumentUrl
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
                        <option value="University Aspirant">University Aspirant (School Leaver / JAMB Candidate)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        {classLevel === 'University Aspirant' ? 'Target Stream (Intended Course Track)' : 'Academic Stream'}
                      </label>
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
                            <option value="Non-Science">Commercial / Arts &amp; Humanities</option>
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
                        {classLevel === 'University Aspirant' && (
                          <span className="text-[10px] font-semibold text-[#FF5B00] bg-[#FF5B00]/15 px-1.5 py-0.5 rounded">
                            Aspirant Hub
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
                            Locked for {classLevel}. External target exams unlock in graduating classes (<strong className="text-slate-400">JSS 3</strong> &amp; <strong className="text-slate-400">SS 3</strong>) and <strong className="text-slate-400">University Aspirant</strong>.
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
                        /* Unlocked for SS 3 & University Aspirant: JAMB UTME, WAEC, NECO */
                        <div>
                          <select
                            value={targetExam === 'BECE' || targetExam === 'INTERNAL' ? (classLevel === 'University Aspirant' ? 'JAMB_UTME' : 'WAEC') : targetExam}
                            onChange={(e) => setTargetExam(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          >
                            <option value="JAMB_UTME">JAMB UTME (University Matriculation Exam)</option>
                            <option value="WAEC">WAEC SSCE (Senior School Certificate Exam)</option>
                            <option value="NECO">NECO SSCE (National Senior School Certificate)</option>
                          </select>
                          <p className="text-[10px] text-sky-400 mt-1">
                            {classLevel === 'University Aspirant'
                              ? 'Aspirant Command Center, Post-UTME admission guide & 15+ years CBT enabled.'
                              : 'Senior national examination question banks & timed CBT modes enabled.'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        {classLevel === 'University Aspirant' ? 'Former Secondary School (Optional)' : 'State & School'}
                      </label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder={
                          classLevel === 'University Aspirant'
                            ? 'e.g. Former school or leave blank (Graduated)'
                            : "e.g. King's College Lagos, Corona High, etc."
                        }
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-300">
                          {classLevel === 'University Aspirant' ? 'Tutorial / School Code (Optional)' : 'School Code (Optional)'}
                        </label>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          {classLevel === 'University Aspirant' ? 'Optional Link' : 'Link with your School'}
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={8}
                        value={studentSchoolCode}
                        onChange={(e) => setStudentSchoolCode(e.target.value.toUpperCase())}
                        placeholder="e.g. SCHL88"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs font-mono font-bold tracking-wider text-white placeholder-slate-500 focus:outline-none uppercase transition-colors"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        {classLevel === 'University Aspirant'
                          ? 'Studying with a tutorial center or alma mater? Enter their 6-character code, or leave blank.'
                          : 'Got a 6-character school code from your teacher or administrator? Enter it to sync lesson notes & assignments.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PARENT SPECIFIC FIELDS: 3-STAGE PROGRESSIVE ONBOARDING */}
              {selectedRole === 'parent' && (
                <div className="space-y-4 pt-3 border-t border-[#1E304F]">
                  {/* Progressive Stage Stepper Header */}
                  <div className="bg-[#081220] rounded-2xl p-3 border border-[#FF5B00]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#FF5B00] uppercase tracking-wider block">
                        Parent Onboarding · Stage {parentStage} of 3
                      </span>
                      <span className="text-xs font-bold text-white">
                        {parentStage === 1
                          ? 'Stage 1: Guardian Identity & Residence'
                          : parentStage === 2
                          ? 'Stage 2: Ward Association & Academic Focus'
                          : 'Stage 3: Communication & Performance Alerts'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setParentStage(s as 1 | 2 | 3)}
                          className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                            parentStage === s
                              ? 'bg-[#FF5B00] text-white font-black ring-2 ring-[#FF5B00]/40'
                              : parentStage > s
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {parentStage > s ? '✓' : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* STAGE 1: GUARDIAN IDENTITY & RESIDENTIAL SECURITY        */}
                  {/* ========================================================= */}
                  {parentStage === 1 && (
                    <div className="space-y-3.5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Relationship to Student <span className="text-[#FF5B00] font-bold">*</span>
                          </label>
                          <select
                            value={parentRelationship}
                            onChange={(e) => setParentRelationship(e.target.value as ParentRelationship)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          >
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Guardian">Legal Guardian</option>
                            <option value="Sibling">Elder Sibling</option>
                            <option value="Relative">Family Relative</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            WhatsApp / Phone Number <span className="text-[#FF5B00] font-bold">*</span>
                          </label>
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
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            State of Residence <span className="text-[#FF5B00] font-bold">*</span>
                          </label>
                          <select
                            value={parentState}
                            onChange={(e) => setParentState(e.target.value)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                          >
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja (FCT)">Abuja (FCT)</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Kano">Kano</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Delta">Delta</option>
                            <option value="Edo">Edo</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Ondo">Ondo</option>
                            <option value="Kwara">Kwara</option>
                            <option value="Akwa Ibom">Akwa Ibom</option>
                            <option value="Cross River">Cross River</option>
                            <option value="Imo">Imo</option>
                            <option value="Abia">Abia</option>
                            <option value="Jos / Plateau">Plateau</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            City / Local Government Area <span className="text-[#FF5B00] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={parentCity}
                            onChange={(e) => setParentCity(e.target.value)}
                            placeholder="e.g. Ikeja / Lekki / Port Harcourt"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-300">
                            4-Digit Security PIN <span className="text-[#FF5B00] font-bold">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400">Protects wallet & tutor approvals</span>
                        </div>
                        <input
                          type="password"
                          maxLength={4}
                          required
                          value={pin}
                          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 1234"
                          className="w-full max-w-[200px] bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2.5 px-4 text-sm font-mono tracking-widest text-center text-white focus:outline-none transition-colors"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          You will use this 4-digit PIN to authorize tutor bookings, exam sponsorships, and Paystack wallet transactions.
                        </p>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setParentStage(2)}
                          className="py-2.5 px-5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#FF5B00]/20 cursor-pointer"
                        >
                          <span>Next: Ward Link & Goals</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* STAGE 2: WARD LINKING & ACADEMIC GOALS                    */}
                  {/* ========================================================= */}
                  {parentStage === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      {/* Student Link Code Lookup Box */}
                      <div className="p-3.5 bg-[#060D17] border border-[#1E304F] rounded-2xl space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-white flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-[#FF5B00]" />
                            <span>Link by Student Link Code or Email</span>
                          </label>
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                            Instant Verification
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-snug">
                          Enter your child's 6-character Student Link Code (found on their dashboard e.g., <span className="font-mono text-white font-bold">STU-8K2D</span>) or their registered email.
                        </p>

                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={studentLinkCodeInput}
                              onChange={(e) => {
                                setStudentLinkCodeInput(e.target.value);
                                if (linkSearchError) setLinkSearchError(null);
                              }}
                              placeholder="e.g. STU-8K2D or student@domain.ng"
                              className="w-full bg-[#091222] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 pl-9 pr-3 text-xs font-mono font-bold tracking-wider text-white placeholder-slate-500 uppercase focus:outline-none transition-colors"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleLookupStudentWard(studentLinkCodeInput)}
                            disabled={isSearchingStudent || !studentLinkCodeInput.trim()}
                            className="px-4 py-2 bg-[#FF5B00] hover:bg-[#e05000] disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                          >
                            {isSearchingStudent ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                            <span>Verify Code</span>
                          </button>
                        </div>

                        {/* Matched Ward Preview Card */}
                        {matchedStudent && (
                          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="font-bold text-white">{matchedStudent.studentName}</span>
                                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-900/60 px-1.5 py-0.2 rounded">
                                  {matchedStudent.studentLinkCode}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300">
                                {matchedStudent.schoolName} · {matchedStudent.classLevel} ({matchedStudent.stream || 'General'})
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setMatchedStudent(null);
                                setStudentLinkCodeInput('');
                              }}
                              className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                            >
                              Clear
                            </button>
                          </div>
                        )}

                        {linkSearchError && (
                          <div className="p-2.5 bg-amber-950/50 border border-amber-800/60 rounded-xl text-[11px] text-amber-200 leading-snug">
                            {linkSearchError}
                          </div>
                        )}
                      </div>

                      {/* Manual Ward Fields (Active if no code verified or to customize) */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                          Ward Student Profile Details
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-slate-300 block mb-1">
                              Ward Full Name <span className="text-[#FF5B00] font-bold">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={wardName}
                              onChange={(e) => setWardName(e.target.value)}
                              placeholder="e.g. Amina Okon"
                              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-slate-300 block mb-1">
                              Ward Class Level <span className="text-[#FF5B00] font-bold">*</span>
                            </label>
                            <select
                              value={wardClassLevel}
                              onChange={(e) => setWardClassLevel(e.target.value as NigerianClassLevel)}
                              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-xs text-white focus:outline-none transition-colors"
                            >
                              <option value="JSS 1">JSS 1 (Junior 1)</option>
                              <option value="JSS 2">JSS 2 (Junior 2)</option>
                              <option value="JSS 3">JSS 3 (BECE Junior WAEC)</option>
                              <option value="SS 1">SS 1 (Senior 1)</option>
                              <option value="SS 2">SS 2 (Senior 2)</option>
                              <option value="SS 3">SS 3 (WAEC & JAMB Graduating Class)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            School Name
                          </label>
                          <input
                            type="text"
                            value={wardSchoolName}
                            onChange={(e) => setWardSchoolName(e.target.value)}
                            placeholder="e.g. King's College Lagos / Queens College / Corona High"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Academic Goals (Multi-select) */}
                      <div className="space-y-2 pt-2 border-t border-[#1E304F]">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-white">
                            Primary Academic Targets for Your Ward
                          </label>
                          <span className="text-[10px] text-slate-400">Select all that apply</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(
                            [
                              'WAEC / WASSCE Excellence',
                              'JAMB UTME 300+ Target',
                              'Junior BECE Certification',
                              'Termly Promotion Top 3',
                              '1-on-1 Personalized Tutoring',
                              'STEM & Math Confidence'
                            ] as ParentAcademicGoal[]
                          ).map((goal) => {
                            const isSelected = parentAcademicGoals.includes(goal);
                            return (
                              <button
                                key={goal}
                                type="button"
                                onClick={() => handleToggleAcademicGoal(goal)}
                                className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FF5B00]/15 border-[#FF5B00] text-white'
                                    : 'bg-[#081220] border-[#1E304F] text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                <span>{goal}</span>
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 text-[#FF5B00] stroke-[3]" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded border border-slate-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setParentStage(1)}
                          className="py-2 px-4 rounded-xl bg-[#14233C] text-slate-300 font-bold text-xs hover:bg-[#1E3355] transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setParentStage(3)}
                          className="py-2.5 px-5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#FF5B00]/20 cursor-pointer"
                        >
                          <span>Next: Alerts & Reports</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* STAGE 3: COMMUNICATION & REPORTS PREFERENCES             */}
                  {/* ========================================================= */}
                  {parentStage === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white block">
                          Preferred Notification Channel
                        </label>
                        <p className="text-[11px] text-slate-400">
                          Where would you like to receive mock exam summaries, weekly revision scorecards, and session notices?
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(['WhatsApp', 'SMS', 'Email', 'In-App Only'] as ParentNotificationChannel[]).map((channel) => {
                            const isSelected = parentNotificationPref === channel;
                            return (
                              <button
                                key={channel}
                                type="button"
                                onClick={() => setParentNotificationPref(channel)}
                                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FF5B00]/20 border-[#FF5B00] text-white font-bold'
                                    : 'bg-[#081220] border-[#1E304F] text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                <span className="text-xs block">{channel}</span>
                                {channel === 'WhatsApp' && (
                                  <span className="text-[9px] text-emerald-400 font-normal mt-0.5 block">Recommended</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Automated Toggles */}
                      <div className="space-y-2.5 pt-2 border-t border-[#1E304F]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                          Automated Parental Controls
                        </span>

                        <label className="flex items-start gap-3 p-3 bg-[#081220] rounded-xl border border-[#1E304F] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={parentAllowReports}
                            onChange={(e) => setParentAllowReports(e.target.checked)}
                            className="mt-0.5 rounded border-slate-700 text-[#FF5B00] focus:ring-0"
                          />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-white block">
                              Automated Weekly Study Progress & CBT Mock Scorecards
                            </span>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              Receive weekly summaries of completed curriculum topics, CBT exam scores, and study streak alerts for your ward.
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 bg-[#081220] rounded-xl border border-[#1E304F] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={parentAllowTutorAlerts}
                            onChange={(e) => setParentAllowTutorAlerts(e.target.checked)}
                            className="mt-0.5 rounded border-slate-700 text-[#FF5B00] focus:ring-0"
                          />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-white block">
                              Instant Tutor Session & Wallet Notifications
                            </span>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              Get real-time notification alerts when vetted tutors propose lessons, complete sessions, or when wallet funds are added.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Multi-ward notice */}
                      <div className="p-3 bg-[#0B172A] rounded-xl border border-sky-500/30 text-[11px] text-sky-200 leading-relaxed flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>
                          <strong>Multi-Ward Support:</strong> You will be able to link and monitor additional children or siblings across different classes anytime directly in your Parent Portal.
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setParentStage(2)}
                          className="py-2 px-4 rounded-xl bg-[#14233C] text-slate-300 font-bold text-xs hover:bg-[#1E3355] transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready for Email Verification</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TUTOR SPECIFIC FIELDS: 3-STAGE PROGRESSIVE ONBOARDING (GOOGLE FORM SECTIONS 1 TO 5) */}
              {selectedRole === 'tutor' && (
                <div className="space-y-4 pt-3 border-t border-[#1E304F]">
                  {/* Progressive Stage Stepper Header */}
                  <div className="bg-[#081220] rounded-2xl p-3 border border-[#1E304F] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                        Tutor Onboarding · Stage {tutorStage} of 3
                      </span>
                      <span className="text-xs font-bold text-white">
                        {tutorStage === 1
                          ? 'Section 1: Personal & Residential Details'
                          : tutorStage === 2
                          ? 'Section 2 & 3: Qualifications & Teaching Profile'
                          : 'Section 4 & 5: Trust, KYC & Digital Readiness'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setTutorStage(s as 1 | 2 | 3)}
                          className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                            tutorStage === s
                              ? 'bg-sky-500 text-slate-950 font-black ring-2 ring-sky-400/50'
                              : tutorStage > s
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {tutorStage > s ? '✓' : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* STAGE 1: BASIC PERSONAL INFORMATION (GOOGLE FORM SEC 1)  */}
                  {/* ========================================================= */}
                  {tutorStage === 1 && (
                    <div className="space-y-3.5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Middle Name <span className="text-slate-500 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            placeholder="e.g. Chukwuma"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            WhatsApp / Phone <span className="text-sky-400 font-bold">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 803 123 4567"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">Gender</label>
                          <select
                            value={tutorGender}
                            onChange={(e) => setTutorGender(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Residential City / District <span className="text-sky-400 font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={tutorCity}
                            onChange={(e) => setTutorCity(e.target.value)}
                            placeholder="e.g. Ikeja / Maryland"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            State of Residence <span className="text-sky-400 font-bold">*</span>
                          </label>
                          <select
                            value={tutorState}
                            onChange={(e) => setTutorState(e.target.value)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja (FCT)">Abuja (FCT)</option>
                            <option value="Rivers">Rivers (Port Harcourt)</option>
                            <option value="Oyo">Oyo (Ibadan)</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Edo">Edo (Benin)</option>
                            <option value="Kano">Kano</option>
                            <option value="Delta">Delta</option>
                            <option value="Anambra">Anambra</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setTutorStage(2)}
                          className="py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Next: Qualifications & Preferences</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ============================================================== */}
                  {/* STAGE 2: PROFESSIONAL & ACADEMIC QUALIFICATIONS (SEC 2 & 3)    */}
                  {/* ============================================================== */}
                  {tutorStage === 2 && (
                    <div className="space-y-3.5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Highest Level of Education
                          </label>
                          <select
                            value={highestEducation}
                            onChange={(e) => setHighestEducation(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option value="NCE">NCE (National Certificate in Education)</option>
                            <option value="B.Sc.">B.Sc. (Bachelor of Science)</option>
                            <option value="B.Ed.">B.Ed. (Bachelor of Education)</option>
                            <option value="M.Sc.">M.Sc. (Master of Science)</option>
                            <option value="Ph.D.">Ph.D. / Doctorate</option>
                            <option value="Other">Other Higher Degree</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Institution Attended
                          </label>
                          <input
                            type="text"
                            required
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g. University of Lagos (Unilag)"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Course of Study / Major
                          </label>
                          <input
                            type="text"
                            required
                            value={courseOfStudy}
                            onChange={(e) => setCourseOfStudy(e.target.value)}
                            placeholder="e.g. Mathematics / Physics"
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Tutoring Experience
                          </label>
                          <select
                            value={experienceYearsRange}
                            onChange={(e) => setExperienceYearsRange(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option value="0-1 years">0 - 1 years</option>
                            <option value="1-3 years">1 - 3 years</option>
                            <option value="3-5 years">3 - 5 years</option>
                            <option value="5+ years">5+ years (Master Educator)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Hourly Rate (<NairaSign />)
                          </label>
                          <select
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none font-mono"
                          >
                            <option value="2000">₦2,000 / hr</option>
                            <option value="3000">₦3,000 / hr</option>
                            <option value="3500">₦3,500 / hr (Recommended)</option>
                            <option value="4500">₦4,500 / hr</option>
                            <option value="5000">₦5,000 / hr</option>
                            <option value="6000">₦6,000+ / hr (Specialist)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">
                            Preferred Tutoring Mode
                          </label>
                          <select
                            value={teachingMode}
                            onChange={(e) => setTeachingMode(e.target.value as any)}
                            className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option value="both">Both Online & In-Person Home</option>
                            <option value="online">Online Virtual Only</option>
                            <option value="physical">In-Person Home Lessons Only</option>
                          </select>
                        </div>
                      </div>

                      {/* Proficient Subjects Multi-Select */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Proficient Subjects (Check all that apply)
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Mathematics',
                            'English Language',
                            'Basic Science',
                            'Physics',
                            'Chemistry',
                            'Biology',
                            'Economics',
                            'Literature-in-English',
                            'Further Mathematics'
                          ].map((sub) => {
                            const isChecked = proficientSubjects.includes(sub);
                            return (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setProficientSubjects(proficientSubjects.filter((s) => s !== sub));
                                  } else {
                                    setProficientSubjects([...proficientSubjects, sub]);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                  isChecked
                                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/60'
                                    : 'bg-[#081220] text-slate-400 border border-[#1E304F] hover:text-white'
                                }`}
                              >
                                {isChecked ? '✓ ' : '+ '}
                                {sub}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Target Classes Multi-Select */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Target Classes You Teach
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3', 'WAEC/NECO Prep', 'JAMB Prep'].map((lvl) => {
                            const isChecked = targetClasses.includes(lvl);
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setTargetClasses(targetClasses.filter((c) => c !== lvl));
                                  } else {
                                    setTargetClasses([...targetClasses, lvl]);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                  isChecked
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                                    : 'bg-[#081220] text-slate-400 border border-[#1E304F] hover:text-white'
                                }`}
                              >
                                {isChecked ? '✓ ' : '+ '}
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Public Bio */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Brief Public Bio / Introduction
                        </label>
                        <textarea
                          rows={2}
                          value={tutorBio}
                          onChange={(e) => setTutorBio(e.target.value)}
                          placeholder="Introduce yourself to parents and students (pedagogy, track record in WAEC/JAMB, teaching style)..."
                          className="w-full bg-[#081220] border border-[#1E304F] focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setTutorStage(1)}
                          className="text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          ← Back to Personal Info
                        </button>
                        <button
                          type="button"
                          onClick={() => setTutorStage(3)}
                          className="py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Next: KYC & Digital Readiness</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* STAGE 3: MANDATORY SAFETY, KYC & DIGITAL READINESS (4 & 5) */}
                  {/* ========================================================= */}
                  {tutorStage === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      {/* NIN Field */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-300">
                            11-Digit National Identification Number (NIN)
                          </label>
                          <span className="text-[10px] text-emerald-400 font-mono">NIMC Encrypted</span>
                        </div>
                        <input
                          type="text"
                          maxLength={11}
                          value={tutorNin}
                          onChange={(e) => setTutorNin(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 12345678901"
                          className="w-full bg-[#081220] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-white font-mono placeholder-slate-500 focus:outline-none"
                        />
                      </div>

                      {/* Headshot Upload via Device Uploader with Canvas Compression */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Profile Headshot / Photo (Upload from Phone/Device)
                        </label>
                        <DeviceImageUploader
                          currentImageUrl={headshotUrl}
                          onImageChange={(url) => setHeadshotUrl(url)}
                          presets={[
                            {
                              label: 'Adewale Bakare (Math)',
                              url: 'https://api.dicebear.com/7.x/micah/svg?seed=Adewale&backgroundColor=b6e3f4'
                            },
                            {
                              label: 'Dr. Amarachi (Bio)',
                              url: 'https://api.dicebear.com/7.x/micah/svg?seed=Amarachi&backgroundColor=ffd5dc'
                            },
                            {
                              label: 'Prof. Ibrahim (Eng)',
                              url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ibrahim&backgroundColor=c0aede'
                            }
                          ]}
                        />
                      </div>

                      {/* Guarantors / Referees */}
                      <div className="bg-[#081220] p-3 rounded-2xl border border-[#1E304F] space-y-2.5">
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                          Two Professional Guarantors / Referees
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={referee1Name}
                            onChange={(e) => setReferee1Name(e.target.value)}
                            placeholder="Referee 1 Name"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                          <input
                            type="tel"
                            value={referee1Phone}
                            onChange={(e) => setReferee1Phone(e.target.value)}
                            placeholder="Phone Number"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={referee1Rel}
                            onChange={(e) => setReferee1Rel(e.target.value)}
                            placeholder="Relationship (e.g. Principal)"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={referee2Name}
                            onChange={(e) => setReferee2Name(e.target.value)}
                            placeholder="Referee 2 Name"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                          <input
                            type="tel"
                            value={referee2Phone}
                            onChange={(e) => setReferee2Phone(e.target.value)}
                            placeholder="Phone Number"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={referee2Rel}
                            onChange={(e) => setReferee2Rel(e.target.value)}
                            placeholder="Relationship (e.g. HOD / Dean)"
                            className="bg-[#060D17] border border-[#1E304F] rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Digital Readiness (Google Form Sec 5) */}
                      <div className="bg-[#081220] p-3 rounded-2xl border border-[#1E304F] space-y-2">
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                          Digital Readiness & Teaching Equipment
                        </span>

                        <div className="space-y-1.5 text-xs text-slate-300">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hasDevice}
                              onChange={(e) => setHasDevice(e.target.checked)}
                              className="rounded text-sky-500 focus:ring-0"
                            />
                            <span>I have a reliable smartphone, tablet, or laptop / PC</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hasInternet}
                              onChange={(e) => setHasInternet(e.target.checked)}
                              className="rounded text-sky-500 focus:ring-0"
                            />
                            <span>I have access to stable 4G/broadband internet connection</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={comfortableWithTools}
                              onChange={(e) => setComfortableWithTools(e.target.checked)}
                              className="rounded text-sky-500 focus:ring-0"
                            />
                            <span>I am comfortable using digital whiteboards, Zoom or Google Meet</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setTutorStage(2)}
                          className="text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          ← Back to Qualifications
                        </button>
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready for Email Verification</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ADMIN SPECIFIC FIELDS (INSTITUTIONAL ONBOARDING & VERIFICATION) */}
              {selectedRole === 'admin' && (
                <div className="space-y-4 pt-3 border-t border-[#1E304F]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block px-1">
                      School Information &amp; Institutional Accreditation
                    </span>
                    <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                      Curriculum Publisher
                    </span>
                  </div>

                  {/* Auto-Generated Unique 6-Character School Code */}
                  <div className="bg-[#081220] p-3.5 rounded-2xl border border-purple-500/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                        <span>Assigned 6-Character School Code</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setAdminSchoolCode(`SCHL${Math.floor(10 + Math.random() * 90)}`)}
                        className="text-[10px] font-semibold text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-[#060D17] border border-purple-500/60 rounded-xl py-2 px-3 text-base font-mono font-black text-purple-300 tracking-widest text-center shadow-inner">
                        {adminSchoolCode}
                      </div>
                      <span className="text-[11px] text-slate-400 leading-snug">
                        Students enter this code during signup or in their profile to link directly with your school notes, assignments &amp; exam drills.
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        School Legal Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={adminSchoolName}
                        onChange={(e) => setAdminSchoolName(e.target.value)}
                        placeholder="e.g. King's College Lagos"
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
                        <option value="State Public School">State Public Secondary School</option>
                        <option value="Private Secondary College">Private Secondary College</option>
                        <option value="International Grammar School">International Grammar School</option>
                        <option value="Mission / Faith-Based College">Mission / Faith-Based College</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Your Official Designation <span className="text-purple-400">*</span>
                      </label>
                      <select
                        value={adminDesignation}
                        onChange={(e) => setAdminDesignation(e.target.value)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Principal / Head of School">Principal / Head of School</option>
                        <option value="Vice Principal (Academic)">Vice Principal (Academic)</option>
                        <option value="Director of Curriculum & Instruction">Director of Curriculum &amp; Instruction</option>
                        <option value="Chief Examination Officer">Chief Examination Officer</option>
                        <option value="ICT & Computer Studies Director">ICT &amp; Computer Studies Director</option>
                        <option value="Proprietor / Board Trustee">Proprietor / Board Trustee</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Official Phone / WhatsApp <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={adminPhone}
                          onChange={(e) => setAdminPhone(e.target.value)}
                          placeholder="+234 802 345 6789"
                          className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">State</label>
                      <select
                        value={adminState}
                        onChange={(e) => setAdminState(e.target.value)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja FCT">Abuja FCT</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Delta">Delta</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Enugu">Enugu</option>
                        <option value="Edo">Edo</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Osun">Osun</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Local Government (LGA)</label>
                      <input
                        type="text"
                        value={adminLga}
                        onChange={(e) => setAdminLga(e.target.value)}
                        placeholder="e.g. Lagos Island / Ikeja"
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-purple-400 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Institutional Verification Accreditation Document Upload */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        <span>Institutional Accreditation Document</span>
                      </label>
                      <span className="text-[10px] text-amber-400 font-medium">Verification Gate</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Upload your Ministry of Education Approval Letter, WAEC/NECO Examination Center approval, or CAC Registration Certificate.
                    </p>
                    <DeviceImageUploader
                      currentImageUrl={adminDocumentUrl}
                      onImageChange={setAdminDocumentUrl}
                    />

                    <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800/40 text-[11px] text-purple-200/90 leading-relaxed mt-2 space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Accreditation Qualification Criteria</span>
                      </div>
                      <p>
                        To complete accreditation and unlock curriculum publishing, schools must have a minimum of <strong>50 subscribed students</strong> linked via your school code, OR activate an instant institutional subscription (<strong>₦15,000 / month</strong> or <strong>₦42,000 / term</strong>) in your admin portal.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* GROWTH PARTNER SPECIFIC FIELDS (LIVE ONBOARDING & NUBAN SETTLEMENT) */}
              {selectedRole === 'growth_partner' && (
                <div className="space-y-3.5 pt-3 border-t border-[#1E304F]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block px-1">
                      Growth Partner Commission & Payout Information
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      10% Lifetime RevShare
                    </span>
                  </div>

                  {/* Auto-Generated Unique 6-Character Referral Code */}
                  <div className="bg-[#081220] p-3 rounded-2xl border border-emerald-500/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Assigned 6-Character Referral Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setPartnerReferralCode(`GROW${Math.floor(10 + Math.random() * 90)}`)}
                        className="text-[10px] font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#060D17] border border-emerald-500/60 rounded-xl py-2 px-3 text-sm font-mono font-black text-emerald-400 tracking-widest text-center shadow-inner">
                        {partnerReferralCode}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Shared via your personal referral link: <code className="text-white text-[10px]">?ref={partnerReferralCode}</code>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        WhatsApp / Contact Phone <span className="text-emerald-400 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 801 234 5678"
                          className="w-full bg-[#081220] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Primary Region / State Coverage
                      </label>
                      <select
                        value={partnerRegion}
                        onChange={(e) => setPartnerRegion(e.target.value)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Lagos State">Lagos State</option>
                        <option value="Abuja (FCT)">Abuja (FCT)</option>
                        <option value="Rivers State">Rivers State (Port Harcourt)</option>
                        <option value="Oyo State">Oyo State (Ibadan)</option>
                        <option value="Ogun State">Ogun State</option>
                        <option value="Enugu State">Enugu State</option>
                        <option value="Kaduna State">Kaduna State</option>
                        <option value="Edo State">Edo State</option>
                        <option value="Delta State">Delta State</option>
                        <option value="Nationwide / Digital">Nationwide / Digital Channels</option>
                      </select>
                    </div>
                  </div>

                  {/* NUBAN Bank Payout Section */}
                  <div className="bg-[#081220] p-3.5 rounded-2xl border border-[#1E304F] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span>Commission Settlement Bank Account (NUBAN)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">Instant Payouts</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Select Nigerian Commercial Bank
                      </label>
                      <select
                        value={partnerBankName}
                        onChange={(e) => setPartnerBankName(e.target.value)}
                        className="w-full bg-[#060D17] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                      >
                        {[
                          'Access Bank',
                          'First Bank of Nigeria',
                          'Guaranty Trust Bank (GTBank)',
                          'United Bank for Africa (UBA)',
                          'Zenith Bank',
                          'Stanbic IBTC Bank',
                          'Fidelity Bank',
                          'Kuda Microfinance Bank',
                          'OPay Digital Services',
                          'Palmpay Limited'
                        ].map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          10-Digit Account Number (NUBAN)
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={10}
                          value={partnerAccountNumber}
                          onChange={(e) => setPartnerAccountNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 0123456789"
                          className="w-full bg-[#060D17] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2 px-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Account Name (As on Bank Record)
                        </label>
                        <input
                          type="text"
                          required
                          value={partnerAccountName}
                          onChange={(e) => setPartnerAccountName(e.target.value)}
                          placeholder="e.g. Amina Okon"
                          className="w-full bg-[#060D17] border border-[#1E304F] focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                      </div>
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
