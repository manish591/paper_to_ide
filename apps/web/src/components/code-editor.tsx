'use client';

import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';

export function CodeEditor() {
  return <CodeMirror height="100vh" extensions={[cpp()]} />;
}
