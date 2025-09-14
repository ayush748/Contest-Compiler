import { FC, useState, useRef, useEffect } from "react";
import TestCaseTab from "./TestCasesTab";
import StandardTestTab from "./StandardTestTab";
import TestCasesResults from "./TestCaseResults";
import { VscDebugAlt } from "react-icons/vsc";
import { TbDeviceDesktop } from "react-icons/tb";
import { GrSettingsOption, GrTest } from "react-icons/gr";
import withDropdown from "../../hoc/withDropdown";
import DropdownMenu from "./DropdownMenu";
import { testCase } from "@/app/types/types";
  import Tippy from '@tippyjs/react';
import { CiSettings } from "react-icons/ci";

interface OutputSectionProps {
  stdout: string;
  stdin: string;
  setstdin: React.Dispatch<React.SetStateAction<string>>;
  expected_output: string;
  setexpected_output: React.Dispatch<React.SetStateAction<string>>;
  testcases: testCase[];
  settestcases: React.Dispatch<React.SetStateAction<testCase[]>>;
  excepted_output: string;
  setexcepted_output: React.Dispatch<React.SetStateAction<string>>;
  height: number;
  memory_limit: number;
  setmemory_limit: React.Dispatch<React.SetStateAction<number>>;
  cpu_time_limit: number;
  setcpu_time_limit: React.Dispatch<React.SetStateAction<number>>;
}

const OutputSection: FC<OutputSectionProps> = ({
  stdout,
  stdin,
  expected_output,
  setstdin,
  setexpected_output,
  testcases,
  settestcases,
  excepted_output,
  setexcepted_output,
  height,
  memory_limit,
  setmemory_limit,
  cpu_time_limit,
  setcpu_time_limit,
}) => {
  const [currentTab, setcurrentTab] = useState<"testcases" | "standard">(
    "testcases"
  );
  const [showTestCaseResults, setshowTestCaseResults] = useState(false);

  // Local state for dropdown inputs
  const [localMemory, setLocalMemory] = useState(memory_limit);
  const [localCPU, setLocalCPU] = useState(cpu_time_limit);

  const DropdownWithHOC = withDropdown(DropdownMenu);

  // Ref to keep dropdown open when clicking inside
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Do nothing if you want it to close on outside click, or remove to keep always open
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-black relative">
      {/* Header / Tabs */}
      <div className="flex text-white border-b-2 border-b-neutral-900 p-2 text-xs items-center justify-between absolute top-0 left-0 right-0">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <VscDebugAlt />
            Tests and Output
          </div>

          <select
            className="bg-neutral-900 p-1 rounded-md text-white"
            onChange={(e) => setcurrentTab(e.target.value as any)}
          >
            <option value={"testcases"}>Test Cases</option>
            <option value={"standard"}>Standard I/O with expected_output</option>
          </select>
        </div>

        {/* Dropdown for Memory & CPU limits */}
        {/* <div ref={dropdownRef}> */}
            {/* <DropdownWithHOC label="Constraints"> */}
                      <Tippy trigger="click" interactive={true} placement="bottom" content={<div
                onClick={(e) => e.stopPropagation()} // prevent dropdown from closing
                className="flex flex-col gap-2 p-2  overflow-auto border-2 border-neutral-900 rounded-md bg-black max-h-64">



                {/* User-defined Memory Limit */}
                <div className="px-4 py-2">
                <label className="block text-white mb-1">Set Memory Limit (KB):</label>
                <input
                    type="number"
                    value={localMemory}
                    onChange={(e) => setLocalMemory(Number(e.target.value))}
                    className="w-full p-1 rounded border text-black"
                />
                </div>

                {/* User-defined CPU Time Limit */}
                <div className="px-4 py-2">
                <label className="block text-white mb-1">Set CPU Time Limit (ms):</label>
                <input
                    type="number"
                    value={localCPU}
                    onChange={(e) => setLocalCPU(Number(e.target.value))}
                    className="w-full p-1 rounded border text-black"
                />
                </div>

                {/* Update Button */}
                <div className="px-4 py-2 bottom-0 bg-black">

                </div>
            </div>} arrow={true} allowHTML={true}>
            <p className="cursor-pointer"> <CiSettings /> </p>
          </Tippy>
                
            {/* </DropdownWithHOC> */}




        {/* </div> */}
      </div>

      {/* Main Content */}
      <div className="top-12 relative overflow-auto" style={{ height: height - 50 }}>
        {currentTab === "testcases" ? (
          <>
            <div className="text-xs flex gap-4 text-white p-2">
              <span
                className={`flex gap-2 items-center cursor-pointer ${
                  showTestCaseResults ? "text-gray-400" : "text-white"
                }`}
                onClick={() => setshowTestCaseResults(false)}
              >
                <GrTest /> Cases
              </span>
              <span
                className={`flex gap-2 items-center cursor-pointer ${
                  showTestCaseResults ? "text-white" : "text-gray-400"
                }`}
                onClick={() => setshowTestCaseResults(true)}
              >
                <TbDeviceDesktop /> Result
              </span>
            </div>

            {showTestCaseResults ? (
              <TestCasesResults testcases={testcases} output={stdout} />
            ) : (
              <TestCaseTab testcases={testcases} settestcases={settestcases} />
            )}
          </>
        ) : (
          <StandardTestTab
            onChangeExpected={setexcepted_output}
            onChangeStdin={setstdin}
            stdin={stdin}
            stdout={stdout}
            expected_stdout={expected_output}
          />
        )}
      </div>
    </div>
  );
};

export default OutputSection;
