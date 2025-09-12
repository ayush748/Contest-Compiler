"use client";

/**
 * @param {{ 
 *   handleRun: () => void, 
 *   theme: string, 
 *   setTheme: (value: string) => void, 
 *   setShowSettings: (value: boolean) => void, 
 *   showSettings: boolean 
 * }} props
 */
export default function Navbar({ handleRun, theme, setTheme, showSettings, setShowSettings }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      <div className="w-20"></div>

      {/* Run button */}
      <button
        onClick={handleRun}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
      >
        Run
      </button>

      <div className="flex items-center gap-3 relative">
        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Settings
          </button>

          {showSettings && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <button
                onClick={() => setTheme("light")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                  theme === "light" ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                🌞 Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                  theme === "dark" ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                  theme === "system" ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                💻 System Default
              </button>
            </div>
          )}
        </div>

        {/* Hint */}
        <button
          onClick={() => alert("💡 Hint: Connect this button with GPT or Gemini API for problem hints.")}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
        >
          Hint
        </button>
      </div>
    </header>
  );
}
