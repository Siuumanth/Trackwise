import React, { useMemo } from "react";
import useTimer from "../hooks/useTimer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import formatTime from "../utils/formatTime";
import { useTaskTimer } from "../hooks/useTaskTimer";
import useDarkMode from "../hooks/useDarkMode";
import { Pause, Play } from "lucide-react";

export default function Timer() {
  const { state, dispatch } = useTaskTimer();
  const runningElapsed = useTimer(state.isRunning, state.startTimestamp);
  const [isDark] = useDarkMode();

  let displayTime = 0;
  if (state.isRunning) {
    displayTime = runningElapsed;
  } else if (state.currentTaskId) {
    const selected = state.tasks.find((t) => t.id === state.currentTaskId);
    displayTime = selected?.elapsed || 0;
  }

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

  const textColor = isDark ? "#fff" : "#000";
  const iconColor = isDark ? "text-white" : "text-black";
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
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke={bgRing}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="52"
            fill={textColor}
            className="transition-opacity duration-150 ease-in-out"
          >
            {formattedTime}
          </text>
        </svg>
      </div>

      {/* Start / Pause Icon */}
      <div className={`mt-1 ${iconColor}`}>
        {state.isRunning ? (
          <Pause className="w-10 h-10 opacity-90 drop-shadow-md" />
        ) : (
          <Play className="w-10 h-10 opacity-90 drop-shadow-md" />
        )}
      </div>

      {/* Info Text */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Click or tap anywhere to {state.isRunning ? "pause" : "start"}
      </div>
    </div>
  );
}
