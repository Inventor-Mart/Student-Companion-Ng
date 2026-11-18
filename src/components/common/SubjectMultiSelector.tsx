import React, { useMemo, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import {
  NIGERIAN_CURRICULUM_SUBJECTS,
  dedupeSubjects,
  formatSubjectSpecialization,
  normalizeSubjectLabel
} from '../../utils/nigerianSubjects';

interface SubjectMultiSelectorProps {
  selectedSubjects: string[];
  onChange: (nextSubjects: string[]) => void;
  label?: string;
  helperText?: string;
  error?: string | null;
  accentColor?: 'sky' | 'lime' | 'emerald';
  compact?: boolean;
}

export const SubjectMultiSelector: React.FC<SubjectMultiSelectorProps> = ({
  selectedSubjects,
  onChange,
  label = 'Teaching Subjects',
  helperText = 'Select from Nigerian secondary subjects or add your own custom subjects below.',
  error,
  accentColor = 'sky',
  compact = false
}) => {
  const [customSubjectInput, setCustomSubjectInput] = useState('');

  const normalizedSelected = useMemo(
    () => dedupeSubjects(selectedSubjects),
    [selectedSubjects]
  );

  // Combine built-in curriculum subjects + any custom ones currently selected
  const allOptions = useMemo(() => {
    const base = [...NIGERIAN_CURRICULUM_SUBJECTS];
    const baseLower = new Set(base.map((s) => s.toLowerCase()));
    const extras = normalizedSelected.filter((s) => !baseLower.has(s.toLowerCase()));
    return [...base, ...extras];
  }, [normalizedSelected]);

  const activeStyles =
    accentColor === 'lime'
      ? 'bg-[#84CC16]/20 text-[#A3E635] border-[#84CC16]'
      : accentColor === 'emerald'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
      : 'bg-sky-500/20 text-sky-200 border-sky-400';

  const buttonAccent =
    accentColor === 'lime'
      ? 'bg-[#84CC16] hover:bg-[#A3E635] text-slate-950'
      : accentColor === 'emerald'
      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
      : 'bg-sky-500 hover:bg-sky-400 text-slate-950';

  const inputFocus =
    accentColor === 'lime'
      ? 'focus:border-[#84CC16]'
      : accentColor === 'emerald'
      ? 'focus:border-emerald-500'
      : 'focus:border-sky-400';

  const toggleSubject = (subject: string) => {
    const clean = normalizeSubjectLabel(subject);
    if (!clean) return;
    const exists = normalizedSelected.some(
      (s) => s.toLowerCase() === clean.toLowerCase()
    );
    if (exists) {
      onChange(
        normalizedSelected.filter((s) => s.toLowerCase() !== clean.toLowerCase())
      );
    } else {
      onChange([...normalizedSelected, clean]);
    }
  };

  const handleAddCustom = () => {
    const parts = customSubjectInput
      .split(/\s*,\s*/)
      .map((part) => normalizeSubjectLabel(part))
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = dedupeSubjects([...normalizedSelected, ...parts]);
    onChange(next);
    setCustomSubjectInput('');
  };

  const specializationPreview = formatSubjectSpecialization(normalizedSelected);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-semibold text-slate-200 block">
          {label} <span className="text-sky-400 font-bold">*</span>
        </label>
        <span className="text-[11px] font-mono tabular-nums text-slate-400">
          {normalizedSelected.length} selected
        </span>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-400 leading-relaxed">{helperText}</p>
      )}

      {/* Selected Summary Strip */}
      {normalizedSelected.length > 0 && (
        <div className="rounded-xl bg-[#070D18] border border-slate-800 px-3 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-400 font-medium">Specialization Display:</span>
            <span className="text-white font-bold text-right truncate max-w-[260px]">
              {specializationPreview}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {normalizedSelected.map((sub) => (
              <button
                key={`sel-${sub}`}
                type="button"
                onClick={() => toggleSubject(sub)}
                title={`Remove ${sub}`}
                className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white border border-slate-700 hover:border-rose-500/70 hover:text-rose-200 transition-colors cursor-pointer"
              >
                <span>{sub}</span>
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Full Subject Grid */}
      <div
        className={`grid ${
          compact ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'
        } gap-2 max-h-56 overflow-y-auto pr-1`}
      >
        {allOptions.map((sub) => {
          const isChecked = normalizedSelected.some(
            (s) => s.toLowerCase() === sub.toLowerCase()
          );
          return (
            <button
              key={sub}
              type="button"
              onClick={() => toggleSubject(sub)}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold text-left flex items-center justify-between gap-2 border transition-colors cursor-pointer ${
                isChecked
                  ? activeStyles
                  : 'bg-[#081220] text-slate-300 border-[#1E304F] hover:text-white hover:border-slate-600'
              }`}
            >
              <span className="truncate">{sub}</span>
              <span
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                  isChecked ? 'bg-current/20' : 'border border-slate-600'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Subject Entry */}
      <div className="flex items-stretch gap-2 pt-1">
        <input
          type="text"
          value={customSubjectInput}
          onChange={(e) => setCustomSubjectInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          placeholder="Add custom subject (e.g. Diction, Fine Arts, Coding)..."
          className={`flex-1 min-h-[44px] bg-[#081220] border border-[#1E304F] ${inputFocus} rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none`}
        />
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!customSubjectInput.trim()}
          className={`min-h-[44px] px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${buttonAccent}`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
