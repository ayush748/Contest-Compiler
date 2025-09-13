"use client";

import { CiSettings } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { getRandomQuote } from "./sampleData/codingquotes";

interface NavbarProps {
  handleRun: () => void;
  isRunning:boolean;
}

export default function Navbar({ handleRun,isRunning }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-neutral-900 text-white shadow-md">
      {/* <div className="w-20"> </div> */}
      <span>Contest Compiler</span>

      {/* Run button */}
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="px-6 py-2 text-sm flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
      > 
      {isRunning ?  <><div className="w-6 h-6 border-4 border-neutral-400 border-t-black rounded-full animate-spin"></div> {getRandomQuote()}</>  :
      <>
        <FaPlay /> Run
      </>
        }
      </button>

      <div className="flex items-center gap-3 relative">
        <CiSettings />
      </div>
    </header>
  );
}
