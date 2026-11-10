import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Building2,
  Wifi,
  WifiOff,
  Maximize2,
  Smartphone,
  RotateCcw,
  BookOpen,
  Award,
  Atom,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  CreditCard
} from 'lucide-react';

interface KnowMorePageProps {
  onBackToLanding: () => void;
  onLaunchApp: (role?: UserRole) => void;
}

export const KnowMorePage: React.FC<KnowMorePageProps> = ({ onBackToLanding, onLaunchApp }) => {
  const {
    currentRole,
    setCurrentRole,
    isOffline,
    setIsOffline,
    isDeviceFrame,
    setIsDeviceFrame,
    resetDemoData,
    currentUser,
    loginWithGoogle,
    logoutUser,
    authLoading,
    student
  } = useApp();

  const rolePillars: {
    id: UserRole;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    features: string[];
    actionLabel: string;
    badge: string;
  }[] = [
    {
      id: 'student',
      title: 'Student Portal',
      subtitle: 'JSS 1 – SS 3 Academic Companion',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      features: [
        'SC AI Study Coach: WAEC/JAMB past question solver & exam traps',
        'Full NERDC Scheme of Work with downloadable offline notes',
        'Realistic WAEC, JAMB UTME & NECO CBT drills with timers',
        'Science formulas bank & interactive Periodic Table Rush'
      ],
      actionLabel: 'Enter Student Portal',
      badge: 'SC AI Powered'
    },
    {
      id: 'parent',
      title: 'Parent Escrow & Wallet',
      subtitle: 'Safe Funding & Tutor Protection',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      features: [
        'Secure 4-digit PIN protected Paystack funding wallet',
        'Escrow protection: tutors paid only after session approval',
        'Real-time student CBT progress and weekly quiz scores',
        'Direct chat with vetted NIN-verified tutors'
      ],
      actionLabel: 'Open Parent Dashboard',
      badge: 'Escrow Secured'
    },
    {
      id: 'tutor',
      title: 'Vetted Tutor Hub',
      subtitle: 'Home & Online Lessons',
      icon: <Users className="w-5 h-5 text-blue-400" />,
      features: [
        'Interactive Google Maps discovery with live distance radius',
        'Verified Nigerian educators across Lagos, Abuja, Ibadan & nationwide',
        'Physical home visits & online interactive video sessions',
        'Manage schedule bookings, accepted topics & payout logs'
      ],
      actionLabel: 'Explore Tutors & Sessions',
      badge: 'Google Maps'
    },
    {
      id: 'admin',
      title: 'School Admin Portal',
      subtitle: 'Curriculum & Inter-School Standings',
      icon: <Building2 className="w-5 h-5 text-purple-400" />,
      features: [
        'Inter-school weekly quiz championship standings',
        'Broadcast announcements & school uniform verification',
        'Curriculum accreditation & syllabus coverage tracking',
        'Comprehensive performance analytics across subjects'
      ],
      actionLabel: 'View Admin Analytics',
      badge: 'Institutional'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08101E] text-slate-100 flex flex-col font-sans selection:bg-[#FF5B00] selection:text-white">
      {/* Global Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0C182B]/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#84E000]" />
              <span>Back to Home</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">Student Companion</span>
              <span className="text-[10px] font-bold text-[#84E000] bg-[#84E000]/10 border border-[#84E000]/40 rounded px-1.5 py-0.5">
                Know More
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOffline(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isOffline
                  ? 'bg-amber-950/80 text-amber-300 border-amber-700/80'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-[#84E000]" />}
              <span>{isOffline ? 'Offline Active' : 'Online'}</span>
            </button>

            <button
              onClick={() => onLaunchApp('student')}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#FF5B00] hover:bg-[#e05000] text-white shadow-lg shadow-[#FF5B00]/30 transition-all"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Explainer Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-[#0C182B] to-[#08101E]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84E000]/10 border border-[#84E000]/30 text-[#84E000] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Platform Architecture & Syllabus Deep-Dive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything Inside <span className="text-[#FF5B00]">Student</span> <span className="text-[#84E000]">Companion</span>
          </h1>
          <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A comprehensive breakdown of all features, curriculum coverage, WAEC/JAMB exam preparation tools, parent escrow safety, and tutor discovery.
          </p>
        </div>
      </section>

      {/* Role Portals Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Explore Specialized Role Portals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rolePillars.map(pillar => (
            <div
              key={pillar.id}
              className="bg-[#0C182B] border border-slate-800 hover:border-[#84E000]/50 rounded-2xl p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                      <p className="text-xs text-slate-400">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#84E000] bg-[#84E000]/10 border border-[#84E000]/30 rounded px-2 py-0.5">
                    {pillar.badge}
                  </span>
                </div>

                <ul className="space-y-2.5 my-5 text-xs text-slate-300">
                  {pillar.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#84E000] shrink-0 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setCurrentRole(pillar.id);
                  onLaunchApp(pillar.id);
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-[#84E000] hover:text-[#0B1528] text-white border border-slate-700 transition-all"
              >
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Modules */}
      <section className="py-12 bg-[#0C182B]/50 border-t border-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Core Curriculum & Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <BookOpen className="w-5 h-5 text-[#84E000] mb-3" />
              <h4 className="text-sm font-bold text-white">Full NERDC Curriculum</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                20+ subjects spanning JSS 1 to SS 3 across 3 terms with weekly breakdowns, key formulas, and offline downloads.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <Clock className="w-5 h-5 text-[#FF5B00] mb-3" />
              <h4 className="text-sm font-bold text-white">WAEC & JAMB UTME CBT Drills</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Official timed questions with instant explanations, speed scoring, and gamified XP rewards.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <Atom className="w-5 h-5 text-blue-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Science Formulas & Periodic Table</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Physics, Chemistry, and Mathematics equations bank paired with speed challenge games.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <Award className="w-5 h-5 text-amber-400 mb-3" />
              <h4 className="text-sm font-bold text-white">Weekly Competitions</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Inter-school tournaments with real cash prize pools, live timers, and nationwide leaderboards.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <CreditCard className="w-5 h-5 text-[#84E000] mb-3" />
              <h4 className="text-sm font-bold text-white">Parent Escrow Wallet</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                PIN-protected wallet with Paystack top-up and escrow protection for tutoring.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0C182B] border border-slate-800">
              <TrendingUp className="w-5 h-5 text-[#FF5B00] mb-3" />
              <h4 className="text-sm font-bold text-white">School Leaderboards</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                State and national standings showcasing top students and high schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Student Companion Nigeria. Empowering JSS1 to SS3 students nationwide.</p>
      </footer>
    </div>
  );
};
