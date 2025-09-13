import { testCase } from "@/app/types/types";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Props = {
  testcases: testCase[];
  output: string; // newline separated
};

const TestCasesResults: React.FC<Props> = ({ testcases, output }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const outputs = output
    .trim()
    .split("\n")
    .map((line) => line.trim());

  return (
    <div className="p-4 bg-black text-white space-y-6 rounded-xl">
      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {testcases.map((_, idx) => {
          const actual = outputs[idx] ?? "";
          const expected = testcases[idx].expected_output.trim();
          const passed = actual === expected;

          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                idx === activeIndex ? "bg-gray-700" : "bg-gray-800"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  idx === activeIndex
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Case {idx + 1}
              </span>
              {passed ? (
                <FaCheckCircle className="text-green-400 text-xs" />
              ) : (
                <FaTimesCircle className="text-red-400 text-xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active test case */}
      {testcases[activeIndex] && (
        <div className="space-y-5">
          {/* Inputs */}
          {testcases[activeIndex].input.map((inp, idx) => (
            <div key={idx} className="space-y-1">
              <label className="text-sm text-gray-300">{inp.name} =</label>
              <input
                className="w-full bg-gray-700 rounded-md px-3 py-2 text-white focus:outline-none"
                type="text"
                value={
                  inp.type === "array"
                    ? JSON.stringify(inp.value)
                    : inp.value
                }
                disabled
              />
            </div>
          ))}

          {/* Expected Output */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">expected_output =</label>
            <input
              className="w-full bg-gray-700 rounded-md px-3 py-2 text-white"
              type="text"
              value={testcases[activeIndex].expected_output}
              disabled
            />
          </div>

          {/* Actual Output */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">output =</label>
            <input
              className="w-full bg-gray-700 rounded-md px-3 py-2 text-white"
              type="text"
              value={outputs[activeIndex] ?? ""}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCasesResults;
