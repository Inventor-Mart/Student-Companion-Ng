import React, { useState, useEffect } from 'react';
import {
  fetchCurrentWeeklyTournament,
  updateWeeklyTournamentPrizesAdmin,
  archiveWeeklyTournamentPaperAdmin,
} from '../../services/aspirantMockService';
import type { WeeklyNationalTournament } from '../../types';
import {
  Trophy,
  Plus,
  Trash2,
  Save,
  Archive,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export const WeeklyTournamentPrizeManager: React.FC = () => {
  const [tournament, setTournament] = useState<WeeklyNationalTournament | null>(null);
  const [archivedCount, setArchivedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [archiving, setArchiving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Editable form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [prizePoolLabel, setPrizePoolLabel] = useState('');
  const [prizePoolSubtext, setPrizePoolSubtext] = useState('');
  const [prizeNote, setPrizeNote] = useState('');
  const [prizes, setPrizes] = useState<Array<{ rankLabel: string; reward: string }>>([]);

  const loadCurrent = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const payload = await fetchCurrentWeeklyTournament();
      const t = payload.tournament;
      setTournament(t);
      setArchivedCount(payload.archivedTournaments.length);
      setTitle(t.title || '');
      setSubtitle(t.subtitle || '');
      setPrizePoolLabel(t.prizePoolLabel || '');
      setPrizePoolSubtext(t.prizePoolSubtext || '');
      setPrizeNote(t.prizeNote || '');
      setPrizes(
        Array.isArray(t.prizes) && t.prizes.length > 0
          ? t.prizes.map((p) => ({ rankLabel: p.rankLabel, reward: p.reward }))
          : [
              { rankLabel: '1st Place National Champion', reward: '₦50,000 Cash + 10GB Data' },
              { rankLabel: '2nd Place Runner-Up', reward: '₦25,000 Cash + 5GB Data' },
              { rankLabel: '3rd Place Medalist', reward: '₦10,000 Cash + 3GB Data' },
            ]
      );
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Failed to load weekly tournament.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCurrent();
  }, []);

  const handlePrizeRowChange = (idx: number, field: 'rankLabel' | 'reward', value: string) => {
    setPrizes((prev) => prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));
  };

  const handleAddPrizeRow = () => {
    if (prizes.length >= 10) return;
    setPrizes((prev) => [...prev, { rankLabel: `${prev.length + 1}th Place`, reward: '' }]);
  };

  const handleRemovePrizeRow = (idx: number) => {
    setPrizes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSavePrizes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournament) return;
    setSaving(true);
    setFeedback(null);
    try {
      const cleanedPrizes = prizes
        .map((p) => ({ rankLabel: p.rankLabel.trim(), reward: p.reward.trim() }))
        .filter((p) => p.rankLabel && p.reward);

      const updated = await updateWeeklyTournamentPrizesAdmin({
        tournamentId: tournament.id,
        title: title.trim(),
        subtitle: subtitle.trim(),
        prizePoolLabel: prizePoolLabel.trim(),
        prizePoolSubtext: prizePoolSubtext.trim(),
        prizeNote: prizeNote.trim(),
        prizes: cleanedPrizes,
      });
      setTournament(updated);
      setFeedback({
        type: 'success',
        message: `Live prizes updated for ${updated.weekKey}! All Aspirants immediately see the new rewards.`,
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Could not update tournament prizes.' });
    } finally {
      setSaving(false);
    }
  };

  const handleArchivePaperNow = async () => {
    if (!tournament) return;
    setArchiving(true);
    setFeedback(null);
    try {
      const res = await archiveWeeklyTournamentPaperAdmin(tournament.id);
      setTournament(res.tournament);
      setFeedback({
        type: 'success',
        message: `Paper "${res.archivedPaper.id}" permanently archived to the Aspirant Mock Bank (6 Starters + Weekly Tournament Archive).`,
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Could not archive paper.' });
    } finally {
      setArchiving(false);
    }
  };

  return (
    <div className="bg-[#0B1526] border border-amber-500/35 rounded-3xl p-5 space-y-4 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            <span>Weekly National Mock Tournament · Prize Control (₦500 Entry)</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatically scheduled every weekend. Replace the weekly prize pool &amp; rank rewards below at any time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadCurrent()}
          disabled={loading}
          className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading && !tournament ? (
        <div className="py-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          <span>Loading active weekly tournament...</span>
        </div>
      ) : tournament ? (
        <form onSubmit={handleSavePrizes} className="space-y-4">
          {/* Quick Status Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold">
              Active Week: {tournament.weekKey}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono font-bold">
              Entry Fee: ₦{tournament.entryFeeNaira.toLocaleString()}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 font-mono font-bold">
              Paper ID: {tournament.examPaperId}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Entrants: <strong className="text-white">{tournament.participantCount}</strong> · Archived Prior Weeks:{' '}
              <strong className="text-white">{archivedCount}</strong>
            </span>
            {tournament.archivedToMockBank && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                Paper Archived to Mock Bank
              </span>
            )}
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Tournament Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={140}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Headline Prize Pool (Shown Prominently)</label>
              <input
                type="text"
                value={prizePoolLabel}
                onChange={(e) => setPrizePoolLabel(e.target.value)}
                placeholder="e.g. ₦150,000 Cash + Smartphones"
                maxLength={140}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-200 font-bold focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Subtitle / Theme</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                maxLength={200}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Prize Pool Subtext</label>
              <input
                type="text"
                value={prizePoolSubtext}
                onChange={(e) => setPrizePoolSubtext(e.target.value)}
                placeholder="e.g. Instant bank transfer & data disbursement every Monday"
                maxLength={260}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-300 mb-1">Prize &amp; Eligibility Note</label>
            <textarea
              rows={2}
              value={prizeNote}
              onChange={(e) => setPrizeNote(e.target.value)}
              maxLength={320}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Rank Prize Rows */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Rank Prize Breakdown ({prizes.length}/10)</span>
              <button
                type="button"
                onClick={handleAddPrizeRow}
                disabled={prizes.length >= 10}
                className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-[11px] font-bold text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Prize Tier
              </button>
            </div>

            <div className="space-y-2">
              {prizes.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <input
                    type="text"
                    value={row.rankLabel}
                    onChange={(e) => handlePrizeRowChange(idx, 'rankLabel', e.target.value)}
                    placeholder="Rank Label (e.g. 1st Place)"
                    maxLength={80}
                    className="sm:w-56 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={row.reward}
                    onChange={(e) => handlePrizeRowChange(idx, 'reward', e.target.value)}
                    placeholder="Prize to be won (e.g. ₦50,000 Cash + 10GB Data)"
                    maxLength={140}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-200 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePrizeRow(idx)}
                    disabled={prizes.length <= 1}
                    className="p-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 disabled:opacity-30 border border-rose-800/60 text-rose-300 cursor-pointer self-end sm:self-auto"
                    title="Remove row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={archiving || tournament.archivedToMockBank}
              onClick={() => void handleArchivePaperNow()}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {archiving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5 text-sky-400" />}
              <span>
                {tournament.archivedToMockBank
                  ? 'Already Archived to Mock Bank'
                  : 'Archive This Week’s Paper to Mock Bank'}
              </span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save &amp; Publish New Weekly Prizes</span>
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};
