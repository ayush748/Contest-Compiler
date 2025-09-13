"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { CgCode } from "react-icons/cg";
import { templateProgram } from "./TemplateCode/TemplateCode";
import { languageMap } from "../types/types";

type CodeEditorProps = {
  language: string;
  code: string;
  setlanguage: React.Dispatch<React.SetStateAction<string>>;
  setCode: (value: string) => void;
  onMount?: (editor: any, monaco: any) => void; // optional callback to get editor + monaco
};

export default function CodeEditor({ language, code, setCode, onMount,setlanguage }: CodeEditorProps) {


  const [template,settemplate] = useState<string>("none");

  useEffect(() => {
      // console.log(templateProgram)
      // console.log(language)
      // console.log(templateProgram[language])
      // @ts-ignore
      setCode(templateProgram[language][template]);


  }, [template,language]);


  return (
        <>
                    <div  className="w-full overflow-hidden rounded-md h-full">
                        <div className="text-white flex justify-between p-2 border-b-2 border-neutral-900 text-xs">
                            <span className="flex items-center gap-2" > <CgCode/> Code  </span>
                            <div className="flex gap-2">
                                <select onChange={(e)=>settemplate(e.target.value)} className="bg-neutral-900 p-1 rounded-md text-white" name="" id="">
                                    <option value="none"> none </option>
                                    <option value="hello world"> hello world </option>
                                    <option value="codeforces multi input"> codeforce multi input </option>
                                </select>

                                <select
  onChange={(e) => setlanguage(e.target.value)}
  className="bg-neutral-900 p-1 rounded-md text-white"
>
  {Object.entries(languageMap).map(([key, lang]) => (
    <option key={key} value={key}>
      {lang.name}
    </option>
  ))}
</select>
                            </div>
                        </div>
<div className="h-full rounded-lg overflow-hidden">
      <Editor
        height="100%"
        theme="hc-black"
        language={language}
        value={code}
        onChange={(v) => setCode(v || "")}
        onMount={(editor, monaco) => {
          if (onMount) onMount(editor, monaco);
        }}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
                    </div>

    </>
  );
}
