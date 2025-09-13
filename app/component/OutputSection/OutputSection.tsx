import { FC, useState } from "react";
import TestCaseTab from "./TestCasesTab";
import StandardTestTab from "./StandardTestTab";
import { responses } from "@/app/sampleData/gpt_responses";
import { testCase } from "@/app/types/types";
import TestCasesResults from "./TestCaseResults";
import { VscDebugAlt } from "react-icons/vsc";
import { TbDeviceDesktop } from "react-icons/tb";
import { GrTest } from "react-icons/gr";


interface props{
    stdout:string;
    stdin:string;
    setstdin:React.Dispatch<React.SetStateAction<string>>;
    expected_output:string;
    setexpected_output:React.Dispatch<React.SetStateAction<string>>;
    testcases:testCase[];
    settestcases:React.Dispatch<React.SetStateAction<testCase[]>>;
    excepted_output:string;
    setexcepted_output:React.Dispatch<React.SetStateAction<string>>;
    height:number,
    memory_limit:number,
    setmemory_limit:React.Dispatch<React.SetStateAction<number>>;
    cpu_time_limit:number,
    setcpu_time_limit:React.Dispatch<React.SetStateAction<number>>;
}

const OutputSection :FC<props> = ({stdout,stdin,expected_output,setstdin,setexpected_output,testcases,settestcases,excepted_output,setexcepted_output,height,memory_limit,setmemory_limit,cpu_time_limit,setcpu_time_limit})=>{

    const [currentTab,setcurrentTab]  = useState<"testcases" | "standard">("testcases");
    const [showTestCaseResults,setshowTestCaseResults] = useState(false);
    


    return (<>
    <div className=" bg-black relative">
        <div className="flex text-white border-b-neutral-900 border-b-2 p-2 text-xs content-center items-center absolute top-0 left-0 right-0 justify-between">
             <div className="flex gap-4">

             <div className="flex gap-2 items-center">
             <VscDebugAlt/> Tests and Output &nbsp; &nbsp; &nbsp;
             </div>


            <select className="bg-neutral-900 p-1 rounded-md text-white" onChange={(e)=>setcurrentTab(e.target.value as any)} name="" id=""> 
                <option value={"testcases"} >Test Cases</option> 
                {/* <option value={"standard"} >Standard I/O</option>  */}
                <option>Standard I/O with expected_output</option> 
            </select>
             </div>
             {/* @ayush748 */}
            <span>icon</span>
        </div>


        <div className="top-12 relative overflow-auto" style={{height:height-50}} >
        {   

            currentTab === "testcases" ? 
            <>
                <div className="text-xs flex gap-4 text-white p-2" > 
                    <span className={`flex gap-2 items-center content-center cursor-pointer ${showTestCaseResults  ? 'text-gray-400' : 'text-white'} `} onClick={()=>setshowTestCaseResults(false)} > <GrTest/> Cases </span> 
                    <span  className={`flex gap-2 items-center content-center cursor-pointer ${showTestCaseResults  ? 'text-white' : 'text-gray-400'} `} onClick={()=>setshowTestCaseResults(true)} > <TbDeviceDesktop/> Result</span> 
                </div>
                {showTestCaseResults ? 
                <TestCasesResults testcases={testcases} output={stdout} />:
            <TestCaseTab testcases={testcases} settestcases={settestcases} /> 
                }
            
            </>
            : <StandardTestTab onChangeExpected={setexcepted_output} onChangeStdin={setstdin} stdin={stdin} stdout={stdout} expected_stdout={expected_output} /> 
        }

        </div>

    </div>
    
    </>)
}



export default  OutputSection;