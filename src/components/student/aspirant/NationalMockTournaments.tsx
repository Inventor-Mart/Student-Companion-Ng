import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  fetchCurrentWeeklyTournament,
  registerForWeeklyTournament,
  type CurrentWeeklyTournamentPayload,
} from '../../../services/aspirantMockService';
import { fetchLivePaystackConfig, prewarmLivePaystackConfig } from '../../../utils/paystackConfig';
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Zap,
  Wallet,
  CreditCard,
  CheckCircle2,
  Loader2,
  X,
  AlertCircle,
  BookOpen,
  Award,
  RefreshCw,
} from 'lucide-react';

const NIGERIAN_STATES = [
  'ALL',
  'Lagos',
  'Abuja FCT',
  'Rivers',
  'Oyo',
  'Enugu',
  'Anambra',
  'Kano',
  'Kaduna',
  'Ogun',
  'Delta',
  'Edo',
  'Osun',
  'Akwa Ibom',
  'Abia',
];

function formatCountdown(targetIso: string): string {
  const diffMs = new Date(targetIso).getTime() - Date.now();
  if (!Number.isFinite(diffMs) || diffMs <= 0) return 'Live Now';
  const totalMins = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMins / (60 * 24));
  const hours = Math.floor((totalMins % (60 * 24)) / 60);
  const mins = totalMins % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  return `${hours}h ${mins}m`;
}

function formatWatRange(startsAt: string, endsAt: string): string {
  try {
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    const fmtDate = new Intl.DateTimeFormat('en-NG', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Africa/Lagos',
    });
    return `${fmtDate.format(start)} 09:00 WAT – ${fmtDate.format(end)} 23:59 WAT`;
  } catch {
    return 'Sat 09:00 WAT – Sun 23:59 WAT';
  }
}

export const NationalMockTournaments: React.FC = () => {
  const {
    student,
    currentUser,
    isSuperAdmin,
    parentWallet,
    setActiveStudentTab,
    setPendingTournamentExam,
  } = useApp();

  const [payload, setPayload] = useState<CurrentWeeklyTournamentPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');

  // ₦500 Checkout modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [selectedCandidateState, setSelectedCandidateState] = useState<string>('Lagos');
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentStatusMsg, setPaymentStatusMsg] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [countdownText, setCountdownText] = useState<string>('');

  const loadTournament = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchCurrentWeeklyTournament(student.id);
      setPayload(data);
    } catch (err: any) {
      setLoadError(err?.message || 'Unable to load the weekly National Mock Tournament.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTournament();
  }, [student.id]);

  useEffect(() => {
    if (!payload?.tournament) return;
    const updateTick = () => {
      const target =
        payload.tournament.status === 'live'
          ? payload.tournament.endsAt
          : payload.tournament.startsAt;
      setCountdownText(formatCountdown(target));
    };
    updateTick();
    const interval = setInterval(updateTick, 30000);
    return () => clearInterval(interval);
  }, [payload?.tournament]);

  const tournament = payload?.tournament;
  const registration = payload?.registration;
  const archivedTournaments = payload?.archivedTournaments || [];
  const entryFee = tournament?.entryFeeNaira ?? 500;
  const isRegistered = Boolean(registration);
  const canStartExam = isRegistered || isSuperAdmin;

  const filteredLeaderboard = useMemo(() => {
    const list = tournament?.leaderboard || [];
    if (selectedStateFilter === 'ALL') return list;
    return list.filter(
      (item) => (item.state || '').toLowerCase() === selectedStateFilter.toLowerCase()
    );
  }, [tournament?.leaderboard, selectedStateFilter]);

  const handleOpenCheckout = () => {
    setPaymentError(null);
    setPaymentStatusMsg(null);
    prewarmLivePaystackConfig();
    setShowCheckoutModal(true);
  };

  const handlePayWithWallet = async () => {
    if (!tournament) return;
    setPaymentProcessing(true);
    setPaymentError(null);
    setPaymentStatusMsg('Verifying ₦500 Wallet entry...');
    try {
      const res = await registerForWeeklyTournament({
        tournamentId: tournament.id,
        userId: student.id,
        userName: student.name || 'Aspirant',
        userEmail: currentUser?.email || undefined,
        state: selectedCandidateState,
        paymentMethod: 'wallet',
      });
      setPayload((prev) =>
        prev
          ? {
              ...prev,
              tournament: res.tournament,
              registration: res.registration,
            }
          : prev
      );
      setShowCheckoutModal(false);
    } catch (err: any) {
      setPaymentError(err?.message || 'Wallet payment could not be completed.');
    } finally {
      setPaymentProcessing(false);
      setPaymentStatusMsg(null);
    }
  };

  const handlePayWithPaystack = async () => {
    if (!tournament) return;
    setPaymentProcessing(true);
    setPaymentError(null);
    setPaymentStatusMsg('Connecting to live Paystack gateway...');

    try {
      const cfg = await fetchLivePaystackConfig({
        onStatus: (msg) => setPaymentStatusMsg(msg),
      });

      if (!cfg.liveConfigured || !cfg.publicKey) {
        setPaymentError(
          cfg.errorMessage ||
            'Live Paystack checkout is currently unavailable. Please use Wallet payment.'
        );
        setPaymentProcessing(false);
        setPaymentStatusMsg(null);
        return;
      }

      const paystackPop = (window as any).PaystackPop;
      if (!paystackPop || typeof paystackPop.setup !== 'function') {
        setPaymentError('Paystack checkout script is still loading. Please retry in a second.');
        setPaymentProcessing(false);
        setPaymentStatusMsg(null);
        return;
      }

      const reference = `NMT_${tournament.weekKey}_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      const payerEmail = currentUser?.email || `${student.id}@studentcompanion.ng`;

      const handler = paystackPop.setup({
        key: cfg.publicKey,
        email: payerEmail,
        amount: entryFee * 100, // ₦500 = 50000 kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: 'Tournament', variable_name: 'tournament_id', value: tournament.id },
            { display_name: 'Aspirant', variable_name: 'student_name', value: student.name || 'Aspirant' },
          ],
        },
        callback: (response: { reference?: string }) => {
          const verifiedRef = response?.reference || reference;
          setPaymentStatusMsg('Verifying ₦500 Paystack receipt...');
          registerForWeeklyTournament({
            tournamentId: tournament.id,
            userId: student.id,
            userName: student.name || 'Aspirant',
            userEmail: currentUser?.email || undefined,
            state: selectedCandidateState,
            paymentMethod: 'paystack',
            paystackReference: verifiedRef,
          })
            .then((res) => {
              setPayload((prev) =>
                prev
                  ? {
                      ...prev,
                      tournament: res.tournament,
                      registration: res.registration,
                    }
                  : prev
              );
              setShowCheckoutModal(false);
            })
            .catch((err: any) => {
              setPaymentError(err?.message || 'Could not finalize tournament registration.');
            })
            .finally(() => {
              setPaymentProcessing(false);
              setPaymentStatusMsg(null);
            });
        },
        onClose: () => {
          setPaymentProcessing(false);
          setPaymentStatusMsg(null);
        },
      });

      handler.openIframe();
    } catch (err: any) {
      setPaymentError(err?.message || 'Unable to open Paystack checkout.');
      setPaymentProcessing(false);
      setPaymentStatusMsg(null);
    }
  };

  const handleStartOfficialExam = () => {
    if (!tournament) return;
    setPendingTournamentExam({
      tournamentId: tournament.id,
      examPaperId: tournament.examPaperId,
      title: tournament.title,
      weekKey: tournament.weekKey,
    });
    setActiveStudentTab('aspirant-cbt');
  };

  if (loading && !tournament) {
    return (
      <div className="flex-1 min-h-0 h-full w-full flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
        <Loader2 className="w-7 h-7 animate-spin text-amber-400" />
        <span>Loading this week’s National Mock Tournament...</span>
      </div>
    );
  }

  if (loadError || !tournament) {
    return (
      <div className="flex-1 min-h-0 h-full w-full p-6 flex flex-col items-center justify-center text-center space-y-3 text-slate-200">
        <AlertCircle className="w-8 h-8 text-rose-400" />
        <p className="text-sm font-bold">{loadError || 'Unable to load tournament data.'}</p>
        <button
          type="button"
          onClick={() => void loadTournament()}
          className="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-5 touch-pan-y text-slate-100">
      {/* 1. Weekly Auto-Scheduled Tournament Hero */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/65 to-slate-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>Auto-Scheduled Weekly Championship · {tournament.weekKey}</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
              tournament.status === 'live'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {tournament.status === 'live'
              ? `LIVE NOW · Closes in ${countdownText}`
              : `NEXT WEEKEND · Starts in ${countdownText}`}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-2 leading-tight tracking-tight">
          {tournament.title}
        </h1>

        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
          {tournament.subtitle ||
            'Every weekend, Aspirants nationwide compete on a brand-new, unique tournament exam paper. Once each weekend closes, the paper is permanently archived to the Mock Exam Bank.'}
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 pt-1">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/35">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Weekly Prize Pool</span>
            <span className="text-sm font-black text-amber-300 leading-snug block mt-0.5">
              {tournament.prizePoolLabel}
            </span>
            {tournament.prizePoolSubtext && (
              <span className="text-[9px] text-slate-400 block mt-0.5 line-clamp-2">
                {tournament.prizePoolSubtext}
              </span>
            )}
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Entry Fee</span>
            <span className="text-lg font-black text-emerald-400 font-mono block mt-0.5">
              ₦{entryFee.toLocaleString()}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Wallet or Live Paystack</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Weekend Window</span>
            <span className="text-[11px] font-bold text-white block mt-0.5 leading-snug">
              {formatWatRange(tournament.startsAt, tournament.endsAt)}
            </span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">Auto-renews every week</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Registered Entrants</span>
            <span className="text-lg font-black text-sky-400 font-mono block mt-0.5">
              {tournament.participantCount.toLocaleString()}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Paper ID: {tournament.examPaperId}</span>
          </div>
        </div>

        {/* Action CTA */}
        {canStartExam ? (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
            <div className="flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-black text-emerald-300">
                  {isRegistered
                    ? `Entry Confirmed (${registration?.paymentMethod === 'paystack' ? 'Paystack' : 'Wallet'} · ₦${registration?.amountPaidNaira || entryFee})`
                    : 'Super Admin Tournament Preview Access'}
                </div>
                <p className="text-[11px] text-slate-300">
                  {registration?.hasSubmitted
                    ? `Last submitted official score: ${registration.submittedScore}/400`
                    : 'Your unique weekly tournament exam paper is ready. Submit to rank on the live national leaderboard.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartOfficialExam}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Start Official Weekly Mock CBT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/85 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black">
                <Trophy className="w-4 h-4" />
                <span>Register for This Weekend’s National Mock (₦{entryFee.toLocaleString()})</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {tournament.prizeNote ||
                  'Pay ₦500 once for this week’s unique championship exam paper and compete nationwide for top leaderboard honours and prizes.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 shrink-0 cursor-pointer active:scale-95 transition-all"
            >
              <span>Enter Tournament — ₦{entryFee.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Admin-Managed Prize Breakdown */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Weekly Prize Tiers</span>
          </h2>
          {tournament.prizeUpdatedBy && (
            <span className="text-[10px] text-emerald-400 font-semibold">
              Updated by Platform Admin
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {(tournament.prizes || []).map((p, idx) => (
            <div
              key={`${p.rankLabel}-${idx}`}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black shrink-0">
                #{idx + 1}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-200 block truncate">{p.rankLabel}</span>
                <span className="text-[11px] text-amber-400 font-semibold block leading-snug">
                  {p.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Live Official National Leaderboard */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">
                Live National Leaderboard ({tournament.weekKey})
              </h2>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Verified Scores
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ranked by highest UTME scaled score, with fastest completion time as tie-breaker
            </p>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">State:</span>
            {NIGERIAN_STATES.slice(0, 8).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStateFilter(st)}
                className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStateFilter === st
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredLeaderboard.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
            <Users className="w-7 h-7 text-slate-500 mx-auto" />
            <p className="text-xs font-bold text-slate-300">
              No scores submitted yet for {tournament.weekKey}
              {selectedStateFilter !== 'ALL' ? ` in ${selectedStateFilter}` : ''}.
            </p>
            <p className="text-[11px] text-slate-500">
              Be the first Aspirant on the board by registering for ₦{entryFee.toLocaleString()} and completing the official CBT mock!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLeaderboard.map((entry, idx) => {
              const rank = idx + 1;
              const isMe = entry.userId === student.id;
              return (
                <div
                  key={`${entry.userId}-${idx}`}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    isMe
                      ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                      : rank === 1
                      ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500/50'
                      : 'bg-slate-950/70 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                        rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rank}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white truncate">{entry.name}</span>
                        {isMe && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{entry.state}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-black text-base text-amber-400">
                      {entry.score}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ {entry.maxScore}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {Math.max(1, Math.round(entry.timeTakenSeconds / 60))} mins
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Past Weekly Tournaments Archived to Mock Bank */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Archived Weekly Tournament Papers</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Completed weekend tournament papers are permanently added to the Mock Simulator bank under their unique weekly ID.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveStudentTab('aspirant-cbt')}
            className="py-1.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold cursor-pointer shrink-0"
          >
            Open Mock Bank
          </button>
        </div>

        {archivedTournaments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {archivedTournaments.map((arch) => (
              <div
                key={arch.id}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">
                    {arch.weekKey} · ID: {arch.examPaperId}
                  </span>
                  <span className="font-bold text-white truncate block">{arch.title}</span>
                  <span className="text-[10px] text-slate-400">
                    {arch.participantCount} entrants · {arch.prizePoolLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStudentTab('aspirant-cbt')}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] cursor-pointer shrink-0"
                >
                  Practice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. ₦500 Weekly Tournament Registration Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl p-5 space-y-4 text-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Weekly Tournament Registration · {tournament.weekKey}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Enter for ₦{entryFee.toLocaleString()}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => !paymentProcessing && setShowCheckoutModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tournament:</span>
                <span className="font-bold text-white">{tournament.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Prize Pool:</span>
                <span className="font-bold text-amber-300">{tournament.prizePoolLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Entry Fee:</span>
                <span className="font-mono font-black text-emerald-400">₦{entryFee.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                Select Your Nigerian State (for Leaderboard):
              </label>
              <select
                value={selectedCandidateState}
                onChange={(e) => setSelectedCandidateState(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {NIGERIAN_STATES.filter((s) => s !== 'ALL').map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {paymentStatusMsg && (
              <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/40 text-xs text-sky-200 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>{paymentStatusMsg}</span>
              </div>
            )}

            {paymentError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{paymentError}</span>
              </div>
            )}

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                disabled={paymentProcessing}
                onClick={() => void handlePayWithWallet()}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <span className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <span>Pay ₦{entryFee.toLocaleString()} with Wallet</span>
                </span>
                <span className="font-mono text-[11px] bg-slate-950/20 px-2 py-0.5 rounded-lg">
                  Bal: ₦{(parentWallet?.balanceNaira ?? 0).toLocaleString()}
                </span>
              </button>

              <button
                type="button"
                disabled={paymentProcessing}
                onClick={() => void handlePayWithPaystack()}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay ₦{entryFee.toLocaleString()} via Live Paystack (Card / Transfer)</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Server-verified payment · Instant access to official CBT tournament room
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
