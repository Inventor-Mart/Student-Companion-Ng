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
import { StudentCommunityForum } from './components/student/StudentCommunityForum';
import { GrowthPartnerPortal } from './components/partner/GrowthPartnerPortal';
import { VirtualClassroomModal } from './components/classroom/VirtualClassroomModal';
import { PrepareForExamHub } from './components/student/exam-prep/PrepareForExamHub';
import { AspirantCBTSimulator } from './components/student/aspirant/AspirantCBTSimulator';
import { UniversityAdmissionGuide } from './components/student/aspirant/UniversityAdmissionGuide';
import { NationalMockTournaments } from './components/student/aspirant/NationalMockTournaments';
import { EducatorQuestionImporter } from './components/admin/EducatorQuestionImporter';
import { BroadcastNewsTicker } from './components/student/BroadcastNewsTicker';
import { PopupAnnouncementModal } from './components/student/PopupAnnouncementModal';
import { StudentSubscriptionModal } from './components/student/StudentSubscriptionModal';
import { XPAwardNotification } from './components/student/XPAwardNotification';
import { SplashScreen } from './components/common/SplashScreen';
import { AppUpdateGate, OTAModulePausedCard, PausedFeatureModal } from './components/common/AppUpdateGate';

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
    isSuperAdmin,
    isFeatureEnabled,
    getPausedFeatureMessage,
    signOutApp,
    isStudentSubscriptionModalOpen,
    targetSubscriptionPlan,
    closeStudentSubscriptionModal
  } = useApp();

  // Screen 0: Sleek Deep Navy Splash Screen with Lottie Animation
  if (currentScreen === 'splash') {
    return (
      <SplashScreen
        durationMs={3000}
        onFinish={() => {
          setCurrentScreen('landing');
        }}
      />
    );
  }

  // Screen 1: The New Concept Landing Page (Public Discovery)
  if (currentScreen === 'landing') {
    return (
      <>
        <AppUpdateGate />
        <LandingPage
        onOpenKnowMore={() => setCurrentScreen('know_more')}
        onGetStarted={() => {
          setTargetSignUpRole(null);
          setCurrentScreen('signup');
        }}
        onSignIn={() => setCurrentScreen('signin')}
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
      </>
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
      {/* Global OTA App Update Banner, Recommended Modal & Mandatory Upgrade Lock */}
      <AppUpdateGate />

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
          <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden relative">
            {/* Note Reader View */}
            {activeReadingNote ? (
              <LessonNoteReader />
            ) : activeExam ? (
              /* CBT Exam Runner View */
              <CBTEngine />
            ) : (
              /* Core Student Tabs */
              <>
                {/* Over-The-Air TV Broadcast-Style Scrolling News Ticker */}
                <BroadcastNewsTicker />

                <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col">
                  {activeStudentTab === 'dashboard' && <StudentDashboard />}
                  {activeStudentTab === 'aspirant-cbt' && (
                    isFeatureEnabled('aspirantHub') ? (
                      <AspirantCBTSimulator />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Aspirant CBT Simulator"
                        message={getPausedFeatureMessage('aspirantHub')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'admission-guide' && (
                    isFeatureEnabled('aspirantHub') ? (
                      <UniversityAdmissionGuide />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="University Admission Guide"
                        message={getPausedFeatureMessage('aspirantHub')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'mock-tournaments' && (
                    isFeatureEnabled('aspirantHub') ? (
                      <NationalMockTournaments />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="National Mock Tournaments"
                        message={getPausedFeatureMessage('aspirantHub')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'ai-coach' && (
                    isFeatureEnabled('aiCoach') ? (
                      <AiStudyCoach />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="SC AI Study Coach"
                        message={getPausedFeatureMessage('aiCoach')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'syllabus' && (
                    isFeatureEnabled('lessonNotes') ? (
                      <SchemeOfWorkHub />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Lesson Notes & NERDC Syllabus"
                        message={getPausedFeatureMessage('lessonNotes')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'cbt' && (
                    isFeatureEnabled('cbtExams') ? (
                      <CBTEngine />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="CBT Exam Practice & Quizzes"
                        message={getPausedFeatureMessage('cbtExams')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'competitions' && (
                    isFeatureEnabled('competitions') ? (
                      <CompetitionsHub />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Competitions & School League"
                        message={getPausedFeatureMessage('competitions')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'formulas' && (
                    isFeatureEnabled('scienceFormulas') ? (
                      <ScienceFormulasHub />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="STEM Formulas Sheet"
                        message={getPausedFeatureMessage('scienceFormulas')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'tutors' && (
                    isFeatureEnabled('tutorMarketplace') ? (
                      <TutorDiscovery />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Tutor Marketplace & Booking"
                        message={getPausedFeatureMessage('tutorMarketplace')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'games' && (
                    isFeatureEnabled('gamesHub') ? (
                      <GamesHub />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Games & Brain Arcade"
                        message={getPausedFeatureMessage('gamesHub')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'community' && (
                    isFeatureEnabled('communityForum') ? (
                      <StudentCommunityForum />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Student Community Forum"
                        message={getPausedFeatureMessage('communityForum')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'exam-prep' && (
                    isFeatureEnabled('examPrep') ? (
                      <PrepareForExamHub />
                    ) : (
                      <OTAModulePausedCard
                        moduleName="Prepare For Exam Planner"
                        message={getPausedFeatureMessage('examPrep')}
                        onBackToDashboard={() => setActiveStudentTab('dashboard')}
                      />
                    )
                  )}
                  {activeStudentTab === 'educator-importer' && (
                    isSuperAdmin ? (
                      <EducatorQuestionImporter
                        onClose={() => setActiveStudentTab('dashboard')}
                        onOpenCBTWithPaper={() => {
                          setActiveStudentTab('aspirant-cbt');
                        }}
                      />
                    ) : (
                      <StudentDashboard />
                    )
                  )}
                </div>

                {/* Fixed Thumb-Zone Bottom Nav */}
                <StudentBottomNav />
              </>
            )}

            {/* SC AI Uniform Verification Camera / Scanner Modal */}
            <AIUniformVerificationModal />

            {/* Over-The-Air Pop-Up Promotional Image Announcement Modal */}
            <PopupAnnouncementModal />

            {/* 4-Tier Student Termly Subscription & Modular Add-On Modal */}
            <StudentSubscriptionModal
              isOpen={isStudentSubscriptionModalOpen}
              onClose={closeStudentSubscriptionModal}
              targetPlan={targetSubscriptionPlan}
            />

            {/* Live Academic XP Award & Explorer Multiplier Toast */}
            <XPAwardNotification />
          </div>
        )}

        {currentRole === 'growth_partner' && (
          isFeatureEnabled('growthPartnerPortal') ? (
            <GrowthPartnerPortal />
          ) : (
            <OTAModulePausedCard
              moduleName="Growth Partner Portal"
              message={getPausedFeatureMessage('growthPartnerPortal')}
              actionLabel="Sign Out / Switch Account"
              onBackToDashboard={signOutApp}
            />
          )
        )}

        {currentRole === 'parent' && (
          isFeatureEnabled('parentPortal') ? (
            <ParentPortal />
          ) : (
            <OTAModulePausedCard
              moduleName="Parent Guardian Portal"
              message={getPausedFeatureMessage('parentPortal')}
              actionLabel="Sign Out / Switch Account"
              onBackToDashboard={signOutApp}
            />
          )
        )}

        {currentRole === 'tutor' && (
          isFeatureEnabled('tutorPortal') ? (
            <TutorPortal />
          ) : (
            <OTAModulePausedCard
              moduleName="Educator / Tutor Portal"
              message={getPausedFeatureMessage('tutorPortal')}
              actionLabel="Sign Out / Switch Account"
              onBackToDashboard={signOutApp}
            />
          )
        )}

        {currentRole === 'school_admin' && (
          isFeatureEnabled('schoolAdminPortal') ? (
            <SchoolAdminPortal />
          ) : (
            <OTAModulePausedCard
              moduleName="School Administrator Portal"
              message={getPausedFeatureMessage('schoolAdminPortal')}
              actionLabel="Sign Out / Switch Account"
              onBackToDashboard={signOutApp}
            />
          )
        )}

        {currentRole === 'admin' && (
          isSuperAdmin ? (
            <SuperAdminPortal />
          ) : isFeatureEnabled('schoolAdminPortal') ? (
            <SchoolAdminPortal />
          ) : (
            <OTAModulePausedCard
              moduleName="School Administrator Portal"
              message={getPausedFeatureMessage('schoolAdminPortal')}
              actionLabel="Sign Out / Switch Account"
              onBackToDashboard={signOutApp}
            />
          )
        )}

        {/* Global Virtual Classroom Modal Overlay */}
        <VirtualClassroomModal />

        {/* Global Paused Feature Notice Modal (for modal/action-triggered modules) */}
        <PausedFeatureModal />
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
