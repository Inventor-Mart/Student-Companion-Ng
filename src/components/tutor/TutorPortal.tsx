import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Wallet,
  ShieldCheck,
  MessageSquare,
  Send,
  Building,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

import { TutorSecurityVerificationModal } from '../auth/VerificationModals';
import { NairaText, NairaSign, formatNaira } from '../../utils/currency';

export const TutorPortal: React.FC = () => {
  const {
    tutorBookings,
    activeTutorChatId,
    setActiveTutorChatId,
    chatMessages,
    sendChatMessage,
    currentUserProfile,
    tutorVerification
  } = useApp();

  const tutorName = currentUserProfile?.fullName || 'Registered Educator';
  const tutorData = currentUserProfile?.tutorData;
  const tutorSpecialization = tutorData?.subjectSpecialization || 'Secondary School Educator';
  const tutorQualification = tutorData?.qualification || 'Verified Educator';
  const tutorHourlyRate = tutorData?.hourlyRate || 3500;
  const tutorId = currentUserProfile?.id || 'tutor-current-user';
  const isVerified = Boolean(tutorVerification?.isVerified || tutorData?.verification?.isVerified);

  const [chatInput, setChatInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sessions' | 'earnings' | 'chat'>('sessions');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [payoutStatusMessage, setPayoutStatusMessage] = useState<string>('');

  // Filter bookings strictly for this registered tutor
  const myBookings = tutorBookings.filter(b => b.tutorId === tutorId);
  const currentChatId = activeTutorChatId || tutorId;
  const currentMessages = chatMessages[currentChatId] || [];

  // Calculate real earnings from real bookings
  const availablePayout = myBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const heldInEscrow = myBookings
    .filter(b => b.status === 'confirmed' || b.status === 'pending_parent')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendChatMessage(currentChatId, chatInput.trim(), 'tutor');
    setChatInput('');
  };

  const handleRequestPayout = () => {
    if (!tutorVerification) {
      setIsVerificationModalOpen(true);
      return;
    }
    if (availablePayout <= 0) {
      setPayoutStatusMessage('No completed sessions available for payout yet.');
      setTimeout(() => setPayoutStatusMessage(''), 3000);
      return;
    }
    setPayoutStatusMessage(
      `Payout of ${formatNaira(availablePayout)} initiated to ${tutorVerification.bankName} (${tutorVerification.accountNumber}). Processing within 15 minutes.`
    );
    setTimeout(() => setPayoutStatusMessage(''), 5000);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Tutor Profile Header */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {currentUserProfile?.avatarUrl ? (
              <img
                src={currentUserProfile.avatarUrl}
                alt={tutorName}
                className="w-12 h-12 rounded-2xl object-cover bg-slate-800 ring-2 ring-emerald-500/50"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 flex items-center justify-center text-white font-black text-sm ring-2 ring-emerald-500/50 shadow-inner">
                {tutorName
                  .trim()
                  .split(/\s+/)
                  .map(n => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'ED'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white leading-tight">{tutorName}</h2>
                {isVerified ? (
                  <span className="text-emerald-400 bg-emerald-950 p-0.5 rounded border border-emerald-800" title="NIN Verified Educator">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <button
                    onClick={() => setIsVerificationModalOpen(true)}
                    className="text-[10px] text-amber-400 bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-800 font-semibold cursor-pointer"
                  >
                    Verify NIN
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{tutorSpecialization}</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {tutorQualification} · Registered Educator
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Hourly Rate</span>
            <span className="text-xs font-bold text-emerald-400">
              <NairaText amount={tutorHourlyRate} />
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'sessions', label: 'My Sessions', icon: Calendar },
            { id: 'earnings', label: 'Earnings & Payout', icon: Wallet },
            { id: 'chat', label: 'Masked Chat', icon: MessageSquare }
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
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Student Booking Requests
            </h3>
            <span className="text-[11px] text-slate-500">{myBookings.length} Active</span>
          </div>

          {myBookings.length === 0 ? (
            <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-2">
              <Calendar className="w-9 h-9 text-slate-600 mx-auto" />
              <span className="text-xs text-slate-300 font-semibold block">No session requests yet</span>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                When students or parents in your area book online or physical home tutoring sessions with you, they will appear here.
              </p>
            </div>
          ) : (
            myBookings.map(b => (
              <div
                key={b.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{b.studentName}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : b.status === 'pending_parent'
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {b.status === 'confirmed'
                          ? 'Confirmed & Escrow Funded'
                          : b.status === 'pending_parent'
                          ? 'Awaiting Parent PIN Approval'
                          : 'Completed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{b.subject} · {b.topic}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">
                      <NairaText amount={b.amountNaira} />
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase">{b.bookingType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {b.date} ({b.timeSlot})
                  </span>
                  <button
                    onClick={() => {
                      setActiveTutorChatId(b.studentId);
                      setActiveTab('chat');
                    }}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Open Masked Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Earnings & Payout */}
      {activeTab === 'earnings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Available for Payout</span>
              <div className="text-xl font-bold text-emerald-400">
                <NairaText amount={availablePayout} />
              </div>
              <span className="text-[10px] text-slate-500 block">
                {availablePayout > 0 ? 'Ready to withdraw' : 'Completed sessions payout'}
              </span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Held in Escrow</span>
              <div className="text-xl font-bold text-amber-400">
                <NairaText amount={heldInEscrow} />
              </div>
              <span className="text-[10px] text-slate-500 block">
                {myBookings.filter(b => b.status === 'confirmed').length} active session(s)
              </span>
            </div>
          </div>

          {/* Nigerian Payout Bank Account */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Nigerian Payout Bank Account</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsVerificationModalOpen(true)}
                className="text-[10px] text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                {tutorVerification ? 'Edit Details' : 'Verify Details'}
              </button>
            </div>

            {tutorVerification ? (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>NIN Identity:</span>
                  <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {tutorVerification.nin.slice(0, 3)}****{tutorVerification.nin.slice(-2)} (NIMC Verified)
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Bank:</span>
                  <span className="font-bold text-white">{tutorVerification.bankName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Account Number:</span>
                  <span className="font-mono text-white">{tutorVerification.accountNumber}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Account Name:</span>
                  <span className="text-emerald-400 font-semibold">{tutorVerification.accountName}</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">
                  No verified Nigerian payout bank account connected yet.
                </p>
                <p className="text-[11px] text-slate-500">
                  Add your National Identification Number (NIN) and commercial bank account to receive automated session payouts.
                </p>
                <button
                  type="button"
                  onClick={() => setIsVerificationModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Verify NIN & Bank Details
                </button>
              </div>
            )}

            {payoutStatusMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs">
                {payoutStatusMessage}
              </div>
            )}

            {availablePayout > 0 && (
              <button
                onClick={handleRequestPayout}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>
                  Request Payout (<NairaText amount={availablePayout} />)
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Masked Chat */}
      {activeTab === 'chat' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[480px] overflow-hidden">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs">
                💬
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Direct Student Communication</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Masked Channel (Privacy Protected)
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y">
            {currentMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-600" />
                <span className="text-xs text-slate-300 font-semibold">No messages yet</span>
                <p className="text-[11px] text-slate-500 max-w-xs">
                  When a student or parent with an active booking messages you, their conversation will appear here.
                </p>
              </div>
            ) : (
              currentMessages.map(msg => {
                const isTutor = msg.sender === 'tutor';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isTutor ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs ${
                        isTutor
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Send masked message to student..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Progressive Tutor Security & Payout Verification Modal */}
      <TutorSecurityVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onSuccess={() => setIsVerificationModalOpen(false)}
      />
    </div>
  );
};
