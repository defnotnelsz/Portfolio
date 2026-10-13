import { useState, useEffect, useCallback, useRef } from 'react';

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Code is read much more often than it is written.",
  "Design is not just what it looks like and feels like. Design is how it works. Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. First, solve the problem. Then, write the code."
];

const getRandomPassage = () => PASSAGES[Math.floor(Math.random() * PASSAGES.length)];

export function useTypingTest() {
  const [passage, setPassage] = useState<string>(getRandomPassage);
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const initTest = useCallback(() => {
    clearTimer();
    setPassage(getRandomPassage());
    setInput('');
    setIsActive(false);
    setIsFinished(false);
    setTimeElapsed(0);
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const handleInput = (val: string) => {
    if (isFinished) return;
    
    if (!isActive && val.length > 0) {
      setIsActive(true);
      clearTimer();
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    setInput(val);

    if (val.length >= passage.length) {
      setIsFinished(true);
      setIsActive(false);
      clearTimer();
    }
  };

  const getStats = () => {
    const effectiveSeconds = Math.max(timeElapsed, 1);
    const timeInMinutes = effectiveSeconds / 60;
    
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === passage[i]) correctChars++;
    }
    
    const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;
    
    // Standard WPM calculation (5 chars = 1 word)
    const rawWpm = input.length > 0 ? Math.round((input.length / 5) / timeInMinutes) : 0;
    const netWpm = input.length > 0 ? Math.round((correctChars / 5) / timeInMinutes) : 0;

    return {
      wpm: isNaN(netWpm) ? 0 : Math.max(0, netWpm),
      accuracy,
      rawWpm: isNaN(rawWpm) ? 0 : rawWpm,
      time: timeElapsed
    };
  };

  return {
    passage,
    input,
    isActive,
    isFinished,
    handleInput,
    resetTest: initTest,
    stats: getStats()
  };
}
