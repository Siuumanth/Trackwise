import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";
import useDarkMode from "./hooks/useDarkMode";
import DarkLogo from "./assets/logo-dark.png";
import LightLogo from "./assets/logo-light.png";
import Timer from "./components/Timer";

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
          <Panel defaultSize={20} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4">
              <p>Sidebar</p>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 cursor-col-resize bg-gray-300 dark:bg-zinc-700" />

          {/* Center (Timer + Notes) */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Timer */}
              <Panel defaultSize={30} minSize={20}>
                <div className="h-full bg-white dark:bg-zinc-900 p-4">
                  <Timer />
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 cursor-row-resize bg-gray-300 dark:bg-zinc-700" />

              {/* Notes */}
              <Panel defaultSize={70} minSize={30}>
                <div className="h-full bg-gray-50 dark:bg-zinc-800 p-4">
                  <p>Notes</p>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 cursor-col-resize bg-gray-300 dark:bg-zinc-700" />

          {/* Right Tasks */}
          <Panel defaultSize={20} minSize={10}>
            <div className="h-full bg-gray-100 dark:bg-zinc-800 p-4">
              <p>Tasks</p>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
