import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";
import useDarkMode from "./hooks/useDarkMode";
import DarkLogo from "./assets/logo-dark.png";
import LightLogo from "./assets/logo-light.png";

export default function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      {/* Header with logo and theme toggle */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-zinc-700">
        <img
          src={isDark ? DarkLogo : LightLogo}
          alt="Trackwise Logo"
          className="h-14 max-h-16 w-auto max-w-xs sm:max-w-sm md:max-w-md object-contain transition-all duration-300"
        />
              
        {/* Custom Toggle Switch */}
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
                isDark
                  ? "translate-x-5 bg-zinc-900"
                  : "translate-x-0 bg-white"
              } shadow`}
            ></div>
          </div>
        </label>
      </div>

      {/* Main layout with resizable panels */}
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <Panel defaultSize={20} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4">
              {/* Sidebar content goes here */}
              <p>Sidebar</p>
            </div>
          </Panel>
          {/* Improved Panel Resize Handle */}
          <PanelResizeHandle>
            <div className="w-2 h-full flex items-center justify-center group cursor-col-resize">
              <div className="w-1 h-8 rounded bg-gray-400 dark:bg-zinc-600 group-hover:bg-blue-500 transition-all"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" fill="none" className="text-blue-500">
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </PanelResizeHandle>

          {/* Center (Timer + Notes) and Right Panel */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Timer */}
              <Panel defaultSize={75}>
                <div className="h-full bg-white dark:bg-zinc-900 p-4">
                  {/* Timer content goes here */}
                  <p>Timer</p>
                </div>
              </Panel>
              {/* Improved Panel Resize Handle */}
              <PanelResizeHandle>
                <div className="h-2 w-full flex items-center justify-center group cursor-row-resize">
                  <div className="h-1 w-8 rounded bg-gray-400 dark:bg-zinc-600 group-hover:bg-blue-500 transition-all"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" fill="none" className="text-blue-500">
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </PanelResizeHandle>
              {/* Notes */}
              <Panel defaultSize={25}>
                <div className="h-full bg-gray-50 dark:bg-zinc-800 p-4">
                  {/* Notes content goes here */}
                  <p>Notes</p>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
          {/* Improved Panel Resize Handle */}
          <PanelResizeHandle>
            <div className="w-2 h-full flex items-center justify-center group cursor-col-resize">
              <div className="w-1 h-8 rounded bg-gray-400 dark:bg-zinc-600 group-hover:bg-blue-500 transition-all"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" fill="none" className="text-blue-500">
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </PanelResizeHandle>

          {/* Right Tasks */}
          <Panel defaultSize={20} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4">
              {/* Tasks content goes here */}
              <p>Tasks</p>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
