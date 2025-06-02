// /src/hooks/useTaskTimer.js
import { useContext } from "react";
import { TaskTimerContext } from "../context/TaskTimerContext";

export function useTaskTimer() {
  const context = useContext(TaskTimerContext);
  if (!context) {
    throw new Error("useTaskTimer must be used within a TaskTimerProvider");
  }
  return context;
}

