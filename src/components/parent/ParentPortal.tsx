import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Wallet,
  PlusCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Flame,
  Award,
  BookOpen,
  CreditCard,
  X,
  MessageSquare,
  LayoutDashboard,
  Trophy,
  Smartphone
} from 'lucide-react';
import { NairaText, NairaSign } from '../../utils/currency';
import { ParentCommunityForum } from './ParentCommunityForum';

export const ParentPortal: React.FC = () => {
  const {
    isParentPinUnlocked,
    unlockParentPin,
    lockParentPin,
    parentWallet,
    fundParentWallet,
    tutorBookings,
    approveTutorBooking,
    rejectTutorBooking,
    student,
    examResults,
    currentUserProfile,
    championshipRegistrations,
    approveChampionshipRegistration
  } = useApp();

  const parentName = currentUserProfile?.fullName || 'Registered Parent';
  const wardName = currentUserProfile?.parentData?.wardName || (student.name && student.name !== '' ? student.name : 'Registered Ward');

  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(10000);
  const [isProcessingPaystack, setIsProcessingPaystack] = useState<boolean>(false);
  const [parentTab, setParentTab] = useState<'overview' | 'community'>('overview');

  // If locked, render PIN Gate
  if (!isParentPinUnlocked) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 flex flex-col items-center justify-center touch-pan-y text-slate-100">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-5 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/80 border border-amber-600/60 mx-auto flex items-center justify-center text-amber-400 shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Parent Security PIN</h2>
            <p className="text-xs text-slate-400 mt-1">
              Protected access to Nigerian payment wallet, child analytics, and physical tutoring approvals.
            </p>
          </div>

          {/* PIN Input */}
          <div className="space-y-3">
            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={e => {
                setEnteredPin(e.target.value);
                setPinError('');
              }}
              placeholder="••••"
              className="w-36 mx-auto text-center tracking-[0.5em] text-2xl font-mono py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            />

            {pinError && (
              <span className="text-xs text-rose-400 block font-medium">
                {pinError}
              </span>
            )}

            <button
              onClick={() => {
                const ok = unlockParentPin(enteredPin);
                if (!ok) setPinError('Incorrect PIN. Please enter your registered 4-digit PIN');
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pending tutor approvals for physical sessions
  const pendingApprovals = tutorBookings.filter(b => b.status === 'pending_parent');

  const handlePaystackTopUp = () => {
    setIsProcessingPaystack(true);
    setTimeout(() => {
      fundParentWallet(topUpAmount);
      setIsProcessingPaystack(false);
      setIsTopUpModalOpen(false);
    }, 1200);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-white tracking-tight">Parent Portal</h2>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
              Verified Guardian
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Parent: <strong className="text-slate-200">{parentName}</strong> · Ward: <strong className="text-emerald-400">{wardName}</strong>
          </p>
        </div>

        <button
          onClick={lockParentPin}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          title="Lock Parent Session"
        >
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Lock</span>
        </button>
      </div>

      {/* Tab Switcher: Overview vs Community Lounge */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setParentTab('overview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            parentTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview & Escrow</span>
        </button>
        <button
          onClick={() => setParentTab('community')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            parentTab === 'community'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <div className="flex items-center gap-1.5">
            <span>Community Lounge</span>
            <span className="text-[9px] bg-indigo-900/80 text-indigo-300 font-bold px-1.5 py-0.2 rounded border border-indigo-700/50">
              Parents Only
            </span>
          </div>
        </button>
      </div>

      {parentTab === 'community' ? (
        <div className="flex-1 w-full flex flex-col min-h-[560px]">
          <ParentCommunityForum />
        </div>
      ) : (
        <>
          {/* Wallet Balance & Funding Card */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl p-4 border border-emerald-800/60 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <Wallet className="w-4 h-4" />
            <span>Parent Escrow Wallet (NGN)</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">Secured by Paystack</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 block">Available Balance</span>
          <div className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            <NairaText amount={parentWallet.balanceNaira} />
          </div>
        </div>

        <div className="pt-2 border-t border-emerald-900/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Funds automatically held in escrow until physical sessions are completed.
          </span>
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Fund Wallet</span>
          </button>
        </div>
      </div>

      {/* Termly Championship Registrations Queue */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/40 rounded-3xl p-4 border border-amber-600/50 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Termly Championship Registrations
                </h3>
                <span className="text-[10px] bg-amber-950 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-700">
                  <NairaText amount={10000} /> Fee
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Prizes: 1st Android Phone 📱 · 2nd Scholar Hoodie 🧥 · 3rd School Bag & Calculator 🎒
              </p>
            </div>
          </div>
        </div>

        {/* Check if any registration exists for ward */}
        {championshipRegistrations.filter(r => r.status === 'pending_parent').length > 0 ? (
          championshipRegistrations
            .filter(r => r.status === 'pending_parent')
            .map(reg => (
              <div
                key={reg.id}
                className="bg-slate-950 p-3.5 rounded-2xl border border-amber-500/40 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">{reg.studentName}</span>
                    <span className="text-[11px] text-slate-400">
                      {reg.studentSchool} · {reg.classLevel} (Official Class Curriculum)
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400 font-mono">
                    <NairaText amount={reg.registrationFeeNaira} />
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Parent Wallet Available Balance:</span>
                  <strong className="text-emerald-400 font-mono"><NairaText amount={parentWallet.balanceNaira} /></strong>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {parentWallet.balanceNaira < reg.registrationFeeNaira ? (
                    <button
                      onClick={() => {
                        setTopUpAmount(reg.registrationFeeNaira);
                        setIsTopUpModalOpen(true);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Fund <NairaText amount={reg.registrationFeeNaira} /> & Authorize</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => approveChampionshipRegistration(reg.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Authorize & Escrow <NairaText amount={reg.registrationFeeNaira} /></span>
                    </button>
                  )}
                </div>
              </div>
            ))
        ) : championshipRegistrations.some(r => r.status === 'paid' || r.status === 'completed') ? (
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-emerald-800/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-white font-medium block">
                  {wardName} is Registered for the 3-Day Championship!
                </span>
                <span className="text-[11px] text-slate-400">
                  ₦10,000 Entry fee confirmed · Ward can compete across Day 1, Day 2, and Day 3
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-800">
              Entry Active
            </span>
          </div>
        ) : (
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>No pending competition requests from {wardName} right now.</span>
            <span className="text-[10px] text-slate-500">Term 2 Championship</span>
          </div>
        )}
      </div>

      {/* Pending Tutoring Approvals Queue */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>Physical Tutoring Approvals</span>
            {pendingApprovals.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {pendingApprovals.length}
              </span>
            )}
          </h3>
          <span className="text-[11px] text-slate-500">Child Safety Protocol</span>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="bg-slate-900/60 rounded-2xl p-4 text-center border border-slate-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
            <span className="text-xs font-medium text-slate-300 block">All Tutor Requests Approved</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              No pending physical home visits awaiting your authorization.
            </p>
          </div>
        ) : (
          pendingApprovals.map(req => (
            <div
              key={req.id}
              className="bg-slate-900 rounded-2xl p-4 border border-amber-700/60 space-y-3 shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={req.tutorPhoto}
                    alt={req.tutorName}
                    className="w-10 h-10 rounded-xl object-cover bg-slate-800 ring-1 ring-amber-500/50"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">{req.tutorName}</h4>
                      <span className="text-emerald-400 bg-emerald-950 p-0.5 rounded border border-emerald-800 text-[10px] flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> NIN Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {req.subject} · {req.topic}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-400">
                  <NairaText amount={req.amountNaira} />
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Scheduled for: <strong>{req.date}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Type: Physical Home Tutoring at registered residence</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => rejectTutorBooking(req.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Decline
                </button>

                <button
                  onClick={() => approveTutorBooking(req.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorize & Escrow</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Child Performance & Study Analytics */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Tunde's Academic Progress
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{student.streakDays} Days</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Study Streak</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>{student.xp.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Total XP</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-indigo-400 text-xs font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{student.downloadedSubjectIds.length}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Offline Notes</span>
          </div>
        </div>

        {/* Recent Exam Scores */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-300 block">Recent CBT Performance:</span>
          {examResults.length === 0 ? (
            <p className="text-xs text-slate-500">No mock exams recorded yet this week.</p>
          ) : (
            examResults.slice(0, 3).map(res => (
              <div
                key={res.id}
                className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{res.subject}</span>
                  <span className="text-[10px] text-slate-400">{res.examTitle}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400">{res.percentage}%</span>
                  <span className="text-[10px] text-slate-500 block">{res.score}/{res.totalQuestions}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Recent Wallet Transactions
        </h3>

        <div className="space-y-2">
          {parentWallet.transactions.slice(0, 4).map(tx => (
            <div
              key={tx.id}
              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                    tx.type === 'credit'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {tx.type === 'credit' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="font-semibold text-white block text-xs">{tx.description}</span>
                  <span className="text-[10px] text-slate-500">{tx.timestamp} · {tx.reference}</span>
                </div>
              </div>

              <span
                className={`font-bold text-xs ${
                  tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'
                }`}
              >
                <NairaText
                  amount={tx.amountNaira}
                  prefix={tx.type === 'credit' ? '+' : '-'}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      </>
      )}

      {/* Paystack Funding Simulation Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">Paystack Checkout (Test Mode)</h3>
              </div>
              <button
                onClick={() => setIsTopUpModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Select Amount to Fund (NGN):
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[5000, 10000, 25000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      topUpAmount === amt
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <NairaText amount={amt} />
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="text-[11px] text-slate-400 block">Payment Method</span>
                <span className="font-semibold text-white block">Nigerian Debit Card (Mastercard / Verve)</span>
                <span className="text-[10px] text-slate-500">Zero transaction fee on student edtech wallet</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setIsTopUpModalOpen(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handlePaystackTopUp}
                disabled={isProcessingPaystack}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                {isProcessingPaystack ? (
                  'Connecting Paystack...'
                ) : (
                  <span>
                    Pay <NairaText amount={topUpAmount} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
