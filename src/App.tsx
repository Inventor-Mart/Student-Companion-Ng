import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceControlsHeader } from './components/device/DeviceControlsHeader';
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
import { ScienceFormulasHub } from './components/student/ScienceFormulasHub';

const AppContent: React.FC = () => {
  const {
    currentRole,
    activeStudentTab,
    activeReadingNote,
    activeExam
  } = useApp();

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Device & Environment Bar */}
      <DeviceControlsHeader />

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

        {currentRole === 'parent' && <ParentPortal />}

        {currentRole === 'tutor' && <TutorPortal />}

        {currentRole === 'admin' && <SchoolAdminPortal />}
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
