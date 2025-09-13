import { FC, ChangeEvent, useEffect, useState } from "react";

interface Props {
  stdin: string;
  stdout: string;
  expected_stdout: string;
  onChangeStdin: (val: string) => void;
  onChangeExpected: (val: string) => void;
}

const StandardTestTab: FC<Props> = ({
  stdin,
  stdout,
  expected_stdout,
  onChangeStdin,
  onChangeExpected,
}) => {
  const [hasRun, setHasRun] = useState(false);

  const normalize = (s: string) => s.replace(/\s+$/g, "").trim();

  const stdoutLines = stdout.split("\n");
  const expectedLines = expected_stdout.split("\n");
  const maxLines = Math.max(stdoutLines.length, expectedLines.length);

  const isCorrect = normalize(stdout) === normalize(expected_stdout);

  // When stdout changes, mark as run
  useEffect(() => {
    if (stdout.trim() !== "") setHasRun(true);
  }, [stdout]);

  // When user edits stdin or expected output, mark as not run
  const handleStdinChange = (val: string) => {
    onChangeStdin(val);
    if (hasRun) setHasRun(false);
  };

  const handleExpectedChange = (val: string) => {
    onChangeExpected(val);
    if (hasRun) setHasRun(false);
  };

  return (
    <div className="space-y-6 p-6 bg-black text-white rounded-xl">
      {/* <h2 className="text-xl font-semibold">Test Case Result</h2> */}

      {/* Editable Standard Input */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Standard Input</h3>
        <textarea
          className="w-full min-h-[100px] bg-neutral-800 p-3 rounded-md text-sm text-white border border-neutral-700 focus:outline-none focus:ring focus:ring-neutral-600"
          value={stdin}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleStdinChange(e.target.value)
          }
        />
      </div>
          <div className="flex justify-start gap-4 flex-wrap flex-1 ">

      {/* Editable Expected Output (always visible) */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Expected Output</h3>
        <textarea
          className="w-full min-h-[100px] bg-neutral-800 p-3 rounded-md text-sm text-white border border-neutral-700 focus:outline-none focus:ring focus:ring-neutral-600"
          value={expected_stdout}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleExpectedChange(e.target.value)
          }
        />
      </div>

      {/* Your Output / Comparison (only show if code has run) */}
      {hasRun && (
        <div className="grid gap-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Your Output</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Your Output */}
            <div>
              <div className="bg-neutral-800 rounded-md border border-neutral-700 overflow-hidden">
                {Array.from({ length: maxLines }).map((_, i) => {
                  const user = stdoutLines[i] ?? "";
                  const expected = expectedLines[i] ?? "";
                  const match = normalize(user) === normalize(expected);
                  return (
                    <div
                      key={i}
                      className={`px-2 py-1 text-sm whitespace-pre-wrap ${
                        match
                          ? "bg-green-900/10 text-green-300"
                          : "bg-red-900/10 text-red-300"
                      }`}
                    >
                      {user || "—"}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Placeholder column for spacing (Expected Output is already shown above) */}
            <div></div>
          </div>

          {/* Status badge */}
          <div
            className={`text-sm font-medium px-4 py-2 rounded-md inline-block ${
              isCorrect
                ? "bg-green-900/40 text-green-300 border border-green-700"
                : "bg-red-900/40 text-red-300 border border-red-700"
            }`}
          >
            {isCorrect ? "✅ Output matches expected" : "❌ Output does not match"}
          </div>
        </div>
      )}
    </div>
          </div>

  );
};

export default StandardTestTab;
