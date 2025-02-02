import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (count <= 0) return;

    const interval = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [count]);

  const startTimer = (newInitialCount: number) => {
    setCount(newInitialCount);
  };

  const formatTime = (seconds: number) => {
    setSeconds(seconds);
  };

  const stopTimer = () => {
    setCount(0);
  };

  const format = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // 분 계산
    const secondsLeft = seconds % 60; // 나머지 초 계산
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  return { count, startTimer, seconds, formatTime, format, stopTimer };
};
