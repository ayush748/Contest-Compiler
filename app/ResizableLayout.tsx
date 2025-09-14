"use client";

import { useRef, useState, useEffect } from "react";
import Resizable from "react-resizable-layout";
import CodeEditor from "./component/CodeEditor";
import ProblemPanel from "./component/ProblemPanel";
import OutputSection from "./component/OutputSection/OutputSection";
import { hint, testCase } from "./types/types";

interface Props {
  code: string;
  setCode: (code: string) => void;
  stdin: string;
  setStdin: React.Dispatch<React.SetStateAction<string>> ;
  stdoutput: string;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  problem:string;
  setproblem:React.Dispatch<React.SetStateAction<string>>;
      testcases:testCase[];
      settestcases:React.Dispatch<React.SetStateAction<testCase[]>>;
  excepted_output:string;
  setexcepted_output:React.Dispatch<React.SetStateAction<string>>;
  cput_time_limit:number;
  setcput_time_limit:React.Dispatch<React.SetStateAction<number>>;
  memory_limit:number;
  setmemory_limit:React.Dispatch<React.SetStateAction<number>>;
  hints:hint[]
}

export default function ResizableLayout({ code, setCode, stdin, setStdin, stdoutput,language,setLanguage,problem,setproblem,testcases,settestcases,excepted_output,setexcepted_output,memory_limit,setmemory_limit,cput_time_limit,setcput_time_limit,hints }: Props) {
  const WindowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [windowHeight, setWindowHeight] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={WindowRef} className="fixed inset-0 top-16 w-full flex bottom-2 right-2 left-2">
      {/* Outer horizontal split */}
      <Resizable
        axis="x"
        initial={200}
        min={300}
        max={windowWidth - 100} // dynamic max based on screen
        containerRef={WindowRef as React.RefObject<HTMLDivElement>}
      >
        {({ position, separatorProps }) => (
          <>
            {/* Left panel */}
            <div
              style={{ width: position }}
              className= "flex flex-col"
            >
              <ProblemPanel  setexcepted_output={setexcepted_output} setstdin={setStdin} settestcases={settestcases} problemText={problem} setProblemText={setproblem} />
            </div>

            {/* Horizontal divider */}
            <div
              {...separatorProps}
              className="w-2 cursor-col-resize bg-neutral-900 h-full"
            />

            {/* Right panel */}
            <div ref={containerRef} className="flex-1 flex-col bg-black mr-4">
              {/* Inner vertical split */}
              <Resizable
  axis="y"
  initial={300}
  min={150}
  max={(containerRef.current?.offsetHeight ?? 600) - 150} // leave space for bottom
  containerRef={containerRef as React.RefObject<HTMLDivElement>}
>
  {({ position: innerPosition, separatorProps: innerSeparator }) => {
    const containerHeight = containerRef.current?.offsetHeight ?? 600;
    const separatorHeight = 8; // matches h-2
    const bottomHeight = Math.max(
      100, // set a minimum for bottom
      containerHeight - innerPosition - separatorHeight
    );

    return (
      <div className="grid" style={{ height: "100%" }}>
        {/* Top: Code editor */}
        <div
          style={{ height: innerPosition }}
          className="w-full overflow-hidden rounded-md bg-black"
        >
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setlanguage={setLanguage}
          />
        </div>

        {/* Vertical divider */}
        <div
          {...innerSeparator}
          className="w-full h-2 bg-neutral-900 cursor-row-resize"
        />

        {/* Bottom: Input / Output */}
        <div style={{ height: bottomHeight }} className="overflow-hidden">
          <OutputSection
            memory_limit={memory_limit}
            setmemory_limit={setmemory_limit}
            cpu_time_limit={cput_time_limit}
            setcpu_time_limit={setcput_time_limit}
            height={bottomHeight}
            excepted_output={excepted_output}
            setexcepted_output={setexcepted_output}
            testcases={testcases}
            settestcases={settestcases}
            setexpected_output={() => {}}
            stdin={stdin}
            stdout={stdoutput}
            setstdin={setStdin}
            expected_output={excepted_output}
          />
        </div>
      </div>
    );
  }}
</Resizable>

            </div>
          </>
        )}
      </Resizable>
    </div>
  );
}
