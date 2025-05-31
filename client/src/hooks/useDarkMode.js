import { useEffect, useState } from "react";

// custom hook for dark mode
export default function useDarkMode() {
    // getting the current theme first 
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";

    // default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement; // this gets the <html> element
    
    // if a theme is found then apply
    if (isDark) {
      root.classList.add("dark");           // apply Tailwind's dark mode by adding "dark" class to <html>
      localStorage.setItem("theme", "dark"); // persist the user's preference in localStorage
    } else {
      root.classList.remove("dark");         // remove "dark" class to switch back to light mode
      localStorage.setItem("theme", "light"); // persist that user prefers light mode
    }
  }, [isDark]); // this effect runs every time `isDark` changes
  
  
  const toggleTheme = () => setIsDark((prev) => !prev);

  return [isDark, toggleTheme];
}
