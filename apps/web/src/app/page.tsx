import { CodeEditor } from '@/components/code-editor';
import { Navbar } from '@/components/navbar';

export default function Page() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div className="overflow-hidden overflow-y-auto h-full">
        <div className="grid grid-cols-[100vw_100vw] md:grid-cols-[60%_1fr]">
          <div className="w-full">
            <CodeEditor />
          </div>
          <div className="w-full px-2 border">another section</div>
        </div>
      </div>
      <div className="py-3 border border-t px-2">
        <div className="flex items-center justify-center gap-6">
          <button className="border">Import</button>
          <button className="border">Run</button>
        </div>
      </div>
    </div>
  );
}
