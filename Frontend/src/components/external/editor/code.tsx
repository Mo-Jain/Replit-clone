import Editor from "@monaco-editor/react";
import { Socket } from "socket.io-client";
import { useState } from "react";

export const Code = ({ selectedFile, socket }: { selectedFile: any, socket: Socket }) => {
  
  if (!selectedFile || selectedFile == undefined ) return null;

  const [code, setCode]  =useState<string | undefined >(selectedFile.content);

  let language = selectedFile?.name.split('.').pop();

  if (language === "js" || language === "jsx") language = "javascript";
  else if (language === "ts" || language === "tsx") language = "typescript";
  else if (language === "py") language = "python";

  function debounce(func: (value: string) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>; 
    return (value: string | undefined) => {
      clearTimeout(timeout);
      if (value !== undefined) {  // Check if value is defined
        timeout = setTimeout(() => {
          func(value);
        }, wait);
      }
    };
  }


  return (
    <Editor
      height="100vh"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={debounce((value) => {
          // Should send diffs, for now sending the whole file
          // PR and win a bounty!
        if (value !== undefined) {  // Ensure value is not undefined
          setCode(value);
          socket.emit("updateContent", { path: selectedFile.path, content: value });
        }
      }, 500)}
    />
  );
};













