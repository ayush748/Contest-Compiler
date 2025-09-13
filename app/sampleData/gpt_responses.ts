import { response } from "../types/types";

export const responses: response[] = [
  // 1. Vanya and Fence
  {
    hints: [
      { type: "conceptual", hint: "Each friend has a height; if taller than fence, they take 2 width, else 1." },
      { type: "Algorithmic", hint: "Loop through heights, add width accordingly." },
      { type: "implementation", hint: "Read t, then process each test with n, h, and heights array." },
      { type: "topics", hint: ["Implementation", "Greedy"] }
    ],
    standard_io: {
      stdin: "2\n3 7\n4 5 14\n4 10\n2 10 10 2",
      expected_output: "4\n6"
    },
    testCases: [
      {
        input: [
          { type: "number", value: 3, name: "n" },
          { type: "number", value: 7, name: "h" },
          { type: "array", value: [4, 5, 14], name: "heights" }
        ],
        expected_output: "4"
      },
      {
        input: [
          { type: "number", value: 4, name: "n" },
          { type: "number", value: 10, name: "h" },
          { type: "array", value: [2, 10, 10, 2], name: "heights" }
        ],
        expected_output: "6"
      }
    ]
  },

  // 2. Odd Even Increments
  {
    hints: [
      { type: "conceptual", hint: "Check if all numbers at odd indices have same parity and all at even indices have same parity." },
      { type: "Algorithmic", hint: "Use parity check with modulo 2." },
      { type: "implementation", hint: "Loop through each array, group by index parity, and check consistency." },
      { type: "topics", hint: ["Math", "Parity", "Arrays"] }
    ],
    standard_io: {
      stdin: "3\n3\n1 2 3\n4\n2 4 6 8\n5\n1 1 1 1 1",
      expected_output: "YES\nYES\nYES"
    },
    testCases: [
      {
        input: [
          { type: "number", value: 3, name: "n" },
          { type: "array", value: [1, 2, 3], name: "arr" }
        ],
        expected_output: "YES"
      },
      {
        input: [
          { type: "number", value: 4, name: "n" },
          { type: "array", value: [2, 4, 6, 8], name: "arr" }
        ],
        expected_output: "YES"
      },
      {
        input: [
          { type: "number", value: 5, name: "n" },
          { type: "array", value: [1, 1, 1, 1, 1], name: "arr" }
        ],
        expected_output: "YES"
      }
    ]
  },

  // 3. Plus Minus Permutation
  {
    hints: [
      { type: "conceptual", hint: "We add multiples of a and subtract multiples of b, avoiding double counting multiples of lcm(a, b)." },
      { type: "Algorithmic", hint: "Count divisible by a, divisible by b, divisible by both; apply formula." },
      { type: "implementation", hint: "For each test, compute counts and maximize result." },
      { type: "topics", hint: ["Math", "LCM", "Greedy"] }
    ],
    standard_io: {
      stdin: "2\n6 2 3\n10 2 4",
      expected_output: "5\n15"
    },
    testCases: [
      {
        input: [
          { type: "number", value: 6, name: "n" },
          { type: "number", value: 2, name: "a" },
          { type: "number", value: 3, name: "b" }
        ],
        expected_output: "5"
      },
      {
        input: [
          { type: "number", value: 10, name: "n" },
          { type: "number", value: 2, name: "a" },
          { type: "number", value: 4, name: "b" }
        ],
        expected_output: "15"
      }
    ]
  },

  // 4. Vlad and Candies
  {
    hints: [
      { type: "conceptual", hint: "If the largest candy count is more than the sum of others + 1, it's impossible." },
      { type: "Algorithmic", hint: "Sort array and compare last two values." },
      { type: "implementation", hint: "Special case for n=1, else check sorted array." },
      { type: "topics", hint: ["Greedy", "Sorting"] }
    ],
    standard_io: {
      stdin: "3\n1\n5\n2\n5 5\n3\n3 5 5",
      expected_output: "YES\nYES\nNO"
    },
    testCases: [
      {
        input: [
          { type: "number", value: 1, name: "n" },
          { type: "array", value: [5], name: "candies" }
        ],
        expected_output: "YES"
      },
      {
        input: [
          { type: "number", value: 2, name: "n" },
          { type: "array", value: [5, 5], name: "candies" }
        ],
        expected_output: "YES"
      },
      {
        input: [
          { type: "number", value: 3, name: "n" },
          { type: "array", value: [3, 5, 5], name: "candies" }
        ],
        expected_output: "NO"
      }
    ]
  },

  // 5. Nearly Lucky Number
  {
    hints: [
      { type: "conceptual", hint: "Count digits 4 and 7; if that count itself is lucky (4 or 7), print YES." },
      { type: "Algorithmic", hint: "Iterate through digits, count lucky ones, then check." },
      { type: "implementation", hint: "Read each test number as string, count characters." },
      { type: "topics", hint: ["Math", "Strings"] }
    ],
    standard_io: {
      stdin: "3\n40047\n123456789\n4477",
      expected_output: "NO\nNO\nYES"
    },
    testCases: [
      {
        input: [
          { type: "string", value: "40047", name: "num" }
        ],
        expected_output: "NO"
      },
      {
        input: [
          { type: "string", value: "123456789", name: "num" }
        ],
        expected_output: "NO"
      },
      {
        input: [
          { type: "string", value: "4477", name: "num" }
        ],
        expected_output: "YES"
      }
    ]
  }
];
