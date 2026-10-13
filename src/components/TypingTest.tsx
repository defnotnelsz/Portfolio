import React, { useEffect, useRef, useState } from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const TypingTest: React.FC = () => {
  const { passage, input, isActive, isFinished, handleInput, resetTest, stats } = useTypingTest();
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

  const benchmark = 120;
  const beatJanelie = stats.wpm > benchmark;

  return (
    <section id="typing-test" className="py-24 border-t border-zinc-200 dark:border-zinc-800/50">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="text-zinc-400 font-mono text-[11px] md:text-xs mr-4">04</span>
          TYPING TEST
        </h2>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Can you beat my WPM?</h3>
        <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
          My personal best is <span className="font-mono">{benchmark}</span> WPM. Take a quick typing test to see how you stack up.
        </p>
        <button
          onClick={() => setIsTestOpen(true)}
          className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 py-3 text-[13px] md:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          Start Typing Test
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
            className="fixed inset-0 z-50 bg-white dark:bg-[#0a0a0a] flex flex-col pt-24 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between items-center mb-12">
                <div className="font-mono text-[11px] md:text-xs text-zinc-500">
                  <span className="mr-6">Time: {stats.time}s</span>
                  <span>WPM: {stats.wpm}</span>
                </div>
                <button
                  onClick={() => setIsTestOpen(false)}
                  aria-label="Close typing test"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-mono text-[11px] md:text-xs uppercase tracking-wider"
                >
                  [ESC] Close
                </button>
              </div>

              {!isFinished ? (
                <div
                  className="relative mb-12 cursor-text"
                  onClick={() => inputRef.current?.focus()}
                  role="region"
                  aria-label="Typing test passage"
                >
                  <div className="text-xl md:text-3xl font-mono leading-relaxed text-zinc-300 dark:text-zinc-700 select-none">
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
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-16">
                    <div>
                      <div className="font-mono text-3xl md:text-5xl font-medium mb-2">{stats.wpm}</div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-wider">WPM</div>
                    </div>
                    <div>
                      <div className="font-mono text-3xl md:text-5xl font-medium mb-2">{stats.accuracy}%</div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-wider">Accuracy</div>
                    </div>
                    <div>
                      <div className="font-mono text-3xl md:text-5xl font-medium mb-2">{stats.rawWpm}</div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-wider">Raw WPM</div>
                    </div>
                    <div>
                      <div className="font-mono text-3xl md:text-5xl font-medium mb-2">{stats.time}s</div>
                      <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-wider">Time</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-8">
                    {beatJanelie ? "You beat Janelie! 💀" : "You didn't beat Janelie."}
                  </h3>

                  <div className="flex gap-4">
                    <button
                      onClick={() => { resetTest(); focusInput(); }}
                      className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 py-3 text-[13px] md:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-24 text-center text-[11px] md:text-xs font-mono text-zinc-400 uppercase tracking-wider">
                <span className="mr-6">TAB to restart</span>
                <span>ESC to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
