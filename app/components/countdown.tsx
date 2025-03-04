"use client"; // Enables client-side rendering for this component

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ThemeButton from "../components/ui/themebutton";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("bg-gradient-to-r from-red-800 to-yellow-500");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  const handleThemeChange = (theme: string): void => {
    setTheme(theme);
  };

  return (
    <div className={`${theme} p-4 rounded-lg flex flex-col items-center justify-center h-screen`}>
      <div className={`h-80 border-4 border-gray-800 rounded-lg p-8 w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-lg ${theme}`}>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          <strong>COUNTDOWN TIMER</strong>
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            <strong>Set</strong>
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
        <div className="mt-4 flex gap-4 justify-center items-center">
          <ThemeButton
            theme="bg-gradient-to-r from-red-800 to-yellow-500"
            onClick={handleThemeChange}
          />
          <ThemeButton
            theme="bg-gradient-to-r from-blue-700 to-green-400"
            onClick={handleThemeChange}
            // imageSrc="/images/theme2.jpg" // Replace with actual image path
          />
          <ThemeButton
            theme="bg-gradient-to-r from-purple-300 to-pink-900"
            onClick={handleThemeChange}
            // imageSrc="/images/theme3.webp" // Replace with actual image path
          />
        </div>
      </div>
    </div>
  );
}