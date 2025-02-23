import React from 'react';
import Editor from '@monaco-editor/react';
import { FileItem } from '../types';

interface CodeShowComponentProps {
  file: FileItem | null;
}

export function CodeShowComponent({ file }: CodeShowComponentProps) {
  if (!file) {
    return (
      <div className="h-full p-8 flex items-center justify-center text-gray-400">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      className='p-8'
      theme="vs-dark"
      value={file.content || ''}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
}