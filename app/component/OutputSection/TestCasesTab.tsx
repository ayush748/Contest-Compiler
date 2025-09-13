import { FC, useState } from "react";
import { testCase, testCase_Input } from "@/app/types/types";

interface Props {
  testcases: testCase[];
  settestcases: React.Dispatch<React.SetStateAction<testCase[]>>;
}

const TestCaseTab: FC<Props> = ({ testcases, settestcases }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInputChange = (
    inputIndex: number,
    newValue: string | number | any[]
  ) => {
    settestcases((prev) =>
      prev.map((tc, i) =>
        i === activeIndex
          ? {
              ...tc,
              input: tc.input.map((inp, idx) => {
                if (idx !== inputIndex) return inp;

                if (inp.type === "string" && typeof newValue === "string") {
                  return { ...inp, value: newValue };
                }
                if (inp.type === "number" && typeof newValue === "number") {
                  return { ...inp, value: newValue };
                }
                if (inp.type === "array" && Array.isArray(newValue)) {
                  return { ...inp, value: newValue };
                }
                return inp;
              }),
            }
          : tc
      )
    );
  };

  const handleExpectedChange = (newValue: string) => {
    settestcases((prev) =>
      prev.map((tc, i) =>
        i === activeIndex ? { ...tc, expected_output: newValue } : tc
      )
    );
  };

  const addNewTestCase = () => {
    settestcases((prev) => {
      const clone: testCase = JSON.parse(
        JSON.stringify(prev[activeIndex] ?? { input: [], expected_output: "" })
      );
      const updated = [...prev, clone];
      setActiveIndex(updated.length - 1);
      return updated;
    });
  };

  const deleteTestCase = (index: number) => {
    if (testcases.length === 1) return; // don't delete last one
    settestcases((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      const newIndex = Math.max(0, activeIndex - (index <= activeIndex ? 1 : 0));
      setActiveIndex(newIndex);
      return updated;
    });
  };

  return (
    <div className="p-4 bg-black text-white space-y-6 rounded-xl">
      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {testcases.map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${
              i === activeIndex ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            <button
              onClick={() => setActiveIndex(i)}
              className={`text-sm font-medium ${
                i === activeIndex ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Case {i + 1}
            </button>
            <button
              onClick={() => deleteTestCase(i)}
              className="text-gray-500 hover:text-red-400 ml-1 text-xs"
              title="Delete"
              disabled={testcases.length === 1}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addNewTestCase}
          className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:text-white text-lg"
          title="Clone current test case"
        >
          +
        </button>
      </div>

      {/* Active test case */}
      {testcases[activeIndex] && (
        <div className="space-y-5">
          {/* Inputs */}
          {testcases[activeIndex].input.map((inp: testCase_Input, idx: number) => (
            <div key={idx} className="space-y-1">
              <label className="text-sm text-gray-300">{inp.name} =</label>
              <input
                className="w-full bg-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring focus:ring-gray-500"
                type={inp.type === "number" ? "number" : "text"}
                value={
                  inp.type === "array" ? JSON.stringify(inp.value) : inp.value
                }
                onChange={(e) => {
                  if (inp.type === "number") {
                    handleInputChange(idx, Number(e.target.value));
                  } else if (inp.type === "array") {
                    try {
                      handleInputChange(idx, JSON.parse(e.target.value));
                    } catch {
                      // ignore invalid JSON until fixed
                    }
                  } else {
                    handleInputChange(idx, e.target.value);
                  }
                }}
              />
            </div>
          ))}

          {/* Expected Output */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">expected_output =</label>
            <input
              className="w-full bg-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring focus:ring-gray-500"
              type="text"
              value={testcases[activeIndex].expected_output}
              onChange={(e) => handleExpectedChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseTab;
