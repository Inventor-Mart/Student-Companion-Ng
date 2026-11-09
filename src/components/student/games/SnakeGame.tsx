import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from '../../../utils/audioSynthesis';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Pause,
  Play,
  Trophy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';

interface SnakeGameProps {
  onExit: () => void;
  onAwardXP: (amount: number, reason?: string) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

// Tall rectangular grid tailored for smartphone screen aspect ratio
const GRID_COLS = 20;
const GRID_ROWS = 32;

function getRandomFoodPosition(snake: Point[]): Point {
  while (true) {
    const candidate: Point = {
      x: Math.floor(Math.random() * GRID_COLS),
      y: Math.floor(Math.random() * GRID_ROWS)
    };
    const collidesWithSnake = snake.some(seg => seg.x === candidate.x && seg.y === candidate.y);
    if (!collidesWithSnake) {
      return candidate;
    }
  }
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onExit, onAwardXP }) => {
  // Game states with vertically centered initial snake
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 16 },
    { x: 9, y: 16 },
    { x: 8, y: 16 }
  ]);
  const [food, setFood] = useState<Point>({ x: 10, y: 8 });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('sc_snake_best') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'>('READY');
  const [applesEaten, setApplesEaten] = useState(0);

  // Direction refs to prevent self-collision on rapid inputs
  const directionRef = useRef<Direction>('RIGHT');
  const nextDirectionRef = useRef<Direction>('RIGHT');
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Single-fire guard for game over XP to avoid infinite loop
  const hasAwardedXPRef = useRef<boolean>(false);
  const hasCelebratedNewBestRef = useRef<boolean>(false);

  // Game loop tracking
  const lastTickTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Gentle, relaxed start speed (starts at 230ms per tick, scales down by 12ms every 3 apples, min 75ms)
  const currentSpeedLevel = 1 + Math.floor(score / 30);
  const currentDelay = Math.max(75, 230 - (currentSpeedLevel - 1) * 12);

  // Update best score in state & localStorage
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('sc_snake_best', score.toString());
      } catch {}
    }
  }, [score, bestScore]);

  // Restart game cleanly
  const handleRestart = useCallback(() => {
    const initialSnake: Point[] = [
      { x: 10, y: 16 },
      { x: 9, y: 16 },
      { x: 8, y: 16 }
    ];
    setSnake(initialSnake);
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    setFood(getRandomFoodPosition(initialSnake));
    setScore(0);
    setApplesEaten(0);
    hasAwardedXPRef.current = false;
    hasCelebratedNewBestRef.current = false;
    setGameState('READY');
  }, []);

  // Change direction with opposite-direction protection
  const changeDirection = useCallback(
    (newDir: Direction) => {
      if (gameState === 'READY') {
        setGameState('PLAYING');
      }

      const current = directionRef.current;
      const isOpposite =
        (newDir === 'UP' && current === 'DOWN') ||
        (newDir === 'DOWN' && current === 'UP') ||
        (newDir === 'LEFT' && current === 'RIGHT') ||
        (newDir === 'RIGHT' && current === 'LEFT');

      if (!isOpposite && newDir !== current) {
        nextDirectionRef.current = newDir;
        playSound.snakeTurn();
      }
    },
    [gameState]
  );

  // Game step logic
  const step = useCallback(() => {
    setSnake(prevSnake => {
      const currentHead = prevSnake[0];
      const dir = nextDirectionRef.current;
      directionRef.current = dir;

      let nextHead: Point;
      switch (dir) {
        case 'UP':
          nextHead = { x: currentHead.x, y: currentHead.y - 1 };
          break;
        case 'DOWN':
          nextHead = { x: currentHead.x, y: currentHead.y + 1 };
          break;
        case 'LEFT':
          nextHead = { x: currentHead.x - 1, y: currentHead.y };
          break;
        case 'RIGHT':
          nextHead = { x: currentHead.x + 1, y: currentHead.y };
          break;
      }

      // Check boundary collision against 20 columns x 32 rows
      if (
        nextHead.x < 0 ||
        nextHead.x >= GRID_COLS ||
        nextHead.y < 0 ||
        nextHead.y >= GRID_ROWS
      ) {
        setGameState('GAME_OVER');
        playSound.buzz();
        if (!hasAwardedXPRef.current) {
          hasAwardedXPRef.current = true;
          const earnedXP = Math.min(150, Math.max(30, Math.floor(score * 1.5)));
          onAwardXP(earnedXP, `Finished Snake Run (Score: ${score}, Lvl: ${currentSpeedLevel})`);
        }
        return prevSnake;
      }

      // Check self-collision (ignoring tail tip since it moves forward unless eating)
      const bodySegments = prevSnake.slice(0, prevSnake.length - 1);
      if (bodySegments.some(seg => seg.x === nextHead.x && seg.y === nextHead.y)) {
        setGameState('GAME_OVER');
        playSound.buzz();
        if (!hasAwardedXPRef.current) {
          hasAwardedXPRef.current = true;
          const earnedXP = Math.min(150, Math.max(30, Math.floor(score * 1.5)));
          onAwardXP(earnedXP, `Finished Snake Run (Score: ${score}, Lvl: ${currentSpeedLevel})`);
        }
        return prevSnake;
      }

      // Check food consumption
      const ateFood = nextHead.x === food.x && nextHead.y === food.y;
      if (ateFood) {
        playSound.snakeEat();
        const nextScore = score + 10;
        setScore(nextScore);
        setApplesEaten(a => a + 1);

        const newSnake = [nextHead, ...prevSnake];
        setFood(getRandomFoodPosition(newSnake));

        // Celebrate ONLY ONCE when first surpassing personal best
        if (nextScore > bestScore && bestScore > 0 && !hasCelebratedNewBestRef.current) {
          hasCelebratedNewBestRef.current = true;
          try {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {}
        }

        return newSnake;
      }

      // Standard move (advance head, pop tail)
      playSound.snakeMove();
      return [nextHead, ...prevSnake.slice(0, prevSnake.length - 1)];
    });
  }, [food, score, bestScore, currentSpeedLevel, onAwardXP]);

  // Main game loop via requestAnimationFrame
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      return;
    }

    const loop = (timestamp: number) => {
      if (!lastTickTimeRef.current) lastTickTimeRef.current = timestamp;
      const elapsed = timestamp - lastTickTimeRef.current;

      if (elapsed >= currentDelay) {
        step();
        lastTickTimeRef.current = timestamp;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [gameState, currentDelay, step]);

  // Desktop keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
        case ' ':
        case 'p':
        case 'P':
          e.preventDefault();
          if (gameState === 'PLAYING') setGameState('PAUSED');
          else if (gameState === 'PAUSED' || gameState === 'READY') setGameState('PLAYING');
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
  }, [gameState, changeDirection, handleRestart]);

  // Touch Swipe gestures on board
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
    const minSwipe = 20;

    if (Math.max(absDx, absDy) < minSwipe) return;

    if (absDx > absDy) {
      if (dx > 0) changeDirection('RIGHT');
      else changeDirection('LEFT');
    } else {
      if (dy > 0) changeDirection('DOWN');
      else changeDirection('UP');
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-between px-2 pt-1 pb-0.5 select-none text-slate-100 overflow-hidden">
      {/* Top Header Bar - Compact and tight to leave maximum height for game board */}
      <div className="w-full max-w-md flex items-center justify-between gap-1.5 px-1 py-0.5 shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hub</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Score Box */}
          <div className="px-2.5 py-0.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[55px]">
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase leading-none">Score</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono block leading-none mt-0.5">
              {score}
            </span>
          </div>

          {/* Best Score Box */}
          <div className="px-2.5 py-0.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[55px]">
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase leading-none">Best</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono block leading-none mt-0.5">
              {bestScore}
            </span>
          </div>

          {/* Speed Indicator */}
          <div className="px-2 py-0.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <div className="text-left">
              <span className="text-[8px] font-bold text-slate-400 block uppercase leading-none">Speed</span>
              <span className="text-[11px] font-black text-rose-300 font-mono leading-none">
                Lvl {currentSpeedLevel}
              </span>
            </div>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={() => {
              if (gameState === 'PLAYING') setGameState('PAUSED');
              else if (gameState === 'PAUSED' || gameState === 'READY') setGameState('PLAYING');
            }}
            title="Pause (Space)"
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            {gameState === 'PLAYING' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            title="Restart (R)"
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Game Board Container - Tall 20x32 rectangular board stretching almost touching top HUD and bottom D-Pad */}
      <div className="relative w-full flex-1 flex items-stretch justify-center min-h-0 my-0.5 px-0.5 max-w-[420px]">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative bg-[#070D18] p-1 rounded-2xl border-2 border-emerald-950/80 shadow-2xl touch-none select-none w-full h-full flex items-center justify-center overflow-hidden"
        >
          {/* 20x32 Grid Guide lines */}
          <div
            className="w-full h-full relative rounded-xl overflow-hidden bg-[#091122]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
              backgroundSize: `${100 / GRID_COLS}% ${100 / GRID_ROWS}%`
            }}
          >
            {/* Apple Food */}
            <div
              className="absolute transition-all duration-75 flex items-center justify-center"
              style={{
                left: `${(food.x / GRID_COLS) * 100}%`,
                top: `${(food.y / GRID_ROWS) * 100}%`,
                width: `${100 / GRID_COLS}%`,
                height: `${100 / GRID_ROWS}%`
              }}
            >
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-400 shadow-md shadow-red-500/60 flex items-center justify-center relative animate-pulse">
                {/* Green Leaf */}
                <span className="absolute -top-0.5 right-0.5 w-1.5 h-1 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Snake Segments */}
            {snake.map((segment, index) => {
              const isHead = index === 0;

              return (
                <div
                  key={`${segment.x}-${segment.y}-${index}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${(segment.x / GRID_COLS) * 100}%`,
                    top: `${(segment.y / GRID_ROWS) * 100}%`,
                    width: `${100 / GRID_COLS}%`,
                    height: `${100 / GRID_ROWS}%`
                  }}
                >
                  {isHead ? (
                    // Snake Head with Eyes
                    <div
                      className="w-[90%] h-[90%] rounded-md bg-gradient-to-br from-emerald-400 to-teal-400 border border-emerald-300 shadow-md shadow-emerald-500/50 flex items-center justify-center relative"
                    >
                      {/* Directional Eyes */}
                      <div
                        className={`absolute flex gap-0.5 ${
                          directionRef.current === 'UP'
                            ? 'top-0.5 flex-row'
                            : directionRef.current === 'DOWN'
                            ? 'bottom-0.5 flex-row'
                            : directionRef.current === 'LEFT'
                            ? 'left-0.5 flex-col'
                            : 'right-0.5 flex-col'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-950 block" />
                        <span className="w-1 h-1 rounded-full bg-slate-950 block" />
                      </div>
                    </div>
                  ) : (
                    // Snake Body Segment
                    <div
                      className="w-[85%] h-[85%] rounded-sm bg-gradient-to-br from-emerald-500 to-emerald-600 border border-emerald-600/40 shadow-sm"
                      style={{
                        opacity: Math.max(0.45, 1 - index / (snake.length * 1.4))
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Ready Overlay */}
          {gameState === 'READY' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2 shadow-lg shadow-emerald-500/20">
                <Play className="w-6 h-6 fill-emerald-400 ml-0.5" />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">Ready to Play?</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-[210px] leading-relaxed">
                Full-height vertical field! Swipe or tap any arrow to guide the snake.
              </p>
              <button
                onClick={() => setGameState('PLAYING')}
                className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/30 active:scale-95 cursor-pointer"
              >
                Tap to Start
              </button>
            </div>
          )}

          {/* Pause Overlay */}
          {gameState === 'PAUSED' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
                <Pause className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">Game Paused</h3>
              <p className="text-xs text-slate-400 mt-1">Take a breath and continue whenever ready</p>
              <button
                onClick={() => setGameState('PLAYING')}
                className="mt-3 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                Resume Run
              </button>
            </div>
          )}

          {/* Game Over Overlay - Clean static card without continuous confetti */}
          {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-5 text-center animate-in zoom-in-95 duration-200">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-1">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">Game Over</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {score > bestScore ? '🎉 New Personal Best!' : 'You crashed! Nice effort.'}
              </p>

              <div className="grid grid-cols-3 gap-2 my-2.5 w-full bg-slate-900/90 border border-slate-800 rounded-xl p-2 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Score</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">{score}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Apples</span>
                  <span className="text-sm font-extrabold text-rose-400 font-mono">{applesEaten}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Max Speed</span>
                  <span className="text-sm font-extrabold text-amber-400 font-mono">Lvl {currentSpeedLevel}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-950/70 border border-amber-800/60 px-3 py-1 rounded-full font-mono mb-2.5">
                <Zap className="w-3.5 h-3.5" /> +{Math.min(150, Math.max(30, Math.floor(score * 1.5)))} XP Saved
              </div>

              <button
                onClick={handleRestart}
                className="w-full max-w-[190px] py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Responsive On-Screen Touch D-Pad (Touches bottom of board directly) */}
      <div className="w-full max-w-[320px] flex items-center justify-center gap-2 select-none shrink-0 pt-0.5 pb-0.5">
        {/* Left */}
        <button
          onClick={() => changeDirection('LEFT')}
          disabled={gameState === 'GAME_OVER'}
          aria-label="Move Left"
          className="w-13 h-10 rounded-xl bg-slate-900 border border-slate-700 active:bg-emerald-500/20 active:border-emerald-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Up / Down column */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => changeDirection('UP')}
            disabled={gameState === 'GAME_OVER'}
            aria-label="Move Up"
            className="w-14 h-9 rounded-xl bg-slate-900 border border-slate-700 active:bg-emerald-500/20 active:border-emerald-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => changeDirection('DOWN')}
            disabled={gameState === 'GAME_OVER'}
            aria-label="Move Down"
            className="w-14 h-9 rounded-xl bg-slate-900 border border-slate-700 active:bg-emerald-500/20 active:border-emerald-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Right */}
        <button
          onClick={() => changeDirection('RIGHT')}
          disabled={gameState === 'GAME_OVER'}
          aria-label="Move Right"
          className="w-13 h-10 rounded-xl bg-slate-900 border border-slate-700 active:bg-emerald-500/20 active:border-emerald-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Helper Hint */}
      <div className="w-full text-center shrink-0 pb-0.5">
        <p className="text-[9px] text-slate-500">
          Swipe anywhere on board · <kbd className="px-1 py-0.2 bg-slate-800 rounded text-slate-300 font-mono text-[8px]">Arrows/WASD</kbd> · <kbd className="px-1 py-0.2 bg-slate-800 rounded text-slate-300 font-mono text-[8px]">Space</kbd> Pause
        </p>
      </div>
    </div>
  );
};
