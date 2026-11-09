import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound, chillMusicSynthesizer } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Lightbulb,
  Shuffle,
  Zap,
  Gem,
  Hexagon,
  Square,
  Triangle,
  Star,
  Circle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Match3GameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

// Tall 8x11 grid tailored for smartphone screens to eliminate dead vertical whitespace
const GRID_COLS = 8;
const GRID_ROWS = 11;
const NUM_TYPES = 6;

type SpecialType = 'NONE' | 'LINE_H' | 'LINE_V' | 'RAINBOW';

interface Tile {
  id: string;
  type: number; // 0..5
  special: SpecialType;
  isMatched?: boolean;
}

type Board = (Tile | null)[][];

const GEM_CONFIGS = [
  {
    name: 'Ruby',
    color: 'from-rose-500 to-red-600',
    border: 'border-rose-400',
    shadow: 'shadow-rose-500/40',
    icon: Gem
  },
  {
    name: 'Sapphire',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    shadow: 'shadow-blue-500/40',
    icon: Hexagon
  },
  {
    name: 'Emerald',
    color: 'from-emerald-400 to-teal-600',
    border: 'border-emerald-300',
    shadow: 'shadow-emerald-500/40',
    icon: Square
  },
  {
    name: 'Amethyst',
    color: 'from-purple-500 to-fuchsia-600',
    border: 'border-purple-400',
    shadow: 'shadow-purple-500/40',
    icon: Triangle
  },
  {
    name: 'Topaz',
    color: 'from-amber-400 to-yellow-500',
    border: 'border-amber-300',
    shadow: 'shadow-amber-400/40',
    icon: Star
  },
  {
    name: 'Citrine',
    color: 'from-cyan-400 to-sky-500',
    border: 'border-cyan-300',
    shadow: 'shadow-cyan-400/40',
    icon: Circle
  }
];

let tileIdCounter = 0;
function createRandomTile(excludeTypes: number[] = []): Tile {
  let allowed = [0, 1, 2, 3, 4, 5].filter(t => !excludeTypes.includes(t));
  if (allowed.length === 0) allowed = [0, 1, 2, 3, 4, 5];
  const type = allowed[Math.floor(Math.random() * allowed.length)];
  return {
    id: `tile-${++tileIdCounter}`,
    type,
    special: 'NONE'
  };
}

// Generate clean 8x11 board without pre-existing 3-in-a-row matches
function generateCleanBoard(): Board {
  const board: Board = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      const exclude: number[] = [];
      if (c >= 2 && board[r][c - 1]?.type === board[r][c - 2]?.type) {
        exclude.push(board[r][c - 1]!.type);
      }
      if (r >= 2 && board[r - 1][c]?.type === board[r - 2][c]?.type) {
        exclude.push(board[r - 1][c]!.type);
      }
      board[r][c] = createRandomTile(exclude);
    }
  }
  return board;
}

// Find matches on 8x11 board
function findMatches(board: Board): { matches: Set<string>; specialCandidates: Map<string, SpecialType> } {
  const matchedCoords = new Set<string>();
  const specialCandidates = new Map<string, SpecialType>();

  // Check horizontal matches across all 11 rows
  for (let r = 0; r < GRID_ROWS; r++) {
    let matchLength = 1;
    for (let c = 1; c <= GRID_COLS; c++) {
      const prev = board[r][c - 1];
      const curr = c < GRID_COLS ? board[r][c] : null;

      if (curr && prev && curr.type === prev.type) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          const middleIndex = c - Math.ceil(matchLength / 2);
          const key = `${r}-${middleIndex}`;
          if (matchLength >= 5) {
            specialCandidates.set(key, 'RAINBOW');
          } else if (matchLength === 4) {
            specialCandidates.set(key, 'LINE_H');
          }

          for (let k = c - matchLength; k < c; k++) {
            matchedCoords.add(`${r}-${k}`);
          }
        }
        matchLength = 1;
      }
    }
  }

  // Check vertical matches across all 8 columns
  for (let c = 0; c < GRID_COLS; c++) {
    let matchLength = 1;
    for (let r = 1; r <= GRID_ROWS; r++) {
      const prev = board[r - 1][c];
      const curr = r < GRID_ROWS ? board[r][c] : null;

      if (curr && prev && curr.type === prev.type) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          const middleIndex = r - Math.ceil(matchLength / 2);
          const key = `${middleIndex}-${c}`;
          if (matchLength >= 5) {
            specialCandidates.set(key, 'RAINBOW');
          } else if (matchLength === 4 && !specialCandidates.has(key)) {
            specialCandidates.set(key, 'LINE_V');
          }

          for (let k = r - matchLength; k < r; k++) {
            matchedCoords.add(`${k}-${c}`);
          }
        }
        matchLength = 1;
      }
    }
  }

  return { matches: matchedCoords, specialCandidates };
}

// Find potential move for hints & auto-shuffle
function findPotentialMove(board: Board): [number, number, number, number] | null {
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const current = board[r][c];
      if (!current) continue;

      // Rainbow gem can match with any neighbor
      if (current.special === 'RAINBOW') {
        if (c + 1 < GRID_COLS) return [r, c, r, c + 1];
        if (r + 1 < GRID_ROWS) return [r, c, r + 1, c];
      }

      // Try swap right
      if (c + 1 < GRID_COLS) {
        const copy = board.map(row => [...row]);
        const temp = copy[r][c];
        copy[r][c] = copy[r][c + 1];
        copy[r][c + 1] = temp;
        if (findMatches(copy).matches.size > 0) {
          return [r, c, r, c + 1];
        }
      }

      // Try swap down
      if (r + 1 < GRID_ROWS) {
        const copy = board.map(row => [...row]);
        const temp = copy[r][c];
        copy[r][c] = copy[r + 1][c];
        copy[r + 1][c] = temp;
        if (findMatches(copy).matches.size > 0) {
          return [r, c, r + 1, c];
        }
      }
    }
  }
  return null;
}

// Trigger device vibration haptics
function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'buzz') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') navigator.vibrate(25);
      else if (type === 'medium') navigator.vibrate([20, 25, 30]);
      else if (type === 'heavy') navigator.vibrate([45, 30, 60]);
      else if (type === 'buzz') navigator.vibrate([35, 20, 35]);
    } catch {}
  }
}

export const Match3Game: React.FC<Match3GameProps> = ({ onExit, onAwardXP }) => {
  const [board, setBoard] = useState<Board>(() => generateCleanBoard());
  const [selectedCoord, setSelectedCoord] = useState<[number, number] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('sc_match3_best') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [combo, setCombo] = useState(1);
  const [hintCoords, setHintCoords] = useState<[number, number, number, number] | null>(null);
  const [shakeCoords, setShakeCoords] = useState<string | null>(null);
  const [scoreFloater, setScoreFloater] = useState<{ amount: number; key: number } | null>(null);
  const [isMusicOn, setIsMusicOn] = useState<boolean>(() => chillMusicSynthesizer.getIsPlaying());

  const awardedMilestonesRef = useRef<Set<number>>(new Set());
  const touchStartRef = useRef<{ r: number; c: number; x: number; y: number } | null>(null);

  // Stop background music on unmount or exit
  useEffect(() => {
    return () => {
      chillMusicSynthesizer.stop();
    };
  }, []);

  const handleToggleMusic = () => {
    const nextState = chillMusicSynthesizer.toggle();
    setIsMusicOn(nextState);
  };

  const handleExitGame = () => {
    chillMusicSynthesizer.stop();
    onExit();
  };

  // Update best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('sc_match3_best', score.toString());
      } catch {}
    }
  }, [score, bestScore]);

  // Check XP milestones
  useEffect(() => {
    const milestones = [500, 1500, 3000, 5000];
    milestones.forEach(m => {
      if (score >= m && !awardedMilestonesRef.current.has(m)) {
        awardedMilestonesRef.current.add(m);
        onAwardXP(50, `Match-3 Chill Milestone (${m} pts reached)`);
      }
    });
  }, [score, onAwardXP]);

  // Restart / Reset game
  const handleRestart = useCallback(() => {
    setBoard(generateCleanBoard());
    setSelectedCoord(null);
    setScore(0);
    setCombo(1);
    setHintCoords(null);
    setShakeCoords(null);
    setIsProcessing(false);
  }, []);

  // Shuffle board
  const handleShuffle = useCallback(() => {
    let newBoard: Board;
    let attempts = 0;
    do {
      newBoard = generateCleanBoard();
      attempts++;
    } while (!findPotentialMove(newBoard) && attempts < 10);

    setBoard(newBoard);
    setSelectedCoord(null);
    setHintCoords(null);
    playSound.gemPower();
    triggerHaptic('medium');
  }, []);

  // Hint handler
  const handleHint = useCallback(() => {
    if (isProcessing) return;
    const move = findPotentialMove(board);
    if (move) {
      setHintCoords(move);
      playSound.gemSwap();
      triggerHaptic('light');
      setTimeout(() => setHintCoords(null), 2500);
    } else {
      handleShuffle();
    }
  }, [board, isProcessing, handleShuffle]);

  // Cascade engine
  const resolveBoard = useCallback(
    async (currentBoard: Board, currentCombo: number) => {
      setIsProcessing(true);
      let workingBoard = currentBoard.map(row => [...row]);
      let activeCombo = currentCombo;

      while (true) {
        const { matches, specialCandidates } = findMatches(workingBoard);
        if (matches.size === 0) break;

        // Process special blast effects
        const toDelete = new Set<string>(matches);
        let hasSpecialExploded = false;

        matches.forEach(coord => {
          const [rStr, cStr] = coord.split('-');
          const r = parseInt(rStr, 10);
          const c = parseInt(cStr, 10);
          const tile = workingBoard[r][c];

          if (tile?.special === 'LINE_H') {
            for (let col = 0; col < GRID_COLS; col++) toDelete.add(`${r}-${col}`);
            hasSpecialExploded = true;
          } else if (tile?.special === 'LINE_V') {
            for (let row = 0; row < GRID_ROWS; row++) toDelete.add(`${row}-${c}`);
            hasSpecialExploded = true;
          }
        });

        // Trigger lively sounds and haptics
        if (hasSpecialExploded) {
          playSound.gemPower();
          triggerHaptic('heavy');
        } else {
          playSound.gemMatch(activeCombo);
          triggerHaptic(activeCombo > 1 ? 'medium' : 'light');
        }

        // Calculate score
        const pointsEarned = toDelete.size * 10 * activeCombo;
        setScore(s => s + pointsEarned);
        setCombo(activeCombo);
        setScoreFloater({ amount: pointsEarned, key: Date.now() });

        // Clear matched tiles and synthesize specials
        const afterClear: Board = workingBoard.map((row, r) =>
          row.map((tile, c) => {
            const key = `${r}-${c}`;
            if (specialCandidates.has(key)) {
              const specType = specialCandidates.get(key)!;
              return {
                id: `special-${++tileIdCounter}`,
                type: tile?.type || 0,
                special: specType
              };
            }
            if (toDelete.has(key)) {
              return null;
            }
            return tile;
          })
        );

        setBoard(afterClear);
        await new Promise(res => setTimeout(res, 200));

        // Gravity: drop tiles down in each of the 8 columns
        const afterDrop: Board = [];
        for (let r = 0; r < GRID_ROWS; r++) afterDrop[r] = Array(GRID_COLS).fill(null);

        for (let c = 0; c < GRID_COLS; c++) {
          let targetR = GRID_ROWS - 1;
          for (let r = GRID_ROWS - 1; r >= 0; r--) {
            if (afterClear[r][c] !== null) {
              afterDrop[targetR][c] = afterClear[r][c];
              targetR--;
            }
          }
          // Refill top empty slots
          while (targetR >= 0) {
            afterDrop[targetR][c] = createRandomTile();
            targetR--;
          }
        }

        workingBoard = afterDrop;
        setBoard(workingBoard);
        activeCombo++;
        await new Promise(res => setTimeout(res, 190));
      }

      setCombo(1);
      setIsProcessing(false);

      // Verify at least one move remains, else reshuffle automatically
      if (!findPotentialMove(workingBoard)) {
        setTimeout(() => handleShuffle(), 400);
      }
    },
    [handleShuffle]
  );

  // Swap two tiles
  const attemptSwap = useCallback(
    async (r1: number, c1: number, r2: number, c2: number) => {
      if (isProcessing) return;

      const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
      if (!isAdjacent) return;

      setHintCoords(null);

      const tileA = board[r1][c1];
      const tileB = board[r2][c2];
      if (!tileA || !tileB) return;

      // Handle Rainbow Gem combo
      if (tileA.special === 'RAINBOW' || tileB.special === 'RAINBOW') {
        setIsProcessing(true);
        playSound.gemPower();
        triggerHaptic('heavy');

        const targetType = tileA.special === 'RAINBOW' ? tileB.type : tileA.type;
        const newBoard = board.map(row => [...row]);
        newBoard[r1][c1] = null;
        newBoard[r2][c2] = null;

        for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
            if (newBoard[r][c]?.type === targetType) {
              newBoard[r][c] = null;
            }
          }
        }

        setScore(s => s + 300);
        setBoard(newBoard);
        await new Promise(res => setTimeout(res, 220));
        await resolveBoard(newBoard, 2);
        return;
      }

      // Normal swap check
      const swapped = board.map(row => [...row]);
      swapped[r1][c1] = tileB;
      swapped[r2][c2] = tileA;

      const { matches } = findMatches(swapped);
      if (matches.size > 0) {
        playSound.gemSwap();
        triggerHaptic('light');
        setBoard(swapped);
        setSelectedCoord(null);
        await resolveBoard(swapped, 1);
      } else {
        // Invalid swap: Play tactile buzz sound, trigger haptic buzz, and shake tiles
        playSound.gemBuzz();
        triggerHaptic('buzz');
        setShakeCoords(`${r1}-${c1}-${r2}-${c2}`);
        setSelectedCoord(null);
        setTimeout(() => setShakeCoords(null), 300);
      }
    },
    [board, isProcessing, resolveBoard]
  );

  // Handle tile click/selection
  const handleTileClick = (r: number, c: number) => {
    if (isProcessing) return;

    if (!selectedCoord) {
      setSelectedCoord([r, c]);
      playSound.gemSwap();
      triggerHaptic('light');
      return;
    }

    const [selR, selC] = selectedCoord;
    if (selR === r && selC === c) {
      setSelectedCoord(null);
      return;
    }

    const isNeighbor = Math.abs(selR - r) + Math.abs(selC - c) === 1;
    if (isNeighbor) {
      attemptSwap(selR, selC, r, c);
    } else {
      setSelectedCoord([r, c]);
      playSound.gemSwap();
      triggerHaptic('light');
    }
  };

  // Touch Swipe on Tiles
  const handleTouchStart = (r: number, c: number, e: React.TouchEvent) => {
    if (isProcessing) return;
    const touch = e.touches[0];
    touchStartRef.current = { r, c, x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isProcessing) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const { r, c } = touchStartRef.current;
    touchStartRef.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const minSwipe = 20;

    if (Math.max(absDx, absDy) < minSwipe) return;

    if (absDx > absDy) {
      if (dx > 0 && c + 1 < GRID_COLS) attemptSwap(r, c, r, c + 1);
      else if (dx < 0 && c - 1 >= 0) attemptSwap(r, c, r, c - 1);
    } else {
      if (dy > 0 && r + 1 < GRID_ROWS) attemptSwap(r, c, r + 1, c);
      else if (dy < 0 && r - 1 >= 0) attemptSwap(r, c, r - 1, c);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-between px-2 pt-1 pb-0.5 select-none text-slate-100 overflow-hidden">
      {/* Top Header Bar - Compact and tight */}
      <div className="w-full max-w-md flex items-center justify-between gap-1.5 px-1 py-0.5 shrink-0">
        <button
          onClick={handleExitGame}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hub</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Score Box with Floater */}
          <div className="relative px-2.5 py-0.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[60px]">
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase leading-none">Score</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono block leading-none mt-0.5">
              {score}
            </span>
            {scoreFloater && (
              <span
                key={scoreFloater.key}
                className="absolute -top-3 right-0 text-[11px] font-black text-emerald-400 font-mono animate-bounce"
              >
                +{scoreFloater.amount}
              </span>
            )}
          </div>

          {/* Best Score */}
          <div className="px-2.5 py-0.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[60px]">
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase leading-none">Best</span>
            <span className="text-sm font-extrabold text-slate-200 font-mono block leading-none mt-0.5">
              {bestScore}
            </span>
          </div>

          {/* Combo Indicator */}
          {combo > 1 && (
            <div className="px-2 py-0.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-center flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3 text-rose-400" />
              <span className="text-xs font-black text-rose-300 font-mono">{combo}x</span>
            </div>
          )}

          {/* BGM Toggle Button */}
          <button
            onClick={handleToggleMusic}
            title={isMusicOn ? 'Pause Background Chill Music' : 'Play Background Chill Music'}
            className={`p-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isMusicOn
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isMusicOn ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hint Button */}
          <button
            onClick={handleHint}
            disabled={isProcessing}
            title="Get Hint"
            className="p-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20 active:scale-95 text-xs font-semibold transition-all cursor-pointer"
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            disabled={isProcessing}
            title="Shuffle Board"
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 text-xs font-semibold transition-all cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tall 8x11 Jewel Board Container - Stretches to fill vertical screen space */}
      <div className="relative w-full flex-1 flex items-stretch justify-center min-h-0 my-0.5 px-0.5 max-w-[420px]">
        <div className="relative bg-[#070D18] p-1.5 rounded-2xl border-2 border-slate-800 shadow-2xl touch-none select-none w-full h-full flex items-center justify-center overflow-hidden">
          {/* 8 Columns x 11 Rows Grid of Jewels */}
          <div className="grid grid-cols-8 grid-rows-11 gap-1 w-full h-full p-1 bg-slate-950/90 rounded-xl border border-slate-800/80">
            {board.map((row, r) =>
              row.map((tile, c) => {
                if (!tile) {
                  return (
                    <div
                      key={`empty-${r}-${c}`}
                      className="w-full h-full rounded-lg bg-slate-900/30 border border-slate-800/20"
                    />
                  );
                }

                const config = GEM_CONFIGS[tile.type] || GEM_CONFIGS[0];
                const IconComponent = config.icon;
                const isSelected = selectedCoord && selectedCoord[0] === r && selectedCoord[1] === c;
                const isHinted =
                  hintCoords &&
                  ((hintCoords[0] === r && hintCoords[1] === c) ||
                    (hintCoords[2] === r && hintCoords[3] === c));
                const isShaking = shakeCoords && shakeCoords.includes(`${r}-${c}`);

                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(r, c)}
                    onTouchStart={e => handleTouchStart(r, c, e)}
                    onTouchEnd={handleTouchEnd}
                    className={`relative w-full h-full rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'scale-110 ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-950 z-20 shadow-lg'
                        : isHinted
                        ? 'animate-pulse ring-2 ring-amber-400 scale-105 z-10'
                        : isShaking
                        ? 'animate-shake ring-2 ring-rose-500 scale-95'
                        : 'hover:scale-105 active:scale-95'
                    } ${
                      tile.special === 'RAINBOW'
                        ? 'bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-md shadow-pink-500/50'
                        : `bg-gradient-to-br ${config.color} ${config.shadow} shadow-sm border ${config.border}`
                    }`}
                  >
                    {/* Special Gem Indicators */}
                    {tile.special === 'RAINBOW' ? (
                      <Sparkles className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <>
                        <IconComponent className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                        {tile.special === 'LINE_H' && (
                          <span className="absolute inset-x-1 h-0.5 bg-white/90 rounded-full shadow-sm" />
                        )}
                        {tile.special === 'LINE_V' && (
                          <span className="absolute inset-y-1 w-0.5 bg-white/90 rounded-full shadow-sm" />
                        )}
                      </>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Instructions - Compact */}
      <div className="w-full max-w-md flex items-center justify-between text-[10px] text-slate-400 px-2 py-0.5 shrink-0">
        <span className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Haptic buzz on mismatches · Tap <strong className="text-emerald-300">🎵</strong> for Chill BGM
        </span>
        <button
          onClick={handleRestart}
          className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
        >
          New Board
        </button>
      </div>
    </div>
  );
};
