import React from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import {
  ArrowLeft,
  Download,
  Check,
  Award,
  CheckCircle2,
  Clock,
  Lightbulb
} from 'lucide-react';

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

  // Find associated quiz or fallback to matching subject
  const matchingExam =
    CBT_EXAMS_DATABASE.find(e => e.subject.toLowerCase() === activeReadingNote.subject.toLowerCase()) ||
    CBT_EXAMS_DATABASE[0];

  const handleCompleteReading = () => {
    addStudentXP(50, `Completed ${activeReadingNote.topicTitle}`);
    closeNoteReader();
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Reader App Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={closeNoteReader}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
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
              {activeReadingNote.topicTitle}
            </h2>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => toggleDownloadNote(activeReadingNote.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
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
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 touch-pan-y max-w-2xl mx-auto w-full">
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
            {activeReadingNote.topicTitle}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            {activeReadingNote.summary}
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
                <span className="line-clamp-1">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formatted Markdown Content */}
        <div className="prose prose-invert prose-sm max-w-none space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          {activeReadingNote.contentMarkdown.split('\n\n').map((paragraph, index) => {
            // Check for headings
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-sm sm:text-base font-bold text-white pt-2 border-t border-slate-800/60">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={index} className="text-xs sm:text-sm font-semibold text-emerald-400 pt-1">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            // Check for tables
            if (paragraph.includes('|')) {
              const rows = paragraph.trim().split('\n').filter(r => !r.includes('---'));
              return (
                <div key={index} className="overflow-x-auto my-3 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
                  <table className="w-full text-left text-xs text-slate-300">
                    <tbody>
                      {rows.map((row, rIdx) => {
                        const cells = row.split('|').filter(c => c.trim().length > 0);
                        const isHeader = rIdx === 0;
                        return (
                          <tr key={rIdx} className={isHeader ? 'bg-slate-800/80 font-bold text-white' : 'border-t border-slate-800/50'}>
                            {cells.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3 py-2 text-xs">
                                {cell.trim()}
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
            // Check for callouts / blockquotes
            if (paragraph.startsWith('> ')) {
              return (
                <div key={index} className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3 text-xs text-emerald-200">
                  {paragraph.replace('> ', '')}
                </div>
              );
            }
            // Regular bullet lists
            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={index} className="list-disc pl-4 space-y-1 text-slate-300">
                  {items.map((item, iIdx) => (
                    <li key={iIdx}>{item.replace(/^[-*]\s+/, '')}</li>
                  ))}
                </ul>
              );
            }

            return <p key={index} className="text-slate-300">{paragraph}</p>;
          })}
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>WAEC / JAMB High-Yield Takeaways</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {activeReadingNote.keyTakeaways.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{point}</span>
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
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mark Read (+50 XP)</span>
        </button>

        <button
          onClick={() => {
            closeNoteReader();
            startExam(matchingExam);
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50"
        >
          <Award className="w-4 h-4" />
          <span>Take Topic Quiz (+300 XP)</span>
        </button>
      </div>
    </div>
  );
};
