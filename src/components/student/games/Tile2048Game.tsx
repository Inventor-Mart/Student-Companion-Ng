import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Undo2,
  Trophy,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap
} from 'lucide-react';

interface Tile2048GameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

type Board = number[][];

const BOARD_SIZE = 4;

const TILE_STYLES: Record<number, { bg: string; text: string; shadow?: string; border?: string }> = {
  2: { bg: 'bg-amber-100/90 text-slate-800', text: 'text-slate-800 font-bold', border: 'border-amber-200' },
  4: { bg: 'bg-amber-200/90 text-slate-900', text: 'text-slate-900 font-bold', border: 'border-amber-300' },
  8: { bg: 'bg-orange-400 text-white', text: 'text-white font-extrabold', shadow: 'shadow-orange-500/30' },
  16: { bg: 'bg-orange-500 text-white', text: 'text-white font-extrabold', shadow: 'shadow-orange-600/30' },
  32: { bg: 'bg-rose-500 text-white', text: 'text-white font-extrabold', shadow: 'shadow-rose-500/30' },
  64: { bg: 'bg-red-600 text-white', text: 'text-white font-black', shadow: 'shadow-red-600/40' },
  128: { bg: 'bg-yellow-400 text-slate-950', text: 'text-slate-950 font-black', shadow: 'shadow-yellow-400/50' },
  256: { bg: 'bg-amber-400 text-slate-950', text: 'text-slate-950 font-black', shadow: 'shadow-amber-400/50' },
  512: { bg: 'bg-emerald-400 text-slate-950', text: 'text-slate-950 font-black', shadow: 'shadow-emerald-400/50' },
  1024: { bg: 'bg-cyan-400 text-slate-950', text: 'text-slate-950 font-black', shadow: 'shadow-cyan-400/60' },
  2048: { bg: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-slate-950', text: 'text-slate-950 font-black', shadow: 'shadow-yellow-300/80' },
  4096: { bg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white', text: 'text-white font-black', shadow: 'shadow-purple-500/70' }
};

function createEmptyBoard(): Board {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(0));
}

function getEmptyCells(board: Board): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) {
        cells.push([r, c]);
      }
    }
  }
  return cells;
}

function spawnRandomTile(board: Board): Board {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;

  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = value;
  return newBoard;
}

function boardsAreEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

function canMove(board: Board): boolean {
  if (getEmptyCells(board).length > 0) return true;

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const val = board[r][c];
      if (r + 1 < BOARD_SIZE && board[r + 1][c] === val) return true;
      if (c + 1 < BOARD_SIZE && board[r][c + 1] === val) return true;
    }
  }
  return false;
}

export const Tile2048Game: React.FC<Tile2048GameProps> = ({ onExit, onAwardXP }) => {
  const [board, setBoard] = useState<Board>(() => {
    let b = createEmptyBoard();
    b = spawnRandomTile(b);
    b = spawnRandomTile(b);
    return b;
  });

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('sc_2048_best') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [history, setHistory] = useState<{ board: Board; score: number } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon2048, setHasWon2048] = useState(false);
  const [dismissed2048Modal, setDismissed2048Modal] = useState(false);
  const [scoreGainedAnim, setScoreGainedAnim] = useState<number | null>(null);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Update best score whenever score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('sc_2048_best', score.toString());
      } catch {}
    }
  }, [score, bestScore]);

  // Restart Game
  const handleRestart = useCallback(() => {
    let b = createEmptyBoard();
    b = spawnRandomTile(b);
    b = spawnRandomTile(b);
    setBoard(b);
    setScore(0);
    setHistory(null);
    setIsGameOver(false);
    setHasWon2048(false);
    setDismissed2048Modal(false);
  }, []);

  // Undo Move
  const handleUndo = useCallback(() => {
    if (!history) return;
    setBoard(history.board);
    setScore(history.score);
    setHistory(null);
    setIsGameOver(false);
    playSound.tile2048Slide();
  }, [history]);

  // Slide & Merge Row helper (moves left)
  const slideRow = (row: number[]): { newRow: number[]; gained: number; merged: boolean } => {
    const nonZero = row.filter(val => val !== 0);
    const newRow: number[] = [];
    let gained = 0;
    let merged = false;

    let i = 0;
    while (i < nonZero.length) {
      if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
        const mergedVal = nonZero[i] * 2;
        newRow.push(mergedVal);
        gained += mergedVal;
        merged = true;
        i += 2;
      } else {
        newRow.push(nonZero[i]);
        i += 1;
      }
    }

    while (newRow.length < BOARD_SIZE) {
      newRow.push(0);
    }

    return { newRow, gained, merged };
  };

  // Perform directional move
  const move = useCallback(
    (direction: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN') => {
      if (isGameOver) return;

      let currentBoard = board.map(row => [...row]);
      let totalGained = 0;
      let anyMerged = false;

      // Transform board so all moves behave like 'LEFT'
      if (direction === 'RIGHT') {
        currentBoard = currentBoard.map(row => [...row].reverse());
      } else if (direction === 'UP') {
        const transposed: Board = createEmptyBoard();
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            transposed[r][c] = currentBoard[c][r];
          }
        }
        currentBoard = transposed;
      } else if (direction === 'DOWN') {
        const transposed: Board = createEmptyBoard();
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            transposed[r][c] = currentBoard[c][r];
          }
        }
        currentBoard = transposed.map(row => [...row].reverse());
      }

      // Slide each row left
      const shiftedBoard: Board = [];
      for (let r = 0; r < BOARD_SIZE; r++) {
        const { newRow, gained, merged } = slideRow(currentBoard[r]);
        shiftedBoard.push(newRow);
        totalGained += gained;
        if (merged) anyMerged = true;
      }

      // Reverse transformations back to original layout
      let finalBoard: Board = shiftedBoard;
      if (direction === 'RIGHT') {
        finalBoard = finalBoard.map(row => [...row].reverse());
      } else if (direction === 'UP') {
        const transposed: Board = createEmptyBoard();
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            transposed[r][c] = finalBoard[c][r];
          }
        }
        finalBoard = transposed;
      } else if (direction === 'DOWN') {
        const unreversed = finalBoard.map(row => [...row].reverse());
        const transposed: Board = createEmptyBoard();
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            transposed[r][c] = unreversed[c][r];
          }
        }
        finalBoard = transposed;
      }

      // Check if board actually changed
      if (boardsAreEqual(board, finalBoard)) {
        return; // Invalid move in this direction
      }

      // Store history for 1-step undo
      setHistory({ board: board.map(row => [...row]), score });

      // Spawn next tile
      const nextBoard = spawnRandomTile(finalBoard);
      setBoard(nextBoard);

      const nextScore = score + totalGained;
      setScore(nextScore);

      if (totalGained > 0) {
        setScoreGainedAnim(totalGained);
        setTimeout(() => setScoreGainedAnim(null), 600);
      }

      // Tactile sound
      if (anyMerged) {
        playSound.tile2048Merge();
      } else {
        playSound.tile2048Slide();
      }

      // Check for 2048 tile reached
      if (!hasWon2048 && !dismissed2048Modal) {
        const has2048 = nextBoard.some(row => row.some(cell => cell >= 2048));
        if (has2048) {
          setHasWon2048(true);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          onAwardXP(150, 'Reached 2048 Tile in Study Relaxation Game!');
        }
      }

      // Check for game over
      if (!canMove(nextBoard)) {
        setIsGameOver(true);
        playSound.incorrect();
        // Award modest study break XP
        const earnedXP = Math.min(100, Math.max(30, Math.floor(nextScore / 50)));
        onAwardXP(earnedXP, 'Completed 2048 Relax Run');
      }
    },
    [board, score, isGameOver, hasWon2048, dismissed2048Modal, onAwardXP]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys are held
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          move('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          move('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          move('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          move('RIGHT');
          break;
        case 'u':
        case 'U':
          e.preventDefault();
          handleUndo();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          handleRestart();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, handleUndo, handleRestart]);

  // Touch Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const minSwipe = 25;

    if (Math.max(absDx, absDy) < minSwipe) return;

    if (absDx > absDy) {
      if (dx > 0) {
        move('RIGHT');
      } else {
        move('LEFT');
      }
    } else {
      if (dy > 0) {
        move('DOWN');
      } else {
        move('UP');
      }
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between px-3 py-3 select-none text-slate-100 overflow-y-auto">
      {/* Top Header Bar */}
      <div className="w-full max-w-sm flex items-center justify-between gap-2 mb-2">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hub</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Score Box */}
          <div className="relative px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[70px]">
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">Score</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono block leading-none mt-0.5">
              {score}
            </span>
            {scoreGainedAnim && (
              <span className="absolute -top-2.5 right-1 text-[11px] font-bold text-emerald-400 font-mono animate-bounce">
                +{scoreGainedAnim}
              </span>
            )}
          </div>

          {/* Best Score Box */}
          <div className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[70px]">
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">Best</span>
            <span className="text-sm font-extrabold text-slate-200 font-mono block leading-none mt-0.5">
              {bestScore}
            </span>
          </div>

          {/* Undo Action */}
          <button
            onClick={handleUndo}
            disabled={!history}
            title="Undo move (U)"
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
              history
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Restart Action */}
          <button
            onClick={handleRestart}
            title="New Game (R)"
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subheader info banner */}
      <div className="w-full max-w-sm flex items-center justify-between text-[11px] text-slate-400 px-1 mb-2">
        <span className="flex items-center gap-1 font-medium text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Join the numbers to reach <strong className="text-amber-300">2048</strong>!
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Swipe or use D-Pad / Keys</span>
      </div>

      {/* Game Board Container */}
      <div className="relative w-full max-w-sm flex justify-center items-center my-auto">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative bg-slate-900/90 p-3 rounded-2xl border-2 border-slate-800 shadow-2xl touch-none select-none w-full aspect-square max-w-[320px] flex flex-col justify-between"
        >
          {/* 4x4 Grid Cells */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2.5 w-full h-full">
            {board.map((row, r) =>
              row.map((cell, c) => {
                const style = cell > 0 ? TILE_STYLES[cell] || TILE_STYLES[4096] : null;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`relative rounded-xl flex items-center justify-center transition-all duration-150 ${
                      cell === 0
                        ? 'bg-slate-800/60 border border-slate-700/30'
                        : `${style?.bg} ${style?.shadow || ''} ${style?.border ? `border ${style.border}` : ''} shadow-md scale-100`
                    }`}
                  >
                    {cell > 0 && (
                      <span
                        className={`${style?.text || 'text-white'} font-mono ${
                          cell < 100
                            ? 'text-2xl font-black'
                            : cell < 1000
                            ? 'text-xl font-black'
                            : 'text-base font-extrabold'
                        } tracking-tight`}
                      >
                        {cell}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Game Over Modal Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">Game Over!</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-[200px]">
                No more valid moves remaining on the board.
              </p>

              <div className="flex items-center gap-4 my-4 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Score</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">{score}</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Score</span>
                  <span className="text-base font-extrabold text-white font-mono">{bestScore}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full max-w-[220px]">
                {history && (
                  <button
                    onClick={handleUndo}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Undo</span>
                  </button>
                )}
                <button
                  onClick={handleRestart}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

          {/* 2048 Victory Modal Overlay */}
          {hasWon2048 && !dismissed2048Modal && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-400/20 animate-pulse">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-amber-300 tracking-tight">You Built 2048!</h3>
              <p className="text-xs text-slate-200 mt-1 max-w-[220px] leading-relaxed">
                Superb synthesis! You have conquered the 2048 relaxation milestone and earned +150 study break XP.
              </p>

              <div className="flex items-center gap-2 my-4">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-3 py-1 rounded-full font-mono flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +150 XP Awarded
                </span>
              </div>

              <div className="flex items-center gap-2 w-full max-w-[240px]">
                <button
                  onClick={() => setDismissed2048Modal(true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors shadow-md shadow-amber-400/20"
                >
                  Keep Playing
                </button>
                <button
                  onClick={handleRestart}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  New Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive On-Screen Touch D-Pad (Thumb Zone Controls) */}
      <div className="w-full max-w-sm mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-center gap-2 select-none">
        {/* Left */}
        <button
          onClick={() => move('LEFT')}
          disabled={isGameOver}
          aria-label="Move Left"
          className="w-14 h-12 rounded-xl bg-slate-900 border border-slate-700 active:bg-amber-500/20 active:border-amber-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Up / Down column */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => move('UP')}
            disabled={isGameOver}
            aria-label="Move Up"
            className="w-16 h-11 rounded-xl bg-slate-900 border border-slate-700 active:bg-amber-500/20 active:border-amber-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={() => move('DOWN')}
            disabled={isGameOver}
            aria-label="Move Down"
            className="w-16 h-11 rounded-xl bg-slate-900 border border-slate-700 active:bg-amber-500/20 active:border-amber-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Right */}
        <button
          onClick={() => move('RIGHT')}
          disabled={isGameOver}
          aria-label="Move Right"
          className="w-14 h-12 rounded-xl bg-slate-900 border border-slate-700 active:bg-amber-500/20 active:border-amber-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Helper Hint */}
      <div className="w-full max-w-sm text-center mt-2">
        <p className="text-[10px] text-slate-500">
          Desktop shortcuts: <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[9px]">Arrows</kbd> or <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[9px]">WASD</kbd> · <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[9px]">U</kbd> Undo · <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[9px]">R</kbd> Restart
        </p>
      </div>
    </div>
  );
};
