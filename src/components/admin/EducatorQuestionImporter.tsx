import React, { useState, useEffect } from 'react';
import {
  CloudPastQuestion,
  CloudPastQuestionPaper,
  parseRawQuestionsText,
  uploadPastQuestionsBatch,
  fetchAvailableCloudPapers,
  deleteCloudPaper
} from '../../services/questionService';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';

interface EducatorQuestionImporterProps {
  onClose?: () => void;
  onOpenCBTWithPaper?: (subject: string, year: number) => void;
}

const NIGERIAN_EXAM_SUBJECTS = [
  'Use of English',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
  'Literature in English',
  'Commerce',
  'Agricultural Science',
  'Geography',
  'Christian Religious Studies',
  'Islamic Studies'
];

const SAMPLE_RAW_TEXT = `1. Evaluate the limit of (sin 2x) / x as x approaches 0.
A. 0
B. 1
C. 2
D. 1/2
ANSWER: C
EXPLANATION: By standard trigonometric limit theorem, lim (x->0) (sin kx)/x = k. Here k = 2, so the limit is 2.
TOPIC: Calculus

2. If 2^(2x + 1) = 32, find the value of x.
A. 1
B. 2
C. 3
D. 4
ANSWER: B
EXPLANATION: 32 = 2^5. Therefore, 2x + 1 = 5 => 2x = 4 => x = 2.
TOPIC: Indices & Logarithms

3. A particle moves with a constant acceleration of 3 m/s^2 from rest. Calculate the distance covered in 4 seconds.
A. 12 m
B. 24 m
C. 36 m
D. 48 m
ANSWER: B
EXPLANATION: Using s = ut + 0.5at^2, where u = 0, a = 3 m/s^2, t = 4 s: s = 0 + 0.5 * 3 * (4^2) = 0.5 * 3 * 16 = 24 meters.
TOPIC: Linear Motion

4. Which of the following compounds exhibits hydrogen bonding?
A. CH4
B. H2O
C. HCl
D. H2S
ANSWER: B
EXPLANATION: Water (H2O) contains hydrogen directly bonded to highly electronegative oxygen, creating strong intermolecular hydrogen bonds.
TOPIC: Chemical Bonding`;

export const EducatorQuestionImporter: React.FC<EducatorQuestionImporterProps> = ({
  onClose,
  onOpenCBTWithPaper
}) => {
  const { currentUserProfile } = useApp();

  // Authentication & PIN Gate State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('educator_pin_unlocked') === 'true';
    }
    return false;
  });
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Active View Mode
  const [activeTab, setActiveTab] = useState<'import' | 'archive'>('import');
  const [importMode, setImportMode] = useState<'text' | 'json'>('text');

  // Paper Setup Parameters
  const [examType, setExamType] = useState<'JAMB' | 'WAEC' | 'NECO'>('JAMB');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [examYear, setExamYear] = useState<number>(2024);
  const [durationMinutes, setDurationMinutes] = useState<number>(40);

  // Text Ingestion State
  const [rawText, setRawText] = useState<string>(SAMPLE_RAW_TEXT);
  const [parsedQuestions, setParsedQuestions] = useState<CloudPastQuestion[]>([]);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Upload & Progress State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Cloud Archive State
  const [cloudPapers, setCloudPapers] = useState<CloudPastQuestionPaper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState<boolean>(false);

  // Auto-unlock for verified admin email
  useEffect(() => {
    const email = auth.currentUser?.email || currentUserProfile?.email;
    if (email === 'wowrealities@gmail.com' || email === 'martorefe@gmail.com') {
      setIsUnlocked(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('educator_pin_unlocked', 'true');
      }
    }
  }, [currentUserProfile]);

  // Load cloud papers on archive tab
  useEffect(() => {
    if (activeTab === 'archive' && isUnlocked) {
      loadPapers();
    }
  }, [activeTab, isUnlocked]);

  const loadPapers = async () => {
    setLoadingPapers(true);
    try {
      const papers = await fetchAvailableCloudPapers();
      setCloudPapers(papers);
    } catch (err) {
      console.warn('Error loading papers:', err);
    } finally {
      setLoadingPapers(false);
    }
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (enteredPin === '2026' || enteredPin === '1234') {
      setIsUnlocked(true);
      setPinError(null);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('educator_pin_unlocked', 'true');
      }
    } else {
      setPinError('Incorrect PIN. Please enter the master educator PIN (2026).');
      setEnteredPin('');
    }
  };

  const handleParseText = () => {
    const result = parseRawQuestionsText(rawText, selectedSubject, examYear, examType);
    setParsedQuestions(result.questions);
    setParseWarnings(result.warnings);
    setSelectedQuestionIndex(0);
    setUploadSuccessMessage(null);
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const validated: CloudPastQuestion[] = parsed.map((item, idx) => ({
            id: item.id || `${examType.toLowerCase()}_${selectedSubject.toLowerCase()}_${examYear}_q${idx + 1}`,
            examType: item.examType || examType,
            subject: item.subject || selectedSubject,
            year: item.year || examYear,
            question: item.question || 'Missing question stem',
            options: Array.isArray(item.options) && item.options.length === 4 ? item.options : ['A', 'B', 'C', 'D'],
            correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : 0,
            explanation: item.explanation || 'Official explanation.',
            topic: item.topic || 'General',
            passage: item.passage
          }));
          setParsedQuestions(validated);
          setParseWarnings([]);
          setSelectedQuestionIndex(0);
        } else {
          setParseWarnings(['JSON file must contain an array of question objects.']);
        }
      } catch (err) {
        setParseWarnings(['Failed to parse JSON file. Please ensure it is valid JSON syntax.']);
      }
    };
    reader.readAsText(file);
  };

  const handlePublishToFirestore = async () => {
    if (parsedQuestions.length === 0) {
      setParseWarnings(['No questions to upload. Please parse or paste questions first.']);
      return;
    }

    setIsUploading(true);
    setUploadProgress({ current: 0, total: parsedQuestions.length });
    setUploadSuccessMessage(null);

    const paperId = `${examType.toUpperCase()}_${selectedSubject.replace(/\s+/g, '_')}_${examYear}`;
    const paper: CloudPastQuestionPaper = {
      id: paperId,
      examType,
      subject: selectedSubject,
      year: examYear,
      title: `${examType} ${selectedSubject} (${examYear})`,
      totalQuestions: parsedQuestions.length,
      durationMinutes,
      uploadedBy: auth.currentUser?.email || currentUserProfile?.email || 'Educator',
      createdAt: new Date().toISOString()
    };

    try {
      const result = await uploadPastQuestionsBatch(paper, parsedQuestions, (current, total) => {
        setUploadProgress({ current, total });
      });

      if (result?.success) {
        setUploadSuccessMessage(
          `Successfully published ${result.totalUploaded} questions for ${paper.title} to Cloud Firestore!`
        );
        // Refresh paper list in background
        loadPapers();
      }
    } catch (error: any) {
      setParseWarnings([`Upload failed: ${error?.message || 'Database permission or network error.'}`]);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleUpdateCurrentQuestion = (field: keyof CloudPastQuestion, value: any) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      if (copy[selectedQuestionIndex]) {
        copy[selectedQuestionIndex] = {
          ...copy[selectedQuestionIndex],
          [field]: value
        };
      }
      return copy;
    });
  };

  const handleUpdateOption = (optionIndex: number, text: string) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      if (copy[selectedQuestionIndex]) {
        const newOptions = [...copy[selectedQuestionIndex].options];
        newOptions[optionIndex] = text;
        copy[selectedQuestionIndex] = {
          ...copy[selectedQuestionIndex],
          options: newOptions
        };
      }
      return copy;
    });
  };

  const handleDeleteCurrentQuestion = (indexToDelete: number) => {
    setParsedQuestions(prev => prev.filter((_, idx) => idx !== indexToDelete));
    if (selectedQuestionIndex >= parsedQuestions.length - 1 && selectedQuestionIndex > 0) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    }
  };

  const handleDeletePaper = async (paperId: string) => {
    if (!window.confirm(`Are you sure you want to delete paper "${paperId}" and all its questions from Firestore?`)) {
      return;
    }
    await deleteCloudPaper(paperId);
    loadPapers();
  };

  // PIN Gate Screen
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-emerald-800 text-white p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-emerald-700/80 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Educator & Admin Portal</h2>
            <p className="text-xs text-emerald-200 mt-1">
              Authorized Nigerian Curriculum & Past Question Management
            </p>
          </div>

          <div className="p-6">
            <p className="text-xs text-slate-600 mb-4 text-center">
              Enter your 4-digit educator security PIN to access the bulk question uploader and Firestore paper archive.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={4}
                  autoFocus
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full text-center text-3xl font-mono tracking-widest py-3 border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {pinError && (
                <p className="text-xs text-rose-600 font-medium text-center">
                  {pinError}
                </p>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <span className="text-[11px] text-slate-500 font-medium">Default Verification PIN:</span>{' '}
                <span className="text-xs font-mono font-bold text-emerald-700">2026</span>
              </div>

              <div className="flex gap-3 pt-2">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  Verify & Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = parsedQuestions[selectedQuestionIndex];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-emerald-900 text-white border-b border-emerald-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Curriculum Portal</span>
                <span className="text-xs text-emerald-400">·</span>
                <span className="text-xs text-emerald-300">Cloud Firestore Storage</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold">Past Question Importer & Archive</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-emerald-950/60 p-1 rounded-lg border border-emerald-800 text-xs">
              <button
                onClick={() => setActiveTab('import')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  activeTab === 'import' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-300 hover:text-white'
                }`}
              >
                Upload & Parse
              </button>
              <button
                onClick={() => setActiveTab('archive')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  activeTab === 'archive' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-300 hover:text-white'
                }`}
              >
                Cloud Archive ({cloudPapers.length})
              </button>
            </div>

            <button
              onClick={() => {
                setIsUnlocked(false);
                sessionStorage.removeItem('educator_pin_unlocked');
              }}
              className="p-2 text-xs text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
              title="Lock Portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {uploadSuccessMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-950">{uploadSuccessMessage}</p>
                <p className="text-xs text-emerald-700">Questions are immediately live in Cloud Firestore and will stream during CBT mock sessions.</p>
              </div>
            </div>
            {onOpenCBTWithPaper && (
              <button
                onClick={() => onOpenCBTWithPaper(selectedSubject, examYear)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm whitespace-nowrap transition-colors"
              >
                Test in CBT Simulator →
              </button>
            )}
          </div>
        )}

        {activeTab === 'import' ? (
          <div className="space-y-6">
            {/* Paper Metadata Configuration Strip */}
            <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  1. Paper Metadata Configuration
                </h2>
                <span className="text-xs text-slate-500">Target Firestore Collection: <code className="text-emerald-700 font-mono">/pastQuestions</code></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="JAMB">JAMB UTME (Unified Tertiary Matriculation)</option>
                    <option value="WAEC">WAEC SSCE (Senior School Certificate)</option>
                    <option value="NECO">NECO SSCE (National Examination Council)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  >
                    {NIGERIAN_EXAM_SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Examination Year</label>
                  <input
                    type="number"
                    min={2000}
                    max={2030}
                    value={examYear}
                    onChange={(e) => setExamYear(parseInt(e.target.value, 10) || 2024)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Duration</label>
                  <select
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value={40}>40 Minutes (Standard Single Subject)</option>
                    <option value={60}>60 Minutes (Use of English)</option>
                    <option value={120}>120 Minutes (Full 4-Subject Mock)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Ingestion & Preview Two-Zone Workbench */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Zone: Source Text / JSON Ingestion Deck (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-slate-800">2. Ingestion Source</h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg text-xs">
                      <button
                        onClick={() => setImportMode('text')}
                        className={`px-2.5 py-1 rounded font-medium transition-colors ${
                          importMode === 'text' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Auto-Parser
                      </button>
                      <button
                        onClick={() => setImportMode('json')}
                        className={`px-2.5 py-1 rounded font-medium transition-colors ${
                          importMode === 'json' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Bulk JSON
                      </button>
                    </div>
                  </div>

                  {importMode === 'text' ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-slate-500">Paste questions from Word, PDF, or booklets:</span>
                        <button
                          onClick={() => setRawText(SAMPLE_RAW_TEXT)}
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                          Reset Sample
                        </button>
                      </div>

                      <textarea
                        rows={14}
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        placeholder="1. Question text here...&#10;A. Option A&#10;B. Option B&#10;C. Option C&#10;D. Option D&#10;ANSWER: B&#10;EXPLANATION: Step by step working...&#10;TOPIC: Calculus"
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl p-3 focus:border-emerald-600 focus:outline-none leading-relaxed"
                      />

                      <button
                        onClick={handleParseText}
                        className="mt-3 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Parse & Validate Text
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-600 mb-3">
                        Upload a structured JSON array containing question items with <code className="text-emerald-700">question</code>, <code className="text-emerald-700">options</code> [A,B,C,D], <code className="text-emerald-700">correctAnswer</code> (0-3), and <code className="text-emerald-700">explanation</code>.
                      </p>

                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                        <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <label className="cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                          <span>Select JSON Paper File</span>
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleJsonFileUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-slate-400 mt-1">.json format up to 5MB</p>
                      </div>
                    </div>
                  )}

                  {parseWarnings.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                      <p className="font-semibold text-amber-800">Validation Notices:</p>
                      {parseWarnings.map((warn, i) => (
                        <p key={i} className="text-[11px] leading-tight">• {warn}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Parser Format Reference */}
                <div className="bg-slate-100 rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800 mb-1">Auto-Parser Syntax Guidelines:</p>
                  <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600">
                    <li>Start questions with numbers: <code className="text-emerald-800">1.</code> or <code className="text-emerald-800">1)</code></li>
                    <li>Options must be labeled: <code className="text-emerald-800">A. B. C. D.</code></li>
                    <li>Answers marked with: <code className="text-emerald-800">ANSWER: C</code></li>
                    <li>Optional tags: <code className="text-emerald-800">EXPLANATION:</code> and <code className="text-emerald-800">TOPIC:</code></li>
                    <li>Comprehension passages wrapped in: <code className="text-emerald-800">[PASSAGE] ... [/PASSAGE]</code></li>
                  </ul>
                </div>
              </div>

              {/* Right Zone: Interactive Question Workbench & Live Review (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        3. Parsed Questions Workbench ({parsedQuestions.length})
                      </h2>
                      <p className="text-xs text-slate-500">
                        Review questions, verify answer keys, and tweak explanations before publishing.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePublishToFirestore}
                        disabled={parsedQuestions.length === 0 || isUploading}
                        className={`py-2 px-4 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-all ${
                          parsedQuestions.length > 0 && !isUploading
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isUploading ? (
                          <>
                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Uploading ({uploadProgress?.current || 0}/{uploadProgress?.total || 0})...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Publish to Cloud Firestore
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {parsedQuestions.length === 0 ? (
                    <div className="py-16 text-center text-slate-400">
                      <svg className="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-semibold text-slate-600">No Questions Parsed Yet</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Click "Parse & Validate Text" on the left or upload a JSON file to inspect and edit questions here.
                      </p>
                    </div>
                  ) : (
                    <div className="pt-4 space-y-4">
                      {/* Question Index Pill Matrix */}
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
                        {parsedQuestions.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedQuestionIndex(idx)}
                            className={`w-7 h-7 text-xs font-semibold rounded transition-colors ${
                              selectedQuestionIndex === idx
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Current Question Detail Editor Card */}
                      {currentQ && (
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                Question {selectedQuestionIndex + 1} of {parsedQuestions.length}
                              </span>
                              <input
                                type="text"
                                value={currentQ.topic}
                                onChange={(e) => handleUpdateCurrentQuestion('topic', e.target.value)}
                                placeholder="Topic (e.g. Calculus)"
                                className="text-xs font-medium bg-white border border-slate-300 rounded px-2 py-1 w-44 focus:border-emerald-600 focus:outline-none"
                              />
                            </div>

                            <button
                              onClick={() => handleDeleteCurrentQuestion(selectedQuestionIndex)}
                              className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1"
                              title="Delete Question"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>

                          {/* Optional Comprehension Passage */}
                          {currentQ.passage && (
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Comprehension / Passage</label>
                              <textarea
                                rows={3}
                                value={currentQ.passage}
                                onChange={(e) => handleUpdateCurrentQuestion('passage', e.target.value)}
                                className="w-full text-xs font-serif italic bg-amber-50/50 border border-amber-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                              />
                            </div>
                          )}

                          {/* Question Stem */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Question Prompt</label>
                            <textarea
                              rows={3}
                              value={currentQ.question}
                              onChange={(e) => handleUpdateCurrentQuestion('question', e.target.value)}
                              className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none leading-relaxed"
                            />
                          </div>

                          {/* 4 Options Grid */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Answer Options (Select the radio of the correct answer)
                            </label>
                            <div className="space-y-2">
                              {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                                const isCorrect = currentQ.correctAnswer === optIdx;
                                return (
                                  <div
                                    key={letter}
                                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                                      isCorrect
                                        ? 'bg-emerald-50/80 border-emerald-300'
                                        : 'bg-white border-slate-200'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`correct_${selectedQuestionIndex}`}
                                      checked={isCorrect}
                                      onChange={() => handleUpdateCurrentQuestion('correctAnswer', optIdx)}
                                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <span className="w-5 text-xs font-bold font-mono text-slate-700">{letter}.</span>
                                    <input
                                      type="text"
                                      value={currentQ.options[optIdx] || ''}
                                      onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                                      className="flex-1 text-xs bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1.5 py-1"
                                      placeholder={`Option ${letter}`}
                                    />
                                    {isCorrect && (
                                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                        Correct
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Explanation */}
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Chief Examiner Solution & Explanation
                            </label>
                            <textarea
                              rows={2}
                              value={currentQ.explanation}
                              onChange={(e) => handleUpdateCurrentQuestion('explanation', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:border-emerald-600 focus:outline-none"
                              placeholder="Step by step working..."
                            />
                          </div>

                          {/* Pagination Next / Prev buttons */}
                          <div className="flex items-center justify-between pt-2">
                            <button
                              disabled={selectedQuestionIndex === 0}
                              onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
                              className="py-1.5 px-3 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-40"
                            >
                              ← Previous Question
                            </button>

                            <button
                              disabled={selectedQuestionIndex === parsedQuestions.length - 1}
                              onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
                              className="py-1.5 px-3 text-xs font-medium text-emerald-700 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50 disabled:opacity-40"
                            >
                              Next Question →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Cloud Paper Archive Tab */
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Cloud Past Question Papers</h2>
                  <p className="text-xs text-slate-500">
                    Live papers stored in Cloud Firestore (<code className="font-mono text-emerald-700">/pastQuestionPapers</code>). Available on-demand during CBT mocks.
                  </p>
                </div>
                <button
                  onClick={loadPapers}
                  disabled={loadingPapers}
                  className="py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <svg className={`w-3.5 h-3.5 ${loadingPapers ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>

              {loadingPapers ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs font-medium">Fetching cloud archives from Firestore...</p>
                </div>
              ) : cloudPapers.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-sm font-semibold text-slate-700">No Cloud Papers Uploaded Yet</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Switch to the "Upload & Parse" tab to import your first official JAMB, WAEC, or NECO past paper.
                  </p>
                  <button
                    onClick={() => setActiveTab('import')}
                    className="mt-4 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    Import First Paper →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cloudPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {paper.examType}
                          </span>
                          <span className="font-bold text-slate-700">{paper.year}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-1">{paper.subject}</h3>
                        <div className="text-xs text-slate-500 space-y-0.5">
                          <p>Questions: <span className="font-medium text-slate-800">{paper.totalQuestions} items</span></p>
                          <p>Duration: <span className="font-medium text-slate-800">{paper.durationMinutes || 40} mins</span></p>
                          <p className="text-[11px] text-slate-400">Uploaded by: {paper.uploadedBy}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-200">
                        {onOpenCBTWithPaper ? (
                          <button
                            onClick={() => onOpenCBTWithPaper(paper.subject, paper.year)}
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                          >
                            Launch CBT Test →
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-700 font-medium">Ready in CBT</span>
                        )}

                        <button
                          onClick={() => handleDeletePaper(paper.id)}
                          className="text-xs text-rose-600 hover:text-rose-700 p-1"
                          title="Delete from Firestore"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
