export type testCase_Input =
  | { type: "array"; value: any[]; name: string }
  | { type: "number"; value: number; name: string }
  | { type: "string"; value: string; name: string };

export type testCase = {
  input: testCase_Input[];
  expected_output: string;
};
export type testCaseResult = {
  input: testCase_Input[];
  expected_output: string;
  output: string;
};

export type hint =
  | { type: "conceptual"; hint: string }
  | { type: "Algorithmic"; hint: string }
  | { type: "implementation"; hint: string }
  | { type: "other"; hint: string }
  | { type: "topics"; hint: string[] };

export interface response {
  hints: hint[];
  standard_io: {
    stdin: string;
    expected_output: string;
  };
  testCases: testCase[];
}


// Judge0 Status Object
export interface Judge0Status {
  id: number;          // numeric status code
  description: string; // e.g. "Accepted", "Wrong Answer", "Compilation Error"
}

// Judge0 Response Object
export interface Judge0Response {
  stdout: string | null;          // Program output if execution was successful
  stderr: string | null;          // Error output if runtime error occurred
  compile_output: string | null;  // Error output if compilation failed
  message: string | null;         // Additional Judge0 message
  status: Judge0Status;           // Execution status

  time: string | null;            // Execution time in seconds
  memory: number | null;          // Memory used in bytes

  token: string;                  // Unique identifier for submission
  language_id: number;            // Language ID (per Judge0 docs)

  // Optional depending on request
  source_code?: string;           // Original source code
  stdin?: string;                 // Input provided
  expected_output?: string;       // Expected output if set
}


// languageMap.ts
export const languageMap: Record<string, { name: string; id: number }> = {
  cpp: { name: "C++ (GCC 9.2.0)", id: 54 },
  c: { name: "C (GCC 9.2.0)", id: 50 },
  java: { name: "Java (OpenJDK 13.0.1)", id: 62 },
  python: { name: "Python (3.8.1)", id: 71 },
  javascript: { name: "JavaScript (Node.js 12.14.0)", id: 63 },
  typescript: { name: "TypeScript (3.7.4)", id: 74 },
  "c#": { name: "C# (Mono 6.6.0.161)", id: 51 },
  golang: { name: "Go (1.13.5)", id: 60 },
  rust: { name: "Rust (1.40.0)", id: 73 }
};
