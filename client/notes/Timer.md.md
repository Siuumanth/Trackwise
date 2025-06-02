## 1. Use Reducer

`useReducer` is a React Hook used to manage complex state logic by using a **reducer function** — it’s an alternative to `useState`, especially useful when the next state depends on the previous state or when you have multiple related state values.

---

### ✅ Syntax:

```js
const [state, dispatch] = useReducer(reducerFunction, initialState);
```

- `reducerFunction`: A function `(state, action) => newState` that decides how to update the state.
    
- `initialState`: The starting state value.
    
- `state`: The current state value.
    
- `dispatch`: A function used to send actions (objects with a `type` and optional `payload`) to the reducer.
    

---

### ✅ Example:

```js
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const initialState = { count: 0 };

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </>
  );
}

```

---

### 💡 When to use:

- Complex state logic (like timers, forms, or tasks)
- When state depends on previous values
- Centralized state transitions

> Used in context > TaskTime.jsx

```js
context > TaskTime.jsx
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
  
// Hook to use the timer context
export function useTaskTimer() {
  return useContext(TaskTimerContext);
}
```

---


2. utils > useTimer.js

```js
  

//useTimer.js is a custom hook that continuously calculates and returns the elapsed time in seconds while the timer is running, updating every second.


import { useState, useEffect, useRef } from "react";
// Custom hook to keep track of elapsed seconds based on running state and start time

export default function useTimer(isRunning, startTime) {
  // State variable to keep track of elapsed seconds
  const [elapsed, setElapsed] = useState(0);
  
  // Ref to store the interval id returned by setInterval
  const intervalRef = useRef(null);
  
  useEffect(() => {
    // If the timer is running, set up an interval to update the elapsed time
    if (isRunning && startTime) {
      // Set the interval to run every 1000ms (1 second)
      intervalRef.current = setInterval(() => {
        // Calculate the elapsed time by subtracting the start time from the current time
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Return a cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime]);
  
  // Return the current elapsed time
  return elapsed;
}

/*
clearInterval is used to stop the timer loop created by setInterval, preventing memory leaks and unnecessary updates when the timer is paused, the component unmounts, or dependencies change.

*/
```