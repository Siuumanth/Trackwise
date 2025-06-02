import React from "react";
import useTimer from "../hooks/useTimer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import formatTime from "../utils/formatTime";
import { useTaskTimer } from "../hooks/useTaskTimer";
import useDarkMode from "../hooks/useDarkMode";

export default function Timer() {
  const { state, dispatch } = useTaskTimer();
  const runningElapsed = useTimer(state.isRunning, state.startTimestamp);
  const [isDark] = useDarkMode();

  // Compute displayed time
  let displayTime = 0;

  if (state.isRunning) {
    displayTime = runningElapsed;
  } else if (state.currentTaskId) {
    const selected = state.tasks.find((t) => t.id === state.currentTaskId);
    displayTime = selected?.elapsed || 0;
  }

  useDocumentTitle(`${formatTime(displayTime)} - Trackwise`);

  const handlePause = () => {
    dispatch({ type: "PAUSE", payload: { elapsed: displayTime } });
  };

  const handleStartTask = () => {
    if (state.currentTaskId) {
      dispatch({
        type: "START_TASK",
        payload: {
          taskId: state.currentTaskId,
          offset: displayTime,
        },
      });
    } else {
      alert("Please select a task from the right panel first.");
    }
  };

  const radius = 120;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;

  const textColor = isDark ? "#fff" : "#000";
  const bgRing = isDark ? "#374151" : "#e5e7eb";

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {/* Timer Display */}
      <div className={`relative rounded-full shadow-xl transition-all duration-500 ${state.isRunning ? "ring-4 ring-blue-500/40" : ""}`}>
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
          >
            {formatTime(displayTime)}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3">
        {state.isRunning ? (
          <button
            onClick={handlePause}
            className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg shadow"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handleStartTask}
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white font-semibold px-5 py-2 rounded-lg shadow"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
