// /src/context/TaskTimerContext.jsx
import { createContext, useContext, useReducer } from "react";


// Initial state for the timer system
const initialState = {
  currentTaskId: null,
  isRunning: false,
  isTrackingTotal: false,
  startTimestamp: null,
  elapsedTime: 0,
};

// Global Context Reducer to handle timer actions
function reducer(state, action) {
  switch (action.type) {
    case "START_TASK":
      // Start tracking time for a specific task
      return {
        ...state,
        currentTaskId: action.payload.taskId,
        isRunning: true,
        isTrackingTotal: false,
        startTimestamp: Date.now() - action.payload.offset * 1000,
      };
    case "START_TOTAL":
      // Start tracking time for the total time spent on all tasks
      return {
        ...state,
        isRunning: true,
        isTrackingTotal: true,
        startTimestamp: Date.now() - action.payload.offset * 1000,
      };
    case "PAUSE":
      // Pause the timer and record the current elapsed time
      return {
        ...state,
        isRunning: false,
        elapsedTime: action.payload.elapsed,
      };
    case "RESET":
      // Reset the timer state to its initial values
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

/*
...state is the spread operator, and it copies all existing key-value pairs from the current state object into the new object being returned, ensuring that unchanged state properties are preserved during the update.

action.payload.elapsed is the current elapsed time (in seconds) of the timer before it was paused.
*/


// Context provider to wrap your app
export function TaskTimerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskTimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskTimerContext.Provider>
  );
}

// Create a context to share timer state across components
export const TaskTimerContext = createContext();

