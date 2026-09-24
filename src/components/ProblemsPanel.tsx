import React from 'react'
import { AlertCircle } from 'lucide-react'

export const ProblemsPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#181818]">
      <div className="flex h-8 items-center px-3 border-b border-[#2d2d2d]">
        <span className="text-xs font-bold text-[#cccccc]">PROBLEMS</span>
      </div>
      <div className="flex-1 p-3 font-mono text-xs text-[#cccccc]">
        <div className="text-[#4ec9b0]">No problems detected</div>
        <div className="text-[#6e6e6e] mt-2 text-xs">
          Code quality checks will appear here when available.
        </div>
      </div>
    </div>
  )
}
