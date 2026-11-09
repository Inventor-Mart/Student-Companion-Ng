import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Pause,
  Play,
  RotateCw,
  ArrowDown,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Trophy,
  Sparkles,
  Award
} from 'lucide-react';

interface TetrisGameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

const COLS = 10;
const ROWS = 20;

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

interface Piece {
  type: TetrominoType;
  shape: number[][];
  color: string;
  glowColor: string;
  x: number;
  y: number;
}

const TETROMINOES: Record<TetrominoType, { shape: number[][]; color: string; glowColor: string }> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 'bg-cyan-400 border-cyan-300 shadow-cyan-400/40',
    glowColor: 'text-cyan-400'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-blue-500 border-blue-400 shadow-blue-500/40',
    glowColor: 'text-blue-400'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-amber-500 border-amber-400 shadow-amber-500/40',
    glowColor: 'text-amber-400'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-400 border-yellow-300 shadow-yellow-400/40',
    glowColor: 'text-yellow-400'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: 'bg-emerald-500 border-emerald-400 shadow-emerald-500/40',
    glowColor: 'text-emerald-400'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-purple-500 border-purple-400 shadow-purple-500/40',
    glowColor: 'text-purple-400'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-rose-500 border-rose-400 shadow-rose-500/40',
    glowColor: 'text-rose-400'
  }
};

const PIECE_TYPES: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

function getRandomPiece(): Piece {
  const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  const { shape, color, glowColor } = TETROMINOES[type];
  return {
    type,
    shape: shape.map(row => [...row]),
    color,
    glowColor,
    x: Math.floor((COLS - shape[0].length) / 2),
    y: 0
  };
}

function rotateMatrix(matrix: number[][]): number[][] {
  const N = matrix.length;
  const result: number[][] = [];
  for (let i = 0; i < N; i++) {
    result[i] = [];
    for (let j = 0; j < N; j++) {
      result[i][j] = matrix[N - j - 1][i];
    }
  }
  return result;
}

export const TetrisGame: React.FC<TetrisGameProps> = ({ onExit, onAwardXP }) => {
  // Empty grid (20 rows x 10 cols)
  const createEmptyGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid);
  const [currentPiece, setCurrentPiece] = useState<Piece>(getRandomPiece);
  const [nextPiece, setNextPiece] = useState<Piece>(getRandomPiece);
  const [heldPieceType, setHeldPieceType] = useState<TetrominoType | null>(null);
  const [canHold, setCanHold] = useState<boolean>(true);

  const [score, setScore] = useState<number>(0);
  const [lines, setLines] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasAwardedXP, setHasAwardedXP] = useState<boolean>(false);

  // Check collision
  const checkCollision = useCallback((piece: Piece, testGrid: (string | null)[][], offsetX = 0, offsetY = 0): boolean => {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] !== 0) {
          const newX = piece.x + c + offsetX;
          const newY = piece.y + r + offsetY;

          if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return true;
          }
          if (newY >= 0 && testGrid[newY][newX] !== null) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // Compute ghost piece position
  const getGhostPieceY = useCallback((): number => {
    let dropY = 0;
    while (!checkCollision(currentPiece, grid, 0, dropY + 1)) {
      dropY++;
    }
    return currentPiece.y + dropY;
  }, [currentPiece, grid, checkCollision]);

  // Lock piece into the grid
  const lockPiece = useCallback((pieceToLock: Piece) => {
    playSound.tetrisDrop();
    const newGrid = grid.map(row => [...row]);

    for (let r = 0; r < pieceToLock.shape.length; r++) {
      for (let c = 0; c < pieceToLock.shape[r].length; c++) {
        if (pieceToLock.shape[r][c] !== 0) {
          const boardY = pieceToLock.y + r;
          const boardX = pieceToLock.x + c;
          if (boardY < 0) {
            // Game Over
            playSound.gameOver();
            setIsGameOver(true);
            return;
          }
          newGrid[boardY][boardX] = pieceToLock.color;
        }
      }
    }

    // Check full lines
    let clearedLines = 0;
    const filteredGrid = newGrid.filter(row => {
      const isFull = row.every(cell => cell !== null);
      if (isFull) clearedLines++;
      return !isFull;
    });

    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(Array(COLS).fill(null));
    }

    if (clearedLines > 0) {
      playSound.tetrisLineClear();
      const pointsTable = [0, 100, 300, 500, 800];
      const addedScore = (pointsTable[clearedLines] || 1000) * level;
      setScore(prev => prev + addedScore);
      setLines(prev => {
        const nextLines = prev + clearedLines;
        const nextLevel = Math.floor(nextLines / 10) + 1;
        if (nextLevel > level) {
          setLevel(nextLevel);
          playSound.levelUp();
        }
        return nextLines;
      });

      if (clearedLines === 4) {
        try {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    }

    setGrid(filteredGrid);
    setCanHold(true);

    // Spawn next piece
    if (checkCollision(nextPiece, filteredGrid, 0, 0)) {
      playSound.gameOver();
      setIsGameOver(true);
    } else {
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
    }
  }, [grid, level, nextPiece, checkCollision]);

  // Move operations
  const moveLeft = useCallback(() => {
    if (isPaused || isGameOver) return;
    if (!checkCollision(currentPiece, grid, -1, 0)) {
      playSound.tetrisMove();
      setCurrentPiece(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, grid, isPaused, isGameOver, checkCollision]);

  const moveRight = useCallback(() => {
    if (isPaused || isGameOver) return;
    if (!checkCollision(currentPiece, grid, 1, 0)) {
      playSound.tetrisMove();
      setCurrentPiece(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, grid, isPaused, isGameOver, checkCollision]);

  const rotatePiece = useCallback(() => {
    if (isPaused || isGameOver) return;
    const rotated = rotateMatrix(currentPiece.shape);
    const candidate: Piece = { ...currentPiece, shape: rotated };

    // Standard wall kicks: test candidate at 0, -1, +1, -2, +2 offset
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (!checkCollision(candidate, grid, kick, 0)) {
        playSound.tetrisRotate();
        setCurrentPiece({ ...candidate, x: candidate.x + kick });
        return;
      }
    }
    // Blocked rotation: play tactile buzz
    playSound.buzz();
  }, [currentPiece, grid, isPaused, isGameOver, checkCollision]);

  const softDrop = useCallback(() => {
    if (isPaused || isGameOver) return;
    if (!checkCollision(currentPiece, grid, 0, 1)) {
      setCurrentPiece(prev => ({ ...prev, y: prev.y + 1 }));
      setScore(prev => prev + 1);
    } else {
      lockPiece(currentPiece);
    }
  }, [currentPiece, grid, isPaused, isGameOver, checkCollision, lockPiece]);

  const hardDrop = useCallback(() => {
    if (isPaused || isGameOver) return;
    let dropDistance = 0;
    while (!checkCollision(currentPiece, grid, 0, dropDistance + 1)) {
      dropDistance++;
    }
    const droppedPiece = { ...currentPiece, y: currentPiece.y + dropDistance };
    setScore(prev => prev + dropDistance * 2);
    lockPiece(droppedPiece);
  }, [currentPiece, grid, isPaused, isGameOver, checkCollision, lockPiece]);

  const holdPiece = useCallback(() => {
    if (isPaused || isGameOver) return;
    if (!canHold) {
      playSound.buzz();
      return;
    }
    playSound.tetrisRotate();
    const currentType = currentPiece.type;

    if (heldPieceType === null) {
      setHeldPieceType(currentType);
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
    } else {
      const { shape, color, glowColor } = TETROMINOES[heldPieceType];
      const newCurrent: Piece = {
        type: heldPieceType,
        shape: shape.map(row => [...row]),
        color,
        glowColor,
        x: Math.floor((COLS - shape[0].length) / 2),
        y: 0
      };
      setHeldPieceType(currentType);
      setCurrentPiece(newCurrent);
    }
    setCanHold(false);
  }, [canHold, currentPiece.type, heldPieceType, isGameOver, isPaused, nextPiece]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused(prev => !prev);
        return;
      }

      if (isPaused || isGameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveRight();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          rotatePiece();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          softDrop();
          break;
        case ' ':
          hardDrop();
          break;
        case 'c':
        case 'C':
        case 'Shift':
          holdPiece();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, rotatePiece, softDrop, hardDrop, holdPiece, isPaused, isGameOver]);

  // Main gravity drop interval
  useEffect(() => {
    if (isPaused || isGameOver) return;

    // Speed scales down interval as level increases
    const dropSpeed = Math.max(120, 800 - (level - 1) * 70);
    const interval = setInterval(() => {
      softDrop();
    }, dropSpeed);

    return () => clearInterval(interval);
  }, [level, isPaused, isGameOver, softDrop]);

  // Award XP for relaxation session milestones
  useEffect(() => {
    if (!hasAwardedXP && (score >= 600 || lines >= 6)) {
      setHasAwardedXP(true);
      onAwardXP(120, 'Study Break: Block Drop Tetris Milestone');
    }
  }, [score, lines, hasAwardedXP, onAwardXP]);

  const handleRestart = () => {
    setGrid(createEmptyGrid());
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
    setHeldPieceType(null);
    setCanHold(true);
    setScore(0);
    setLines(0);
    setLevel(1);
    setIsPaused(false);
    setIsGameOver(false);
  };

  const ghostY = getGhostPieceY();

  return (
    <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-y-auto select-none">
      {/* 1. Header HUD */}
      <div className="w-full bg-slate-900/95 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hub</span>
        </button>

        {/* Stats Row */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Score</span>
            <span className="font-mono font-black text-emerald-400 text-sm tabular-nums">{score}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Lines</span>
            <span className="font-mono font-bold text-slate-100 text-sm tabular-nums">{lines}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Level</span>
            <span className="font-mono font-bold text-cyan-400 text-sm tabular-nums">{level}</span>
          </div>
        </div>

        <button
          onClick={() => setIsPaused(prev => !prev)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          title={isPaused ? 'Resume Game' : 'Pause Game'}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Main Arena Split: Matrix & Side Panels */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-md mx-auto w-full">
        <div className="flex items-start justify-center gap-3">
          {/* Main 10x20 Tetris Board */}
          <div className="relative p-1.5 bg-slate-950/90 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden">
            <div
              className="grid gap-[1px] bg-slate-900/80"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                width: 'min(58vw, 240px)',
                height: 'min(116vw, 480px)'
              }}
            >
              {Array.from({ length: ROWS }).map((_, r) =>
                Array.from({ length: COLS }).map((_, c) => {
                  let cellColor: string | null = grid[r][c];
                  let isGhost = false;

                  // Active falling piece
                  const pr = r - currentPiece.y;
                  const pc = c - currentPiece.x;
                  if (
                    pr >= 0 &&
                    pr < currentPiece.shape.length &&
                    pc >= 0 &&
                    pc < currentPiece.shape[pr].length &&
                    currentPiece.shape[pr][pc] !== 0
                  ) {
                    cellColor = currentPiece.color;
                  }

                  // Ghost piece projection
                  const gr = r - ghostY;
                  if (
                    cellColor === null &&
                    gr >= 0 &&
                    gr < currentPiece.shape.length &&
                    pc >= 0 &&
                    pc < currentPiece.shape[gr].length &&
                    currentPiece.shape[gr][pc] !== 0
                  ) {
                    isGhost = true;
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`w-full h-full rounded-[2px] transition-colors ${
                        cellColor
                          ? `${cellColor} border`
                          : isGhost
                          ? 'border border-dashed border-slate-600/70 bg-slate-800/20'
                          : 'bg-slate-950/60'
                      }`}
                    />
                  );
                })
              )}
            </div>

            {/* Pause Overlay */}
            {isPaused && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                <Pause className="w-10 h-10 text-emerald-400 mb-2 animate-pulse" />
                <h3 className="text-base font-bold text-slate-100">Game Paused</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Take a breather, stretch and resume</p>
                <button
                  type="button"
                  onClick={() => setIsPaused(false)}
                  className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>
            )}

            {/* Game Over Modal */}
            {isGameOver && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-50">Matrix Locked</h3>
                <p className="text-xs text-slate-400 mt-0.5">Brain break finished</p>

                <div className="my-3 w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Score:</span>
                    <span className="text-emerald-400 font-mono font-bold">{score}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Lines:</span>
                    <span className="text-slate-100 font-mono font-bold">{lines}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Level:</span>
                    <span className="text-cyan-400 font-mono font-bold">{level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={onExit}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    Hub
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="flex-[2] py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Info Panels (Next & Hold) */}
          <div className="w-20 sm:w-24 flex flex-col gap-2 shrink-0">
            {/* Next Piece Box */}
            <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Next</span>
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800/80">
                <div
                  className="grid gap-[1px]"
                  style={{
                    gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))`
                  }}
                >
                  {nextPiece.shape.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`next-${r}-${c}`}
                        className={`w-3 h-3 rounded-[1px] ${
                          val ? `${nextPiece.color} border` : 'bg-transparent'
                        }`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Hold Piece Box */}
            <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Hold</span>
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800/80">
                {heldPieceType ? (
                  <div
                    className="grid gap-[1px]"
                    style={{
                      gridTemplateColumns: `repeat(${TETROMINOES[heldPieceType].shape[0].length}, minmax(0, 1fr))`
                    }}
                  >
                    {TETROMINOES[heldPieceType].shape.map((row, r) =>
                      row.map((val, c) => (
                        <div
                          key={`hold-${r}-${c}`}
                          className={`w-3 h-3 rounded-[1px] ${
                            val ? `${TETROMINOES[heldPieceType].color} border` : 'bg-transparent'
                          }`}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-600">None</span>
                )}
              </div>
            </div>

            {/* Hold Button Shortcut */}
            <button
              type="button"
              onClick={holdPiece}
              disabled={!canHold || isPaused || isGameOver}
              className="w-full py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-[10px] font-bold text-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Shuffle className="w-3 h-3" />
              <span>Swap</span>
            </button>
          </div>
        </div>

        {/* 3. Dual On-Screen Touch Controls (Thumb Zone) */}
        <div className="w-full max-w-sm mt-3 pt-2 border-t border-slate-800/80 flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between gap-1.5">
            {/* Move Left */}
            <button
              type="button"
              onClick={moveLeft}
              className="flex-1 py-3 bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 rounded-xl flex items-center justify-center text-slate-200 transition-all active:scale-95 cursor-pointer shadow-md"
              title="Move Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Rotate Piece */}
            <button
              type="button"
              onClick={rotatePiece}
              className="flex-1 py-3 bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 active:bg-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-300 transition-all active:scale-95 cursor-pointer shadow-md"
              title="Rotate (Up Arrow)"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Move Right */}
            <button
              type="button"
              onClick={moveRight}
              className="flex-1 py-3 bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 rounded-xl flex items-center justify-center text-slate-200 transition-all active:scale-95 cursor-pointer shadow-md"
              title="Move Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1.5">
            {/* Soft Drop */}
            <button
              type="button"
              onClick={softDrop}
              className="flex-1 py-2.5 bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 rounded-xl flex items-center justify-center gap-1 text-slate-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4" />
              <span>Drop</span>
            </button>

            {/* Hard Drop */}
            <button
              type="button"
              onClick={hardDrop}
              className="flex-[1.5] py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 active:from-emerald-600 text-slate-950 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Hard Drop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
