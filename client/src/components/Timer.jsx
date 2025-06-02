

// /src/components/Timer.jsx
import React from "react";
import useTimer from "../hooks/useTimer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import formatTime from "../utils/formatTime";
import { useTaskTimer } from "../hooks/useTaskTimer";


export default function Timer() {
 const { state, dispatch } = useTaskTimer();
console.log("Timer loaded"); // Check if this shows up

  const elapsed = useTimer(state.isRunning, state.startTimestamp);

  // Update browser tab title with timer
  useDocumentTitle(`${formatTime(elapsed)} - Trackwise`);

  // Event handlers for buttons
  const handlePause = () => {
    dispatch({ type: "PAUSE", payload: { elapsed } });
  };

  const handleStartTask = () => {
    dispatch({ type: "START_TASK", payload: { taskId: "task-1", offset: elapsed } });
  };

  const handleStartTotal = () => {
    dispatch({ type: "START_TOTAL", payload: { offset: elapsed } });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="text-center space-y-4">
      {/* Timer display */}
      <h2 className="text-4xl font-bold">{formatTime(elapsed)}</h2>

      {/* Control buttons */}
      <div className="space-x-2">
        {state.isRunning ? (
          <button onClick={handlePause} className="bg-red-500 text-white px-4 py-2 rounded">Pause</button>
        ) : (
          <>
            <button onClick={handleStartTask} className="bg-green-500 text-white px-4 py-2 rounded">Start Task</button>
            <button onClick={handleStartTotal} className="bg-blue-500 text-white px-4 py-2 rounded">Track Total</button>
          </>
        )}
        <button onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </div>
  );
}
