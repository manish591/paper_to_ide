'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { Play, User } from 'lucide-react';
import { createSubmission } from '@/app/actions';
import { Button } from '@repo/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select';

export default function Editor() {
  const [code, setCode] = useState<string>('');
  const [stdin, setStdin] = useState<string>('');
  const [stdout, setStdout] = useState<string>('');
  const [languageId, setLanguageId] = useState<string>('2');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function handleCodeSubmission() {
    setIsLoading(true);

    try {
      const data = await createSubmission(code, Number(languageId), stdin);
      if (data) {
        console.log('data', data);
        const status = data.status.description;
        if (status === 'Accepted') {
          setStdout(data.stdout);
        } else if (data.compile_output) {
          setStdout(data.compile_output);
        } else {
          setStdout(data.stderr);
        }
      }
    } catch (err) {
      setStdout('');
      console.log('error occured', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <header className="bg-background top-0 z-10 px-2 md:px-6 h-14 border flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="hidden md:block text-sm md:text-xl font-bold leading-4">
            Paper to IDE
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <Select
              value={languageId}
              onValueChange={(value) => setLanguageId(value)}
            >
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">C++</SelectItem>
                <SelectItem value="10">Python</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="gap-2 md:px-6 justify-start"
              size="sm"
              onClick={handleCodeSubmission}
            >
              <Play size={18} />
              <span>Run</span>
            </Button>
          </div>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <User size={18} />
        </Button>
      </header>
      <main className="h-[calc(100vh-96px)]">
        <div className="h-full grid grid-cols-[100vw_100vw] md:grid-cols-[60%_1fr]">
          <div className="w-full border-r h-full overflow-y-auto">
            <CodeMirror
              height="100%"
              extensions={[cpp(), python()]}
              value={code}
              onChange={(value) => {
                setCode(value);
              }}
            />
          </div>
          <div className="h-[calc(100vh-96px)] w-full">
            <div className="grid grid-rows-2 h-full">
              <div className="border-b grid grid-rows-[auto_1fr]">
                <div className="bg-secondary p-2">
                  <h1>Input</h1>
                </div>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  className="p-2 h-full overflow-y-auto outline-none"
                ></textarea>
              </div>
              <div className="grid grid-rows-[auto_1fr]">
                <div className="bg-secondary p-2">
                  <h1>Output</h1>
                </div>
                <div className="p-2 h-full overflow-y-auto">{stdout}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="z-30 bg-secondary h-10 md:px-6 px-2 flex items-center">
        <p className="text-sm">All rights reserved: 2024</p>
      </footer>
    </div>
  );
}
