"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  code: string;
  setCode: (value: string) => void;
  onMount?: (editor: any, monaco: any) => void; // optional callback to get editor + monaco
};

export default function CodeEditor({ language, code, setCode, onMount }: CodeEditorProps) {
  return (
    <div className="h-full border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        theme="vs-dark"
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
  );
}
