import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RegistrablePersonaRole } from '../../types';
import {
  REGISTRABLE_PERSONA_ROLES,
  DEFAULT_REGISTRATION_PAUSE_MESSAGE
} from '../../services/otaService';
import {
  UserX,
  UserCheck,
  PauseCircle,
  PlayCircle,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface RegistrationGateCardProps {
  variant?: 'console' | 'studio';
}

export const RegistrationGateCard: React.FC<RegistrationGateCardProps> = ({
  variant = 'console'
}) => {
  const {
    registrationControls,
    areAllRegistrationsPaused,
    updateRegistrationControls
  } = useApp();

  const [draftMessage, setDraftMessage] = useState<string>(
    registrationControls.pauseMessage || DEFAULT_REGISTRATION_PAUSE_MESSAGE
  );
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    setDraftMessage(registrationControls.pauseMessage || DEFAULT_REGISTRATION_PAUSE_MESSAGE);
  }, [registrationControls.pauseMessage]);

  const pausedRolesCount = REGISTRABLE_PERSONA_ROLES.filter(
    (p) => registrationControls.pauseAll || Boolean(registrationControls.pausedRoles[p.role])
  ).length;
  const openRolesCount = REGISTRABLE_PERSONA_ROLES.length - pausedRolesCount;

  const statusSummary = areAllRegistrationsPaused
    ? `Paused · All ${REGISTRABLE_PERSONA_ROLES.length} personas paused`
    : pausedRolesCount === 0
    ? `Open · ${openRolesCount} of ${REGISTRABLE_PERSONA_ROLES.length} personas accepting sign-ups`
    : `Selective · ${openRolesCount} open · ${pausedRolesCount} paused`;

  const handleToggleMaster = async () => {
    if (busyKey) return;
    setBusyKey('master');
    setFeedback(null);
    const nextPauseAll = !areAllRegistrationsPaused;
    const res = await updateRegistrationControls({ setPauseAll: nextPauseAll });
    setBusyKey(null);
    if (res.success) {
      setFeedback({
        type: 'success',
        text: nextPauseAll
          ? 'All new registrations paused live across all devices. Existing members can still sign in.'
          : 'New registrations resumed live for all 5 personas.'
      });
    } else {
      setFeedback({
        type: 'error',
        text: res.error || 'Failed to update registration intake status.'
      });
    }
  };

  const handleTogglePersona = async (role: RegistrablePersonaRole, label: string) => {
    if (busyKey) return;
    setBusyKey(role);
    setFeedback(null);
    const wasPaused = registrationControls.pauseAll || Boolean(registrationControls.pausedRoles[role]);
    const res = await updateRegistrationControls({ toggleRole: role });
    setBusyKey(null);
    if (res.success) {
      setFeedback({
        type: 'success',
        text: wasPaused
          ? `${label} registrations reopened live.`
          : `${label} registrations paused live.`
      });
    } else {
      setFeedback({
        type: 'error',
        text: res.error || `Failed to update ${label} registration status.`
      });
    }
  };

  const handleSaveMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busyKey) return;
    setBusyKey('message');
    setFeedback(null);
    const res = await updateRegistrationControls({ pauseMessage: draftMessage });
    setBusyKey(null);
    if (res.success) {
      setFeedback({
        type: 'success',
        text: 'Custom registration pause notice saved live across all devices.'
      });
    } else {
      setFeedback({
        type: 'error',
        text: res.error || 'Failed to save custom pause notice.'
      });
    }
  };

  const hasUnsavedMessage =
    draftMessage.trim() !== (registrationControls.pauseMessage || '').trim();

  return (
    <section
      className={
        variant === 'console'
          ? 'bg-[#0F1B33] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4'
          : 'bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4'
      }
      aria-label="New User Registration Intake Controls"
    >
      {/* Header Row: Title + Clean Unboxed Metadata + Master Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            {areAllRegistrationsPaused ? (
              <UserX className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <UserCheck className="w-4 h-4 text-[#84E000] shrink-0" />
            )}
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Registration Intake Gate
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-medium tabular-nums">
            <span
              className={
                areAllRegistrationsPaused
                  ? 'text-rose-400 font-semibold'
                  : pausedRolesCount > 0
                  ? 'text-amber-400 font-semibold'
                  : 'text-[#84E000] font-semibold'
              }
            >
              {statusSummary}
            </span>
            <span className="mx-1.5 text-slate-600" aria-hidden="true">
              ·
            </span>
            <span>Existing members always keep Sign-In access</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => void handleToggleMaster()}
          disabled={Boolean(busyKey)}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60 border ${
            areAllRegistrationsPaused
              ? 'bg-[#84E000] hover:bg-[#75c900] border-[#84E000] text-slate-950'
              : 'bg-rose-950/70 hover:bg-rose-900/80 border-rose-700 text-rose-100'
          }`}
        >
          {busyKey === 'master' ? (
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
          ) : areAllRegistrationsPaused ? (
            <PlayCircle className="w-4 h-4 shrink-0" />
          ) : (
            <PauseCircle className="w-4 h-4 shrink-0" />
          )}
          <span>
            {busyKey === 'master'
              ? 'Syncing...'
              : areAllRegistrationsPaused
              ? 'Unpause All Registrations'
              : 'Pause All Registrations'}
          </span>
        </button>
      </div>

      {/* Per-Persona Switch Grid */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-300 block">
          Per-Persona Registration Access
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {REGISTRABLE_PERSONA_ROLES.map((persona) => {
            const isPaused =
              registrationControls.pauseAll ||
              Boolean(registrationControls.pausedRoles[persona.role]);
            const isSavingThis = busyKey === persona.role;

            return (
              <button
                key={persona.role}
                type="button"
                onClick={() => void handleTogglePersona(persona.role, persona.label)}
                disabled={Boolean(busyKey)}
                className={`min-h-[52px] px-3 py-2.5 rounded-xl border text-left transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-between gap-2 ${
                  isPaused
                    ? 'bg-rose-950/30 hover:bg-rose-950/50 border-rose-800/70 text-rose-100'
                    : 'bg-[#0A1322] hover:bg-slate-800/80 border-slate-800 text-slate-100'
                }`}
                title={
                  isPaused
                    ? `Click to unpause ${persona.label} registrations`
                    : `Click to pause ${persona.label} registrations`
                }
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold block truncate">{persona.shortLabel}</span>
                  <span
                    className={`text-[11px] font-semibold block ${
                      isPaused ? 'text-rose-400' : 'text-[#84E000]'
                    }`}
                  >
                    {isSavingThis ? 'Updating...' : isPaused ? 'Paused' : 'Open'}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 flex items-center ${
                    isPaused ? 'bg-rose-600/80 justify-start' : 'bg-[#84E000] justify-end'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950 block" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editable Custom Pause Notice */}
      <form onSubmit={(e) => void handleSaveMessage(e)} className="space-y-2 pt-1">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`reg-pause-msg-${variant}`}
            className="text-xs font-semibold text-slate-300"
          >
            Custom Visitor Pause Notice
          </label>
          <span className="text-[11px] font-mono tabular-nums text-slate-400">
            {draftMessage.length}/300
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id={`reg-pause-msg-${variant}`}
            type="text"
            maxLength={300}
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            placeholder={DEFAULT_REGISTRATION_PAUSE_MESSAGE}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#0A1322] border border-slate-700 focus:border-[#84E000] focus:outline-none text-xs text-white placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={Boolean(busyKey) || !hasUnsavedMessage}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {busyKey === 'message' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-[#84E000]" />
            )}
            <span>{busyKey === 'message' ? 'Saving...' : 'Save Notice'}</span>
          </button>
        </div>
      </form>

      {/* Inline Save Feedback */}
      {feedback && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-700/70 text-emerald-200'
              : 'bg-rose-950/60 border-rose-700/70 text-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}
    </section>
  );
};
