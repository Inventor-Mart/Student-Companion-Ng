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
import { OTAUpgradeGate } from './components/common/OTAUpgradeGate';
import { FeatureMaintenanceGate, FeatureMaintenanceView } from './components/common/FeatureMaintenanceView';
import { ShieldAlert, LogOut, X, Clock, Trash2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [quotaExceeded, setQuotaExceeded] = React.useState(false);
  const [lockCountdownSec, setLockCountdownSec] = React.useState<number>(0);

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
    isStudentSubscriptionModalOpen,
    targetSubscriptionPlan,
    closeStudentSubscriptionModal,
    isUniformModalOpen,
    setIsUniformModalOpen,
    activeClassroomSession,
    closeVirtualClassroom,
    isFeatureBlockedForCurrentUser,
    securityStatus,
    refreshSecurityStatus,
    lastSecurityAlert,
    dismissSecurityAlert,
    signOutApp
  } = useApp();

  React.useEffect(() => {
    if (securityStatus.accountStatus !== 'locked' || !securityStatus.lockedUntil) {
      setLockCountdownSec(0);
      return;
    }
    const targetMs = new Date(securityStatus.lockedUntil).getTime();
    const updateTick = () => {
      const rem = Math.max(0, Math.ceil((targetMs - Date.now()) / 1000));
      setLockCountdownSec(rem);
      if (rem === 0) {
        void refreshSecurityStatus();
      }
    };
    updateTick();
    const id = setInterval(updateTick, 1000);
    return () => clearInterval(id);
  }, [securityStatus.accountStatus, securityStatus.lockedUntil, refreshSecurityStatus]);

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

  // Account Deletion / Suspension / Timed Lock / IP or Device Block Gate (Non-bypassable except Super Admins)
  if (
    currentScreen === 'app' &&
    isAuthenticated &&
    !isSuperAdmin &&
    (securityStatus.accountStatus === 'deleted' ||
      securityStatus.accountStatus === 'suspended' ||
      securityStatus.accountStatus === 'locked' ||
      securityStatus.isBlocked)
  ) {
    const isDeleted = securityStatus.accountStatus === 'deleted';
    const isSuspended = securityStatus.accountStatus === 'suspended';
    const isLocked = securityStatus.accountStatus === 'locked';

    const formatCountdown = (totalSec: number) => {
      const hrs = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      if (hrs > 0) {
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
      <div className="w-full min-h-screen bg-[#070D18] text-slate-100 flex items-center justify-center p-4">
        <div
          className={`max-w-md w-full bg-[#0B1526] border rounded-2xl p-6 space-y-4 text-center shadow-2xl ${
            isLocked ? 'border-amber-700/70' : 'border-rose-800/70'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto ${
              isLocked
                ? 'bg-amber-950/70 border-amber-700/70 text-amber-400'
                : 'bg-rose-950/70 border-rose-700/70 text-rose-400'
            }`}
          >
            {isDeleted ? (
              <Trash2 className="w-7 h-7" />
            ) : isLocked ? (
              <Clock className="w-7 h-7" />
            ) : (
              <ShieldAlert className="w-7 h-7" />
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-black text-white tracking-tight">
              {isDeleted
                ? 'Account Closed & Deleted'
                : isSuspended
                ? 'Account Suspended'
                : isLocked
                ? 'Account Temporarily Locked'
                : 'Connection Temporarily Blocked'}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isDeleted
                ? securityStatus.deletionReason ||
                  'This account has been permanently closed and its personal data has been scrubbed in accordance with Trust & Safety policy.'
                : isSuspended
                ? securityStatus.suspensionReason ||
                  'Access has been suspended indefinitely pending Super Admin Trust & Safety review.'
                : isLocked
                ? securityStatus.lockReason ||
                  'Your account is temporarily locked due to automated spam or brute-force protection. Access will restore automatically once the timer expires.'
                : securityStatus.blockReason ||
                  'Access from this device or network connection has been restricted by Student Companion Trust & Safety.'}
            </p>
          </div>

          {isLocked && (
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 space-y-1">
              <div className="text-[11px] text-amber-300 uppercase tracking-wider font-bold">
                Automatic Unlock Countdown
              </div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {lockCountdownSec > 0 ? formatCountdown(lockCountdownSec) : 'Checking...'}
              </div>
              {securityStatus.lockedUntil && (
                <div className="text-[11px] text-slate-400 font-mono tabular-nums">
                  Unlocks at {new Date(securityStatus.lockedUntil).toLocaleString()}
                </div>
              )}
            </div>
          )}

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 font-mono">
            Account: {isDeleted ? 'Deleted Account' : currentUserProfile?.email || 'Authenticated Session'} · Status:{' '}
            <span className={`font-bold uppercase ${isLocked ? 'text-amber-400' : 'text-rose-400'}`}>
              {isDeleted ? 'Deleted' : isSuspended ? 'Suspended' : isLocked ? 'Locked' : 'Blocked'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isLocked && (
              <button
                type="button"
                onClick={() => void refreshSecurityStatus()}
                className="flex-1 min-h-[44px] rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black cursor-pointer transition-colors"
              >
                Check Status
              </button>
            )}
            <button
              type="button"
              onClick={() => signOutApp()}
              className="flex-1 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
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

      {/* Global Security Shield Alert Banner */}
      {lastSecurityAlert && (
        <div className="w-full max-w-2xl px-4 pt-2 z-50">
          <div className="bg-rose-950/95 border border-rose-700 text-rose-100 rounded-xl px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{lastSecurityAlert}</span>
            </div>
            <button
              type="button"
              onClick={dismissSecurityAlert}
              className="text-rose-300 hover:text-white p-1 cursor-pointer"
              aria-label="Dismiss security alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport (Android Device Frame or Responsive Full Screen) */}
      <AndroidDeviceFrame>
        {/* OTA App Version Upgrade Prompt / Mandatory Blocking Gate */}
        <OTAUpgradeGate />

        {/* Role Router */}
        {currentRole === 'student' && (
          <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden relative">
            {/* Note Reader View */}
            {activeReadingNote ? (
              <FeatureMaintenanceGate featureKey="lesson_notes">
                <LessonNoteReader />
              </FeatureMaintenanceGate>
            ) : activeExam ? (
              /* CBT Exam Runner View */
              <FeatureMaintenanceGate featureKey="cbt_quizzes">
                <CBTEngine />
              </FeatureMaintenanceGate>
            ) : (
              /* Core Student Tabs */
              <>
                {/* Over-The-Air TV Broadcast-Style Scrolling News Ticker */}
                <BroadcastNewsTicker />

                <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col">
                  {activeStudentTab === 'dashboard' && <StudentDashboard />}
                  {activeStudentTab === 'aspirant-cbt' && (
                    <FeatureMaintenanceGate featureKey="aspirant_hub">
                      <AspirantCBTSimulator />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'admission-guide' && (
                    <FeatureMaintenanceGate featureKey="aspirant_hub">
                      <UniversityAdmissionGuide />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'mock-tournaments' && (
                    <FeatureMaintenanceGate featureKey="aspirant_hub">
                      <NationalMockTournaments />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'ai-coach' && (
                    <FeatureMaintenanceGate featureKey="ai_study_coach">
                      <AiStudyCoach />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'syllabus' && (
                    <FeatureMaintenanceGate featureKey="lesson_notes">
                      <SchemeOfWorkHub />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'cbt' && (
                    <FeatureMaintenanceGate featureKey="cbt_quizzes">
                      <CBTEngine />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'competitions' && (
                    <FeatureMaintenanceGate featureKey="competitions">
                      <CompetitionsHub />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'formulas' && (
                    <FeatureMaintenanceGate featureKey="science_formulas">
                      <ScienceFormulasHub />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'tutors' && (
                    <FeatureMaintenanceGate featureKey="tutor_marketplace">
                      <TutorDiscovery />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'games' && (
                    <FeatureMaintenanceGate featureKey="games_hub">
                      <GamesHub />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'community' && (
                    <FeatureMaintenanceGate featureKey="community_forum">
                      <StudentCommunityForum />
                    </FeatureMaintenanceGate>
                  )}
                  {activeStudentTab === 'exam-prep' && (
                    <FeatureMaintenanceGate featureKey="exam_prep">
                      <PrepareForExamHub />
                    </FeatureMaintenanceGate>
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
            {isUniformModalOpen && isFeatureBlockedForCurrentUser('uniform_verification') ? (
              <div className="fixed inset-0 z-50 bg-[#070D18]/95 flex flex-col">
                <FeatureMaintenanceView
                  featureKey="uniform_verification"
                  onReturnHome={() => setIsUniformModalOpen(false)}
                />
              </div>
            ) : (
              <AIUniformVerificationModal />
            )}

            {/* Over-The-Air Pop-Up Promotional Image Announcement Modal */}
            <PopupAnnouncementModal />

            {/* 4-Tier Student Termly Subscription & Modular Add-On Modal */}
            {isStudentSubscriptionModalOpen && isFeatureBlockedForCurrentUser('wallet_payments') ? (
              <div className="fixed inset-0 z-50 bg-[#070D18]/95 flex flex-col">
                <FeatureMaintenanceView
                  featureKey="wallet_payments"
                  onReturnHome={closeStudentSubscriptionModal}
                />
              </div>
            ) : (
              <StudentSubscriptionModal
                isOpen={isStudentSubscriptionModalOpen}
                onClose={closeStudentSubscriptionModal}
                targetPlan={targetSubscriptionPlan}
              />
            )}

            {/* Live Academic XP Award & Explorer Multiplier Toast */}
            <XPAwardNotification />
          </div>
        )}

        {currentRole === 'growth_partner' && (
          <FeatureMaintenanceGate featureKey="growth_partner_portal">
            <GrowthPartnerPortal />
          </FeatureMaintenanceGate>
        )}

        {currentRole === 'parent' && (
          <FeatureMaintenanceGate featureKey="parent_portal">
            <ParentPortal />
          </FeatureMaintenanceGate>
        )}

        {currentRole === 'tutor' && (
          <FeatureMaintenanceGate featureKey="tutor_portal">
            <TutorPortal />
          </FeatureMaintenanceGate>
        )}

        {currentRole === 'school_admin' && (
          <FeatureMaintenanceGate featureKey="school_admin_portal">
            <SchoolAdminPortal />
          </FeatureMaintenanceGate>
        )}

        {currentRole === 'admin' && (
          isSuperAdmin ? (
            <SuperAdminPortal />
          ) : (
            <FeatureMaintenanceGate featureKey="school_admin_portal">
              <SchoolAdminPortal />
            </FeatureMaintenanceGate>
          )
        )}

        {/* Global Virtual Classroom Modal Overlay */}
        {activeClassroomSession && isFeatureBlockedForCurrentUser('virtual_classroom') ? (
          <div className="fixed inset-0 z-50 bg-[#070D18]/95 flex flex-col">
            <FeatureMaintenanceView
              featureKey="virtual_classroom"
              onReturnHome={closeVirtualClassroom}
            />
          </div>
        ) : (
          <VirtualClassroomModal />
        )}
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
