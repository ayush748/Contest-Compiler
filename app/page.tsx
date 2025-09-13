"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


import ResizableLayout from "./ResizableLayout";
import { hint, testCase } from "./types/types";
import { responses } from "./sampleData/gpt_responses";




const languageMap: Record<string, number> = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

export default function Page() {


  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [stdoutput, setstdOutput] = useState("");
  const [excpeted_output,setexcpeted_output] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [isRunning, setIsRunning] = useState(false);
  const [problem,setproblem] = useState("");
  const [isAiResponsing,setisAiResponsing] = useState(false);
const [testcases,settestcases] = useState<testCase[]>([]);
  const [showProblem, setShowProblem] = useState(false);
  const [hints,setHints] = useState<hint[]>([]);

  const [cpu_time_limit,setcput_time_limit] = useState(5000);
  const [memory_limit,setcmemory_limit] = useState(4096);

  // console.log(languageMap[language])
  
  async function handleRun() {  
    // console.log(languageMap[language])
    // return
    setIsRunning(true);
    const res = await fetch("/api/submitCode", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source_code: code,
    language_id: languageMap[language], // Python 3
    stdin,
    
  })
});

  // console.log(res);
  const data = await res.json();
  console.log(data)
  setIsRunning(false);
  setstdOutput(data.stdout)

  }


    useEffect(() => {
    console.log(code,stdin,language)
},[code,stdin,language])


  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <Navbar
        handleRun={handleRun}
        isRunning={isRunning}
        // theme={theme}
        // setTheme={setTheme}
        // showSettings={showSettings}
        // setShowSettings={setShowSettings}
      />

      {/* <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 shadow-sm">
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
      </div> */}




      <ResizableLayout hints={hints} cput_time_limit={cpu_time_limit} setcput_time_limit={setcput_time_limit} memory_limit={memory_limit} setmemory_limit={setcmemory_limit} excepted_output={excpeted_output} setexcepted_output={setexcpeted_output} testcases={testcases} settestcases={settestcases} problem={problem} setproblem={setproblem} language={language} setLanguage={setLanguage} code={code} setCode={setCode} stdin={stdin} setStdin={setStdin} stdoutput={stdoutput}  />


    </main>
  );
}
