import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";
import useDarkMode from "./hooks/useDarkMode";
import DarkLogo from "./assets/logo-dark.png";
import LightLogo from "./assets/logo-light.png";
import Timer from "./components/Timer";
import { TaskTimerProvider } from "./context/TaskTimerContext";
import TasksPanel from "./components/TasksPanel";

export default function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-zinc-700">
        <img
          src={isDark ? DarkLogo : LightLogo}
          alt="Trackwise Logo"
          className="h-14 max-h-16 w-auto max-w-xs sm:max-w-sm md:max-w-md object-contain transition-all duration-300"
        />

        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-sm">{isDark ? "Dark" : "Light"}</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleDarkMode}
              className="sr-only"
            />
            <div className="block w-12 h-7 rounded-full bg-gray-300 dark:bg-zinc-700 transition-colors"></div>
            <div
              className={`dot absolute left-1 top-1 w-5 h-5 rounded-full transition transform ${
                isDark ? "translate-x-5 bg-zinc-900" : "translate-x-0 bg-white"
              } shadow`}
            ></div>
          </div>
        </label>
      </div>

      {/* Main layout with resizable panels */}
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <Panel defaultSize={15} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4 border-r border-gray-300 dark:border-zinc-700">
              <p>Sidebar</p>
            </div>
          </Panel>

          {/* Horizontal Resizer */}
          <PanelResizeHandle className="w-2 flex items-center justify-center group cursor-col-resize bg-gray-300 dark:bg-zinc-700">
            <div className="w-1 h-6 rounded bg-gray-500 dark:bg-gray-400 opacity-70 group-hover:opacity-100 transition-all"></div>
          </PanelResizeHandle>

          {/* Center (Timer + Notes) */}
          <Panel defaultSize={70} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Timer Panel */}
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full bg-white dark:bg-zinc-900 p-4 border-b border-gray-300 dark:border-zinc-700 flex flex-col">
                  <h2 className="text-2xl font-semibold mb-4 text-center">Timer</h2>
                  <div className="flex-1 flex items-center justify-center">
                    <Timer />
                  </div>
                </div>
              </Panel>

              {/* Vertical Resizer */}
              <PanelResizeHandle className="h-2 flex items-center justify-center group cursor-row-resize bg-gray-300 dark:bg-zinc-700">
                <div className="h-1 w-6 rounded bg-gray-500 dark:bg-gray-400 opacity-70 group-hover:opacity-100 transition-all"></div>
              </PanelResizeHandle>

              {/* Notes Panel */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full bg-gray-50 dark:bg-zinc-800 p-4">
                  <p>Notes</p>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          {/* Horizontal Resizer */}
          <PanelResizeHandle className="w-2 flex items-center justify-center group cursor-col-resize bg-gray-300 dark:bg-zinc-700">
            <div className="w-1 h-6 rounded bg-gray-500 dark:bg-gray-400 opacity-70 group-hover:opacity-100 transition-all"></div>
          </PanelResizeHandle>

          {/* Right Tasks Panel */}
          <Panel defaultSize={15} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4 border-l border-gray-300 dark:border-zinc-700">
              <TasksPanel />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
