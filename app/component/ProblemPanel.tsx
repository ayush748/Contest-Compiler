"use client";

interface ProblemPanelProps {
  problemText: string;
  setProblemText: (value: string) => void;
}

export default function ProblemPanel({ problemText, setProblemText }: ProblemPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Problem Statement
      </h2>
      <textarea
        value={problemText}
        onChange={(e) => setProblemText(e.target.value)}
        placeholder="Paste your problem here..."
        className="flex-1 p-2 border rounded resize-none 
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
    </div>
  );
}
