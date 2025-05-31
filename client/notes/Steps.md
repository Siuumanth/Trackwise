1. Set up dark mode config in `tailwind.config`, then make the useDarkMode custom hook for efficient changing of themes.

A custom hook like `useDarkMode` abstracts complex behavior (like syncing with system theme, storing preferences, and updating the DOM) into a **single, reusable function**. It helps you **separate logic from UI**, making your app more maintainable and scalable. This aligns with React's design philosophy of building apps with **composable, self-contained logic units**.

```javascript
export default function useDarkMode() {
// finding the current theme first 
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
      root.classList.add("dark");           // apply Tailwind's dark mode by adding "dark" class to <html>
      localStorage.setItem("theme", "dark"); // persist the user's preference in localStorage
    } else {
      root.classList.remove("dark");         // remove "dark" class to switch back to light mode
      localStorage.setItem("theme", "light"); // persist that user prefers light mode
    }
  }, [isDark]); // this effect runs every time `isDark` changes
  const toggleTheme = () => setIsDark((prev) => !prev);
  return [isDark, toggleTheme];

}
```


2. Making the main page , with different panels, using `npm install react-resizable-panels`, and app.jsx code.


3. So now add  the timer 
```
/src
│
├── /components
│   ├── Timer.jsx         # Reusable timer display and controls
│   ├── TaskControls.jsx  # Buttons for switching task, start, stop
│
├── /context
│   └── TaskTimerContext.jsx  # Global timer state (current task, running state, total time)
│
├── /hooks
│   ├── useTimer.js       # Core custom timer logic
│   └── useDocumentTitle.js # For updating HTML title
│
├── /utils
│   └── formatTime.js     # Helper to convert seconds to MM:SS

```