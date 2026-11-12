import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MATH_FORMULA_CATEGORIES,
  PHYSICS_FORMULA_CATEGORIES,
  CHEMISTRY_FORMULA_CATEGORIES,
  PERIODIC_ELEMENTS_DATABASE,
  SCIENTIFIC_CONSTANTS,
  FormulaCategory,
  FormulaItem,
  PeriodicElement
} from '../../data/scienceFormulasData';
import {
  Search,
  BookOpen,
  Zap,
  FlaskConical,
  Calculator,
  Grid,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Flame,
  Atom,
  HelpCircle,
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

type HubSection = 'maths' | 'physics' | 'chemistry' | 'periodic' | 'solvers' | 'constants';

export const ScienceFormulasHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<HubSection>('maths');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);
  const [elementCategoryFilter, setElementCategoryFilter] = useState<string>('all');

  // Interactive Solver States
  // 1. Quadratic Solver
  const [quadA, setQuadA] = useState<string>('1');
  const [quadB, setQuadB] = useState<string>('-5');
  const [quadC, setQuadC] = useState<string>('6');
  // 2. Kinetic Energy Solver
  const [keMass, setKeMass] = useState<string>('2');
  const [keVel, setKeVel] = useState<string>('10');
  // 3. Ohm's Law Solver
  const [ohmKnown, setOhmKnown] = useState<'v_i' | 'v_r' | 'i_r'>('i_r');
  const [ohmVal1, setOhmVal1] = useState<string>('5');
  const [ohmVal2, setOhmVal2] = useState<string>('10');
  // 4. Molar Mass / Mole Solver
  const [chemMass, setChemMass] = useState<string>('50');
  const [chemMolarMass, setChemMolarMass] = useState<string>('100');

  const { addStudentXP } = useApp();

  // Copy formula text
  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
    addStudentXP({
      feature: 'formulas',
      baseXP: 30,
      difficulty: 'medium',
      reason: 'Explored Science Formulas'
    });
  };

  // Get active formula categories
  const currentCategories: FormulaCategory[] = useMemo(() => {
    if (activeSection === 'maths') return MATH_FORMULA_CATEGORIES;
    if (activeSection === 'physics') return PHYSICS_FORMULA_CATEGORIES;
    if (activeSection === 'chemistry') return CHEMISTRY_FORMULA_CATEGORIES;
    return [];
  }, [activeSection]);

  // Filter formulas by search and category
  const filteredFormulaCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentCategories
      .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
      .map(cat => {
        const matchingItems = cat.items.filter(item => {
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            item.formula.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.variables.some(v => v.symbol.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q))
          );
        });
        return { ...cat, items: matchingItems };
      })
      .filter(cat => cat.items.length > 0);
  }, [currentCategories, selectedCategory, searchQuery]);

  // Filter periodic elements
  const filteredElements = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PERIODIC_ELEMENTS_DATABASE.filter(elem => {
      const matchesCategory = elementCategoryFilter === 'all' || elem.category === elementCategoryFilter;
      const matchesSearch =
        !q ||
        elem.name.toLowerCase().includes(q) ||
        elem.symbol.toLowerCase().includes(q) ||
        elem.number.toString().includes(q) ||
        elem.nigerianExamFacts.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [elementCategoryFilter, searchQuery]);

  // Category badge colors for elements
  const getCategoryColor = (category: PeriodicElement['category']) => {
    switch (category) {
      case 'alkali':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/60';
      case 'alkaline-earth':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
      case 'transition':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      case 'post-transition':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      case 'metalloid':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'nonmetal':
        return 'bg-lime-950/80 text-lime-300 border-lime-800/60';
      case 'halogen':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/60';
      case 'noble-gas':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Quadratic Calculation
  const quadraticResult = useMemo(() => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) return null;
    const delta = b * b - 4 * a * c;
    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      return { delta, type: 'Two Real Roots', x1: x1.toFixed(3), x2: x2.toFixed(3) };
    } else if (delta === 0) {
      const x = -b / (2 * a);
      return { delta, type: 'One Repeated Real Root', x1: x.toFixed(3), x2: x.toFixed(3) };
    } else {
      const real = (-b / (2 * a)).toFixed(3);
      const imag = (Math.sqrt(-delta) / (2 * a)).toFixed(3);
      return { delta, type: 'Complex Roots', x1: `${real} + ${imag}i`, x2: `${real} - ${imag}i` };
    }
  }, [quadA, quadB, quadC]);

  // Kinetic Energy Calculation
  const kineticResult = useMemo(() => {
    const m = parseFloat(keMass);
    const v = parseFloat(keVel);
    if (isNaN(m) || isNaN(v) || m < 0) return null;
    const ke = 0.5 * m * v * v;
    const momentum = m * v;
    return { ke: ke.toLocaleString(), momentum: momentum.toLocaleString() };
  }, [keMass, keVel]);

  // Ohm's Law Calculation
  const ohmsResult = useMemo(() => {
    const v1 = parseFloat(ohmVal1);
    const v2 = parseFloat(ohmVal2);
    if (isNaN(v1) || isNaN(v2) || v1 <= 0 || v2 <= 0) return null;
    if (ohmKnown === 'i_r') {
      const v = v1 * v2;
      const p = v * v1;
      return { answer: `${v.toFixed(2)} Volts (V)`, power: `${p.toFixed(2)} Watts (W)`, formula: 'V = I × R' };
    } else if (ohmKnown === 'v_r') {
      const i = v1 / v2;
      const p = v1 * i;
      return { answer: `${i.toFixed(3)} Amperes (A)`, power: `${p.toFixed(2)} Watts (W)`, formula: 'I = V / R' };
    } else {
      const r = v1 / v2;
      const p = v1 * v2;
      return { answer: `${r.toFixed(2)} Ohms (Ω)`, power: `${p.toFixed(2)} Watts (W)`, formula: 'R = V / I' };
    }
  }, [ohmKnown, ohmVal1, ohmVal2]);

  // Mole Result Calculation
  const moleResult = useMemo(() => {
    const m = parseFloat(chemMass);
    const M = parseFloat(chemMolarMass);
    if (isNaN(m) || isNaN(M) || M <= 0) return null;
    const n = m / M;
    const volumeStp = n * 22.4;
    const particles = n * 6.022;
    return {
      moles: n.toFixed(3),
      volumeStp: volumeStp.toFixed(2),
      particles: `${particles.toFixed(2)} × 10²³`
    };
  }, [chemMass, chemMolarMass]);

  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y text-slate-100">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Science & Mathematics Formula Bank
              </h2>
              <p className="text-[11px] text-slate-400">
                WAEC, JAMB & NECO formulas with interactive Periodic Table
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
            Official Guide 📐
          </span>
        </div>
      </div>

      {/* Main Section Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'maths', label: 'Mathematics', icon: Calculator },
          { id: 'physics', label: 'Physics', icon: Zap },
          { id: 'chemistry', label: 'Chemistry', icon: FlaskConical },
          { id: 'periodic', label: 'Periodic Table', icon: Grid },
          { id: 'solvers', label: 'Formula Solvers', icon: Sparkles },
          { id: 'constants', label: 'Constants', icon: Info }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id as HubSection);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input (For Formulas & Elements) */}
      {activeSection !== 'solvers' && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              activeSection === 'periodic'
                ? 'Search element name, symbol (e.g. Na, Fe), atomic number, or Nigerian exam fact...'
                : `Search ${activeSection} formulas, laws, variables (e.g. quadratic, ohm, mole)...`
            }
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* 1, 2, 3: FORMULAS LIST (MATHS, PHYSICS, CHEMISTRY)             */}
      {/* ============================================================== */}
      {(activeSection === 'maths' || activeSection === 'physics' || activeSection === 'chemistry') && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Categories
            </button>
            {currentCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Formulas List */}
          {filteredFormulaCategories.length === 0 ? (
            <div className="bg-slate-900/60 rounded-2xl p-6 text-center border border-slate-800">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <h3 className="text-xs font-semibold text-slate-300">No formula found matching "{searchQuery}"</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Try searching for keywords like "acceleration", "pythagoras", "faraday", or "volume".
              </p>
            </div>
          ) : (
            filteredFormulaCategories.map(cat => (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {cat.items.length} {cat.items.length === 1 ? 'Formula' : 'Formulas'}
                  </span>
                </div>

                <div className="space-y-3">
                  {cat.items.map(item => {
                    const isCopied = copiedFormulaId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                      >
                        {/* Name & Formula Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-white leading-snug">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {item.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleCopyFormula(item.id, `${item.name}: ${item.formula}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                            title="Copy formula"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Big Formula Display Box */}
                        <div className="bg-slate-950 rounded-xl p-3 border border-indigo-950/80 flex items-center justify-center">
                          <code className="text-sm font-bold text-amber-300 font-mono text-center tracking-wide break-all">
                            {item.formula}
                          </code>
                        </div>

                        {/* Variables Breakdown */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            Where:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                            {item.variables.map((v, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 bg-slate-950/50 px-2 py-1 rounded-lg border border-slate-800/60">
                                <span className="font-mono font-bold text-emerald-400">{v.symbol}</span>
                                <span className="text-slate-400 text-[11px]">= {v.meaning}</span>
                                {v.unit && (
                                  <span className="text-[10px] text-indigo-400 font-mono ml-auto">[{v.unit}]</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Exam Notes */}
                        {item.examNotes && (
                          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-200">
                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-400 text-[11px] block">WAEC / JAMB Tip:</strong>
                              <span className="text-[11px] leading-relaxed">{item.examNotes}</span>
                            </div>
                          </div>
                        )}

                        {/* Example Problem (if available) */}
                        {item.exampleProblem && (
                          <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800/80 text-xs space-y-1">
                            <div className="text-[11px] font-bold text-indigo-300">Worked Model Example:</div>
                            <p className="text-[11px] text-slate-300">{item.exampleProblem.problem}</p>
                            <p className="text-[11px] text-emerald-300 font-mono mt-1 pt-1 border-t border-slate-800/60">
                              👉 {item.exampleProblem.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4: INTERACTIVE PERIODIC TABLE OF ELEMENTS                      */}
      {/* ============================================================== */}
      {activeSection === 'periodic' && (
        <div className="space-y-4">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {[
              { id: 'all', label: 'All Elements' },
              { id: 'alkali', label: 'Alkali Metals' },
              { id: 'alkaline-earth', label: 'Alkaline Earth' },
              { id: 'transition', label: 'Transition Metals' },
              { id: 'halogen', label: 'Halogens' },
              { id: 'noble-gas', label: 'Noble Gases' },
              { id: 'nonmetal', label: 'Non-Metals' },
              { id: 'metalloid', label: 'Metalloids' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setElementCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  elementCategoryFilter === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredElements.length} Elements</span>
            <span className="text-[10px] text-indigo-400 font-mono">Tap any element for full WAEC details</span>
          </div>

          {/* Elements Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {filteredElements.map(elem => {
              const catClass = getCategoryColor(elem.category);
              return (
                <button
                  key={elem.number}
                  onClick={() => setSelectedElement(elem)}
                  className={`p-2.5 rounded-2xl border text-left transition-all hover:scale-105 active:scale-95 cursor-pointer flex flex-col justify-between h-24 ${catClass}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono w-full opacity-80">
                    <span>{elem.number}</span>
                    <span>{elem.mass.toFixed(1)}</span>
                  </div>

                  <div className="text-center my-0.5">
                    <span className="text-lg font-extrabold block leading-tight font-mono">
                      {elem.symbol}
                    </span>
                    <span className="text-[10px] truncate block opacity-90 font-medium">
                      {elem.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] opacity-75 font-mono">
                    <span>Gr {elem.group}</span>
                    <span>P{elem.period}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Element Detail Modal */}
          {selectedElement && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl relative">
                <button
                  onClick={() => setSelectedElement(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center ${getCategoryColor(
                      selectedElement.category
                    )}`}
                  >
                    <span className="text-[10px] font-mono">{selectedElement.number}</span>
                    <span className="text-xl font-bold font-mono">{selectedElement.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {selectedElement.name}
                    </h3>
                    <span className="text-xs text-indigo-400 capitalize">
                      {selectedElement.category.replace('-', ' ')}
                    </span>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Atomic Mass: {selectedElement.mass} g/mol
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Electron Config:</span>
                    <span className="font-mono font-bold text-amber-300">{selectedElement.electronicConfig}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">State at 25°C:</span>
                    <span className="font-bold text-emerald-400">{selectedElement.state}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Common Valency:</span>
                    <span className="font-mono font-bold text-indigo-300">
                      {selectedElement.valencies.join(', ')}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Flame Test:</span>
                    <span className="font-bold text-rose-300">
                      {selectedElement.flameColor || 'None / Not tested'}
                    </span>
                  </div>
                </div>

                {/* Exam Facts */}
                <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-3 text-xs space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nigerian Exam Focus (WAEC & JAMB)</span>
                  </span>
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    {selectedElement.nigerianExamFacts}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedElement(null)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Close Element Inspector
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5: INTERACTIVE FORMULA SOLVERS & CALCULATORS                    */}
      {/* ============================================================== */}
      {activeSection === 'solvers' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Instant Interactive Science Solvers</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Verify your calculations for homework and past questions with live formula calculators.
            </p>
          </div>

          {/* Solver 1: Quadratic Equation Solver */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                1. Quadratic Equation Solver
              </span>
              <span className="text-[10px] font-mono text-amber-400">ax² + bx + c = 0</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">a (a ≠ 0)</label>
                <input
                  type="number"
                  value={quadA}
                  onChange={e => setQuadA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">b</label>
                <input
                  type="number"
                  value={quadB}
                  onChange={e => setQuadB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">c</label>
                <input
                  type="number"
                  value={quadC}
                  onChange={e => setQuadC(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {quadraticResult ? (
              <div className="bg-slate-950 p-3 rounded-xl border border-indigo-900/40 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Discriminant (Δ = b² - 4ac):</span>
                  <strong className="font-mono text-amber-400">{quadraticResult.delta}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Root Type:</span>
                  <span className="text-emerald-400 font-semibold">{quadraticResult.type}</span>
                </div>
                <div className="pt-1 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Roots:</span>
                  <span className="font-mono font-bold text-white">
                    x₁ = {quadraticResult.x1},   x₂ = {quadraticResult.x2}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-400">Please enter a valid coefficient (a cannot be zero).</p>
            )}
          </div>

          {/* Solver 2: Kinetic Energy & Momentum */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                2. Kinetic Energy & Momentum
              </span>
              <span className="text-[10px] font-mono text-amber-400">K.E. = ½mv²</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mass m (kg)</label>
                <input
                  type="number"
                  value={keMass}
                  onChange={e => setKeMass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Velocity v (m/s)</label>
                <input
                  type="number"
                  value={keVel}
                  onChange={e => setKeVel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {kineticResult && (
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/40 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Kinetic Energy (J):</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{kineticResult.ke} Joules</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Linear Momentum (p = mv):</span>
                  <span className="font-mono font-bold text-amber-400">{kineticResult.momentum} kg·m/s</span>
                </div>
              </div>
            )}
          </div>

          {/* Solver 3: Ohm's Law Calculator */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                3. Ohm's Law & Electric Power
              </span>
              <span className="text-[10px] font-mono text-indigo-400">V = I × R</span>
            </div>

            {/* Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl text-[11px]">
              <button
                onClick={() => setOhmKnown('i_r')}
                className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  ohmKnown === 'i_r' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                Find Voltage (V)
              </button>
              <button
                onClick={() => setOhmKnown('v_r')}
                className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  ohmKnown === 'v_r' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                Find Current (I)
              </button>
              <button
                onClick={() => setOhmKnown('v_i')}
                className={`flex-1 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  ohmKnown === 'v_i' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                Find Resistance (R)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  {ohmKnown === 'i_r' ? 'Current I (A)' : 'Voltage V (Volts)'}
                </label>
                <input
                  type="number"
                  value={ohmVal1}
                  onChange={e => setOhmVal1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  {ohmKnown === 'v_i' ? 'Current I (A)' : 'Resistance R (Ω)'}
                </label>
                <input
                  type="number"
                  value={ohmVal2}
                  onChange={e => setOhmVal2(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {ohmsResult && (
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-900/40 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Calculated Value:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{ohmsResult.answer}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Electric Power (P = IV):</span>
                  <span className="font-mono font-bold text-white">{ohmsResult.power}</span>
                </div>
              </div>
            )}
          </div>

          {/* Solver 4: Mole Concept & Molar Mass */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                4. Mole Concept & Gas Volume (s.t.p.)
              </span>
              <span className="text-[10px] font-mono text-amber-400">n = m / M</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mass m (grams)</label>
                <input
                  type="number"
                  value={chemMass}
                  onChange={e => setChemMass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Molar Mass M (g/mol)</label>
                <input
                  type="number"
                  value={chemMolarMass}
                  onChange={e => setChemMolarMass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {moleResult && (
              <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900/40 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Number of Moles (n):</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{moleResult.moles} moles</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Gas Volume at s.t.p.:</span>
                  <span className="font-mono font-bold text-white">{moleResult.volumeStp} dm³</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Particles (Atoms/Molecules):</span>
                  <span className="font-mono font-bold text-amber-300">{moleResult.particles}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6: SCIENTIFIC CONSTANTS SHEET                                  */}
      {/* ============================================================== */}
      {activeSection === 'constants' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Standard Physical & Chemical Constants</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Official fundamental constants provided at the beginning of WAEC and JAMB examination question papers.
            </p>
          </div>

          <div className="space-y-2">
            {SCIENTIFIC_CONSTANTS.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Symbol: {c.symbol}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400 block">{c.value}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{c.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
