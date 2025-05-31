// /src/context/TaskTimerContext.jsx
import { createContext, useContext, useReducer } from "react";

// Create a context to share timer state across components
const TaskTimerContext = createContext();

// Initial state for the timer system
const initialState = {
  currentTaskId: null,
  isRunning: false,
  isTrackingTotal: false,
  startTimestamp: null,
  elapsedTime: 0,
};

// Reducer to handle timer actions
function reducer(state, action) {
  switch (action.type) {
    case "START_TASK":
      return {
        ...state,
        currentTaskId: action.payload.taskId,
        isRunning: true,
        isTrackingTotal: false,
        startTimestamp: Date.now() - action.payload.offset * 1000,
      };
    case "START_TOTAL":
      return {
        ...state,
        isRunning: true,
        isTrackingTotal: true,
        startTimestamp: Date.now() - action.payload.offset * 1000,
      };
    case "PAUSE":
      return {
        ...state,
        isRunning: false,
        elapsedTime: action.payload.elapsed,
      };
    case "RESET":
      return {
        ...state,
        currentTaskId: null,
        isRunning: false,
        isTrackingTotal: false,
        startTimestamp: null,
        elapsedTime: 0,
      };
    default:
      return state;
  }
}

// Context provider to wrap your app
export function TaskTimerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskTimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskTimerContext.Provider>
  );
}

// Hook to use the timer context
export function useTaskTimer() {
  return useContext(TaskTimerContext);
}