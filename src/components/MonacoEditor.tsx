import React from 'react'
import Editor from '@monaco-editor/react'

interface MonacoEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
  readOnly?: boolean
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language,
  onChange,
  readOnly = false,
}) => {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(val) => val !== undefined && onChange(val)}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: true,
      }}
    />
  )
}
