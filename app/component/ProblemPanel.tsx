"use client";

import { SiCodemagic } from "react-icons/si";
import { hint, response, testCase } from "../types/types";
import { RiPagesLine, RiResetLeftLine } from "react-icons/ri";
import { useState } from "react";
import { HintsList } from "./ProblemSection/Hints";
import { getRandomQuote } from "../sampleData/codingquotes";

interface ProblemPanelProps {
  problemText: string;
  setProblemText: (value: string) => void;
  settestcases:React.Dispatch<React.SetStateAction<testCase[]>>;
  setexcepted_output:React.Dispatch<React.SetStateAction<string>>;
  setstdin:React.Dispatch<React.SetStateAction<string>>;
}

export default function ProblemPanel({ problemText, setProblemText,settestcases ,setexcepted_output,setstdin}: ProblemPanelProps) {


  const [problme_input,setproblme_input] = useState("");
  const [hints,setHints] = useState<hint[]>([]);
  const [ai_loading,setai_loading] = useState(false);
  

async function Magicify() {
  if(problme_input == "") return;
  setai_loading(true)
  try {
    console.log("Problem text:", problemText);

    const res = await fetch("/api/ai-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem: problemText }),
    });

    if (!res.ok) {
      console.error("API returned error:", res.status, res.statusText);
      return;
    }

    const data = await res.json();

    console.log("AI Response:", data);

    // Type-safe assertion
    const parsed: response = data;

    settestcases(parsed.testCases);
    setexcepted_output(parsed.standard_io.expected_output);
    setstdin(parsed.standard_io.stdin);
    setHints(parsed.hints);
    setai_loading(false);

  } catch (err) {
    console.error("Error in Magicify:", err);
  }
}



  return (
    <div className="h-full grid bg-black rounded-md p-4 gap-4">
      <h2 className="font-normal mb-2 text-white text-xs flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
         <RiPagesLine/>
        Problem Statement
        </div>
        {problemText != "" && <RiResetLeftLine onClick={() => {setProblemText("");setproblme_input("");setHints([]);settestcases([]);setexcepted_output("");setstdin("");}} title="reset problem" className="cursor-pointer" />}
      </h2>
      <textarea
        value={problme_input}
        rows={20}
        onChange={(e) => setproblme_input(e.target.value)}
        placeholder="Paste your codeforces problem here...we will automatically generate test case for you"
        className="flex-1 p-2  rounded resize-none 
        text-white
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   bg-black"
      />  

        <HintsList hints={hints}/>

        {problemText != "" && ai_loading &&  <button className="bg-indigo-100 rounded-md py-1 p-2 flex items-center gap-2 text-center justify-center flex-wrap" > <><div className="w-6 h-6 border-4 border-neutral-400 border-t-black rounded-full animate-spin"></div> {getRandomQuote()} </>  </button> }
        {problemText == "" &&
        <button onClick={()=>{setProblemText(problme_input);Magicify()}} className="bg-indigo-100 rounded-md py-1 p-2 flex items-center gap-2 text-center justify-center"> 

        <SiCodemagic/> Generate test cases and hints  
              
        </button>
        }
    </div>
  );
}
