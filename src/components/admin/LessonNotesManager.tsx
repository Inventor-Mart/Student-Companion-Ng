import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Cloud,
  CloudOff,
  Edit3,
  Eye,
  FileText,
  FileUp,
  Layers,
  Plus,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  AlertCircle,
  Paperclip,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  NIGERIAN_CURRICULUM_TOPICS,
  OFFICIAL_SUBJECTS_BY_CLASS
} from '../../data/curriculumData';
import {
  AcademicStream,
  AdminLessonNote,
  AdminLessonNoteStream,
  NigerianClassLevel
} from '../../types';
import {
  buildAdminLessonNoteId,
  deleteAdminLessonNote,
  getDefaultQuizIdForClass,
  normalizeSubjectKey,
  saveAdminLessonNote
} from '../../services/lessonNoteService';
import { calculateRealisticStudyMinutes } from '../../utils/studyDuration';

interface LessonNotesManagerProps {
  onBack: () => void;
}

type SecondaryClassLevel = Exclude<NigerianClassLevel, 'University Aspirant'>;
type TermOption = '1st Term' | '2nd Term' | '3rd Term';

interface StructuredSection {
  id: string;
  heading: string;
  body: string;
}

const CLASS_LEVELS: SecondaryClassLevel[] = [
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SS 1',
  'SS 2',
  'SS 3'
];

const TERMS: TermOption[] = ['1st Term', '2nd Term', '3rd Term'];
const WEEKS: number[] = Array.from({ length: 13 }, (_, i) => i + 1);

function compileSectionsToMarkdown(sections: StructuredSection[]): string {
  return sections
    .filter(s => s.heading.trim() || s.body.trim())
    .map((s, idx) => `### ${idx + 1}. ${s.heading.trim() || `Section ${idx + 1}`}\n${s.body.trim()}`)
    .join('\n\n');
}

function parseMarkdownToSections(markdown: string): StructuredSection[] {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return [{ id: 'sec-1', heading: 'Core Concepts & Definitions', body: '' }];
  }

  const lines = normalized.split('\n');
  const sections: StructuredSection[] = [];
  let currentHeading = 'Core Lesson Notes';
  let currentLines: string[] = [];

  for (const line of lines) {
    const hMatch = line.match(/^#{1,4}\s+(?:\d+\.\s*)?(.+)$/);
    if (hMatch) {
      if (currentLines.length > 0 || sections.length > 0) {
        sections.push({
          id: `sec-${sections.length + 1}-${Date.now()}`,
          heading: currentHeading,
          body: currentLines.join('\n').trim()
        });
      }
      currentHeading = hMatch[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0 || sections.length === 0) {
    sections.push({
      id: `sec-${sections.length + 1}-${Date.now()}`,
      heading: currentHeading,
      body: currentLines.join('\n').trim()
    });
  }

  return sections.length > 0
    ? sections
    : [{ id: 'sec-1', heading: 'Core Lesson Notes', body: normalized }];
}

export const LessonNotesManager: React.FC<LessonNotesManagerProps> = ({ onBack }) => {
  const {
    adminLessonNotes,
    currentUser,
    currentUserProfile,
    loginWithGoogle,
    authLoading
  } = useApp();

  // Target Slot Selectors
  const [classLevel, setClassLevel] = useState<SecondaryClassLevel>('SS 1');
  const [stream, setStream] = useState<AdminLessonNoteStream>('Science');
  const [term, setTerm] = useState<TermOption>('2nd Term');
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [customSubject, setCustomSubject] = useState<string>('');

  // Authoring Mode ('markdown' = Mode 1, 'structured' = Mode 2)
  const [uploadMode, setUploadMode] = useState<'markdown' | 'structured'>('markdown');
  const [showMarkdownPreview, setShowMarkdownPreview] = useState<boolean>(false);

  // Common Note Metadata
  const [topicTitle, setTopicTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [readingTimeMinutes, setReadingTimeMinutes] = useState<number>(8);
  const [subtopicsText, setSubtopicsText] = useState<string>('');
  const [takeawaysText, setTakeawaysText] = useState<string>('');

  // Mode 1: Markdown + File Upload State
  const [contentMarkdown, setContentMarkdown] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');
  const [attachmentDataUrl, setAttachmentDataUrl] = useState<string>('');

  // Mode 2: Structured Builder Sections
  const [sections, setSections] = useState<StructuredSection[]>([
    {
      id: 'sec-1',
      heading: 'Learning Objectives & Overview',
      body: ''
    },
    {
      id: 'sec-2',
      heading: 'Worked Examples & Applications',
      body: ''
    }
  ]);

  // UI Feedback & Registry Filters
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'warning' | 'error'; text: string } | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterTerm, setFilterTerm] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Available subjects for selected class & stream
  const availableSubjects = useMemo(() => {
    if (classLevel.startsWith('JSS')) {
      return OFFICIAL_SUBJECTS_BY_CLASS[classLevel as 'JSS 1' | 'JSS 2' | 'JSS 3'] || [];
    }
    const senior = OFFICIAL_SUBJECTS_BY_CLASS[classLevel as 'SS 1' | 'SS 2' | 'SS 3'];
    if (!senior) return ['Mathematics', 'English Language'];
    if (stream === 'Science') return senior.Science;
    if (stream === 'Non-Science') return senior['Non-Science'];
    return Array.from(new Set([...senior.Science, ...senior['Non-Science']]));
  }, [classLevel, stream]);

  const effectiveSubject =
    selectedSubject === '__CUSTOM__' ? customSubject.trim() : selectedSubject;

  const handleClassChange = (nextClass: SecondaryClassLevel) => {
    setClassLevel(nextClass);
    setEditingNoteId(null);
    if (nextClass.startsWith('JSS')) {
      setStream('Junior');
      const jssSubjects = OFFICIAL_SUBJECTS_BY_CLASS[nextClass as 'JSS 1' | 'JSS 2' | 'JSS 3'] || [];
      if (selectedSubject !== '__CUSTOM__' && !jssSubjects.includes(selectedSubject)) {
        setSelectedSubject(jssSubjects[0] || 'Mathematics');
      }
    } else {
      const nextStream: AdminLessonNoteStream = stream === 'Junior' ? 'Science' : stream;
      setStream(nextStream);
      const senior = OFFICIAL_SUBJECTS_BY_CLASS[nextClass as 'SS 1' | 'SS 2' | 'SS 3'];
      const pool =
        nextStream === 'Non-Science'
          ? senior['Non-Science']
          : nextStream === 'All'
          ? Array.from(new Set([...senior.Science, ...senior['Non-Science']]))
          : senior.Science;
      if (selectedSubject !== '__CUSTOM__' && !pool.includes(selectedSubject)) {
        setSelectedSubject(pool[0] || 'Mathematics');
      }
    }
  };

  // Detect active Admin Override or Built-In Curriculum Topic for current selector slot
  const existingOverrideForSlot = useMemo(() => {
    if (!effectiveSubject) return null;
    const subKey = normalizeSubjectKey(effectiveSubject);
    return (
      adminLessonNotes.find(
        n =>
          n.classLevel === classLevel &&
          n.term === term &&
          n.weekNumber === weekNumber &&
          normalizeSubjectKey(n.subject) === subKey &&
          (n.stream === stream || n.stream === 'All' || stream === 'All')
      ) || null
    );
  }, [adminLessonNotes, classLevel, stream, term, weekNumber, effectiveSubject]);

  const existingBuiltInForSlot = useMemo(() => {
    if (!effectiveSubject) return null;
    const subKey = normalizeSubjectKey(effectiveSubject);
    return (
      NIGERIAN_CURRICULUM_TOPICS.find(
        t =>
          t.classLevel === classLevel &&
          t.term === term &&
          t.weekNumber === weekNumber &&
          normalizeSubjectKey(t.subject) === subKey &&
          (stream === 'All' || t.stream === stream)
      ) || null
    );
  }, [classLevel, stream, term, weekNumber, effectiveSubject]);

  const effectiveStudyMinutesPreview = useMemo(() => {
    const compiledMarkdown =
      uploadMode === 'structured' ? compileSectionsToMarkdown(sections) : contentMarkdown;
    const subtopics = subtopicsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    const keyTakeaways = takeawaysText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    return calculateRealisticStudyMinutes({
      summary,
      contentMarkdown: compiledMarkdown,
      subtopics,
      keyTakeaways,
      readingTimeMinutes,
      isAdminOverride: true
    });
  }, [uploadMode, sections, contentMarkdown, subtopicsText, takeawaysText, summary, readingTimeMinutes]);

  // Switch between Mode 1 (Markdown) and Mode 2 (Structured) preserving content
  const handleSwitchMode = (targetMode: 'markdown' | 'structured') => {
    if (targetMode === uploadMode) return;
    if (targetMode === 'structured') {
      setSections(parseMarkdownToSections(contentMarkdown));
    } else {
      const compiled = compileSectionsToMarkdown(sections);
      if (compiled.trim()) {
        setContentMarkdown(compiled);
      }
    }
    setUploadMode(targetMode);
  };

  const loadTopicIntoEditor = (source: {
    id?: string;
    classLevel?: SecondaryClassLevel;
    stream?: AdminLessonNoteStream;
    term?: TermOption;
    weekNumber?: number;
    subject?: string;
    topicTitle: string;
    summary: string;
    readingTimeMinutes: number;
    subtopics: string[];
    keyTakeaways: string[];
    contentMarkdown: string;
    uploadMode?: 'markdown' | 'structured';
    attachmentName?: string;
    attachmentDataUrl?: string;
  }) => {
    if (source.classLevel) setClassLevel(source.classLevel);
    if (source.stream) setStream(source.stream);
    if (source.term) setTerm(source.term);
    if (source.weekNumber) setWeekNumber(source.weekNumber);

    if (source.subject) {
      const targetCls = source.classLevel || classLevel;
      const targetStream = source.stream || stream;
      const officialPool = targetCls.startsWith('JSS')
        ? OFFICIAL_SUBJECTS_BY_CLASS[targetCls as 'JSS 1' | 'JSS 2' | 'JSS 3']
        : targetStream === 'Non-Science'
        ? OFFICIAL_SUBJECTS_BY_CLASS[targetCls as 'SS 1' | 'SS 2' | 'SS 3']['Non-Science']
        : Array.from(
            new Set([
              ...OFFICIAL_SUBJECTS_BY_CLASS[targetCls as 'SS 1' | 'SS 2' | 'SS 3'].Science,
              ...OFFICIAL_SUBJECTS_BY_CLASS[targetCls as 'SS 1' | 'SS 2' | 'SS 3']['Non-Science']
            ])
          );
      if (officialPool.includes(source.subject)) {
        setSelectedSubject(source.subject);
        setCustomSubject('');
      } else {
        setSelectedSubject('__CUSTOM__');
        setCustomSubject(source.subject);
      }
    }

    setTopicTitle(source.topicTitle);
    setSummary(source.summary);
    setReadingTimeMinutes(source.readingTimeMinutes || 8);
    setSubtopicsText((source.subtopics || []).join('\n'));
    setTakeawaysText((source.keyTakeaways || []).join('\n'));
    setContentMarkdown(source.contentMarkdown);
    setSections(parseMarkdownToSections(source.contentMarkdown));
    setAttachmentName(source.attachmentName || '');
    setAttachmentDataUrl(source.attachmentDataUrl || '');
    setUploadMode(source.uploadMode || 'markdown');
    setEditingNoteId(source.id || null);
    setStatusMessage({
      type: 'success',
      text: `Loaded "${source.topicTitle}" into the editor.`
    });
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatusMessage(null);

    const fileNameLower = file.name.toLowerCase();
    if (fileNameLower.endsWith('.md') || fileNameLower.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === 'string' ? reader.result : '';
        if (!text.trim()) {
          setStatusMessage({ type: 'error', text: 'The uploaded text file is empty.' });
          return;
        }
        setContentMarkdown(text);
        setSections(parseMarkdownToSections(text));

        // Auto-extract heading as Topic Title if currently blank
        if (!topicTitle.trim()) {
          const firstHeading = text.match(/^#\s+(.+)$/m);
          if (firstHeading) {
            setTopicTitle(firstHeading[1].trim().slice(0, 180));
          } else {
            setTopicTitle(file.name.replace(/\.(md|txt)$/i, '').replace(/[-_]+/g, ' '));
          }
        }
        if (!summary.trim()) {
          const cleanPreview = text
            .replace(/^#.*$/gm, '')
            .replace(/[*_`>-]/g, '')
            .trim()
            .slice(0, 220);
          if (cleanPreview) {
            setSummary(cleanPreview);
          }
        }
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        setReadingTimeMinutes(Math.max(3, Math.min(45, Math.ceil(wordCount / 180))));
        setStatusMessage({
          type: 'success',
          text: `Imported ${file.name} (${wordCount} words) into Markdown editor.`
        });
      };
      reader.readAsText(file);
    } else if (fileNameLower.endsWith('.pdf')) {
      if (file.size > 450 * 1024) {
        setStatusMessage({
          type: 'error',
          text: 'PDF file exceeds 450 KB limit for cloud Firestore storage. Please compress the PDF or paste text into the editor.'
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        if (dataUrl.length > 640000) {
          setStatusMessage({
            type: 'error',
            text: 'Encoded PDF exceeds safe Firestore document bounds. Please upload a smaller PDF (<= 450 KB).'
          });
          return;
        }
        setAttachmentName(file.name);
        setAttachmentDataUrl(dataUrl);
        if (!topicTitle.trim()) {
          setTopicTitle(file.name.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' '));
        }
        if (!contentMarkdown.trim()) {
          setContentMarkdown(
            `### 1. Official Study Handout (${file.name})\nDownload or open the attached PDF handout above to study the complete ${effectiveSubject || 'subject'} lesson notes for **${classLevel} · ${term} · Week ${weekNumber}**.`
          );
        }
        setStatusMessage({
          type: 'success',
          text: `Attached PDF handout "${file.name}" (${Math.round(file.size / 1024)} KB).`
        });
      };
      reader.readAsDataURL(file);
    } else {
      setStatusMessage({
        type: 'error',
        text: 'Unsupported file format. Please upload a .md, .txt, or .pdf file.'
      });
    }

    // Reset input so re-selecting the same file works
    e.target.value = '';
  };

  const handleAddSection = () => {
    setSections(prev => [
      ...prev,
      {
        id: `sec-${Date.now()}`,
        heading: '',
        body: ''
      }
    ]);
  };

  const handleUpdateSection = (id: string, field: 'heading' | 'body', value: string) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleRemoveSection = (id: string) => {
    setSections(prev => (prev.length > 1 ? prev.filter(s => s.id !== id) : prev));
  };

  const handleResetEditor = () => {
    setTopicTitle('');
    setSummary('');
    setReadingTimeMinutes(8);
    setSubtopicsText('');
    setTakeawaysText('');
    setContentMarkdown('');
    setAttachmentName('');
    setAttachmentDataUrl('');
    setSections([
      { id: 'sec-1', heading: 'Learning Objectives & Overview', body: '' },
      { id: 'sec-2', heading: 'Worked Examples & Applications', body: '' }
    ]);
    setEditingNoteId(null);
    setStatusMessage(null);
  };

  const handlePublishNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!effectiveSubject || effectiveSubject.length < 2) {
      setStatusMessage({ type: 'error', text: 'Please select or enter a valid subject name.' });
      return;
    }
    if (topicTitle.trim().length < 2) {
      setStatusMessage({ type: 'error', text: 'Please enter a Lesson Topic Title.' });
      return;
    }

    const compiledBody =
      uploadMode === 'structured'
        ? compileSectionsToMarkdown(sections)
        : contentMarkdown.trim();

    if (compiledBody.length < 2) {
      setStatusMessage({
        type: 'error',
        text:
          uploadMode === 'structured'
            ? 'Please fill in at least one Lesson Section body.'
            : 'Please enter Markdown lesson content or upload a .md / .txt / .pdf file.'
      });
      return;
    }

    const parsedSubtopics = subtopicsText
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 20);
    const finalSubtopics =
      parsedSubtopics.length > 0
        ? parsedSubtopics
        : [`Week ${weekNumber} Core Concepts in ${effectiveSubject}`];

    const parsedTakeaways = takeawaysText
      .split(/\n+/)
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 15);
    const finalTakeaways =
      parsedTakeaways.length > 0
        ? parsedTakeaways
        : [`Master ${topicTitle.trim()} for ${classLevel} (${term}, Week ${weekNumber}).`];

    const finalSummary =
      summary.trim().length >= 2
        ? summary.trim()
        : `Official Super Admin lesson note for ${effectiveSubject} (${classLevel}, ${term}, Week ${weekNumber}): ${topicTitle.trim()}.`;

    const noteId =
      editingNoteId ||
      buildAdminLessonNoteId(classLevel, stream, term, effectiveSubject, weekNumber);

    const existingRecord = adminLessonNotes.find(n => n.id === noteId);

    const payload: AdminLessonNote = {
      id: noteId,
      classLevel,
      stream,
      subject: effectiveSubject,
      term,
      weekNumber,
      topicTitle: topicTitle.trim(),
      subtopics: finalSubtopics,
      readingTimeMinutes: Math.max(1, Math.min(180, Number(readingTimeMinutes) || 8)),
      summary: finalSummary,
      contentMarkdown: compiledBody,
      keyTakeaways: finalTakeaways,
      associatedQuizId: getDefaultQuizIdForClass(classLevel),
      uploadMode,
      uploadedBy: currentUser?.email || currentUserProfile?.email || 'martorefe@gmail.com',
      createdAt: existingRecord?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(attachmentName.trim() ? { attachmentName: attachmentName.trim() } : {}),
      ...(attachmentDataUrl ? { attachmentDataUrl } : {})
    };

    setIsSaving(true);
    try {
      const result = await saveAdminLessonNote(payload);
      setEditingNoteId(null);
      if (result.syncedToCloud) {
        setStatusMessage({
          type: 'success',
          text: `Published to Firestore & active for all ${classLevel} students (${term}, Week ${weekNumber} · ${effectiveSubject}).`
        });
      } else {
        setStatusMessage({
          type: 'warning',
          text: `Saved locally for ${classLevel} (${term}, Week ${weekNumber} · ${effectiveSubject}). Sign in with Google Cloud Sync above to broadcast across all student devices.`
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Saved locally, but Firestore sync failed: ${err?.message || 'Verify admin Google sign-in.'}`
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteAdminLessonNote(noteId);
      setConfirmDeleteId(null);
      if (editingNoteId === noteId) {
        setEditingNoteId(null);
      }
      setStatusMessage({
        type: 'success',
        text: 'Admin override deleted. Students now see the built-in curriculum note for that week.'
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Removed locally; Firestore delete error: ${err?.message || 'Check admin permissions.'}`
      });
    }
  };

  const filteredNotes = useMemo(() => {
    return adminLessonNotes.filter(note => {
      if (filterClass !== 'ALL' && note.classLevel !== filterClass) return false;
      if (filterTerm !== 'ALL' && note.term !== filterTerm) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          note.subject.toLowerCase().includes(q) ||
          note.topicTitle.toLowerCase().includes(q) ||
          note.classLevel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [adminLessonNotes, filterClass, filterTerm, searchQuery]);

  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-3 sm:px-6 py-4 space-y-5 touch-pan-y text-slate-100 pb-20">
      {/* Studio Top Bar */}
      <div className="bg-[#0F1E36] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 flex items-center justify-center text-slate-200 transition-colors cursor-pointer shrink-0"
            title="Return to Super Admin User Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Super Admin Lesson Notes Studio
              </h1>
              <span className="text-[11px] font-bold text-[#84E000] tabular-nums">
                {adminLessonNotes.length} Published Override{adminLessonNotes.length === 1 ? '' : 's'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Upload or author official lesson notes for any Class (JSS 1–SS 3), Stream, Term (1st–3rd), Week (1–13), and Subject.
            </p>
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div className="flex items-center gap-2 shrink-0">
          {currentUser ? (
            <div className="px-3 min-h-[40px] rounded-xl bg-emerald-950/70 border border-emerald-700/60 flex items-center gap-2 text-xs text-emerald-300 font-semibold whitespace-nowrap">
              <Cloud className="w-4 h-4 text-[#84E000]" />
              <span>Firestore Cloud Sync: {currentUser.email}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={authLoading}
              className="px-3.5 min-h-[44px] rounded-xl bg-[#FF5B00] hover:bg-[#e85300] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <CloudOff className="w-4 h-4" />
              <span>{authLoading ? 'Connecting...' : 'Connect Google Cloud Sync'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Inline Feedback Banner */}
      {statusMessage && (
        <div
          className={`rounded-2xl p-3.5 border flex items-start justify-between gap-3 text-xs ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-200'
              : statusMessage.type === 'warning'
              ? 'bg-amber-950/60 border-amber-700/70 text-amber-200'
              : 'bg-rose-950/60 border-rose-700/70 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="p-1 text-slate-400 hover:text-white cursor-pointer shrink-0"
            aria-label="Dismiss status message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Composer Card */}
      <form
        onSubmit={handlePublishNote}
        className="bg-[#0D1829] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-5"
      >
        {/* 1. Target Curriculum Slot Selector */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#84E000]" />
                <span>1. Target Class, Term, Week & Subject</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Published notes override the matching built-in week note across student readers.
              </p>
            </div>
            {editingNoteId && (
              <button
                type="button"
                onClick={handleResetEditor}
                className="px-3 min-h-[38px] rounded-xl bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Editor</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Class Level */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Class Level
              </label>
              <select
                value={classLevel}
                onChange={e => handleClassChange(e.target.value as SecondaryClassLevel)}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
              >
                {CLASS_LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Stream */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Stream / Track
              </label>
              {classLevel.startsWith('JSS') ? (
                <select
                  value="Junior"
                  disabled
                  className="w-full min-h-[44px] bg-[#091222] border border-slate-800 rounded-xl px-3 text-xs text-slate-300 opacity-80"
                >
                  <option value="Junior">Junior Secondary</option>
                </select>
              ) : (
                <select
                  value={stream}
                  onChange={e => setStream(e.target.value as AdminLessonNoteStream)}
                  className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
                >
                  <option value="Science">Science</option>
                  <option value="Non-Science">Non-Science / Arts</option>
                  <option value="All">All SS Streams</option>
                </select>
              )}
            </div>

            {/* Term */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Academic Term
              </label>
              <select
                value={term}
                onChange={e => setTerm(e.target.value as TermOption)}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
              >
                {TERMS.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Week 1 - 13 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Week (1–13)
              </label>
              <select
                value={weekNumber}
                onChange={e => setWeekNumber(Number(e.target.value))}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3 text-xs text-white tabular-nums focus:outline-none focus:border-[#84E000] cursor-pointer"
              >
                {WEEKS.map(w => (
                  <option key={w} value={w}>
                    Week {String(w).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
              >
                {availableSubjects.map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
                <option value="__CUSTOM__">+ Custom Subject...</option>
              </select>
            </div>
          </div>

          {/* Custom Subject Input */}
          {selectedSubject === '__CUSTOM__' && (
            <div>
              <label className="text-[11px] font-semibold text-[#84E000] block mb-1">
                Enter Custom Subject Name
              </label>
              <input
                type="text"
                value={customSubject}
                onChange={e => setCustomSubject(e.target.value)}
                placeholder="e.g., Further Yoruba, Technical Drawing, Robotics..."
                className="w-full min-h-[44px] bg-[#091222] border border-[#84E000]/50 rounded-xl px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
              />
            </div>
          )}

          {/* Slot Status Indicator & Quick Pre-Fill */}
          <div className="rounded-xl bg-[#091222] border border-slate-800 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            {existingOverrideForSlot ? (
              <>
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
                  <span>
                    Active Super Admin override exists: <strong className="text-white">{existingOverrideForSlot.topicTitle}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => loadTopicIntoEditor(existingOverrideForSlot)}
                  className="px-3 min-h-[38px] rounded-lg bg-[#84E000] hover:bg-[#75c700] text-slate-950 font-bold text-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  Load Override to Edit
                </button>
              </>
            ) : existingBuiltInForSlot ? (
              <>
                <div className="flex items-center gap-2 text-amber-200">
                  <BookOpen className="w-4 h-4 text-[#FF5B00] shrink-0" />
                  <span>
                    Built-in note active: <strong className="text-white">{existingBuiltInForSlot.topicTitle}</strong> (publishing replaces it)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    loadTopicIntoEditor({
                      topicTitle: existingBuiltInForSlot.topicTitle,
                      summary: existingBuiltInForSlot.summary,
                      readingTimeMinutes: existingBuiltInForSlot.readingTimeMinutes,
                      subtopics: existingBuiltInForSlot.subtopics,
                      keyTakeaways: existingBuiltInForSlot.keyTakeaways,
                      contentMarkdown: existingBuiltInForSlot.contentMarkdown
                    })
                  }
                  className="px-3 min-h-[38px] rounded-lg bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-slate-100 font-semibold text-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  Copy Built-In Note to Edit
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-4 h-4 text-[#84E000] shrink-0" />
                <span>
                  Empty week slot for <strong className="text-slate-200">{classLevel} · {term} · Week {weekNumber} · {effectiveSubject || 'Subject'}</strong> — publishing adds a live note here.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Mode Switcher (Mode 1: Markdown + File Upload vs Mode 2: Structured Builder) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#FF5B00]" />
              <span>2. Choose Authoring / Upload Method</span>
            </h2>

            <div className="grid grid-cols-2 bg-[#091222] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => handleSwitchMode('markdown')}
                className={`px-3 min-h-[40px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  uploadMode === 'markdown'
                    ? 'bg-[#84E000] text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileUp className="w-3.5 h-3.5" />
                <span>1. Markdown + File Upload</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode('structured')}
                className={`px-3 min-h-[40px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  uploadMode === 'structured'
                    ? 'bg-[#FF5B00] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Structured Builder</span>
              </button>
            </div>
          </div>

          {/* Common Core Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Lesson Topic Title *
              </label>
              <input
                type="text"
                value={topicTitle}
                onChange={e => setTopicTitle(e.target.value)}
                placeholder={`e.g., Week ${weekNumber} Lesson: Laws of Indices & Logarithms`}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Est. Study Time (mins)
              </label>
              <input
                type="number"
                min={1}
                max={180}
                value={readingTimeMinutes}
                onChange={e => setReadingTimeMinutes(Number(e.target.value))}
                className="w-full min-h-[44px] bg-[#091222] border border-slate-700 rounded-xl px-3.5 text-xs text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
              />
              <p className="text-[10px] text-slate-400 mt-1 tabular-nums">
                Student verification target: <span className="text-emerald-400 font-semibold">{effectiveStudyMinutesPreview} min</span>
              </p>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Lesson Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Concise 1-2 sentence overview students see on the syllabus card before opening the note..."
              className="w-full bg-[#091222] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
            />
          </div>

          {/* File Import / PDF Handout Bar (Available in Mode 1 and optional PDF handout in Mode 2) */}
          <div className="rounded-xl bg-[#091222] border border-dashed border-slate-700 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Upload className="w-4 h-4 text-[#84E000]" />
                <span>
                  {uploadMode === 'markdown'
                    ? 'Import .MD / .TXT Lesson File or Attach .PDF Handout'
                    : 'Optional: Attach Supporting .PDF Handout'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {uploadMode === 'markdown'
                  ? 'Upload .md or .txt to auto-fill the editor, or attach a .pdf handout (up to 450 KB).'
                  : 'Attach a downloadable .pdf worksheet or handout alongside your structured sections (up to 450 KB).'}
              </p>
              {attachmentName && (
                <div className="inline-flex items-center gap-2 pt-1 text-xs text-[#84E000] font-semibold">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attached: {attachmentName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachmentName('');
                      setAttachmentDataUrl('');
                    }}
                    className="text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept={uploadMode === 'markdown' ? '.md,.txt,.pdf' : '.pdf'}
                onChange={handleFileImport}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 min-h-[44px] rounded-xl bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-xs font-bold text-white flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileUp className="w-4 h-4 text-[#84E000]" />
                <span>{uploadMode === 'markdown' ? 'Choose .MD / .TXT / .PDF' : 'Attach .PDF File'}</span>
              </button>
            </div>
          </div>

          {/* MODE 1: MARKDOWN EDITOR + LIVE PREVIEW */}
          {uploadMode === 'markdown' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-300">
                  Markdown & LaTeX Math Content *
                </label>
                <button
                  type="button"
                  onClick={() => setShowMarkdownPreview(prev => !prev)}
                  className="px-3 min-h-[36px] rounded-lg bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-[11px] font-bold text-[#84E000] flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showMarkdownPreview ? 'Back to Editor' : 'Preview Outline'}</span>
                </button>
              </div>

              {showMarkdownPreview ? (
                <div className="rounded-xl bg-[#091222] border border-slate-700 p-4 space-y-3 min-h-[240px] max-h-[380px] overflow-y-auto text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {contentMarkdown.trim() ? (
                    contentMarkdown
                  ) : (
                    <span className="text-slate-500">Nothing entered yet. Switch back to Editor to write or import Markdown.</span>
                  )}
                </div>
              ) : (
                <textarea
                  rows={10}
                  value={contentMarkdown}
                  onChange={e => setContentMarkdown(e.target.value)}
                  placeholder={`### 1. Core Definitions\nWrite clear Nigerian curriculum explanations here...\n\n### 2. Worked Examples\nUse Markdown lists, tables, and math formulas like $E = mc^2$.`}
                  className="w-full bg-[#091222] border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 font-mono leading-relaxed placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                />
              )}
            </div>
          )}

          {/* MODE 2: STRUCTURED LESSON BUILDER */}
          {uploadMode === 'structured' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-300">
                  Structured Lesson Sections *
                </label>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="px-3 min-h-[38px] rounded-xl bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-xs font-bold text-[#84E000] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="rounded-xl bg-[#091222] border border-slate-800 p-3.5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#FF5B00] tabular-nums">
                        Section {idx + 1}
                      </span>
                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(sec.id)}
                          className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={e => handleUpdateSection(sec.id, 'heading', e.target.value)}
                      placeholder={`Section ${idx + 1} Heading (e.g., Laws of Thermodynamics)`}
                      className="w-full min-h-[42px] bg-[#0D1829] border border-slate-700 rounded-lg px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5B00]"
                    />
                    <textarea
                      rows={4}
                      value={sec.body}
                      onChange={e => handleUpdateSection(sec.id, 'body', e.target.value)}
                      placeholder="Write detailed explanation, bullet points, or worked calculation steps..."
                      className="w-full bg-[#0D1829] border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FF5B00]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtopics & Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Subtopics (One per line or comma-separated)
              </label>
              <textarea
                rows={3}
                value={subtopicsText}
                onChange={e => setSubtopicsText(e.target.value)}
                placeholder={'Definition & Key Concepts\nNigerian Case Studies\nExam Past Question Applications'}
                className="w-full bg-[#091222] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Key Takeaways / WAEC Exam Tips (One per line)
              </label>
              <textarea
                rows={3}
                value={takeawaysText}
                onChange={e => setTakeawaysText(e.target.value)}
                placeholder={'Always show clear working steps in WAEC Section B.\nVerify SI units before final substitution.'}
                className="w-full bg-[#091222] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
              />
            </div>
          </div>

          {/* Publish Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Target Slot: <strong className="text-white">{classLevel}</strong> · <strong className="text-white">{stream}</strong> · <strong className="text-white">{term}</strong> · <strong className="text-[#84E000] tabular-nums">Week {weekNumber}</strong> · <strong className="text-white">{effectiveSubject || '—'}</strong>
            </span>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 min-h-[48px] rounded-xl bg-[#84E000] hover:bg-[#75c700] text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSaving
                  ? 'Publishing Lesson Note...'
                  : existingOverrideForSlot || editingNoteId
                  ? 'Update & Override Week Note'
                  : 'Publish Lesson Note'}
              </span>
            </button>
          </div>
        </div>
      </form>

      {/* 3. Published Super Admin Lesson Notes Registry */}
      <div className="bg-[#0D1829] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#84E000]" />
              <span>Published Super Admin Lesson Notes</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Edit any uploaded lesson note or delete an override to revert that week to the built-in NERDC note.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search subject or topic..."
                className="min-h-[40px] bg-[#091222] border border-slate-700 rounded-xl pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
              />
            </div>

            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="min-h-[40px] bg-[#091222] border border-slate-700 rounded-xl px-2.5 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
            >
              <option value="ALL">All Classes</option>
              {CLASS_LEVELS.map(lvl => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>

            <select
              value={filterTerm}
              onChange={e => setFilterTerm(e.target.value)}
              className="min-h-[40px] bg-[#091222] border border-slate-700 rounded-xl px-2.5 text-xs text-white focus:outline-none focus:border-[#84E000] cursor-pointer"
            >
              <option value="ALL">All Terms</option>
              {TERMS.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="rounded-xl bg-[#091222] border border-slate-800 p-8 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="text-xs font-bold text-slate-200">
              {adminLessonNotes.length === 0
                ? 'No Super Admin Lesson Notes Uploaded Yet'
                : 'No Lesson Notes Match Current Filters'}
            </h3>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Select a Class, Term, Week (1–13), and Subject above to upload a Markdown/PDF or structured note.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-[#091222]">
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#0F1D33] transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                    <span className="font-bold text-[#84E000]">{note.classLevel}</span>
                    <span>·</span>
                    <span>{note.stream}</span>
                    <span>·</span>
                    <span>{note.term}</span>
                    <span>·</span>
                    <span className="font-mono font-bold text-[#FF5B00] tabular-nums">
                      Wk {String(note.weekNumber).padStart(2, '0')}
                    </span>
                    <span>·</span>
                    <span className="text-slate-200 font-semibold">{note.subject}</span>
                    {note.attachmentName && (
                      <>
                        <span>·</span>
                        <span className="text-sky-300 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {note.attachmentName}
                        </span>
                      </>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {note.topicTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {note.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => loadTopicIntoEditor(note)}
                    className="px-3 min-h-[40px] rounded-xl bg-[#15253F] hover:bg-[#1E335A] border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#84E000]" />
                    <span>Edit</span>
                  </button>

                  {confirmDeleteId === note.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="px-3 min-h-[40px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer whitespace-nowrap"
                      >
                        Confirm Revert
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2.5 min-h-[40px] rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(note.id)}
                      className="px-3 min-h-[40px] rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
