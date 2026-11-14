import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Sparkles,
  RotateCcw,
  Plus,
  ArrowLeft,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import {
  StemFormulaTemplate,
  StemSubject,
  STEM_FORMULA_TEMPLATES,
  STEM_SUBJECT_TABS,
  interpolateFormulaTemplate
} from '../../data/stemFormulaTemplates';
import { renderLatex } from '../../utils/mathRenderer';

interface InteractiveStemFormulaDrawerProps {
  onInsertLatex: (latex: string) => void;
  onStampFormula?: (latex: string) => void;
  onClose: () => void;
  insertButtonLabel?: string;
}

export const InteractiveStemFormulaDrawer: React.FC<InteractiveStemFormulaDrawerProps> = ({
  onInsertLatex,
  onStampFormula,
  onClose,
  insertButtonLabel = 'Insert into Note'
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | StemSubject>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<StemFormulaTemplate | null>(null);
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});
  const [activeSlotKey, setActiveSlotKey] = useState<string | null>(null);

  // Initialize slot values when a template is selected
  useEffect(() => {
    if (activeTemplate) {
      const initial: Record<string, string> = {};
      activeTemplate.slots.forEach(slot => {
        initial[slot.key] = slot.defaultVal;
      });
      setSlotValues(initial);
      setActiveSlotKey(activeTemplate.slots[0]?.key || null);
    } else {
      setSlotValues({});
      setActiveSlotKey(null);
    }
  }, [activeTemplate]);

  // Pre-render static catalog card previews once so filtering/searching never re-runs KaTeX
  const catalogPreviewHtmlMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const tpl of STEM_FORMULA_TEMPLATES) {
      map[tpl.id] = renderLatex(tpl.previewLatex, false);
    }
    return map;
  }, []);

  // Filter templates by subject and search query
  const filteredTemplates = useMemo(() => {
    return STEM_FORMULA_TEMPLATES.filter(tpl => {
      const matchesSubject = selectedSubject === 'all' || tpl.subject === selectedSubject;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.category.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.previewLatex.toLowerCase().includes(q);
      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, searchQuery]);

  // Current interpolated LaTeX string
  const currentInterpolatedLatex = useMemo(() => {
    if (!activeTemplate) return '';
    return interpolateFormulaTemplate(activeTemplate.templatePattern, slotValues);
  }, [activeTemplate, slotValues]);

  // Debounce KaTeX rendering in the slot editor (~120ms) so slot typing stays zero-lag
  const [debouncedLatex, setDebouncedLatex] = useState<string>('');
  useEffect(() => {
    if (!currentInterpolatedLatex) {
      setDebouncedLatex('');
      return;
    }
    const timer = window.setTimeout(() => {
      setDebouncedLatex(currentInterpolatedLatex);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [currentInterpolatedLatex]);

  const renderedSlotPreviewHtml = useMemo(() => {
    const target = debouncedLatex || currentInterpolatedLatex;
    return target ? renderLatex(target, true) : '';
  }, [debouncedLatex, currentInterpolatedLatex]);

  // Handle slot value change
  const handleSlotChange = (key: string, val: string) => {
    setSlotValues(prev => ({
      ...prev,
      [key]: val
    }));
  };

  // Reset to template default values
  const handleResetDefaults = () => {
    if (!activeTemplate) return;
    const defaults: Record<string, string> = {};
    activeTemplate.slots.forEach(slot => {
      defaults[slot.key] = slot.defaultVal;
    });
    setSlotValues(defaults);
  };

  // Insert formula into note text
  const handleInsert = () => {
    if (!currentInterpolatedLatex) return;
    onInsertLatex(`$${currentInterpolatedLatex}$`);
  };

  // Stamp formula directly to whiteboard
  const handleStamp = () => {
    if (!currentInterpolatedLatex) return;
    if (onStampFormula) {
      onStampFormula(`$${currentInterpolatedLatex}$`);
    } else {
      onInsertLatex(`$${currentInterpolatedLatex}$`);
    }
  };

  return (
    <div className="w-full bg-slate-950/95 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {activeTemplate ? (
            <button
              type="button"
              onClick={() => setActiveTemplate(null)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Library</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-emerald-950/60 text-emerald-400 rounded-lg border border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-white tracking-wide">
                Interactive Secondary STEM Library
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close STEM Library"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Content Area */}
      {!activeTemplate ? (
        // ----------------------------------------------------
        // VIEW A: FORMULA CATALOG BROWSER & SUBJECT FILTER TABS
        // ----------------------------------------------------
        <div className="p-3 space-y-3">
          {/* Subject Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {STEM_SUBJECT_TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSubject(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 25+ formulas (e.g. fraction, quadratic, ohm, integral, gas)..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Catalog Grid */}
          <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No formulas found matching "{searchQuery}". Try searching "fraction", "quadratic", or "voltage".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredTemplates.map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setActiveTemplate(tpl)}
                    className="p-2.5 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-left transition-all group cursor-pointer flex flex-col justify-between gap-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {tpl.name}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {tpl.category}
                      </span>
                    </div>

                    {/* Pre-cached KaTeX Preview Box */}
                    <div
                      className="bg-slate-950 p-2 rounded-lg border border-slate-800/70 text-emerald-400 flex items-center justify-center min-h-[46px] overflow-x-auto text-sm"
                      dangerouslySetInnerHTML={{ __html: catalogPreviewHtmlMap[tpl.id] || '' }}
                    />

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span className="truncate max-w-[170px]">{tpl.slots.length} editable slot{tpl.slots.length > 1 ? 's' : ''}</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Customize <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // ----------------------------------------------------
        // VIEW B: ACTIVE VISUAL SLOT EDITOR
        // ----------------------------------------------------
        <div className="p-3 space-y-3">
          {/* Active Template Title & Description */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{activeTemplate.name}</span>
                <span className="text-[10px] font-normal text-slate-400">· {activeTemplate.category}</span>
              </h4>
              <p className="text-[11px] text-slate-400">{activeTemplate.description}</p>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              title="Reset values to original defaults"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Debounced KaTeX Formula Preview */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-emerald-500/40 space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
              <span>Formula Output Preview</span>
              <span className="text-emerald-400 text-[10px] font-mono">Formula Value Input</span>
            </div>
            <div
              className="py-1 text-emerald-300 text-base sm:text-lg flex items-center justify-center overflow-x-auto min-h-[50px]"
              dangerouslySetInnerHTML={{ __html: renderedSlotPreviewHtml }}
            />
          </div>

          {/* Visual Interactive Slots */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              Tap or click to edit values in the formula:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {activeTemplate.slots.map((slot, index) => {
                const isSelected = activeSlotKey === slot.key;
                return (
                  <div
                    key={slot.key}
                    onClick={() => setActiveSlotKey(slot.key)}
                    className={`p-2 rounded-xl border transition-all cursor-text ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-emerald-400 text-[9px] flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span>{slot.label}</span>
                      </label>
                      {slotValues[slot.key] && (
                        <span className="text-[9px] text-slate-400 font-mono">
                          {slotValues[slot.key]}
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={slotValues[slot.key] || ''}
                      onChange={e => handleSlotChange(slot.key, e.target.value)}
                      onFocus={() => setActiveSlotKey(slot.key)}
                      placeholder={slot.placeholder || slot.defaultVal}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setActiveTemplate(null)}
              className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              {onStampFormula && (
                <button
                  type="button"
                  onClick={handleStamp}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 border border-slate-700"
                  title="Stamp this formula directly onto the chalkboard"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Stamp to Board</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleInsert}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                title={insertButtonLabel}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{insertButtonLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
