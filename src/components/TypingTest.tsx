import React, { useEffect, useRef, useState } from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { 
  DIFFICULTY_OPTIONS, 
  DURATION_OPTIONS,
  getBenchmark,
} from '../data/typingPassages';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

// Pixel Art Racer SVG component
const PixelCar: React.FC<{
  variant: 'janelie' | 'user';
  className?: string;
}> = ({ variant, className }) => {
  const isJanelie = variant === 'janelie';
  // Janelie: monochrome terminal racer with warm amber headlight
  // User: high-contrast emerald racer with cyan headlight
  const bodyColor = isJanelie ? '#71717a' : '#10b981';
  const bodyDark = isJanelie ? '#3f3f46' : '#047857';
  const glassColor = isJanelie ? '#e4e4e7' : '#a7f3d0';
  const wheelColor = '#18181b';
  const lightColor = isJanelie ? '#fbbf24' : '#38bdf8';

  return (
    <svg 
      width="38" 
      height="18" 
      viewBox="0 0 38 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("drop-shadow-xs", className)}
      aria-hidden="true"
    >
      {/* Rear Spoiler */}
      <rect x="1" y="4" width="3" height="6" fill={bodyDark} />
      <rect x="0" y="2" width="5" height="2" fill={bodyColor} />
      
      {/* Main Body Chassis */}
      <rect x="4" y="8" width="30" height="6" fill={bodyColor} />
      <rect x="4" y="10" width="30" height="4" fill={bodyDark} />
      
      {/* Cabin & Windshield */}
      <rect x="12" y="4" width="13" height="5" fill={bodyColor} />
      <rect x="14" y="5" width="5" height="3" fill={glassColor} />
      <rect x="20" y="5" width="4" height="3" fill={glassColor} />
      
      {/* Sloped Hood */}
      <rect x="25" y="7" width="8" height="3" fill={bodyColor} />
      <rect x="33" y="9" width="3" height="3" fill={bodyColor} />
      
      {/* Front Bumper & Headlight */}
      <rect x="35" y="9" width="2" height="2" fill={lightColor} />
      <rect x="35" y="11" width="2" height="2" fill={bodyDark} />
      
      {/* Wheels */}
      <rect x="7" y="13" width="6" height="4" rx="1" fill={wheelColor} />
      <rect x="8" y="14" width="4" height="2" fill="#71717a" />
      <rect x="25" y="13" width="6" height="4" rx="1" fill={wheelColor} />
      <rect x="26" y="14" width="4" height="2" fill="#71717a" />
    </svg>
  );
};

// Checkered finish line column
const FinishLine: React.FC = () => (
  <div 
    className="w-full h-full"
    style={{
      backgroundImage: `repeating-conic-gradient(#18181b 0% 25%, #ffffff 0% 50%)`,
      backgroundPosition: '0 0',
      backgroundSize: '8px 8px',
    }}
    aria-hidden="true"
  />
);

// Format seconds into MM:SS (e.g., 00:15, 00:30, 01:00, 03:00)
const formatTime = (seconds: number): string => {
  const safeSeconds = Math.max(0, seconds);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Two-lane retro car racing track component
interface CarTrackProps {
  userProgress: number;
  janelieProgress: number;
  targetBenchmark: number;
  userWpm: number;
  isActive: boolean;
  isFinished: boolean;
}

const CarTrack: React.FC<CarTrackProps> = ({
  userProgress,
  janelieProgress,
  targetBenchmark,
  userWpm,
  isActive,
  isFinished,
}) => {
  const uProg = Math.max(0, Math.min(1.04, userProgress));
  const jProg = Math.max(0, Math.min(1.04, janelieProgress));

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] frame-corner p-4 md:p-5 select-none transition-colors">
      <div className="flex items-center justify-between mb-3 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <div className="flex items-center gap-2">
          <span className={clsx("w-2 h-2 rounded-full", isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400")} />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">LIVE RACE TRACK</span>
          <span className="hidden sm:inline">&middot; TARGET: {targetBenchmark} WPM</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-zinc-600 dark:text-zinc-400">
          <span>FINISH LINE</span>
          <span className="text-xs" aria-hidden="true">🏁</span>
        </div>
      </div>

      <div className="relative border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/80 dark:bg-zinc-950/60 overflow-hidden">
        {/* Checkered Finish Line at the far right edge */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-5 z-20 border-l border-zinc-300 dark:border-zinc-700 shadow-xs"
          title="Finish Line"
        >
          <FinishLine />
        </div>

        {/* Lane 1: Janelie */}
        <div className="relative h-12 flex items-center border-b border-dashed border-zinc-200 dark:border-zinc-800/80 pr-6">
          <div className="w-28 sm:w-36 flex-shrink-0 px-3 py-1 border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/70 z-10 flex flex-col justify-center">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-zinc-600 dark:text-zinc-300 truncate">
              JANELIE
            </span>
            <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500">
              {targetBenchmark} WPM PACE
            </span>
          </div>

          <div className="relative flex-1 h-full mx-2">
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{
                left: `calc(${jProg * 100}% - ${jProg * 38}px)`,
              }}
            >
              <PixelCar variant="janelie" />
            </div>
          </div>
        </div>

        {/* Lane 2: User */}
        <div className="relative h-12 flex items-center pr-6">
          <div className="w-28 sm:w-36 flex-shrink-0 px-3 py-1 border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/70 z-10 flex flex-col justify-center">
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                YOU
              </span>
              {isActive && (
                <span className={clsx(
                  "font-mono text-[8px] font-bold px-1 rounded",
                  userWpm > targetBenchmark ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60" :
                  userWpm < targetBenchmark ? "text-red-500 bg-red-50 dark:bg-red-950/60" : "text-zinc-400"
                )}>
                  {userWpm > targetBenchmark ? `+${userWpm - targetBenchmark}` : `${userWpm - targetBenchmark}`}
                </span>
              )}
            </div>
            <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400">
              {userWpm > 0 ? `${userWpm} WPM LIVE` : "READY"}
            </span>
          </div>

          <div className="relative flex-1 h-full mx-2">
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{
                left: `calc(${uProg * 100}% - ${uProg * 38}px)`,
              }}
            >
              <PixelCar variant="user" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2.5 font-mono text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>START LINE</span>
        <span className="text-right">
          {isFinished 
            ? (userWpm > targetBenchmark 
                ? "🏁 You crossed the finish line first!" 
                : userWpm === targetBenchmark 
                ? "🏁 Dead heat at the finish line!" 
                : "🏁 Janelie crossed the finish line first.")
            : isActive 
            ? (userWpm > targetBenchmark 
                ? "🔥 Pulling ahead of Janelie!" 
                : userWpm === targetBenchmark 
                ? "⚡ Neck and neck with Janelie!" 
                : "⚠️ Trailing Janelie's pace.")
            : "Cars launch on your first keystroke"}
        </span>
      </div>
    </div>
  );
};

export const TypingTest: React.FC = () => {
  const { 
    passage, 
    input, 
    isActive, 
    isFinished, 
    timeLeft,
    timeElapsed,
    difficulty,
    duration,
    setDifficulty,
    setDuration,
    handleInput, 
    resetTest, 
    stats 
  } = useTypingTest('medium', 30);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isTestOpen, setIsTestOpen] = useState(false);

  const focusInput = () => {
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isTestOpen) return;

      if (e.key === 'Escape') {
        setIsTestOpen(false);
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        resetTest();
        focusInput();
      }
      if (e.key === 'Enter' && (isFinished || !isActive)) {
        e.preventDefault();
        resetTest();
        focusInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestOpen, isFinished, isActive, resetTest]);

  useEffect(() => {
    if (isTestOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      resetTest();
    }
  }, [isTestOpen, resetTest]);

  const targetBenchmark = getBenchmark(difficulty, duration);
  const currentDurationLabel = DURATION_OPTIONS.find(d => d.value === duration)?.label || `${duration} SEC`;
  const currentDifficultyLabel = DIFFICULTY_OPTIONS.find(d => d.value === difficulty)?.label || difficulty.toUpperCase();

  // Subtle visual warning state when 5 seconds or fewer remain during active test
  const isTimeCritical = isActive && timeLeft <= 5 && timeLeft > 0;

  // Real-time race progress mechanics
  const targetWords = (targetBenchmark / 60) * duration;
  const userWords = (stats.correctChars || 0) / 5;

  let userProgress = 0;
  let janelieProgress = 0;

  if (isFinished) {
    if (stats.wpm > targetBenchmark) {
      userProgress = 1.0;
      janelieProgress = stats.wpm > 0 ? Math.max(0.15, Math.min(0.88, targetBenchmark / stats.wpm)) : 0.88;
    } else if (stats.wpm === targetBenchmark) {
      userProgress = 1.0;
      janelieProgress = 1.0;
    } else {
      janelieProgress = 1.0;
      userProgress = targetBenchmark > 0 ? Math.max(0.08, Math.min(0.88, stats.wpm / targetBenchmark)) : 0.5;
    }
  } else if (isActive) {
    janelieProgress = duration > 0 ? Math.min(0.92, (timeElapsed / duration) * 0.90) : 0;
    userProgress = targetWords > 0 ? Math.min(0.95, (userWords / targetWords) * 0.90) : 0;
  } else {
    userProgress = 0;
    janelieProgress = 0;
  }

  // Exact comparison messages required by specification
  const resultHeading = stats.wpm > targetBenchmark
    ? "You beat Janelie!"
    : stats.wpm === targetBenchmark
    ? "You matched Janelie's WPM!"
    : "You didn't beat Janelie.";

  return (
    <section id="typing-test" className="py-24 border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="mb-14">
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
          INTERACTIVE // DEVELOPER SPEED BENCHMARK
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-zinc-400 font-mono text-sm mr-3 font-normal">04</span>
          TYPING TEST
        </h2>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 p-8 md:p-14 flex flex-col items-center justify-center text-center frame-corner group hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
        <div className="flex items-center gap-2 mb-6 font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>TERMINAL READY &middot; YOUR TARGET: {targetBenchmark} WPM</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Can you beat my WPM?</h3>
        <p className="text-[14px] md:text-base text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed">
          Janelie&apos;s WPM to Beat for <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">{currentDifficultyLabel}</span> ({currentDurationLabel}) is <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">{targetBenchmark}</span> WPM. Select your difficulty and duration, then start the live race.
        </p>

        {/* Quick Difficulty & Duration Config on Home Card */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 font-mono text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-xs border border-zinc-200 dark:border-zinc-800">
            <span className="text-zinc-400 px-2 text-[10px] uppercase tracking-wider">DIFF:</span>
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={clsx(
                  "px-2.5 py-1 rounded-xs transition-colors uppercase tracking-wider text-[11px]",
                  difficulty === opt.value
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-xs border border-zinc-200 dark:border-zinc-800">
            <span className="text-zinc-400 px-2 text-[10px] uppercase tracking-wider">TIME:</span>
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDuration(opt.value)}
                className={clsx(
                  "px-2.5 py-1 rounded-xs transition-colors uppercase tracking-wider text-[11px]",
                  duration === opt.value
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsTestOpen(true)}
          className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-8 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors inline-flex items-center gap-2"
        >
          <span>Start Typing Test</span>
        </button>
      </div>

      <AnimatePresence>
        {isTestOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Typing test modal"
            className="fixed inset-0 z-50 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md flex flex-col pt-12 md:pt-16 px-4 md:px-16 lg:px-24 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto w-full pb-16">
              {/* Top Modal Header & Exit */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200/70 dark:border-zinc-800/70 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">TERMINAL RACER</span>
                  <span className="hidden sm:inline text-zinc-400">&middot;</span>
                  <span className="hidden sm:inline text-zinc-400">[{currentDifficultyLabel}] &middot; [{currentDurationLabel}]</span>
                </div>
                <button
                  onClick={() => setIsTestOpen(false)}
                  aria-label="Close typing test"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 uppercase tracking-wider px-2.5 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  [ESC] Close
                </button>
              </div>

              {/* Prominent Heads-Up Display: High-Visibility Timer & Target Benchmark HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                {/* 1. Large Countdown Timer */}
                <div className={clsx(
                  "border p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0a0a0a] frame-corner flex flex-col justify-between transition-colors",
                  isTimeCritical 
                    ? "border-red-500 dark:border-red-500 bg-red-50/30 dark:bg-red-950/20 shadow-xs" 
                    : "border-zinc-200 dark:border-zinc-800"
                )}>
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <span>REMAINING TIME</span>
                    <span className="flex items-center gap-1.5">
                      <span className={clsx(
                        "w-2 h-2 rounded-full",
                        isTimeCritical ? "bg-red-500 animate-pulse" :
                        isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                      )} />
                      <span className={clsx("font-semibold", isTimeCritical && "text-red-500")}>
                        {isTimeCritical ? "EXPIRING" : isActive ? "LIVE" : "READY"}
                      </span>
                    </span>
                  </div>
                  <div className={clsx(
                    "font-mono font-bold tracking-tight text-5xl md:text-6xl my-1",
                    isTimeCritical 
                      ? "text-red-500 dark:text-red-400 animate-pulse" 
                      : isActive 
                      ? "text-zinc-900 dark:text-zinc-100" 
                      : "text-zinc-700 dark:text-zinc-300"
                  )}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                    {isActive ? (isTimeCritical ? "Final seconds! Finish strong" : "Timer running · keep typing") : "Full duration · begins on first keystroke"}
                  </div>
                </div>

                {/* 2. Target Benchmark: Janelie's WPM to Beat */}
                <div className="border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0a0a0a] frame-corner flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <span>JANELIE&apos;S BENCHMARK</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 font-semibold">
                      TARGET
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="font-mono font-bold tracking-tight text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100">
                      {targetBenchmark}
                    </span>
                    <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500 uppercase font-semibold">WPM</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                    YOUR TARGET TO BEAT ({currentDifficultyLabel} &middot; {currentDurationLabel})
                  </div>
                </div>

                {/* 3. Live User Speed */}
                <div className="border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0a0a0a] frame-corner flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    <span>YOUR LIVE SPEED</span>
                    <span className="font-mono text-zinc-400 dark:text-zinc-500">
                      ACC: {stats.accuracy}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className={clsx(
                      "font-mono font-bold tracking-tight text-5xl md:text-6xl",
                      stats.wpm > targetBenchmark 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : stats.wpm > 0 && stats.wpm < targetBenchmark 
                        ? "text-amber-600 dark:text-amber-400" 
                        : "text-zinc-900 dark:text-zinc-100"
                    )}>
                      {stats.wpm}
                    </span>
                    <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500 uppercase font-semibold">WPM</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                    <span className="truncate">
                      {isActive 
                        ? (stats.wpm > targetBenchmark ? "Leading Janelie!" : stats.wpm === targetBenchmark ? "Tied with Janelie" : "Trailing Janelie") 
                        : "Awaiting input"}
                    </span>
                    {isActive && (
                      <span className={clsx(
                        "font-bold px-1.5 py-0.2 rounded text-[10px]",
                        stats.wpm > targetBenchmark ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                        stats.wpm < targetBenchmark ? "text-red-500 bg-red-50 dark:bg-red-950/50" : "text-zinc-400"
                      )}>
                        {stats.wpm > targetBenchmark ? `+${stats.wpm - targetBenchmark}` : `${stats.wpm - targetBenchmark}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Selector Bar in Modal (disabled mid-typing to prevent accidental disruption) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs">
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xs border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 px-2 text-[10px] uppercase tracking-wider">DIFFICULTY:</span>
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      disabled={isActive}
                      onClick={() => {
                        setDifficulty(opt.value);
                        focusInput();
                      }}
                      className={clsx(
                        "px-2.5 py-1 rounded-xs transition-colors uppercase tracking-wider text-[11px]",
                        isActive && "opacity-60 cursor-not-allowed",
                        difficulty === opt.value
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xs border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 px-2 text-[10px] uppercase tracking-wider">DURATION:</span>
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      disabled={isActive}
                      onClick={() => {
                        setDuration(opt.value);
                        focusInput();
                      }}
                      className={clsx(
                        "px-2.5 py-1 rounded-xs transition-colors uppercase tracking-wider text-[11px]",
                        isActive && "opacity-60 cursor-not-allowed",
                        duration === opt.value
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {!isFinished ? (
                <>
                  {/* Typing Passage Box */}
                  <div
                    className="relative mb-6 cursor-text border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 bg-white dark:bg-[#0a0a0a] frame-corner"
                    onClick={() => inputRef.current?.focus()}
                    role="region"
                    aria-label="Typing test passage"
                  >
                    <div className="text-xl md:text-2xl lg:text-3xl font-mono leading-relaxed text-zinc-300 dark:text-zinc-700 select-none">
                      {passage.split('').map((char, index) => {
                        let colorClass = '';
                        if (index < input.length) {
                          colorClass = input[index] === char 
                            ? 'text-zinc-900 dark:text-zinc-100' 
                            : 'text-red-500 bg-red-100 dark:bg-red-900/30';
                        }
                        
                        const isCursor = index === input.length;

                        return (
                          <span key={index} className={clsx(colorClass, isCursor && "border-l-2 border-zinc-900 dark:border-zinc-100 -ml-[2px] animate-pulse")}>
                            {char}
                          </span>
                        );
                      })}
                    </div>
                    
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => handleInput(e.target.value)}
                      aria-label="Typing test input"
                      className="absolute inset-0 opacity-0 cursor-default"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>

                  {/* Real-time Car Racing Track beneath typing passage */}
                  <CarTrack
                    userProgress={userProgress}
                    janelieProgress={janelieProgress}
                    targetBenchmark={targetBenchmark}
                    userWpm={stats.wpm}
                    isActive={isActive}
                    isFinished={isFinished}
                  />
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-4 text-center"
                >
                  {/* Outcome Heading strictly driven by numerical WPM comparison */}
                  <div className="mb-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                      RACE FINISH &middot; MODE: {currentDifficultyLabel} ({currentDurationLabel})
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                      {resultHeading}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                      {stats.wpm > targetBenchmark 
                        ? `You beat Janelie's benchmark of ${targetBenchmark} WPM by +${stats.wpm - targetBenchmark} WPM!`
                        : stats.wpm === targetBenchmark
                        ? `You matched Janelie's exact benchmark pace of ${targetBenchmark} WPM.`
                        : `Janelie's benchmark was ${targetBenchmark} WPM (${targetBenchmark - stats.wpm} WPM faster).`}
                    </p>
                  </div>

                  {/* Final Race Track Finish Display */}
                  <div className="w-full mb-8">
                    <CarTrack
                      userProgress={userProgress}
                      janelieProgress={janelieProgress}
                      targetBenchmark={targetBenchmark}
                      userWpm={stats.wpm}
                      isActive={isActive}
                      isFinished={isFinished}
                    />
                  </div>

                  {/* Side-by-Side Results Scorecards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 w-full">
                    {/* User WPM Card */}
                    <div className="border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50/70 dark:bg-zinc-900/40">
                      <div className="font-mono text-3xl md:text-4xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                        {stats.wpm}
                      </div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest">
                        YOUR SPEED (WPM)
                      </div>
                    </div>

                    {/* Target Benchmark Card */}
                    <div className="border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50/70 dark:bg-zinc-900/40">
                      <div className="font-mono text-3xl md:text-4xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                        {targetBenchmark}
                      </div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest">
                        JANELIE&apos;S TARGET
                      </div>
                    </div>

                    {/* Accuracy Card */}
                    <div className="border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50/70 dark:bg-zinc-900/40">
                      <div className="font-mono text-3xl md:text-4xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                        {stats.accuracy}%
                      </div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest">
                        ACCURACY
                      </div>
                    </div>

                    {/* Time / Raw WPM Card */}
                    <div className="border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50/70 dark:bg-zinc-900/40">
                      <div className="font-mono text-3xl md:text-4xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">
                        {stats.time}s
                      </div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest">
                        TIME ELAPSED
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-2">
                    <button
                      onClick={() => { resetTest(); focusInput(); }}
                      className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-8 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-8 text-center text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                <span className="mr-6">TAB / ENTER to restart</span>
                <span>ESC to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
