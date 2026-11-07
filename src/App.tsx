import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidDeviceFrame } from './components/device/AndroidDeviceFrame';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentBottomNav } from './components/student/StudentBottomNav';
import { SchemeOfWorkHub } from './components/student/SchemeOfWorkHub';
import { LessonNoteReader } from './components/student/LessonNoteReader';
import { CBTEngine } from './components/student/CBTEngine';
import { AIUniformVerificationModal } from './components/student/AIUniformVerification';
import { GamesHub } from './components/student/GamesHub';
import { TutorDiscovery } from './components/student/TutorDiscovery';
import { ParentPortal } from './components/parent/ParentPortal';
import { TutorPortal } from './components/tutor/TutorPortal';
import { CompetitionsHub } from './components/student/CompetitionsHub';
import { SchoolAdminPortal } from './components/admin/SchoolAdminPortal';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { ScienceFormulasHub } from './components/student/ScienceFormulasHub';
import { LandingPage } from './components/landing/LandingPage';
import { KnowMorePage } from './components/landing/KnowMorePage';
import { SignInPage } from './components/auth/SignInPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { AiStudyCoach } from './components/student/AiStudyCoach';
import { GrowthPartnerPortal } from './components/partner/GrowthPartnerPortal';

const AppContent: React.FC = () => {
  const [quotaExceeded, setQuotaExceeded] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  const {
    currentRole,
    setCurrentRole,
    currentUserProfile,
    targetSignUpRole,
    setTargetSignUpRole,
    activeStudentTab,
    setActiveStudentTab,
    activeReadingNote,
    activeExam,
    currentScreen,
    setCurrentScreen,
    isAuthenticated,
    isSuperAdmin
  } = useApp();

  // Screen 1: The New Concept Landing Page (Public Discovery)
  if (currentScreen === 'landing') {
    return (
      <LandingPage
        onOpenKnowMore={() => setCurrentScreen('know_more')}
        onGetStarted={() => {
          setTargetSignUpRole(null);
          setCurrentScreen('signup');
        }}
        onDiscoverTutors={() => {
          if (!isAuthenticated) {
            setTargetSignUpRole('student');
            setCurrentScreen('signup');
          } else {
            if (currentUserProfile?.role === 'student') {
              setCurrentRole('student');
              setActiveStudentTab('tutors');
            } else if (currentUserProfile) {
              setCurrentRole(currentUserProfile.role);
            }
            setCurrentScreen('app');
          }
        }}
        onSelectFeature={(feat) => {
          if (!isAuthenticated) {
            if (feat === 'tutors') {
              setTargetSignUpRole('tutor');
            } else {
              setTargetSignUpRole('student');
            }
            setCurrentScreen('signup');
          } else {
            if (currentUserProfile) {
              setCurrentRole(currentUserProfile.role);
              if (currentUserProfile.role === 'student') {
                if (feat === 'games') setActiveStudentTab('games');
                else if (feat === 'cbt') setActiveStudentTab('cbt');
                else if (feat === 'tutors') setActiveStudentTab('tutors');
              }
            }
            setCurrentScreen('app');
          }
        }}
      />
    );
  }

  // Screen 2: The Sign-In Page
  if (currentScreen === 'signin') {
    return (
      <SignInPage
        onBackToLanding={() => setCurrentScreen('landing')}
        onSignInSuccess={() => setCurrentScreen('app')}
        onNavigateToSignUp={() => setCurrentScreen('signup')}
      />
    );
  }

  // Screen 2b: Role-Based Sign-Up & Onboarding
  if (currentScreen === 'signup') {
    return (
      <SignUpPage
        initialRole={targetSignUpRole}
        onBackToSignIn={() => setCurrentScreen('signin')}
        onSignUpSuccess={() => setCurrentScreen('app')}
      />
    );
  }

  // Screen 3: "Know More" Detailed Platform Architecture & Syllabus Page (Public Discovery)
  if (currentScreen === 'know_more') {
    return (
      <KnowMorePage
        onBackToLanding={() => setCurrentScreen('landing')}
        onLaunchApp={(role) => {
          if (!isAuthenticated) {
            setTargetSignUpRole(role || 'student');
            setCurrentScreen('signup');
          } else {
            if (role && currentUserProfile && currentUserProfile.role !== role) {
              setTargetSignUpRole(role);
              setCurrentScreen('signup');
            } else {
              if (currentUserProfile) setCurrentRole(currentUserProfile.role);
              setCurrentScreen('app');
            }
          }
        }}
      />
    );
  }

  // Protected View Guard: If unregistered user reaches 'app' screen, route to sign up
  if (currentScreen === 'app' && !isAuthenticated) {
    return (
      <SignUpPage
        initialRole={targetSignUpRole || currentRole || 'student'}
        onBackToSignIn={() => setCurrentScreen('signin')}
        onSignUpSuccess={() => setCurrentScreen('app')}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#070D18] flex flex-col items-center justify-center font-sans text-slate-100 selection:bg-[#FF5B00] selection:text-white relative">
      {/* Google Maps Quota Exceeded Sticky Banner */}
      {quotaExceeded && (
        <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Main Viewport (Android Device Frame or Responsive Full Screen) */}
      <AndroidDeviceFrame>
        {/* Role Router */}
        {currentRole === 'student' && (
          <div className="flex-1 w-full flex flex-col overflow-hidden relative">
            {/* Note Reader View */}
            {activeReadingNote ? (
              <LessonNoteReader />
            ) : activeExam ? (
              /* CBT Exam Runner View */
              <CBTEngine />
            ) : (
              /* Core Student Tabs */
              <>
                <div className="flex-1 w-full overflow-hidden flex flex-col">
                  {activeStudentTab === 'dashboard' && <StudentDashboard />}
                  {activeStudentTab === 'ai-coach' && <AiStudyCoach />}
                  {activeStudentTab === 'syllabus' && <SchemeOfWorkHub />}
                  {activeStudentTab === 'cbt' && <CBTEngine />}
                  {activeStudentTab === 'competitions' && <CompetitionsHub />}
                  {activeStudentTab === 'formulas' && <ScienceFormulasHub />}
                  {activeStudentTab === 'tutors' && <TutorDiscovery />}
                  {activeStudentTab === 'games' && <GamesHub />}
                </div>

                {/* Fixed Thumb-Zone Bottom Nav */}
                <StudentBottomNav />
              </>
            )}

            {/* AI Uniform Verification Camera / Scanner Modal */}
            <AIUniformVerificationModal />
          </div>
        )}

        {currentRole === 'growth_partner' && <GrowthPartnerPortal />}

        {currentRole === 'parent' && <ParentPortal />}

        {currentRole === 'tutor' && <TutorPortal />}

        {currentRole === 'admin' && (isSuperAdmin ? <SuperAdminPortal /> : <SchoolAdminPortal />)}
      </AndroidDeviceFrame>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
