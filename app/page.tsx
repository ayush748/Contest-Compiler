"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import CodeEditor from "./component/CodeEditor";
import ProblemPanel from "./component/ProblemPanel";
import TestCasePanel from "./component/TestCasePanel";

// ✅ Define a type for test cases
export interface TestCaseItem {
  id: number;
  input: string;
  expected_output: string;
  result?: string;        // ✅ Passed / ❌ Failed / Error
  time?: string;          // execution time
  memory?: string;        // memory usage
  error?: string;         // error message if any
  actual_output?: string; // optional: what Judge0 returned
}

const languageMap: Record<string, number> = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

export default function Page() {
  const [problemText, setProblemText] = useState("");
  const [showProblem, setShowProblem] = useState(false);
  const [showTestPanel, setShowTestPanel] = useState(false);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("// Write your code here...");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("⚡ Ready to run your code...");

  // test cases
  const [testCases, setTestCases] = useState<TestCaseItem[]>([]);
  const [running, setRunning] = useState(false);

  // theme & settings
  const [theme, setTheme] = useState("system");
  const [showSettings, setShowSettings] = useState(false);

  // Monaco editor refs
  const editorRef = useRef<any | null>(null);
  const monacoRef = useRef<any | null>(null);

  // Theme handling
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Expose editor via onMount
  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    try {
      const model = editor.getModel();
      monaco.editor.setModelMarkers(model, "owner", []);
    } catch {}
  };

  const setEditorMarkers = (markers: any[]) => {
    try {
      const model = editorRef.current?.getModel();
      if (!model || !monacoRef.current) return;
      monacoRef.current.editor.setModelMarkers(model, "owner", markers);
    } catch {}
  };

  const highlightCompileError = (message: string) => {
    if (!editorRef.current || !monacoRef.current) return;
    setEditorMarkers([]);

    const regexes = [/:?([^\s:]+):(\d+):(\d+)/, /:(\d+):\d+:/, /:(\d+):/, /line (\d+)/i];
    let lineNumber: number | null = null;

    for (const r of regexes) {
      const m = message.match(r);
      if (m) {
        for (let i = 1; i < m.length; i++) {
          const v = parseInt(m[i]);
          if (!isNaN(v)) {
            lineNumber = v;
            break;
          }
        }
        if (lineNumber) break;
      }
    }

    const severity = monacoRef.current?.MarkerSeverity?.Error ?? 8;

    if (lineNumber && monacoRef.current && editorRef.current) {
      const model = editorRef.current.getModel();
      setEditorMarkers([
        {
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          startColumn: 1,
          endColumn: Math.max(1, model.getLineMaxColumn(lineNumber) || 80),
          message,
          severity,
        },
      ]);
      try {
        editorRef.current.revealLineInCenter(lineNumber);
      } catch {}
    } else {
      setEditorMarkers([
        {
          startLineNumber: 1,
          endLineNumber: 1,
          startColumn: 1,
          endColumn: 1,
          message,
          severity,
        },
      ]);
    }
  };

  // Run single execution
  const handleRun = async () => {
    setOutput("⏳ Running your code...");
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: languageMap[language],
          stdin,
        },
        {
          params: { base64_encoded: "false", wait: "true" },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          },
        }
      );
      const result = response.data;
      setEditorMarkers([]);

      if (result.stderr) {
        setOutput(`❌ Runtime Error:\n${result.stderr}`);
        highlightCompileError(result.stderr);
      } else if (result.compile_output) {
        setOutput(`⚠️ Compilation Error:\n${result.compile_output}`);
        highlightCompileError(result.compile_output);
      } else {
        setOutput(result.stdout || "No output");
      }
    } catch (err: any) {
      setOutput(`🔥 Error: ${err.message || String(err)}`);
    }
  };

  // Generate test cases from AI
  const handleGenerateAI = async () => {
    try {
      const res = await fetch("/api/generate-testcases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemText }),
      });
      const json = await res.json();
      const list = json?.testcases ?? [];
      const normalized = (list as any[]).map((p, i) => ({
        id: Date.now() + i,
        input: String(p.input ?? p.stdin ?? "").trim(),
        expected_output: String(p.expected_output ?? p.output ?? "").trim(),
      }));
      setTestCases(normalized);
    } catch (e) {
      console.error("AI generate error", e);
      setTestCases([]);
    }
  };

  // Run a single test case
  const runSingleTest = async (id: number) => {
    const tc = testCases.find((t) => t.id === id);
    if (!tc) return;
    setRunning(true);

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: languageMap[language],
          stdin: tc.input,
        },
        {
          params: { base64_encoded: "false", wait: "true" },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          },
        }
      );

      const result = response.data;
      let updated: Partial<TestCaseItem> = {};

      if (result.stderr) {
        updated.error = result.stderr;
        updated.result = "❌ Error";
        highlightCompileError(result.stderr);
      } else if (result.compile_output) {
        updated.error = result.compile_output;
        updated.result = "❌ Compile Error";
        highlightCompileError(result.compile_output);
      } else {
        const got = (result.stdout ?? "").trim();
        const expected = (tc.expected_output ?? "").trim();
        const passed = got === expected;
        updated.result = passed ? "✅ Passed" : "❌ Failed";
        updated.time = result.time ?? result.execution_time ?? undefined;
        updated.memory = result.memory ?? undefined;
        updated.actual_output = got;
        updated.error = undefined;
      }

      setTestCases((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    } catch (err: any) {
      setTestCases((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, error: err.message || String(err), result: "❌ Error" } : p
        )
      );
    } finally {
      setRunning(false);
    }
  };

  // Run all test cases sequentially
  const runAllTests = async () => {
    if (testCases.length === 0) return;
    setRunning(true);
    setEditorMarkers([]);
    for (const tc of testCases) {
      // eslint-disable-next-line no-await-in-loop
      await runSingleTest(tc.id);
    }
    setRunning(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <Navbar
        handleRun={handleRun}
        theme={theme}
        setTheme={setTheme}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProblem((s) => !s)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
          >
            {showProblem ? "Close Problem" : "Problem"}
          </button>

          <button
            onClick={() => setShowTestPanel((s) => !s)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            {showTestPanel ? "Hide Test Panel" : "Test Cases"}
          </button>
        </div>

        <select
          aria-label="Select programming language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        {showProblem && (
          <div className="w-[40%] border-r border-gray-300 dark:border-gray-600 flex flex-col">
            <ProblemPanel problemText={problemText} setProblemText={setProblemText} />
            {showTestPanel && (
              <div className="h-1/2">
                <TestCasePanel
                  testCases={testCases}
                  setTestCases={setTestCases}
                  onGenerateAI={handleGenerateAI}
                  onRunAll={runAllTests}
                  onRunSingle={runSingleTest}
                  running={running}
                />
              </div>
            )}
          </div>
        )}

        {/* Right panel */}
        <div className={`flex-1 p-4 flex flex-col ${showProblem ? "w-[60%]" : "w-full"}`}>
          <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">Code Editor</h1>
          <div className="flex-1 mb-3">
            <CodeEditor language={language} code={code} setCode={setCode} onMount={handleEditorMount} />
          </div>

          {!showTestPanel ? (
            <div className="h-56 grid grid-cols-2 gap-4 bg-white dark:bg-[#1e1e2e] text-black dark:text-gray-200 p-3 rounded transition-colors">
              {/* STDIN */}
              <div className="flex flex-col">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Input (stdin)</h2>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter input here..."
                  className="flex-1 p-2 text-sm bg-gray-100 dark:bg-[#181825] text-gray-800 dark:text-green-400 border border-gray-300 dark:border-gray-700 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* STDOUT */}
              <div className="flex flex-col">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Output (stdout)</h2>
                <pre className="flex-1 p-2 text-sm bg-gray-100 dark:bg-[#181825] text-gray-800 dark:text-green-400 border border-gray-300 dark:border-gray-700 rounded overflow-y-auto whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300 p-2">
              Test Case panel open — stdin/stdout panel hidden.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
