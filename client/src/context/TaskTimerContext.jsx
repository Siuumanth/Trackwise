import { createContext, useContext, useReducer } from "react";

// Example tasks shown on initial load (you can customize these)
const exampleTasks = [
  { id: "1", title: "Read DSA notes", elapsed: 0 },
  { id: "2", title: "Watch backend video", elapsed: 0 },
  { id: "3", title: "Practice Leetcode", elapsed: 0 },
];

// Initial global state
const initialState = {
  currentTaskId: null,
  isRunning: false,
  isTrackingTotal: false,
  startTimestamp: null,
  elapsedTime: 0, // Only used when tracking total time
  tasks: exampleTasks,
};

// Reducer for global state
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      // Add new task with zero elapsed time
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        elapsed: 0,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case "SELECT_TASK":
      // Select task for tracking
      return {
        ...state,
        currentTaskId: action.payload.taskId,
      };

    case "START_TASK":
      // Start selected task from its own elapsed time
      const taskToStart = state.tasks.find(t => t.id === action.payload.taskId);
      const offset = taskToStart ? taskToStart.elapsed : 0;
      return {
        ...state,
        currentTaskId: action.payload.taskId,
        isRunning: true,
        isTrackingTotal: false,
        startTimestamp: Date.now() - offset * 1000,
      };

    case "START_TOTAL":
      // Start total time tracking by summing all task elapsed times
      const totalElapsed = state.tasks.reduce(
        (sum, task) => sum + (task.elapsed || 0),
        0
      );
      return {
        ...state,
        currentTaskId: null,
        isRunning: true,
        isTrackingTotal: true,
        startTimestamp: Date.now() - totalElapsed * 1000,
        elapsedTime: totalElapsed,
      };

    case "PAUSE":
      // Pause and update either total or individual task
      if (state.isTrackingTotal) {
        return {
          ...state,
          isRunning: false,
          elapsedTime: action.payload.elapsed,
        };
      } else {
        const now = Date.now();
        const elapsedSinceStart = Math.floor((now - state.startTimestamp) / 1000); // Convert ms to whole seconds

        const updatedTasks = state.tasks.map((task) =>
          task.id === state.currentTaskId
            ? { ...task, elapsed: elapsedSinceStart }
            : task
        );

        return {
          ...state,
          isRunning: false,
          startTimestamp: null,
          tasks: updatedTasks,
        };
      }

    case "DELETE_TASK":
      // Remove task by ID and reset current state if the deleted task was active
      const remainingTasks = state.tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
      const isDeletedCurrent = state.currentTaskId === action.payload.taskId;
      return {
        ...state,
        tasks: remainingTasks,
        currentTaskId: isDeletedCurrent ? null : state.currentTaskId,
        isRunning: isDeletedCurrent ? false : state.isRunning,
        startTimestamp: isDeletedCurrent ? null : state.startTimestamp,
      };

    default:
      return state;
  }
}

// Context creation
export const TaskTimerContext = createContext();

// Context Provider
export function TaskTimerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskTimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskTimerContext.Provider>
  );
}

// Hook to use this context
export function useTaskTimerContext() {
  return useContext(TaskTimerContext);
}