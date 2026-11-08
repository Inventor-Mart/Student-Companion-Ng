import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WhiteboardTool, WhiteboardStroke, BoardStickerNote } from '../../types';
import {
  Pen,
  Highlighter,
  Eraser,
  Minus,
  Square,
  Circle,
  Triangle,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Grid,
  FileText,
  SquareDashed,
  Sparkles,
  Type,
  Mic,
  MicOff,
  Check,
  X,
  Plus,
  GripVertical,
  Edit3,
  Move
} from 'lucide-react';

interface CollaborativeWhiteboardProps {
  participantRole: 'student' | 'tutor';
  topic: string;
  onStrokeDrawn?: (stroke: WhiteboardStroke) => void;
}

const COLOR_PALETTE = [
  { name: 'Chalk White', hex: '#F8FAFC' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Amber Gold', hex: '#F59E0B' },
  { name: 'Coral Red', hex: '#F43F5E' },
  { name: 'Violet', hex: '#A855F7' }
];

const MATH_STAMPS = ['∫', '∑', '√x', 'π', 'θ', 'd/dx', '⇌', 'Δ', 'λ', '∞'];

const CollaborativeWhiteboardComponent: React.FC<CollaborativeWhiteboardProps> = ({
  participantRole,
  topic,
  onStrokeDrawn
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tools & Appearance
  const [activeTool, setActiveTool] = useState<WhiteboardTool>('pen');
  const [activeColor, setActiveColor] = useState<string>('#F8FAFC');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [activeStamp, setActiveStamp] = useState<string>('√x');
  const [gridMode, setGridMode] = useState<'blank' | 'ruled' | 'graph'>('graph');

  // Stroke History
  const [strokes, setStrokes] = useState<WhiteboardStroke[]>([]);
  const [redoStack, setRedoStack] = useState<WhiteboardStroke[]>([]);

  // Movable & Editable Sticker Notes on Whiteboard
  const [stickerNotes, setStickerNotes] = useState<BoardStickerNote[]>([
    {
      id: 'sn-init-1',
      type: 'text',
      x: 36,
      y: 72,
      text: 'Lesson Objective: Quadratic Equations\n• Formula: x = (-b ± √(b² - 4ac)) / 2a\n• Direct substitution practice',
      color: '#38BDF8',
      fontSize: 15,
      authorRole: 'tutor'
    },
    {
      id: 'sn-init-2',
      type: 'text',
      x: 36,
      y: 190,
      text: 'JAMB Practice Focus:\nSolve 2x² - 5x + 3 = 0\n(💡 Drag note to move · Double-click to edit)',
      color: '#10B981',
      fontSize: 14,
      authorRole: 'student'
    }
  ]);

  // Active Inline Direct Typing Composer
  const [activeInlineEditor, setActiveInlineEditor] = useState<{
    id?: string;
    x: number;
    y: number;
    text: string;
    fontSize: number;
    color: string;
    isEditingExisting: boolean;
  } | null>(null);

  // Dragging state for sticker notes
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const dragStartPosRef = useRef<{
    noteId: string;
    startPointerX: number;
    startPointerY: number;
    noteStartX: number;
    noteStartY: number;
  } | null>(null);

  // Speech-to-Text State
  const [isSpeechListening, setIsSpeechListening] = useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // High Performance Drawing Refs (Bypasses React State during mouse move for 60FPS)
  const isDrawingRef = useRef<boolean>(false);
  const currentPointsRef = useRef<{ x: number; y: number }[]>([]);
  const rafIdRef = useRef<number | null>(null);

  // Renders the background chalkboard & grid onto the canvas
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Deep chalkboard slate
    ctx.fillStyle = '#08101D';
    ctx.fillRect(0, 0, width, height);

    if (gridMode === 'ruled') {
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.45)';
      ctx.lineWidth = 1;
      const lineSpacing = 32;
      for (let y = lineSpacing; y < height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (gridMode === 'graph') {
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.lineWidth = 1;
      const gridSpacing = 28;
      for (let x = gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Main Cartesian axes in center
      const midX = Math.floor(width / 2);
      const midY = Math.floor(height / 2);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, height);
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();
    }
  }, [gridMode]);

  // Renders an individual stroke
  const renderSingleStroke = (ctx: CanvasRenderingContext2D, stroke: WhiteboardStroke) => {
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.tool === 'highlighter') {
      ctx.globalAlpha = 0.35;
    }

    if (stroke.tool === 'pen' || stroke.tool === 'highlighter' || stroke.tool === 'eraser') {
      if (stroke.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      } else if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (stroke.tool === 'line' && stroke.points.length >= 2) {
      const start = stroke.points[0];
      const end = stroke.points[stroke.points.length - 1];
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    } else if (stroke.tool === 'rect' && stroke.points.length >= 2) {
      const start = stroke.points[0];
      const end = stroke.points[stroke.points.length - 1];
      ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else if (stroke.tool === 'circle' && stroke.points.length >= 2) {
      const start = stroke.points[0];
      const end = stroke.points[stroke.points.length - 1];
      const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (stroke.tool === 'triangle' && stroke.points.length >= 2) {
      const start = stroke.points[0];
      const end = stroke.points[stroke.points.length - 1];
      ctx.beginPath();
      ctx.moveTo(start.x, end.y);
      ctx.lineTo(end.x, end.y);
      ctx.lineTo(start.x, start.y);
      ctx.closePath();
      ctx.stroke();
    } else if (stroke.tool === 'stamp' && stroke.points.length > 0 && stroke.stampSymbol) {
      const pos = stroke.points[0];
      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stroke.stampSymbol, pos.x, pos.y);
    } else if (stroke.tool === 'text' && stroke.points.length > 0 && stroke.text) {
      const pos = stroke.points[0];
      const fontSize = stroke.fontSize || 18;
      ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // Support multi-line typed lesson notes
      const lines = stroke.text.split('\n');
      const lineHeight = fontSize * 1.35;
      lines.forEach((line, idx) => {
        ctx.fillText(line, pos.x, pos.y + idx * lineHeight);
      });
    }

    ctx.restore();
  };

  // Full canvas redraw function
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx, canvas.width, canvas.height);
    strokes.forEach(stroke => renderSingleStroke(ctx, stroke));
  }, [drawBackground, strokes]);

  // Sync canvas size on mount/resize
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        redrawCanvas();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Coordinate extractor
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // ==========================================
  // BUTTER-SMOOTH DIRECT CANVAS 2D DRAWING ENGINE
  // ==========================================
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const pos = getCoordinates(e);

    // If text tool active, open typing card at clicked point
    if (activeTool === 'text') {
      setActiveInlineEditor({
        x: Math.min(pos.x, (containerRef.current?.clientWidth || 800) - 320),
        y: Math.min(pos.y, (containerRef.current?.clientHeight || 600) - 220),
        text: '',
        fontSize: 16,
        color: activeColor,
        isEditingExisting: false
      });
      return;
    }

    // If stamp tool active, place movable formula sticker note
    if (activeTool === 'stamp') {
      const newNote: BoardStickerNote = {
        id: `sn-stamp-${Date.now()}`,
        type: 'stamp',
        x: Math.max(10, pos.x - 24),
        y: Math.max(50, pos.y - 24),
        text: activeStamp,
        color: activeColor,
        fontSize: 26,
        stampSymbol: activeStamp,
        authorRole: participantRole
      };
      setStickerNotes(prev => [...prev, newNote]);
      return;
    }

    // Freehand / Geometric tools: start direct drawing
    isDrawingRef.current = true;
    currentPointsRef.current = [pos];

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'eraser') {
      ctx.save();
      ctx.strokeStyle = activeTool === 'eraser' ? '#08101D' : activeColor;
      ctx.fillStyle = activeTool === 'eraser' ? '#08101D' : activeColor;
      ctx.lineWidth = activeTool === 'highlighter' ? 18 : activeTool === 'eraser' ? brushSize * 4 : brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (activeTool === 'highlighter') ctx.globalAlpha = 0.35;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getCoordinates(e);
    const points = currentPointsRef.current;
    const lastPos = points[points.length - 1];
    points.push(pos);

    // Freehand Drawing: Incremental direct GPU line segment (ZERO React re-renders)
    if (activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'eraser') {
      if (lastPos) {
        ctx.save();
        ctx.strokeStyle = activeTool === 'eraser' ? '#08101D' : activeColor;
        ctx.lineWidth = activeTool === 'highlighter' ? 18 : activeTool === 'eraser' ? brushSize * 4 : brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (activeTool === 'highlighter') ctx.globalAlpha = 0.35;

        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.restore();
      }
    } else {
      // Geometric Shapes: Request animation frame preview to avoid redraw bottleneck
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        redrawCanvas();
        if (points.length < 2) return;
        const start = points[0];
        const current = pos;

        ctx.save();
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (activeTool === 'line') {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(current.x, current.y);
          ctx.stroke();
        } else if (activeTool === 'rect') {
          ctx.strokeRect(start.x, start.y, current.x - start.x, current.y - start.y);
        } else if (activeTool === 'circle') {
          const radius = Math.sqrt(Math.pow(current.x - start.x, 2) + Math.pow(current.y - start.y, 2));
          ctx.beginPath();
          ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (activeTool === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(start.x, current.y);
          ctx.lineTo(current.x, current.y);
          ctx.lineTo(start.x, start.y);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }

    isDrawingRef.current = false;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const points = [...currentPointsRef.current];
    currentPointsRef.current = [];

    if (points.length > 0) {
      const newStroke: WhiteboardStroke = {
        id: `stk-${Date.now()}`,
        tool: activeTool,
        color: activeTool === 'eraser' ? '#08101D' : activeColor,
        width: activeTool === 'highlighter' ? 18 : activeTool === 'eraser' ? brushSize * 4 : brushSize,
        points: points
      };
      setStrokes(prev => [...prev, newStroke]);
      setRedoStack([]);
      onStrokeDrawn?.(newStroke);
    }
  };

  // ==========================================
  // MOVABLE & EDITABLE STICKER NOTE HANDLERS
  // ==========================================
  const handleStartDragNote = (note: BoardStickerNote, e: React.PointerEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture?.(e.pointerId);
    setDraggingNoteId(note.id);
    dragStartPosRef.current = {
      noteId: note.id,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      noteStartX: note.x,
      noteStartY: note.y
    };
  };

  const handlePointerMoveNote = (e: React.PointerEvent) => {
    if (!dragStartPosRef.current) return;
    e.stopPropagation();
    const { noteId, startPointerX, startPointerY, noteStartX, noteStartY } = dragStartPosRef.current;
    const dx = e.clientX - startPointerX;
    const dy = e.clientY - startPointerY;

    setStickerNotes(prev =>
      prev.map(n => {
        if (n.id !== noteId) return n;
        const container = containerRef.current;
        const maxX = container ? container.clientWidth - 140 : 1000;
        const maxY = container ? container.clientHeight - 60 : 800;
        return {
          ...n,
          x: Math.max(10, Math.min(maxX, noteStartX + dx)),
          y: Math.max(50, Math.min(maxY, noteStartY + dy))
        };
      })
    );
  };

  const handlePointerUpNote = (e: React.PointerEvent) => {
    if (dragStartPosRef.current) {
      e.stopPropagation();
      dragStartPosRef.current = null;
      setDraggingNoteId(null);
    }
  };

  const handleStartEditNote = (note: BoardStickerNote, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveInlineEditor({
      id: note.id,
      x: note.x,
      y: note.y,
      text: note.text,
      fontSize: note.fontSize,
      color: note.color,
      isEditingExisting: true
    });
  };

  const handleDeleteNote = (noteId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStickerNotes(prev => prev.filter(n => n.id !== noteId));
  };

  // Commit typed note directly to the board as a movable sticker
  const handleCommitInlineNote = () => {
    if (!activeInlineEditor || !activeInlineEditor.text.trim()) {
      setActiveInlineEditor(null);
      return;
    }

    if (activeInlineEditor.isEditingExisting && activeInlineEditor.id) {
      setStickerNotes(prev =>
        prev.map(n =>
          n.id === activeInlineEditor.id
            ? {
                ...n,
                text: activeInlineEditor.text.trim(),
                fontSize: activeInlineEditor.fontSize,
                color: activeInlineEditor.color
              }
            : n
        )
      );
    } else {
      const newNote: BoardStickerNote = {
        id: `sn-${Date.now()}`,
        type: 'text',
        x: activeInlineEditor.x,
        y: activeInlineEditor.y,
        text: activeInlineEditor.text.trim(),
        color: activeInlineEditor.color,
        fontSize: activeInlineEditor.fontSize,
        authorRole: participantRole
      };
      setStickerNotes(prev => [...prev, newNote]);
    }

    setActiveInlineEditor(null);
  };

  // ==========================================
  // SPEECH-TO-TEXT LESSON NOTE TRANSCRIBER
  // ==========================================
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!isSpeechListening) {
      setSpeechError(null);
      if (!SpeechRecognition) {
        // Fallback simulation note for environments without Web Speech API
        setSpeechTranscript("Teacher: Let's solve for x: x² - 5x + 6 = 0. Factors are (x - 2)(x - 3) = 0, so x = 2 or x = 3.");
        setIsSpeechListening(true);
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-NG'; // Nigerian English standard

        recognition.onstart = () => {
          setIsSpeechListening(true);
          setSpeechTranscript('Listening to teacher explanation...');
        };

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript + ' ';
          }
          setSpeechTranscript(current.trim());
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
          setSpeechError('Microphone audio quiet or not recognized. Try typing or speaking closer.');
        };

        recognition.onend = () => {
          setIsSpeechListening(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err: any) {
        setSpeechError('Could not start speech recognition in this browser.');
        setIsSpeechListening(false);
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsSpeechListening(false);
    }
  };

  const handlePostSpeechToBoard = () => {
    if (!speechTranscript.trim()) return;

    // Place speech note as a movable sticker on the board
    const canvas = canvasRef.current;
    const posX = canvas ? Math.max(40, canvas.width * 0.1) : 40;
    const posY = canvas ? Math.max(70, canvas.height * 0.15 + (stickerNotes.length % 4) * 60) : 70;

    const newNote: BoardStickerNote = {
      id: `sn-speech-${Date.now()}`,
      type: 'text',
      x: posX,
      y: posY,
      text: `🎤 Spoken Note: ${speechTranscript.trim()}`,
      color: activeColor,
      fontSize: 15,
      authorRole: participantRole
    };

    setStickerNotes(prev => [...prev, newNote]);
    setSpeechTranscript('');
    setIsSpeechListening(false);
  };

  // Undo / Redo / Clear
  const handleUndo = () => {
    if (strokes.length === 0) return;
    const last = strokes[strokes.length - 1];
    setStrokes(prev => prev.slice(0, prev.length - 1));
    setRedoStack(prev => [last, ...prev]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack(prev => prev.slice(1));
    setStrokes(prev => [...prev, next]);
  };

  const handleClearBoard = () => {
    setStrokes([]);
    setRedoStack([]);
    setStickerNotes([]);
    setActiveInlineEditor(null);
  };

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create high-res composite export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw chalkboard & drawn ink strokes
    ctx.drawImage(canvas, 0, 0);

    // 2. Draw all placed sticker notes with authentic dark card frames
    stickerNotes.forEach(note => {
      ctx.save();
      const lines = note.text.split('\n');
      const fontSize = note.fontSize || 15;
      ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;

      let maxLineWidth = 0;
      lines.forEach(l => {
        const w = ctx.measureText(l).width;
        if (w > maxLineWidth) maxLineWidth = w;
      });
      const cardW = Math.max(140, maxLineWidth + 32);
      const cardH = lines.length * (fontSize * 1.45) + 36;

      // Dark card container
      ctx.fillStyle = 'rgba(11, 21, 38, 0.94)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(note.x, note.y, cardW, cardH, 10);
      ctx.fill();
      ctx.stroke();

      // Top accent indicator line
      ctx.fillStyle = note.color;
      ctx.beginPath();
      ctx.roundRect(note.x + 3, note.y + 3, cardW - 6, 3, 2);
      ctx.fill();

      // Note text
      ctx.fillStyle = note.color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const lineHeight = fontSize * 1.45;
      lines.forEach((line, idx) => {
        ctx.fillText(line, note.x + 16, note.y + 16 + idx * lineHeight);
      });

      ctx.restore();
    });

    const imageUri = exportCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imageUri;
    a.download = `LessonNotes_${topic.replace(/\s+/g, '_')}_${Date.now()}.png`;
    a.click();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col bg-[#08101D] select-none overflow-hidden touch-none"
    >
      {/* Top Floating Whiteboard Control Bar */}
      <div className="absolute top-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Drawing Tools & Text Typing Mode */}
        <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setActiveTool('pen')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'pen'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Freehand Pen (High-Velocity 60FPS)"
          >
            <Pen className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('text')}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              activeTool === 'text'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Type Lesson Notes (Click on board to type)"
          >
            <Type className="w-4 h-4" />
            <span className="text-[10px] font-bold hidden sm:inline">Type</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('highlighter')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'highlighter'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Translucent Highlighter"
          >
            <Highlighter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('eraser')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'eraser'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Chalk Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

          {/* Geometric Rulers */}
          <button
            type="button"
            onClick={() => setActiveTool('line')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'line'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Line Ruler"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('rect')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'rect'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('circle')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'circle'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Circle / Compass"
          >
            <Circle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('triangle')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTool === 'triangle'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Right Triangle / Set Square"
          >
            <Triangle className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

          {/* Speech-to-Text Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
              isSpeechListening
                ? 'bg-red-600 text-white shadow-md animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Speech-to-Text Lesson Notes"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden md:inline">
              {isSpeechListening ? 'Listening...' : 'Speech Notes'}
            </span>
          </button>
        </div>

        {/* Right: Board Utilities (Undo, Redo, Grid, Snapshot) */}
        <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl pointer-events-auto">
          {/* Grid Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              setGridMode(prev => (prev === 'graph' ? 'ruled' : prev === 'ruled' ? 'blank' : 'graph'));
            }}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={`Current Grid: ${gridMode.toUpperCase()} (Click to toggle)`}
          >
            {gridMode === 'graph' && <Grid className="w-4 h-4 text-emerald-400" />}
            {gridMode === 'ruled' && <FileText className="w-4 h-4 text-sky-400" />}
            {gridMode === 'blank' && <SquareDashed className="w-4 h-4 text-slate-400" />}
          </button>

          <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

          <button
            type="button"
            disabled={strokes.length === 0}
            onClick={handleUndo}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            disabled={redoStack.length === 0}
            onClick={handleRedo}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClearBoard}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Clear Board"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

          <button
            type="button"
            onClick={handleDownloadSnapshot}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download PNG Lesson Notes"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Save Notes</span>
          </button>
        </div>
      </div>

      {/* Floating Speech-to-Text Transcription Banner */}
      {isSpeechListening && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-lg bg-slate-900/95 backdrop-blur-md border border-emerald-500/60 rounded-2xl p-3 shadow-2xl flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-white">Transcribing Live Spoken Lesson...</span>
            </div>
            <button
              onClick={() => setIsSpeechListening(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-emerald-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 font-medium min-h-[44px] max-h-24 overflow-y-auto">
            {speechTranscript || 'Speak clearly into your microphone as you explain...'}
          </p>

          {speechError && (
            <p className="text-[10px] text-amber-400 font-medium">{speechError}</p>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-400">Post spoken notes onto the chalkboard</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSpeechTranscript('')}
                className="px-2 py-1 rounded-lg text-[11px] text-slate-400 hover:text-white bg-slate-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handlePostSpeechToBoard}
                disabled={!speechTranscript.trim()}
                className="px-3 py-1 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Stamp to Board</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movable & Editable Sticker Notes Overlay */}
      {stickerNotes.map(note => {
        const isDragging = draggingNoteId === note.id;
        return (
          <div
            key={note.id}
            onPointerDown={e => handleStartDragNote(note, e)}
            onPointerMove={handlePointerMoveNote}
            onPointerUp={handlePointerUpNote}
            onDoubleClick={e => handleStartEditNote(note, e)}
            style={{
              transform: `translate3d(${note.x}px, ${note.y}px, 0)`,
              touchAction: 'none'
            }}
            className={`absolute top-0 left-0 z-10 max-w-xs sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl select-none group transition-shadow ${
              isDragging
                ? 'cursor-grabbing shadow-emerald-500/25 ring-2 ring-emerald-500/70 z-30'
                : 'cursor-grab hover:border-slate-500 hover:shadow-2xl'
            }`}
          >
            {/* Top Drag Grip & Note Action Strip */}
            <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-300 capitalize">{note.authorRole} Note</span>
                {note.type === 'stamp' && (
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 rounded font-mono border border-emerald-800">
                    Sticker
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={e => handleStartEditNote(note, e)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
                  title="Double-click or click to edit note text"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={e => handleDeleteNote(note.id, e)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete note"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Note Content */}
            <div
              style={{
                color: note.color,
                fontSize: `${note.fontSize}px`,
                lineHeight: 1.45
              }}
              className="font-medium whitespace-pre-wrap break-words"
            >
              {note.text}
            </div>

            <div className="mt-1 text-[9px] text-slate-500 font-mono text-right opacity-0 group-hover:opacity-100 transition-opacity">
              Drag to move · Double-click to edit
            </div>
          </div>
        );
      })}

      {/* Direct In-Place Text Typing Box (Positioned right where clicked) */}
      {activeInlineEditor && (
        <div
          style={{
            left: `${activeInlineEditor.x}px`,
            top: `${activeInlineEditor.y}px`
          }}
          className="absolute z-30 w-72 sm:w-80 bg-slate-900/98 backdrop-blur-md border border-emerald-500 rounded-2xl p-3 shadow-2xl space-y-2 pointer-events-auto"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeInlineEditor.isEditingExisting ? 'Edit Note Text' : 'Type Directly on Board'}</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveInlineEditor(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <textarea
            autoFocus
            rows={3}
            value={activeInlineEditor.text}
            onChange={e => setActiveInlineEditor(prev => prev ? { ...prev, text: e.target.value } : null)}
            placeholder="Type lesson note directly on the board just like chat..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleCommitInlineNote();
              }
            }}
          />

          <div className="flex items-center justify-between pt-1">
            {/* Font size toggles */}
            <div className="flex items-center gap-1">
              {[13, 16, 20, 26].map(sz => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setActiveInlineEditor(prev => prev ? { ...prev, fontSize: sz } : null)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                    activeInlineEditor.fontSize === sz
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sz === 13 ? 'S' : sz === 16 ? 'M' : sz === 20 ? 'L' : 'XL'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveInlineEditor(null)}
                className="px-2 py-1 rounded-lg text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCommitInlineNote}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                <span>{activeInlineEditor.isEditingExisting ? 'Save Note' : 'Stamp Note'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main 2D Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full block touch-none ${
          activeTool === 'eraser'
            ? 'cursor-cell'
            : activeTool === 'text'
            ? 'cursor-text'
            : 'cursor-crosshair'
        }`}
      />

      {/* Bottom Floating Palette & Math Stamper Dock */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Color Palette */}
        <div className="flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl pointer-events-auto">
          {COLOR_PALETTE.map(c => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setActiveColor(c.hex)}
              className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative ${
                activeColor === c.hex ? 'scale-115 ring-2 ring-white shadow-md' : 'hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}

          <div className="w-[1px] h-5 bg-slate-800 mx-1" />

          {/* Stroke Thickness Picker */}
          <div className="flex items-center gap-1">
            {[2, 4, 8].map(sz => (
              <button
                key={sz}
                type="button"
                onClick={() => setBrushSize(sz)}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  brushSize === sz
                    ? 'bg-slate-700 text-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={`Brush Width ${sz}px`}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: `${sz * 1.8}px`, height: `${sz * 1.8}px` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* STEM Math Formula Quick Stampers */}
        <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl overflow-x-auto scrollbar-none max-w-sm pointer-events-auto">
          <div className="flex items-center gap-1 px-1.5 text-amber-400 text-[11px] font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">STEM:</span>
          </div>

          {MATH_STAMPS.map(stamp => (
            <button
              key={stamp}
              type="button"
              onClick={() => {
                setActiveStamp(stamp);
                setActiveTool('stamp');
              }}
              className={`px-2 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTool === 'stamp' && activeStamp === stamp
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-white/50'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
              title={`Stamp ${stamp} on board`}
            >
              {stamp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CollaborativeWhiteboard = React.memo(CollaborativeWhiteboardComponent);
