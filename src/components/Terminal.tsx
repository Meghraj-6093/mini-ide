import React from 'react'
import { FileCode } from 'lucide-react'
import { useIDEStore } from '../store/ideStore'

export const Terminal: React.FC = () => {
  const { files, activeFileId } = useIDEStore()
  const activeFile = activeFileId ? files[activeFileId] : null

  return (
    <div className="flex flex-col h-full bg-[#181818]">
      <div className="flex h-8 items-center px-3 border-b border-[#2d2d2d]">
        <span className="text-xs font-bold text-[#cccccc]">TERMINAL</span>
      </div>
      <div className="flex-1 p-3 font-mono text-xs text-[#cccccc] overflow-auto">
        {activeFile ? (
          <>
            <div className="text-[#4ec9b0] mb-2">Running {activeFile.name}...</div>
            <div className="text-[#969696]">
              Click the Run button in the header to execute your code.
            </div>
          </>
        ) : (
          <div className="text-[#969696]">No file selected</div>
        )}
      </div>
    </div>
  )
}
