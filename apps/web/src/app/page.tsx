import Editor from '@/components/editor';
import { Navbar } from '@/components/navbar';

export default function Page() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <Editor />
    </div>
  );
}
