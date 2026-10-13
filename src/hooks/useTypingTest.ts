import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  type Difficulty, 
  type Duration, 
  getRandomPassage 
} from '../data/typingPassages';

export function useTypingTest(
  initialDifficulty: Difficulty = 'medium',
  initialDuration: Duration = 30
) {
  const [difficulty, setDifficultyState] = useState<Difficulty>(initialDifficulty);
  const [duration, setDurationState] = useState<Duration>(initialDuration);

  const [passage, setPassage] = useState<string>(() => getRandomPassage(initialDifficulty));
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const passageRef = useRef(passage);

  useEffect(() => {
    passageRef.current = passage;
  }, [passage]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTest = useCallback((
    targetDifficulty: Difficulty = difficulty,
    targetDuration: Duration = duration
  ) => {
    clearTimer();
    const nextPassage = getRandomPassage(targetDifficulty, passageRef.current);
    setPassage(nextPassage);
    setInput('');
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(targetDuration);
    setTimeElapsed(0);
  }, [clearTimer, difficulty, duration]);

  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficultyState(newDifficulty);
    resetTest(newDifficulty, duration);
  }, [duration, resetTest]);

  const setDuration = useCallback((newDuration: Duration) => {
    setDurationState(newDuration);
    resetTest(difficulty, newDuration);
  }, [difficulty, resetTest]);

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
        setTimeElapsed(prevElapsed => prevElapsed + 1);
        setTimeLeft(prevLeft => {
          if (prevLeft <= 1) {
            clearTimer();
            setIsFinished(true);
            setIsActive(false);
            return 0;
          }
          return prevLeft - 1;
        });
      }, 1000);
    }

    setInput(val);

    if (val.length >= passage.length && passage.length > 0) {
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
    const rawWpm = input.length > 0 ? Math.round((input.length / 5) / timeInMinutes) : 0;
    const netWpm = input.length > 0 ? Math.round((correctChars / 5) / timeInMinutes) : 0;

    return {
      wpm: isNaN(netWpm) ? 0 : Math.max(0, netWpm),
      accuracy,
      rawWpm: isNaN(rawWpm) ? 0 : rawWpm,
      time: timeElapsed,
      timeLeft,
      correctChars,
    };
  };

  return {
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
    resetTest: () => resetTest(difficulty, duration),
    stats: getStats(),
  };
}
