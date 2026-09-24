import React, { useState } from 'react'
import { useIDEStore } from '../store/ideStore'
import type { FileNode } from '../store/ideStore'

export const FileTree: React.FC = () => {
  const {
    files,
    activeFileId,
    setActiveFile,
    toggleFolder,
    createFile,
    createFolder,
    deleteNode,
  } = useIDEStore()

  const [creatingType, setCreatingType] = useState<'file' | 'folder' | null>(null)
  const [targetParentId, setTargetParentId] = useState<string | null>(null)
  const [newItemName, setNewItemName] = useState('')

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx') || fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
      return <span className="text-blue-400">{#</span>
    }
    if (fileName.endsWith('.json')) {
      return <span className="text-yellow-400">{}</span>
    }
    if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
      return <span className="text-emerald-400">[</span>
    }
    return <span className="text-neutral-400">file</span>
  }

  const handleStartCreate = (e: React.MouseEvent, type: 'file' | 'folder', parentId: string | null = null) => {
    e.stopPropagation()
    setCreatingType(type)
    setTargetParentId(parentId)
    setNewItemName('')
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newItemName.trim()
    if (trimmed) {
      if (creatingType === 'file') createFile(targetParentId, trimmed)
      else if (creatingType === 'folder') createFolder(targetParentId, trimmed)
    }
    setCreatingType(null)
    setNewItemName('')
  }

  const renderNodes = (parentId: string | null, depth = 0) => {
    const nodes = Object.values(files)
      .filter((node) => node.parentId === parentId)
      .sort((a, b) => (a.isFolder === b.isFolder ? a.name.localeCompare(b.name) : a.isFolder ? -1 : 1))

    return (
      <div className="flex flex-col">
        {nodes.map((node) => (
          <div key={node.id}>
            <div
              onClick={() => node.isFolder ? toggleFolder(node.id) : setActiveFile(node.id)}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
              className={`group flex h-7 items-center justify-between pr-2 cursor-pointer text-xs transition-colors ${
                activeFileId === node.id && !node.isFolder
                  ? 'bg-[#37373d] text-white'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {node.isFolder ? (
                  <span className={`text-[#dcb67a]`}>{node.isOpen ? '📂' : '📁'}</span>
                ) : (
                  getFileIcon(node.name)
                )}
                <span>{node.name}</span>
              </span>
              <div className="hidden group-hover:flex gap-1">
                {node.isFolder && (
                  <>
                    <button onClick={(e) => handleStartCreate(e, 'file', node.id)} className="p-0.5 hover:bg-[#3c3c3c]">📄</button>
                    <button onClick={(e) => handleStartCreate(e, 'folder', node.id)} className="p-0.5 hover:bg-[#3c3c3c]">📁</button>
                  </>
                )}
                <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }} className="p-0.5 hover:bg-[#3c3c3c] text-red-400">🗑️</button>
              </div>
            </div>
            {node.isFolder && node.isOpen && (
              <>
                {creatingType && targetParentId === node.id && (
                  <form onSubmit={handleCreateSubmit} style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }} className="flex items-center gap-1.5 py-1 pr-2">
                    <input
                      autoFocus
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      onBlur={() => setCreatingType(null)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateSubmit(e as unknown as React.FormEvent)}
                      placeholder={creatingType === 'file' ? 'filename.ts' : 'folder-name'}
                      className="flex-1 bg-[#3c3c3c] px-1.5 py-0.5 text-xs text-white outline-none border border-[#007acc]"
                    />
                  </form>
                )}
                {renderNodes(node.id, depth + 1)}
              </>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#252526] text-[#cccccc]">
      <div className="flex h-9 items-center justify-between border-b border-[#2d2d2d] px-4">
        <span className="text-xs font-bold uppercase text-neutral-400">EXPLORER</span>
        <div className="flex gap-1">
          <button onClick={(e) => handleStartCreate(e, 'file', null)} className="p-1 hover:bg-[#3c3c3c]" title="New File">📄</button>
          <button onClick={(e) => handleStartCreate(e, 'folder', null)} className="p-1 hover:bg-[#3c3c3c]" title="New Folder">📁</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-1">{renderNodes(null)}</div>
    </div>
  )
}
