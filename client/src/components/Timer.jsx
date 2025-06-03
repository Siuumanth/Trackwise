import React, { useMemo } from "react";
import useTimer from "../hooks/useTimer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import formatTime from "../utils/formatTime";
import { useTaskTimer } from "../hooks/useTaskTimer";
import useDarkMode from "../hooks/useDarkMode";
import { Pause, Play } from "lucide-react";

export default function Timer() {
  const { state, dispatch } = useTaskTimer();
  const [isDark] = useDarkMode();

const selectedTask = state.tasks.find((t) => t.id === state.currentTaskId);
const showRunning = state.isRunning && selectedTask;

const runningElapsed = useTimer(showRunning, state.startTimestamp);

const displayTime = useMemo(() => {
  if (showRunning) return runningElapsed;
  return selectedTask?.elapsed || 0;
}, [showRunning, runningElapsed, selectedTask]);


  const formattedTime = useMemo(() => formatTime(displayTime), [displayTime]);
  useDocumentTitle(`${formattedTime} - Trackwise`);

  const handleToggle = () => {
    if (!state.currentTaskId) {
      alert("Please select a task from the right panel first.");
      return;
    }

    if (state.isRunning) {
      dispatch({ type: "PAUSE", payload: { elapsed: displayTime } });
    } else {
      dispatch({
        type: "START_TASK",
        payload: {
          taskId: state.currentTaskId,
          offset: displayTime,
        },
      });
    }
  };

  const radius = 120;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;

  const textColor = isDark ? "#fff" : "#000";
  const bgRing = isDark ? "#374151" : "#e5e7eb";

  return (
    <div
      className="flex flex-col items-center justify-center h-full space-y-5 cursor-pointer select-none"
      onClick={handleToggle}
    >
      {/* Timer Display */}
      <div
        className={`relative rounded-full transition-shadow duration-300 ${
          state.isRunning ? "shadow-lg" : ""
        }`}
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static gray ring */}
          <circle
            stroke={bgRing}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Glowing blue ring (shows full circle on start, fades out on pause) */}
          <circle
            stroke="url(#timerGradient)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            strokeDashoffset={state.isRunning ? 0 : circumference}
            style={{
              transition: "stroke-dashoffset 0.5s ease, opacity 0.5s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              filter: "url(#glow)",
              opacity: state.isRunning ? 0.81 : 0,
            }}
          />

          {/* Timer Text */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize="55"
            fill={textColor}
            style={{ fontWeight: 3.5 }}
            className="transition-opacity duration-150 ease-in-out fill-gray-800 dark:fill-white"
          >
            {formattedTime}
          </text>
        </svg>
      </div>

      {/* Start / Pause Icon */}
      <div className="mt-1 text-gray-800 dark:text-gray-400">
        {state.isRunning ? (
          <Pause className="w-10 h-10 opacity-90 drop-shadow-md fill-current" />
        ) : (
          <Play className="w-10 h-10 opacity-90 drop-shadow-md fill-current" />
        )}
      </div>

      {/* Info Text */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Click or tap anywhere to {state.isRunning ? "pause" : "start"}
      </div>
    </div>
  );
}
