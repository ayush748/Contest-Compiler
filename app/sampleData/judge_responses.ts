import { Judge0Response } from "../types/types";

export const judge0Response: Judge0Response = {
    "stdout": "YES\nNO\nNO\nYES\nYES\nYES\n",
    "time": "0.003",
    "memory": 1116,
    "stderr": null,
    "token": "be805d0d-ba39-4636-bc55-61f2a972a265",
    "compile_output": null,
    "message": null,
    "status": {
        "id": 4,
        "description": "Wrong Answer"
    },
    language_id: 52,
}

export const judge0MultiCaseResponses: Judge0Response[] = [
  // 1. Vanya and Fence - Correct
  {
    stdout: "4\n6\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
    time: "0.01",
    memory: 1024,
    token: "token_1_correct",
    language_id: 52, // C++ 17
    source_code: "// correct solution code",
    stdin: "2\n3 7\n4 5 14\n4 10\n2 10 10 2",
    expected_output: "4\n6"
  },
  // 1. Vanya and Fence - Incorrect
  {
    stdout: "5\n5\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
    time: "0.01",
    memory: 1024,
    token: "token_1_incorrect",
    language_id: 52,
    source_code: "// incorrect solution code",
    stdin: "2\n3 7\n4 5 14\n4 10\n2 10 10 2",
    expected_output: "4\n6"
  },

  // 2. Odd Even Increments - Correct
  {
    stdout: "YES\nYES\nYES\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
    time: "0.01",
    memory: 1024,
    token: "token_2_correct",
    language_id: 52,
    source_code: "// correct solution code",
    stdin: "3\n3\n1 2 3\n4\n2 4 6 8\n5\n1 1 1 1 1",
    expected_output: "YES\nYES\nYES"
  },
  // 2. Odd Even Increments - Incorrect
  {
    stdout: "NO\nNO\nNO\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
    time: "0.01",
    memory: 1024,
    token: "token_2_incorrect",
    language_id: 52,
    source_code: "// incorrect solution code",
    stdin: "3\n3\n1 2 3\n4\n2 4 6 8\n5\n1 1 1 1 1",
    expected_output: "YES\nYES\nYES"
  },

  // 3. Plus Minus Permutation - Correct
  {
    stdout: "5\n15\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
    time: "0.01",
    memory: 1024,
    token: "token_3_correct",
    language_id: 52,
    source_code: "// correct solution code",
    stdin: "2\n6 2 3\n10 2 4",
    expected_output: "5\n15"
  },
  // 3. Plus Minus Permutation - Incorrect
  {
    stdout: "6\n10\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
    time: "0.01",
    memory: 1024,
    token: "token_3_incorrect",
    language_id: 52,
    source_code: "// incorrect solution code",
    stdin: "2\n6 2 3\n10 2 4",
    expected_output: "5\n15"
  },

  // 4. Vlad and Candies - Correct
  {
    stdout: "YES\nYES\nNO\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
    time: "0.01",
    memory: 1024,
    token: "token_4_correct",
    language_id: 52,
    source_code: "// correct solution code",
    stdin: "3\n1\n5\n2\n5 5\n3\n3 5 5",
    expected_output: "YES\nYES\nNO"
  },
  // 4. Vlad and Candies - Incorrect
  {
    stdout: "NO\nNO\nYES\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
    time: "0.01",
    memory: 1024,
    token: "token_4_incorrect",
    language_id: 52,
    source_code: "// incorrect solution code",
    stdin: "3\n1\n5\n2\n5 5\n3\n3 5 5",
    expected_output: "YES\nYES\nNO"
  },

  // 5. Nearly Lucky Number - Correct
  {
    stdout: "NO\nNO\nYES\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
    time: "0.01",
    memory: 1024,
    token: "token_5_correct",
    language_id: 52,
    source_code: "// correct solution code",
    stdin: "3\n40047\n123456789\n4477",
    expected_output: "NO\nNO\nYES"
  },
  // 5. Nearly Lucky Number - Incorrect
  {
    stdout: "YES\nYES\nNO\n",
    stderr: null,
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
    time: "0.01",
    memory: 1024,
    token: "token_5_incorrect",
    language_id: 52,
    source_code: "// incorrect solution code",
    stdin: "3\n40047\n123456789\n4477",
    expected_output: "NO\nNO\nYES"
  }
];
