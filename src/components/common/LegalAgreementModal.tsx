import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  X,
  CheckCircle2,
  Scale,
  LogOut,
  AlertCircle,
  Lock
} from 'lucide-react';
import { UserRole } from '../../types';
import {
  ROLE_AGREEMENT_HIGHLIGHTS,
  TUTOR_NET_PAYOUT_PERCENT,
  TUTOR_PLATFORM_COMMISSION_PERCENT,
  USER_AGREEMENT_EFFECTIVE_DATE,
  USER_AGREEMENT_SECTIONS,
  USER_AGREEMENT_VERSION,
  formatConsentDate
} from '../../utils/platformLegalAndFees';

interface LegalAgreementModalProps {
  isOpen: boolean;
  mode: 'view' | 'sign_up_review' | 'mandatory_gate';
  role: UserRole;
  userName?: string;
  acceptedAt?: string;
  onClose?: () => void;
  onAccept?: () => void | Promise<void>;
  onSignOut?: () => void;
}

export const LegalAgreementModal: React.FC<LegalAgreementModalProps> = ({
  isOpen,
  mode,
  role,
  userName,
  acceptedAt,
  onClose,
  onAccept,
  onSignOut
}) => {
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const roleHighlight = ROLE_AGREEMENT_HIGHLIGHTS[role] || ROLE_AGREEMENT_HIGHLIGHTS.student;
  const isMandatory = mode === 'mandatory_gate';

  const handleConfirmAccept = async () => {
    if (isMandatory && !hasCheckedConsent) {
      setErrorMessage('Please tick the confirmation box to accept the User Agreement before continuing.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await onAccept?.();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to save your agreement right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#040914]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
      onClick={() => {
        if (!isMandatory && onClose) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-[#0B1526] border border-[#1E3354] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-agreement-title"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#08101E] border-b border-[#1A2C49] flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14233C] border border-[#243B61] flex items-center justify-center text-[#84E000] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="legal-agreement-title" className="text-base sm:text-lg font-black text-white tracking-tight">
                  Student Companion User Agreement
                </h2>
                <span className="text-[11px] font-mono tabular-nums font-bold text-[#84E000]">
                  {USER_AGREEMENT_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Effective {USER_AGREEMENT_EFFECTIVE_DATE} · Operated by WoW Tech · Governed by Nigerian Law
              </p>
            </div>
          </div>

          {!isMandatory && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] rounded-xl bg-[#14233C] hover:bg-[#1E3355] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close User Agreement"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable Legal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-5">
          {/* Mandatory Gate Context */}
          {isMandatory && (
            <div className="p-3.5 rounded-xl bg-amber-950/35 border border-amber-500/35 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-100/95 leading-relaxed">
                <strong className="text-white block mb-0.5">
                  Action Required{userName ? `, ${userName}` : ''}
                </strong>
                To protect students, parents, tutors, schools, and partners, all accounts must review and accept the{' '}
                <strong>Student Companion User Agreement ({USER_AGREEMENT_VERSION})</strong> before continuing.
              </div>
            </div>
          )}

          {/* Signed Audit Notice in View Mode */}
          {mode === 'view' && acceptedAt && (
            <div className="p-3 rounded-xl bg-emerald-950/35 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Signed and accepted on <strong className="text-white tabular-nums">{formatConsentDate(acceptedAt)}</strong>{' '}
                under version <strong className="text-white font-mono">{USER_AGREEMENT_VERSION}</strong>.
              </span>
            </div>
          )}

          {/* Persona-Specific Key Highlights */}
          <div className="p-4 rounded-xl bg-[#0F1D34] border border-[#203659] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#84E000] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{roleHighlight.title}</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
              {roleHighlight.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#84E000] font-bold mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {role === 'tutor' && (
              <div className="pt-2 border-t border-[#1E3354] flex items-center justify-between text-xs font-mono tabular-nums text-slate-300">
                <span>Platform Service Fee: <strong className="text-amber-300">{TUTOR_PLATFORM_COMMISSION_PERCENT}%</strong></span>
                <span>Your Net Payout: <strong className="text-[#84E000]">{TUTOR_NET_PAYOUT_PERCENT}%</strong></span>
              </div>
            )}
          </div>

          {/* Full 8 Sections */}
          <div className="space-y-5">
            {USER_AGREEMENT_SECTIONS.map((section) => (
              <section key={section.id} className="space-y-2 pb-4 border-b border-[#162640] last:border-b-0">
                <h3 className="text-sm font-black text-white flex items-baseline gap-2">
                  <span className="text-[#84E000] font-mono tabular-nums">{section.number}.</span>
                  <span>{section.title}</span>
                </h3>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-xs text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-1.5 pl-1 pt-1">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="text-slate-500 mt-0.5">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 bg-[#08101E] border-t border-[#1A2C49] space-y-3 shrink-0">
          {isMandatory && (
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasCheckedConsent}
                onChange={(e) => {
                  setHasCheckedConsent(e.target.checked);
                  if (e.target.checked) setErrorMessage(null);
                }}
                className="mt-0.5 w-4 h-4 rounded accent-[#84E000] cursor-pointer shrink-0"
              />
              <span className="text-xs text-slate-200 leading-relaxed">
                I have read and agree to the <strong>Student Companion User Agreement ({USER_AGREEMENT_VERSION})</strong>,
                including escrow terms, child safeguarding rules, anti-circumvention policy
                {role === 'tutor' ? ', and the 20% platform service fee on tutor bookings (80% net tutor payout)' : ''}.
              </span>
            </label>
          )}

          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            {mode === 'view' && (
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-[#091221] font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Close Document
              </button>
            )}

            {mode === 'sign_up_review' && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 rounded-xl bg-[#14233C] hover:bg-[#1E3355] text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => void handleConfirmAccept()}
                  className="min-h-[44px] px-5 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-[#091221] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Accept &amp; Return to Sign-Up</span>
                </button>
              </>
            )}

            {mode === 'mandatory_gate' && (
              <>
                {onSignOut && (
                  <button
                    type="button"
                    onClick={onSignOut}
                    disabled={isSubmitting}
                    className="min-h-[44px] px-4 rounded-xl bg-[#14233C] hover:bg-[#1E3355] border border-[#243B61] text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                )}
                <button
                  type="button"
                  disabled={!hasCheckedConsent || isSubmitting}
                  onClick={() => void handleConfirmAccept()}
                  className="flex-1 sm:flex-none min-h-[44px] px-6 rounded-xl bg-[#84E000] hover:bg-[#75c900] disabled:opacity-50 disabled:cursor-not-allowed text-[#091221] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving Agreement...' : 'Accept Agreement & Continue'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
