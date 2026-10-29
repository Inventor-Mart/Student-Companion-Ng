import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VETTED_NIGERIAN_TUTORS } from '../../data/tutorsData';
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
  ArrowUpRight
} from 'lucide-react';

export const TutorPortal: React.FC = () => {
  const {
    tutorBookings,
    activeTutorChatId,
    setActiveTutorChatId,
    chatMessages,
    sendChatMessage,
    student
  } = useApp();

  const currentTutor = VETTED_NIGERIAN_TUTORS[0]; // Engr. Adewale Bakare
  const [chatInput, setChatInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sessions' | 'earnings' | 'chat'>('sessions');

  const myBookings = tutorBookings.filter(b => b.tutorId === currentTutor.id);
  const currentChatId = activeTutorChatId || currentTutor.id;
  const currentMessages = chatMessages[currentChatId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendChatMessage(currentChatId, chatInput.trim(), 'tutor');
    setChatInput('');
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Tutor Profile Header */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={currentTutor.avatarUrl}
              alt={currentTutor.name}
              className="w-12 h-12 rounded-2xl object-cover bg-slate-800 ring-2 ring-emerald-500/50"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white leading-tight">{currentTutor.name}</h2>
                <span className="text-emerald-400 bg-emerald-950 p-0.5 rounded border border-emerald-800" title="NIN Verified">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentTutor.tagline}</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {currentTutor.education} · {currentTutor.location}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Hourly Rate</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              ₦{currentTutor.hourlyRateNaira.toLocaleString()}
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
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
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
            <div className="bg-slate-900/60 rounded-2xl p-6 text-center border border-slate-800">
              <Calendar className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <span className="text-xs text-slate-300 font-semibold block">No sessions booked yet</span>
              <p className="text-[11px] text-slate-500 mt-1">
                New student requests from Lagos and Abuja will appear here.
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
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {b.status === 'confirmed'
                          ? 'Escrow Funded ✓'
                          : b.status === 'pending_parent'
                          ? 'Awaiting Parent PIN'
                          : b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {b.subject}: {b.topic}
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ₦{b.amountNaira.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.date} ({b.timeSlot})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Format: {b.bookingType === 'physical' ? 'Physical Home Tutoring' : 'Online Classroom'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Student (Masked)</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Earnings */}
      {activeTab === 'earnings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Available for Payout</span>
              <div className="text-xl font-bold font-mono text-emerald-400">₦42,500</div>
              <span className="text-[10px] text-slate-500 block">Ready to withdraw</span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Held in Escrow</span>
              <div className="text-xl font-bold font-mono text-amber-400">₦9,000</div>
              <span className="text-[10px] text-slate-500 block">1 active session</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>Nigerian Payout Bank Account</span>
            </h4>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Bank:</span>
                <span className="font-bold text-white">Guaranty Trust Bank (GTBank)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Account Number:</span>
                <span className="font-mono text-white">012****892</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Account Name:</span>
                <span className="text-emerald-400 font-semibold">Adewale S. Bakare</span>
              </div>
            </div>

            <button
              onClick={() => alert('Payout of ₦42,500 initiated to your GTBank account. Expected settlement within 15 minutes.')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Request Payout (₦42,500)</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Masked Chat */}
      {activeTab === 'chat' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[480px] overflow-hidden">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={student.uniformPhotoUrl || "https://api.dicebear.com/7.x/micah/svg?seed=Tunde&backgroundColor=1e293b"}
                alt="Student"
                className="w-8 h-8 rounded-full object-cover bg-slate-800 ring-1 ring-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{student.name}</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Masked Channel (Privacy Protected)
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y">
            {currentMessages.map(msg => {
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
            })}
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
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
