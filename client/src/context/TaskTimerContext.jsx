import { createContext, useContext, useReducer } from "react";
import { useTaskTimer } from "../hooks/useTaskTimer";
// Example tasks shown on initial load
const exampleTasks = [
  { id: "1", title: "Read DSA notes", elapsed: 0 },
  { id: "2", title: "Watch backend video", elapsed: 0 },
  { id: "3", title: "Practice Leetcode", elapsed: 0 },
];

// Initial global state
const initialState = {
  currentTaskId: null,
  isRunning: false,
  startTimestamp: null,
  selectedElapsed: 0,
  tasks: exampleTasks,
};


// Reducer for global state
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        elapsed: 0,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

case "SELECT_TASK": {
  const selectedTask = state.tasks.find(
    (task) => task.id === action.payload.taskId
  );

  return {
    ...state,
    currentTaskId: action.payload.taskId,
    selectedElapsed: selectedTask ? selectedTask.elapsed : 0,
  };
}


case "START_TASK": {
  const taskToStart = state.tasks.find(
    (t) => t.id === action.payload.taskId
  );
  const offset = taskToStart ? taskToStart.elapsed : 0;
  return {
    ...state,
    currentTaskId: action.payload.taskId,
    isRunning: true,
    startTimestamp: Date.now() - offset * 1000,
    selectedElapsed: offset,
  };
}



    case "PAUSE": {
      const now = Date.now();
      const elapsedSinceStart = Math.floor((now - state.startTimestamp) / 1000);
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

    case "DELETE_TASK": {
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
    }

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
