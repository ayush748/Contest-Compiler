"use client";

import { useState } from "react";

export type TestCaseItem = {
  id: number;
  input: string;
  expected_output: string;
  result?: string; // "Passed" | "Failed"
  time?: string;
  memory?: string;
  error?: string;
};

type TestCasePanelProps = {
  testCases: TestCaseItem[];
  setTestCases: (v: TestCaseItem[] | ((prev: TestCaseItem[]) => TestCaseItem[])) => void;
  onGenerateAI: () => Promise<void>;
  onRunAll: () => Promise<void>;
  onRunSingle: (id: number) => Promise<void>;
  running: boolean;
};

export default function TestCasePanel({
  testCases,
  setTestCases,
  onGenerateAI,
  onRunAll,
  onRunSingle,
  running,
}: TestCasePanelProps) {
  const [filterShowError, setFilterShowError] = useState(false);

  const addEmpty = () => {
    setTestCases((prev: TestCaseItem[]) => [
      ...prev,
      {
        id: Date.now(),
        input: "",
        expected_output: "",
      },
    ]);
  };

  const cloneLast = () => {
    setTestCases((prev: TestCaseItem[]) => {
      if (prev.length === 0) {
        return [
          ...prev,
          {
            id: Date.now(),
            input: "",
            expected_output: "",
          },
        ];
      }
      const last = prev[prev.length - 1];
      return [...prev, { ...last, id: Date.now() }];
    });
  };

  const updateField = (id: number, field: "input" | "expected_output", value: string) => {
    setTestCases((prev: TestCaseItem[]) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const removeCase = (id: number) => {
    setTestCases((prev: TestCaseItem[]) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
      <div className="p-3 flex items-center justify-between border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Test Cases</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateAI}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            title="Generate test cases from problem statement using AI"
          >
            Generate (AI)
          </button>

          <button
            onClick={cloneLast}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
            title="Clone last test case"
          >
            Clone
          </button>

          <button
            onClick={addEmpty}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
            title="Add empty test case"
          >
            + Add
          </button>

          <button
            onClick={onRunAll}
            className={`px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded ${
              running ? "opacity-60 pointer-events-none" : ""
            }`}
            title="Run all test cases"
          >
            Run All
          </button>
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        {testCases.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No test cases yet — click <strong>Generate (AI)</strong> or <strong>+ Add</strong>.
          </p>
        ) : (
          <div className="space-y-3">
            {testCases.map((tc, idx) => (
              <div
                key={tc.id}
                className="p-3 border rounded bg-white dark:bg-[#0f1724] dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Case {idx + 1}
                      </span>

                      {tc.result ? (
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            tc.result.startsWith("✅")
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {tc.result}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                          Not run
                        </span>
                      )}

                      {tc.time && (
                        <span className="text-xs ml-2 text-gray-600 dark:text-gray-300">
                          {tc.time}s
                        </span>
                      )}
                      {tc.memory && (
                        <span className="text-xs ml-2 text-gray-600 dark:text-gray-300">
                          {tc.memory}KB
                        </span>
                      )}
                    </div>

                    {/* Input field */}
                    <label
                      htmlFor={`input-${tc.id}`}
                      className="block text-xs text-gray-600 dark:text-gray-300"
                    >
                      Input
                    </label>
                    <textarea
                      id={`input-${tc.id}`}
                      value={tc.input}
                      onChange={(e) => updateField(tc.id, "input", e.target.value)}
                      className="w-full mt-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded resize-none"
                      rows={3}
                      placeholder="Enter test case input"
                      title="Test case input"
                    />

                    {/* Expected Output field */}
                    <label
                      htmlFor={`expected-${tc.id}`}
                      className="block text-xs text-gray-600 dark:text-gray-300 mt-2"
                    >
                      Expected Output
                    </label>
                    <input
                      id={`expected-${tc.id}`}
                      value={tc.expected_output}
                      onChange={(e) => updateField(tc.id, "expected_output", e.target.value)}
                      className="w-full mt-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded"
                      placeholder="Enter expected output"
                      title="Expected output"
                    />

                    {tc.error && (
                      <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded text-sm text-red-700 dark:text-red-300">
                        <div className="font-medium">Error</div>
                        <pre className="whitespace-pre-wrap text-xs">{tc.error}</pre>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRunSingle(tc.id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-black text-sm"
                      title="Run this test case"
                    >
                      Run
                    </button>

                    <button
                      onClick={() =>
                        setTestCases((prev: TestCaseItem[]) => {
                          const found = prev.find((p) => p.id === tc.id);
                          if (!found) return prev;
                          return [...prev, { ...found, id: Date.now() }];
                        })
                      }
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm"
                      title="Duplicate"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => removeCase(tc.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                      title="Delete test case"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
