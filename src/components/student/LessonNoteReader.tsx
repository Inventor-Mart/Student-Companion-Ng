import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { getTopicSpecificQuiz } from '../../utils/topicQuizGenerator';
import {
  ArrowLeft,
  Download,
  Check,
  Award,
  CheckCircle2,
  Clock,
  Lightbulb,
  ArrowUp,
  Hash,
  Binary
} from 'lucide-react';
import {
  sanitizeCodeMath,
  renderFormattedSpan,
  cleanMathText
} from '../../utils/mathFormatter';
import { BiologicalDiagram, DiagramType as BiologicalDiagramType } from './BiologicalDiagram';
import { ChemicalDiagram, ChemicalDiagramType } from './ChemicalDiagram';
import { PhysicsDiagram, PhysicsDiagramType } from './PhysicsDiagram';
import { AgricDiagram, AgricDiagramType } from './AgricDiagram';
import { ComputingDiagram, ComputingDiagramType } from './ComputingDiagram';
import { FurtherMathDiagram, FurtherMathDiagramType } from './FurtherMathDiagram';
import { EconomicsDiagram, EconomicsDiagramType } from './EconomicsDiagram';
import { CommerceDiagram, CommerceDiagramType } from './CommerceDiagram';
import { CivicDiagram, CivicDiagramType } from './CivicDiagram';
import { GovernmentDiagram, GovernmentDiagramType } from './GovernmentDiagram';
import { GeographyDiagram, GeographyDiagramType } from './GeographyDiagram';
import { LiteratureDiagram, LiteratureDiagramType } from './LiteratureDiagram';
import { CRSDiagram, CRSDiagramType } from './CRSDiagram';
import { SS2MathDiagram, SS2MathDiagramType } from './SS2MathDiagram';
import { SS2EnglishDiagram, SS2EnglishDiagramType } from './SS2EnglishDiagram';
import { SS3MathDiagram, SS3MathDiagramType } from './SS3MathDiagram';
import { SS3EnglishDiagram, SS3EnglishDiagramType } from './SS3EnglishDiagram';

type AnyDiagramType =
  | BiologicalDiagramType
  | ChemicalDiagramType
  | PhysicsDiagramType
  | AgricDiagramType
  | ComputingDiagramType
  | FurtherMathDiagramType
  | EconomicsDiagramType
  | CommerceDiagramType
  | CivicDiagramType
  | GovernmentDiagramType
  | GeographyDiagramType
  | LiteratureDiagramType
  | CRSDiagramType
  | 'crs-passion-and-resurrection-timeline'
  | SS2MathDiagramType
  | SS2EnglishDiagramType
  | SS3MathDiagramType
  | SS3EnglishDiagramType;

interface DivisionStep {
  dividend: string;
  divisor: string;
  quotient: string;
  remainder: string;
}

type ContentBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'division-steps'; steps: DivisionStep[]; finalResult?: string }
  | { type: 'system-equations'; equations: { expr: string; note?: string }[] }
  | { type: 'aligned-formula'; lines: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'formula'; text: string }
  | { type: 'diagram'; diagramType: AnyDiagramType }
  | { type: 'code'; text: string }
  | { type: 'paragraph'; text: string };

// Parse raw markdown into rich, distinct visual blocks
const parseMarkdownBlocks = (rawMarkdown: string): ContentBlock[] => {
  const normalized = rawMarkdown.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const blocks: ContentBlock[] = [];

  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];
  let currentTableLines: string[] = [];
  let currentDivisionSteps: DivisionStep[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: currentParagraphLines.join(' ') });
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push({ type: 'list', items: [...currentListItems] });
      currentListItems = [];
    }
  };

  const flushTable = () => {
    if (currentTableLines.length > 0) {
      const rows = currentTableLines
        .filter(r => !r.includes('---'))
        .map(r => r.split('|').map(c => c.trim()).filter(c => c.length > 0));
      if (rows.length > 0) {
        blocks.push({ type: 'table', rows });
      }
      currentTableLines = [];
    }
  };

  const flushDivisionSteps = () => {
    if (currentDivisionSteps.length > 0) {
      blocks.push({ type: 'division-steps', steps: [...currentDivisionSteps] });
      currentDivisionSteps = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushTable();
    flushDivisionSteps();
  };

  // Division equation pattern: 25 ÷ 2 = 12 R 1 or $$25 \div 2 = 12 \text{ R } 1$$
  const divisionRegex = /(\d+)\s*(?:\\div|÷|\/)\s*(\d+)\s*=\s*(\d+)\s*(?:\\text\{\s*R\s*\}|R|Remainder)\s*(\d+)/i;

  let inCodeBlock = false;
  let currentCodeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code fence (e.g. ```)
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        blocks.push({ type: 'code', text: currentCodeLines.join('\n') });
        currentCodeLines = [];
        continue;
      } else {
        flushAll();
        inCodeBlock = true;
        continue;
      }
    }

    if (inCodeBlock) {
      currentCodeLines.push(rawLine);
      continue;
    }

    if (!trimmed) {
      flushAll();
      continue;
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      flushAll();
      blocks.push({ type: 'heading', level: 3, text: trimmed.replace(/^###\s+/, '') });
      continue;
    }

    // Heading 4
    if (trimmed.startsWith('#### ')) {
      flushAll();
      blocks.push({ type: 'heading', level: 4, text: trimmed.replace(/^####\s+/, '') });
      continue;
    }

    // Check for division calculation step
    const divMatch = trimmed.match(divisionRegex);
    if (divMatch) {
      flushParagraph();
      flushList();
      flushTable();
      currentDivisionSteps.push({
        dividend: divMatch[1],
        divisor: divMatch[2],
        quotient: divMatch[3],
        remainder: divMatch[4]
      });
      continue;
    }

    // If division steps were being accumulated and this line is NOT a division step, flush them
    if (currentDivisionSteps.length > 0) {
      flushDivisionSteps();
    }

    // Systems of equations environment: \begin{cases} ... \end{cases}
    if (trimmed.includes('\\begin{cases}')) {
      flushAll();
      let casesText = trimmed;
      if (!trimmed.includes('\\end{cases}')) {
        while (i + 1 < lines.length && !lines[i + 1].includes('\\end{cases}')) {
          i++;
          casesText += ' ' + lines[i].trim();
        }
        if (i + 1 < lines.length && lines[i + 1].includes('\\end{cases}')) {
          i++;
          casesText += ' ' + lines[i].trim();
        }
      }

      const match = casesText.match(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/i);
      if (match) {
        const rawEquations = match[1].split(/\\\\/);
        const equations = rawEquations
          .map(eq => eq.trim())
          .filter(eq => eq.length > 0)
          .map(eq => {
            const parts = eq.split('&');
            const expr = parts[0].trim();
            const note = parts.length > 1 ? parts.slice(1).join('&').trim() : undefined;
            return { expr, note };
          });

        if (equations.length > 0) {
          blocks.push({ type: 'system-equations', equations });
          continue;
        }
      }
    }

    // Multiline aligned derivations: \begin{aligned} ... \end{aligned}
    if (trimmed.includes('\\begin{aligned}')) {
      flushAll();
      let alignedText = trimmed;
      if (!trimmed.includes('\\end{aligned}')) {
        while (i + 1 < lines.length && !lines[i + 1].includes('\\end{aligned}')) {
          i++;
          alignedText += ' ' + lines[i].trim();
        }
        if (i + 1 < lines.length && lines[i + 1].includes('\\end{aligned}')) {
          i++;
          alignedText += ' ' + lines[i].trim();
        }
      }

      const match = alignedText.match(/\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}/i);
      if (match) {
        const rawLines = match[1].split(/\\\\/);
        const derivationLines = rawLines
          .map(l => l.trim())
          .filter(l => l.length > 0);

        if (derivationLines.length > 0) {
          blocks.push({ type: 'aligned-formula', lines: derivationLines });
          continue;
        }
      }
    }

    // Standalone centered math formula block: $$...$$
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
      flushAll();
      const formulaInner = trimmed.replace(/^\$\$\s*/, '').replace(/\s*\$\$$/, '');
      blocks.push({
        type: 'formula',
        text: formulaInner
      });
      continue;
    }

    // Biological or Scientific SVG Diagram: [Diagram: ecdysis-graph]
    const diagramMatch = trimmed.match(/^\[(?:Diagram|DIAGRAM):\s*([a-zA-Z0-9_-]+)\]$/i);
    if (diagramMatch) {
      flushAll();
      blocks.push({
        type: 'diagram',
        diagramType: diagramMatch[1] as AnyDiagramType
      });
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph();
      flushList();
      currentTableLines.push(trimmed);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushAll();
      blocks.push({ type: 'callout', text: trimmed.replace(/^>\s+/, '') });
      continue;
    }

    // List item (- or * or numbered 1. )
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushTable();
      currentListItems.push(trimmed.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Regular paragraph line
    currentParagraphLines.push(trimmed);
  }

  flushAll();
  return blocks;
};

export const LessonNoteReader: React.FC = () => {
  const {
    activeReadingNote,
    closeNoteReader,
    student,
    toggleDownloadNote,
    addStudentXP,
    startExam
  } = useApp();

  if (!activeReadingNote) return null;

  const isDownloaded = student.downloadedSubjectIds.includes(activeReadingNote.id);

  // Generate a guaranteed 10-question topic-specific quiz based on this exact topic
  const matchingExam = useMemo(() => {
    return getTopicSpecificQuiz(activeReadingNote);
  }, [activeReadingNote]);

  const handleCompleteReading = () => {
    addStudentXP(50, `Completed ${activeReadingNote.topicTitle}`);
    closeNoteReader();
  };

  // Dynamic takeaway header based on class level (Strictly avoid WAEC/JAMB on non-SS3)
  const getTakeawayHeader = (classLevel?: string) => {
    if (classLevel === 'SS 3') {
      return {
        title: 'WAEC / JAMB High-Yield Takeaways',
        badge: 'SS 3 Exam Target',
        badgeColor: 'border-amber-700/60 text-amber-300 bg-amber-950/60'
      };
    }
    if (classLevel === 'JSS 3') {
      return {
        title: 'BECE (Junior WAEC) High-Yield Takeaways',
        badge: 'BECE Target',
        badgeColor: 'border-indigo-700/60 text-indigo-300 bg-indigo-950/60'
      };
    }
    if (classLevel?.startsWith('JSS')) {
      return {
        title: 'Junior Secondary Curriculum Takeaways',
        badge: `${classLevel || 'JSS'} Curriculum`,
        badgeColor: 'border-emerald-700/60 text-emerald-300 bg-emerald-950/60'
      };
    }
    return {
      title: 'Senior Secondary Curriculum Takeaways',
      badge: `${classLevel || 'SS'} Curriculum`,
      badgeColor: 'border-cyan-700/60 text-cyan-300 bg-cyan-950/60'
    };
  };

  const takeawayHeader = getTakeawayHeader(activeReadingNote.classLevel);
  const parsedBlocks = parseMarkdownBlocks(activeReadingNote.contentMarkdown);

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Reader App Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={closeNoteReader}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Back to syllabus"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold truncate">
              <span>{activeReadingNote.subject}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{activeReadingNote.classLevel}</span>
            </div>
            <h2 className="text-xs font-bold text-white truncate">
              {cleanMathText(activeReadingNote.topicTitle)}
            </h2>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => toggleDownloadNote(activeReadingNote.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isDownloaded
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle offline storage for this lesson"
          >
            {isDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDownloaded ? 'Cached' : 'Save Offline'}</span>
          </button>
        </div>
      </div>

      {/* Reader Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 touch-pan-y max-w-2xl mx-auto w-full">
        {/* Topic Header Banner */}
        <div className="space-y-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{activeReadingNote.term}</span>
            <span>·</span>
            <span>Week {activeReadingNote.weekNumber}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {activeReadingNote.readingTimeMinutes} min read
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
            {renderFormattedSpan(activeReadingNote.topicTitle, 'main-title')}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            {renderFormattedSpan(activeReadingNote.summary, 'summary')}
          </p>
        </div>

        {/* Subtopics Outline */}
        <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800/80 space-y-1.5">
          <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Lesson Subtopics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
            {activeReadingNote.subtopics.map((sub, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="line-clamp-1">{renderFormattedSpan(sub, `sub-${i}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Content Area */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
          {parsedBlocks.map((block, idx) => {
            // Heading Level 3
            if (block.type === 'heading' && block.level === 3) {
              return (
                <div key={idx} className="pt-3 pb-1 border-b border-slate-800/80">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full shrink-0" />
                    <span>{renderFormattedSpan(block.text, `h3-${idx}`)}</span>
                  </h3>
                </div>
              );
            }

            // Heading Level 4
            if (block.type === 'heading' && block.level === 4) {
              return (
                <h4 key={idx} className="text-xs sm:text-sm font-semibold text-emerald-400 pt-1">
                  {renderFormattedSpan(block.text, `h4-${idx}`)}
                </h4>
              );
            }

            // Dedicated Simultaneous System of Equations Card
            if (block.type === 'system-equations') {
              return (
                <div key={idx} className="my-3 flex justify-center">
                  <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 shadow-lg flex items-stretch gap-3 max-w-lg w-full">
                    <div className="flex items-center text-4xl sm:text-5xl font-thin text-emerald-400 select-none px-1">
                      {'{'}
                    </div>
                    <div className="flex flex-col justify-center gap-2 flex-1 font-mono text-xs sm:text-sm text-emerald-200 divide-y divide-slate-800/60">
                      {block.equations.map((eq, eIdx) => (
                        <div key={eIdx} className="flex items-center justify-between gap-3 pt-1.5 first:pt-0">
                          <span className="font-semibold text-white tracking-wide">
                            {renderFormattedSpan(eq.expr, `case-${idx}-${eIdx}-expr`)}
                          </span>
                          {eq.note && (
                            <span className="text-[11px] text-amber-300 font-sans italic bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                              {renderFormattedSpan(eq.note, `case-${idx}-${eIdx}-note`)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Aligned Derivation Steps
            if (block.type === 'aligned-formula') {
              return (
                <div key={idx} className="my-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-800/60">
                    <Hash className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mathematical Derivation Steps</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs sm:text-sm text-emerald-300">
                    {block.lines.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-center justify-between gap-3 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/50">
                        <span className="text-slate-500 text-[10px] select-none font-sans">({lIdx + 1})</span>
                        <span className="flex-1 text-center font-semibold text-white">
                          {renderFormattedSpan(line, `align-${idx}-${lIdx}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // Dedicated Step-by-Step Division Calculation Card
            if (block.type === 'division-steps') {
              const reversedRemainders = block.steps.map(s => s.remainder).reverse().join('');
              return (
                <div key={idx} className="my-3 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-850 px-3.5 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Binary className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-white tracking-wide">
                        Repeated Division by 2 Method
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono font-semibold bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/60">
                      Read Remainders Bottom-Up
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2.5">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="text-slate-400 border-b border-slate-800 text-left">
                            <th className="pb-1.5 font-semibold text-[11px]">Step</th>
                            <th className="pb-1.5 font-semibold text-[11px]">Operation</th>
                            <th className="pb-1.5 font-semibold text-[11px] text-center">Quotient</th>
                            <th className="pb-1.5 font-semibold text-[11px] text-right">Remainder</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {block.steps.map((s, sIdx) => {
                            const isLast = sIdx === block.steps.length - 1;
                            const isFirst = sIdx === 0;
                            return (
                              <tr key={sIdx} className="hover:bg-slate-800/30">
                                <td className="py-1.5 text-slate-500 font-sans text-[11px]">
                                  Step {sIdx + 1}
                                </td>
                                <td className="py-1.5 text-slate-200">
                                  {s.dividend} ÷ {s.divisor}
                                </td>
                                <td className="py-1.5 text-center text-slate-300 font-bold">
                                  {s.quotient}
                                </td>
                                <td className="py-1.5 text-right">
                                  <div className="inline-flex items-center gap-1.5">
                                    {isLast && (
                                      <span className="text-[9px] text-amber-400 font-sans font-semibold">
                                        (MSB)
                                      </span>
                                    )}
                                    {isFirst && (
                                      <span className="text-[9px] text-slate-400 font-sans">
                                        (LSB)
                                      </span>
                                    )}
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-950/90 border border-emerald-700/70 text-emerald-300 font-bold shadow-inner">
                                      {s.remainder}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom-Up Assembly Guidance */}
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                        <ArrowUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Read remainders bottom-up:</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-sans">Result:</span>
                        <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-amber-800/50">
                          {reversedRemainders}
                          <sub className="text-[10px] text-amber-400 font-bold ml-0.5">2</sub>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Scientific, Chemical & Biological Diagrams
            if (block.type === 'diagram') {
              const chemicalDiagramTypes: ChemicalDiagramType[] = [
                'distillation-apparatus',
                'paper-chromatography',
                'bohr-atomic-model',
                'ionic-covalent-bonding',
                'bunsen-burner-flame',
                'periodic-table-trends',
                'reaction-energy-profile',
                'daniell-electrochemical-cell'
              ];
              const physicsDiagramTypes: PhysicsDiagramType[] = [
                'bimetallic-strip-thermostat',
                'pinhole-camera-eclipse',
                'plane-mirror-reflection',
                'concave-mirror-rays',
                'refraction-total-internal-reflection',
                'block-and-tackle-pulley',
                'transverse-wave-properties',
                'convex-lens-ray-diagram'
              ];

              const agricDiagramTypes: AgricDiagramType[] = [
                'soil-profile-horizons',
                'nitrogen-cycle-diagram',
                'disc-plough-anatomy',
                'farm-surveying-instruments',
                'drip-irrigation-system'
              ];

              const computingDiagramTypes: ComputingDiagramType[] = [
                'spreadsheet-grid-anatomy',
                'relational-database-schema',
                'storage-backup-hierarchy',
                'data-flow-charts',
                'erd-data-modeling',
                'database-normalization-pipeline'
              ];

              const furtherMathDiagramTypes: FurtherMathDiagramType[] = [
                'further-math-quadratic-roots-parabola',
                'further-math-coordinate-geometry',
                'further-math-unit-circle-astc',
                'further-math-logic-truth-venn',
                'further-math-differentiation-turning-points',
                'further-math-vectors-resolution'
              ];

              const economicsDiagramTypes: EconomicsDiagramType[] = [
                'economics-demand-supply-equilibrium',
                'economics-production-possibility-curve',
                'economics-cost-curves-anatomy',
                'economics-utility-diminishing-marginal',
                'economics-elasticity-spectrum',
                'economics-market-structures-matrix'
              ];

              const commerceDiagramTypes: CommerceDiagramType[] = [
                'commerce-channels-of-distribution',
                'commerce-trade-documents-flow',
                'commerce-balance-of-trade-payments',
                'commerce-stock-exchange-ngx',
                'commerce-insurance-principles'
              ];

              const civicDiagramTypes: CivicDiagramType[] = [
                'civic-citizenship-rights-duties',
                'civic-three-arms-of-government',
                'civic-electoral-process-cycle',
                'civic-citizenship-acquisition',
                'civic-inec-bvas-voting-flow'
              ];

              const governmentDiagramTypes: GovernmentDiagramType[] = [
                'government-federal-vs-unitary-tiers',
                'government-presidential-vs-parliamentary',
                'government-public-opinion-pressure-flow',
                'government-nigeria-constitutional-evolution',
                'government-local-government-structure'
              ];

              const geographyDiagramTypes: GeographyDiagramType[] = [
                'geography-earth-internal-layers',
                'geography-rock-cycle',
                'geography-volcanic-features-cross-section',
                'geography-river-profile-features',
                'geography-atmospheric-pressure-wind-belts'
              ];

              const literatureDiagramTypes: LiteratureDiagramType[] = [
                'literature-dramatic-structure-freytag-pyramid',
                'literature-genres-and-subgenres-tree',
                'literature-poetic-meter-and-sonnet-anatomy',
                'literature-figures-of-speech-wheel',
                'literature-african-drama-character-map'
              ];

              const crsDiagramTypes: CRSDiagramType[] = [
                'crs-creation-and-sovereignty-timeline',
                'crs-covenant-history-and-promises-map',
                'crs-exodus-tabernacle-and-route-diagram',
                'crs-ten-commandments-tablets',
                'crs-passion-and-resurrection-timeline'
              ];

              const ss2MathDiagramTypes: SS2MathDiagramType[] = [
                'math-circle-theorems',
                'math-trig-bearing-diagram',
                'math-cumulative-frequency-ogive',
                'math-inequalities-plane'
              ];

              const ss2EnglishDiagramTypes: SS2EnglishDiagramType[] = [
                'english-sentence-clause-tree',
                'english-intonation-tunes',
                'english-formal-letter-layout'
              ];

              const ss3MathDiagramTypes: SS3MathDiagramType[] = [
                'math-surds-and-conjugates',
                'math-coordinate-geometry-calculus',
                'math-linear-programming-feasible-region'
              ];

              const ss3EnglishDiagramTypes: SS3EnglishDiagramType[] = [
                'english-phonemic-vowel-matrix',
                'english-advanced-sentence-synthesis'
              ];

              if (chemicalDiagramTypes.includes(block.diagramType as ChemicalDiagramType)) {
                return (
                  <ChemicalDiagram key={idx} type={block.diagramType as ChemicalDiagramType} />
                );
              }
              if (physicsDiagramTypes.includes(block.diagramType as PhysicsDiagramType)) {
                return (
                  <PhysicsDiagram key={idx} type={block.diagramType as PhysicsDiagramType} />
                );
              }
              if (agricDiagramTypes.includes(block.diagramType as AgricDiagramType)) {
                return (
                  <AgricDiagram key={idx} type={block.diagramType as AgricDiagramType} />
                );
              }
              if (computingDiagramTypes.includes(block.diagramType as ComputingDiagramType)) {
                return (
                  <ComputingDiagram key={idx} type={block.diagramType as ComputingDiagramType} />
                );
              }
              if (furtherMathDiagramTypes.includes(block.diagramType as FurtherMathDiagramType)) {
                return (
                  <FurtherMathDiagram key={idx} type={block.diagramType as FurtherMathDiagramType} />
                );
              }
              if (economicsDiagramTypes.includes(block.diagramType as EconomicsDiagramType)) {
                return (
                  <EconomicsDiagram key={idx} type={block.diagramType as EconomicsDiagramType} />
                );
              }
              if (commerceDiagramTypes.includes(block.diagramType as CommerceDiagramType)) {
                return (
                  <CommerceDiagram key={idx} type={block.diagramType as CommerceDiagramType} />
                );
              }
              if (civicDiagramTypes.includes(block.diagramType as CivicDiagramType)) {
                return (
                  <CivicDiagram key={idx} type={block.diagramType as CivicDiagramType} />
                );
              }
              if (governmentDiagramTypes.includes(block.diagramType as GovernmentDiagramType)) {
                return (
                  <GovernmentDiagram key={idx} type={block.diagramType as GovernmentDiagramType} />
                );
              }
              if (geographyDiagramTypes.includes(block.diagramType as GeographyDiagramType)) {
                return (
                  <GeographyDiagram key={idx} type={block.diagramType as GeographyDiagramType} />
                );
              }
              if (literatureDiagramTypes.includes(block.diagramType as LiteratureDiagramType)) {
                return (
                  <LiteratureDiagram key={idx} type={block.diagramType as LiteratureDiagramType} />
                );
              }
              if (crsDiagramTypes.includes(block.diagramType as CRSDiagramType)) {
                return (
                  <CRSDiagram key={idx} type={block.diagramType as CRSDiagramType} />
                );
              }
              if (ss2MathDiagramTypes.includes(block.diagramType as SS2MathDiagramType)) {
                return (
                  <SS2MathDiagram key={idx} type={block.diagramType as SS2MathDiagramType} />
                );
              }
              if (ss2EnglishDiagramTypes.includes(block.diagramType as SS2EnglishDiagramType)) {
                return (
                  <SS2EnglishDiagram key={idx} type={block.diagramType as SS2EnglishDiagramType} />
                );
              }
              if (ss3MathDiagramTypes.includes(block.diagramType as SS3MathDiagramType)) {
                return (
                  <SS3MathDiagram key={idx} type={block.diagramType as SS3MathDiagramType} />
                );
              }
              if (ss3EnglishDiagramTypes.includes(block.diagramType as SS3EnglishDiagramType)) {
                return (
                  <SS3EnglishDiagram key={idx} type={block.diagramType as SS3EnglishDiagramType} />
                );
              }
              return (
                <BiologicalDiagram key={idx} type={block.diagramType as BiologicalDiagramType} />
              );
            }

            // Tables
            if (block.type === 'table') {
              return (
                <div key={idx} className="overflow-x-auto my-3 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md">
                  <table className="w-full text-left text-xs text-slate-300 min-w-[480px]">
                    <tbody>
                      {block.rows.map((cells, rIdx) => {
                        const isHeader = rIdx === 0;
                        return (
                          <tr
                            key={rIdx}
                            className={
                              isHeader
                                ? 'bg-slate-800 font-bold text-white border-b border-slate-700/80'
                                : 'border-t border-slate-800/50 hover:bg-slate-850/50'
                            }
                          >
                            {cells.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3.5 py-2.5 text-xs">
                                {renderFormattedSpan(cell, `tbl-${idx}-${rIdx}-${cIdx}`)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }

            // Blockquotes / Callouts
            if (block.type === 'callout') {
              return (
                <div key={idx} className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3 text-xs text-emerald-200">
                  {renderFormattedSpan(block.text, `callout-${idx}`)}
                </div>
              );
            }

            // Lists
            if (block.type === 'list') {
              return (
                <ul key={idx} className="list-disc pl-4 space-y-1.5 text-slate-300">
                  {block.items.map((item, iIdx) => (
                    <li key={iIdx}>{renderFormattedSpan(item, `li-${idx}-${iIdx}`)}</li>
                  ))}
                </ul>
              );
            }

            // Standalone Centered Math Formula Block
            if (block.type === 'formula') {
              return (
                <div key={idx} className="my-2.5 p-3 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/30 text-center font-mono text-xs sm:text-sm text-emerald-300 font-semibold shadow-inner">
                  {renderFormattedSpan(block.text, `formula-${idx}`)}
                </div>
              );
            }

            // Preformatted Model Composition / Letter / ASCII Diagram Block
            if (block.type === 'code') {
              const cleanCode = sanitizeCodeMath(block.text);
              return (
                <div key={idx} className="my-3 p-4 rounded-xl bg-slate-900/95 border border-amber-500/30 border-l-4 border-l-amber-500 font-mono text-xs sm:text-[13px] text-amber-100 whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-md">
                  {cleanCode}
                </div>
              );
            }

            // Paragraph
            return (
              <p key={idx} className="text-slate-300">
                {renderFormattedSpan(block.text, `p-${idx}`)}
              </p>
            );
          })}
        </div>

        {/* Dynamic Key Takeaways Box */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>{takeawayHeader.title}</span>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${takeawayHeader.badgeColor}`}>
              {takeawayHeader.badge}
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {activeReadingNote.keyTakeaways.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{renderFormattedSpan(point, `takeaway-${pIdx}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-20" />
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 shrink-0 flex items-center justify-between gap-3 z-30">
        <button
          onClick={handleCompleteReading}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mark Read (+50 XP)</span>
        </button>

        <button
          onClick={() => {
            closeNoteReader();
            startExam(matchingExam);
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Take Topic Quiz (+300 XP)</span>
        </button>
      </div>
    </div>
  );
};
