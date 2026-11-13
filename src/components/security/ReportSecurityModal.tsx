import React, { useState } from 'react';
import {
  ShieldAlert,
  X,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ReportSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
  defaultSuspect?: string;
  defaultContext?: string;
}

export const ReportSecurityModal: React.FC<ReportSecurityModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'fraud',
  defaultSuspect = '',
  defaultContext = 'Account Menu Security Report'
}) => {
  const { submitSecurityReport } = useApp();

  const [category, setCategory] = useState<
    'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly'
  >(defaultCategory);
  const [suspectIdentifier, setSuspectIdentifier] = useState(defaultSuspect);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories: {
    id: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
    label: string;
    hint: string;
  }[] = [
    {
      id: 'fraud',
      label: 'Fraud or Impersonation',
      hint: 'Fake tutor, scam payment request, or impersonated staff'
    },
    {
      id: 'spam',
      label: 'Spam or Phishing Links',
      hint: 'Repeated unsolicited messages, betting links, or scam URLs'
    },
    {
      id: 'hacking',
      label: 'Hacking or Account Takeover',
      hint: 'Unauthorized login attempt, PIN guessing, or data tampering'
    },
    {
      id: 'payment_anomaly',
      label: 'Wallet or Payment Issue',
      hint: 'Suspicious wallet debit, duplicate charge, or payout manipulation'
    },
    {
      id: 'abuse',
      label: 'Harassment or Child Safety',
      hint: 'Bullying, contact-number harvesting, or inappropriate conduct'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (description.trim().length < 10) {
      setErrorMsg('Please describe what happened in at least 10 characters so our security team can act.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitSecurityReport({
      category,
      suspectIdentifier: suspectIdentifier.trim() || undefined,
      description: description.trim(),
      evidenceContext: defaultContext
    });
    setIsSubmitting(false);

    if (result.success && result.reportId) {
      setSubmittedReportId(result.reportId);
    } else {
      setErrorMsg(result.error || 'Unable to send security report. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setSubmittedReportId(null);
    setDescription('');
    setSuspectIdentifier('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0B1526] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-700/60 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Report Fraud, Spam or Security Threat
              </h3>
              <p className="text-[11px] text-slate-400">
                Dispatched directly to the Super Admin Security &amp; Trust Center
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer shrink-0"
            aria-label="Close Security Report Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedReportId ? (
          <div className="py-4 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-white">Security Report Logged</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our Trust &amp; Safety administrators have received your alert and can freeze affected wallets or block offending accounts immediately.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs flex items-center justify-between">
              <span className="text-slate-400">Tracking Reference</span>
              <span className="font-mono font-bold text-[#84E000] tabular-nums">{submittedReportId}</span>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full min-h-[44px] rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-black text-xs cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Threat Category
              </label>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                      category === cat.id
                        ? 'bg-rose-950/40 border-rose-500/70 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{cat.label}</div>
                    <div className="text-[11px] text-slate-400">{cat.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Suspect Email, Name, or Reference (Optional)
              </label>
              <input
                type="text"
                value={suspectIdentifier}
                onChange={e => setSuspectIdentifier(e.target.value)}
                placeholder="e.g. suspect@email.com, @username, or PSTK_ref..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-[#84E000] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Incident Details
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what happened, any suspicious links, or unauthorized access you noticed..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-[#84E000] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 gap-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                Confidential Review
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-3.5 min-h-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 min-h-[40px] rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Report'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
