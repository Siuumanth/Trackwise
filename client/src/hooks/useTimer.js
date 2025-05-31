
// /src/hooks/useTimer.js
import { useState, useEffect, useRef } from "react";

// Custom hook to keep track of elapsed seconds based on running state and start time
export default function useTimer(isRunning, startTime) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime]);

  return elapsed;
}
