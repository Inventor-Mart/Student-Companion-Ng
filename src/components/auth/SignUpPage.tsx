import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

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
  const [step, setStep] = useState<1 | 2>(effectiveRole ? 2 : 1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(effectiveRole || 'student');

  // Common Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student Fields
  const [classLevel, setClassLevel] = useState<NigerianClassLevel>('SS 2');
  const [stream, setStream] = useState<AcademicStream>('Science');
  const [targetExam, setTargetExam] = useState<'WAEC' | 'JAMB_UTME' | 'NECO' | 'BECE'>('WAEC');
  const [schoolName, setSchoolName] = useState('');
  const [state, setState] = useState('Lagos');

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
    badge: string;
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
      badge: 'Earn ₦',
      description: 'Offer structured 1-on-1 tutoring sessions and track earnings.',
      icon: <Users className="w-6 h-6 text-sky-400" />,
      color: 'border-sky-500/60 hover:border-sky-400'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === 'student') {
      registerNewUser('student', {
        name: fullName.trim() || 'Student',
        email: email.trim(),
        classLevel,
        stream,
        school: schoolName.trim() || "King's College, Lagos",
        targetExam
      });
    } else if (selectedRole === 'parent') {
      registerNewUser('parent', {
        name: fullName.trim() || 'Parent / Guardian',
        email: email.trim(),
        phone: phone.trim(),
        wardName: wardName.trim(),
        pin: pin.trim() || '1234'
      });
    } else if (selectedRole === 'tutor') {
      registerNewUser('tutor', {
        name: fullName.trim() || 'Educator',
        email: email.trim(),
        phone: phone.trim(),
        subjects: [subjectSpecialization],
        qualification: qualification.trim(),
        hourlyRateNaira: parseInt(hourlyRate) || 3500,
        teachingMode
      });
    } else {
      registerNewUser('admin', {
        name: fullName.trim() || 'School Administrator',
        email: email.trim(),
        schoolName: adminSchoolName.trim() || "Secondary School",
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
                Step {step} of 2
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {step === 1 ? 'Select Your Account Role' : `Complete Your ${roleCards.find(r => r.role === selectedRole)?.title} Profile`}
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full transition-all ${step === 1 ? 'bg-[#84E000] scale-110' : 'bg-[#1E304F]'}`} />
              <div className={`w-3 h-3 rounded-full transition-all ${step === 2 ? 'bg-[#84E000] scale-110' : 'bg-[#1E304F]'}`} />
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
            <form onSubmit={handleSubmit} className="space-y-4">
              
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

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={selectedRole === 'student' ? 'e.g. Amina Okon' : selectedRole === 'parent' ? 'e.g. Mrs. Okon' : 'e.g. Engr. Adeyemi'}
                      className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

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
                        onChange={(e) => {
                          const val = e.target.value as NigerianClassLevel;
                          setClassLevel(val);
                          if (val.startsWith('JSS')) setStream('Junior');
                          else if (stream === 'Junior') setStream('Science');
                        }}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="JSS 1">JSS 1 (Junior 1)</option>
                        <option value="JSS 2">JSS 2 (Junior 2)</option>
                        <option value="JSS 3">JSS 3 (BECE Prep)</option>
                        <option value="SS 1">SS 1 (Senior 1)</option>
                        <option value="SS 2">SS 2 (Senior 2)</option>
                        <option value="SS 3">SS 3 (WAEC / JAMB)</option>
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
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Target Examination</label>
                      <select
                        value={targetExam}
                        onChange={(e) => setTargetExam(e.target.value as any)}
                        className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="WAEC">WAEC SSCE (Senior Certificate)</option>
                        <option value="JAMB_UTME">JAMB UTME (University Entrance)</option>
                        <option value="NECO">NECO Senior School Certificate</option>
                        <option value="BECE">Junior WAEC (BECE)</option>
                      </select>
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
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Hourly Rate (₦)</label>
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

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-full bg-[#14233C] hover:bg-[#1E3355] text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Change Role
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#84E000] hover:bg-[#75c900] active:scale-[0.98] text-[#0A1322] font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#84E000]/25 transition-all text-center cursor-pointer"
                >
                  Create Account & Launch
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
