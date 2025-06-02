
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