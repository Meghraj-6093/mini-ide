import React, { useState, useEffect } from 'react'
import { Command } from 'lucide-react'
import { useIDEStore } from '../store/ideStore'

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { files, createFile } = useIDEStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const fileCommands = Object.values(files)
    .filter(f => !f.isFolder && f.name.toLowerCase().includes(query.toLowerCase()))
    .map(f => ({ id: f.id, label: `Open: ${f.name}`, action: () => {} }))

  const commands = [
    { id: 'new-file', label: 'File: New File', action: () => createFile(null, `file-${Date.now()}.ts`) },
    { id: 'toggle-sidebar', label: 'View: Toggle Sidebar', action: () => {} },
    { id: 'toggle-terminal', label: 'View: Toggle Terminal', action: () => {} },
    ...fileCommands
  ].filter(c => !query || c.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-[600px] max-w-full bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-[#3c3c3c]">
              <Command className="h-5 w-5 text-[#cccccc] mr-3" />
              <input
                className="flex-1 bg-transparent text-[#cccccc] text-sm outline-none placeholder-[#6e6e6e]"
                placeholder="Type a command..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-80 overflow-auto">
              {commands.length === 0 ? (
                <div className="px-4 py-3 text-[#6e6e6e] text-sm">No matching commands</div>
              ) : (
                commands.map(cmd => (
                  <button
                    key={cmd.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[#0a3761] text-[#cccccc]"
                    onClick={() => {
                      cmd.action()
                      setIsOpen(false)
                    }}
                  >
                    <span>{cmd.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
