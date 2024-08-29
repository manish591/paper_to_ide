'use client';

import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { useState } from 'react';
import { createSubmission } from '@/app/actions';

export default function Editor() {
  const [codeInput, setCodeInput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function handleCodeSubmission() {
    setIsLoading(true);

    try {
      const data = await createSubmission(codeInput);
      if (data) {
        if (data.compile_output) {
          setCodeOutput(data.compile_output);
        } else {
          setCodeOutput(data.stdout);
        }
      }
    } catch (err) {
      setCodeOutput('');
      console.log('error occured');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden overflow-y-auto h-full">
        <div className="grid grid-cols-[100vw_100vw] md:grid-cols-[60%_1fr]">
          <div className="w-full">
            <CodeMirror
              height="100vh"
              extensions={[cpp()]}
              value={codeInput}
              onChange={(value) => {
                setCodeInput(value);
              }}
            />
          </div>
          <div className="w-full px-2 border">
            <h1>Output</h1>
            {codeOutput}
          </div>
        </div>
      </div>
      <div className="py-3 border border-t px-2">
        <div className="flex items-center justify-center gap-6">
          <button className="border">Import</button>
          <button onClick={handleCodeSubmission}>Run Code</button>;
        </div>
      </div>
    </>
  );
}
