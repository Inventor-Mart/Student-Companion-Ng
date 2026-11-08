import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CollaborativeWhiteboard } from './CollaborativeWhiteboard';
import { ClassroomCanvasHUD } from './ClassroomCanvasHUD';
import { ClassroomChatMessage } from '../../types';
import { NairaText, NairaSign } from '../../utils/currency';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  BookOpen,
  Send,
  X,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  Wifi,
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';

const QUICK_MATH_FORMULAS = [
  'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  'v = u + at',
  'F = ma',
  '\\text{Area} = \\pi r^2',
  '\\sin^2\\theta + \\cos^2\\theta = 1',
  'E = mc^2',
  'PV = nRT',
  'Q = mc\\Delta T'
];

export const VirtualClassroomModal: React.FC = () => {
  const {
    activeClassroomSession,
    closeVirtualClassroom,
    completeVirtualSessionAndReleaseEscrow,
    toggleVirtualClassroomMic,
    currentRole
  } = useApp();

  // All React Hooks called unconditionally at top of component
  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'formulas'>('chat');
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isLowDataMode, setIsLowDataMode] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [classroomMessages, setClassroomMessages] = useState<ClassroomChatMessage[]>([]);
  const [isConfirmCompletionModalOpen, setIsConfirmCompletionModalOpen] = useState(false);
  const [sessionRating, setSessionRating] = useState<number>(5);
  const [studentFeedback, setStudentFeedback] = useState<string>('Excellent lesson! Clear step-by-step explanations.');
  const [isReleasingEscrow, setIsReleasingEscrow] = useState<boolean>(false);

  // Sync initial messages when session loads
  useEffect(() => {
    if (activeClassroomSession) {
      setClassroomMessages([
        {
          id: 'cm-1',
          senderId: activeClassroomSession.tutorId,
          senderName: activeClassroomSession.tutorName,
          senderRole: 'tutor',
          text: `Welcome to our virtual session on "${activeClassroomSession.topic}". Feel free to draw or type any questions on the board!`,
          timestamp: '10:00 AM'
        },
        {
          id: 'cm-2',
          senderId: activeClassroomSession.studentId,
          senderName: activeClassroomSession.studentName,
          senderRole: 'student',
          text: 'Good morning! I have my past questions ready on the board.',
          timestamp: '10:01 AM'
        }
      ]);
    }
  }, [activeClassroomSession?.bookingId]);

  // Conditional early return AFTER all hooks have executed
  if (!activeClassroomSession) return null;

  const isTutor = activeClassroomSession.activeRole === 'tutor' || currentRole === 'tutor';
  const isStudent = !isTutor;
  const isMicMuted = isTutor
    ? !activeClassroomSession.isTutorMicActive
    : !activeClassroomSession.isStudentMicActive;

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ClassroomChatMessage = {
      id: `cm-${Date.now()}`,
      senderId: isTutor ? activeClassroomSession.tutorId : activeClassroomSession.studentId,
      senderName: isTutor ? activeClassroomSession.tutorName : activeClassroomSession.studentName,
      senderRole: isTutor ? 'tutor' : 'student',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setClassroomMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleInsertFormula = (formula: string) => {
    setChatInput(prev => (prev ? `${prev} ${formula}` : formula));
  };

  const handleConfirmAndReleaseEscrow = () => {
    setIsReleasingEscrow(true);
    setTimeout(() => {
      completeVirtualSessionAndReleaseEscrow(
        activeClassroomSession.bookingId,
        sessionRating,
        studentFeedback
      );
      setIsReleasingEscrow(false);
      setIsConfirmCompletionModalOpen(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060D17] text-slate-100 flex flex-col overflow-hidden">
      {/* Top Classroom Bar */}
      <header className="bg-[#0B1526] border-b border-slate-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-3 shrink-0 z-20 shadow-md">
        {/* Left: Subject, Topic & Verified Tag */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shrink-0 shadow-sm font-bold text-xs">
            {activeClassroomSession.subject.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                {activeClassroomSession.topic}
              </h1>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-800 shrink-0 hidden sm:flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Masked & Safe</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {activeClassroomSession.subject} · Educator: <strong>{activeClassroomSession.tutorName}</strong> · Student: <strong>{activeClassroomSession.studentName}</strong>
            </p>
          </div>
        </div>

        {/* Center: Canvas-Based High-Performance HUD Engine (Timer, Voice Waves, 60/30 FPS Eco Governor) */}
        <div className="flex items-center justify-center min-w-0">
          <ClassroomCanvasHUD
            initialSecondsLeft={activeClassroomSession.remainingSeconds || 7200}
            isMicActive={!isMicMuted}
            isLowDataMode={isLowDataMode}
            onTimerExpire={() => {
              console.log('Classroom session time completed');
            }}
          />
        </div>

        {/* Right: Audio Controls, Data-Saver & Completion Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Low Bandwidth Mode Badge */}
          <button
            onClick={() => setIsLowDataMode(!isLowDataMode)}
            className={`hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer ${
              isLowDataMode
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            title="Optimized for low mobile data consumption in Nigeria"
          >
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Data-Saver (18 kbps)</span>
          </button>

          {/* Microphone Toggle */}
          <button
            onClick={toggleVirtualClassroomMic}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isMicMuted
                ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
            }`}
            title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMicMuted ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline text-[11px] font-bold">
              {isMicMuted ? 'Muted' : 'Live Mic'}
            </span>
          </button>

          {/* Speaker Mute Toggle */}
          <button
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title={isSpeakerMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isSpeakerMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-200" />}
          </button>

          {/* Escrow Release / Complete Button */}
          {isStudent ? (
            <button
              onClick={() => setIsConfirmCompletionModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/50 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete Lesson & Release Escrow</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (window.confirm('Are you finished teaching this scheduled topic?')) {
                  completeVirtualSessionAndReleaseEscrow(activeClassroomSession.bookingId);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finish Teaching</span>
            </button>
          )}

          {/* Close / Minimize */}
          <button
            onClick={closeVirtualClassroom}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Minimize Classroom View"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Classroom Body: 2-Zone Workspace */}
      <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden relative">
        {/* Left / Center: Collaborative Whiteboard */}
        <div className="flex-1 h-full flex flex-col overflow-hidden relative">
          <CollaborativeWhiteboard
            participantRole={activeClassroomSession.activeRole}
            topic={activeClassroomSession.topic}
          />
        </div>

        {/* Right Dock: Masked Live Chat & Curriculum Formulas Drawer */}
        <div className="w-full md:w-80 lg:w-96 bg-[#0B1526] border-t md:border-t-0 md:border-l border-slate-800 flex flex-col h-64 md:h-full shrink-0">
          {/* Dock Tabs Header */}
          <div className="flex items-center bg-slate-900/90 p-1.5 border-b border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeSideTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Class Chat</span>
            </button>
            <button
              onClick={() => setActiveSideTab('formulas')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeSideTab === 'formulas'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Formulas & Tips</span>
            </button>
          </div>

          {activeSideTab === 'chat' ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Quick Formula Inserter Ribbon */}
              <div className="bg-slate-950/80 px-2.5 py-1.5 border-b border-slate-800/80 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
                <span className="text-[10px] text-slate-500 font-mono shrink-0">Quick Math:</span>
                {QUICK_MATH_FORMULAS.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => handleInsertFormula(f)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[10px] font-mono shrink-0 border border-slate-700 transition-colors cursor-pointer"
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Chat Messages List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
                {classroomMessages.map(msg => {
                  const isCurrentSender = msg.senderRole === (isTutor ? 'tutor' : 'student');
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col space-y-1 ${
                        isCurrentSender ? 'ml-auto items-end max-w-[85%]' : 'mr-auto items-start max-w-[85%]'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="font-bold text-slate-200">{msg.senderName}</span>
                        <span className="text-slate-500">· {msg.timestamp}</span>
                      </div>
                      <div
                        className={`p-2.5 rounded-2xl leading-relaxed text-xs break-words shadow-sm ${
                          isCurrentSender
                            ? 'bg-emerald-950/80 text-emerald-100 border border-emerald-700/60 rounded-tr-sm'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendChatMessage} className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type equation or question..."
                  className="flex-1 bg-slate-950 text-xs text-white px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            /* Curriculum Formulas & Study Tips Drawer */
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  WAEC & JAMB High-Yield Formulas
                </span>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block">Quadratic Formula:</span>
                    <span>x = (-b ± √(b² - 4ac)) / 2a</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-sky-400 font-bold block">Kinematics (Motion):</span>
                    <span>v = u + at</span>
                    <span className="block">s = ut + ½at²</span>
                    <span className="block">v² = u² + 2as</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400 font-bold block">Electric Current & Ohm's Law:</span>
                    <span>V = IR · P = IV = I²R</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-violet-400 font-bold block">Chemistry Mole Concept:</span>
                    <span>Moles = Mass (g) / Molar Mass (g/mol)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Child Safety & Integrity Rule
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sessions are protected under Nigeria's Child Online Safety Guidelines. All whiteboard snapshots and chats are securely logged for quality assurance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Session Completion & Escrow Release Confirmation Modal */}
      {isConfirmCompletionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Confirm Lesson Completion</h3>
                  <span className="text-[10px] text-slate-400">Automated Escrow Disbursement</span>
                </div>
              </div>
              <button
                onClick={() => setIsConfirmCompletionModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Educator:</span>
                <span className="font-bold text-white">{activeClassroomSession.tutorName}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Topic:</span>
                <span className="font-bold text-emerald-400">{activeClassroomSession.topic}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Escrow Amount to Release:</span>
                <span className="font-mono font-black text-amber-400 text-sm">
                  <NairaText amount={activeClassroomSession.amountNaira} />
                </span>
              </div>
            </div>

            {/* Star Rating Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Rate Educator Delivery (1 - 5 Stars):
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSessionRating(star)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= sessionRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-400 ml-2">
                  {sessionRating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Student Feedback Note */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Lesson Feedback / What did you learn?
              </label>
              <textarea
                value={studentFeedback}
                onChange={e => setStudentFeedback(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setIsConfirmCompletionModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Continue Lesson
              </button>
              <button
                onClick={handleConfirmAndReleaseEscrow}
                disabled={isReleasingEscrow}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/60 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isReleasingEscrow ? (
                  <span>Releasing Escrow...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Release <NairaText amount={activeClassroomSession.amountNaira} /></span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
