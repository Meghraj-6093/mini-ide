import React, { useState } from 'react'
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  File,
  ChevronRight,
  ChevronDown,
  FilePlus,
  FolderPlus,
  Trash2,
} from 'lucide-react'
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
      return <FileCode className="h-4 w-4 text-blue-400 shrink-0" />
    }
    if (fileName.endsWith('.json')) {
      return <FileJson className="h-4 w-4 text-yellow-400 shrink-0" />
    }
    if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
      return <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
    }
    return <File className="h-4 w-4 text-neutral-400 shrink-0" />
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
    if (!trimmed) {
      setCreatingType(null)
      return
    }

    if (creatingType === 'file') {
      createFile(targetParentId, trimmed)
    } else if (creatingType === 'folder') {
      createFolder(targetParentId, trimmed)
    }

    setCreatingType(null)
    setNewItemName('')
  }

  const renderNodes = (parentId: string | null, depth = 0) => {
    const nodes = Object.values(files)
      .filter((node) => node.parentId === parentId)
      .sort((a, b) => {
        if (a.isFolder === b.isFolder) return a.name.localeCompare(b.name)
        return a.isFolder ? -1 : 1
      })

    return (
      <div className="flex flex-col">
        {nodes.map((node) => {
          const isActive = activeFileId === node.id

          return (
            <div key={node.id}>
              <div
                onClick={() => {
                  if (node.isFolder) {
                    toggleFolder(node.id)
                  } else {
                    setActiveFile(node.id)
                  }
                }}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                className={`group flex h-7 items-center justify-between pr-2 cursor-pointer text-xs transition-colors select-none ${
                  isActive && !node.isFolder
                    ? 'bg-[#37373d] text-white font-medium'
                    : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {node.isFolder ? (
                    <>
                      {node.isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      )}
                      {node.isOpen ? (
                        <FolderOpen className="h-4 w-4 text-[#dcb67a] shrink-0" />
                      ) : (
                        <Folder className="h-4 w-4 text-[#dcb67a] shrink-0" />
                      )}
                    </>
                  ) : (
                    <>
                      <span className="w-3.5 shrink-0" />
                      {getFileIcon(node.name)}
                    </>
                  )}
                  <span className="truncate">{node.name}</span>
                </div>

                <div className="hidden group-hover:flex items-center gap-1">
                  {node.isFolder && (
                    <>
                      <button
                        onClick={(e) => handleStartCreate(e, 'file', node.id)}
                        title="New File in Folder"
                        className="rounded p-0.5 hover:bg-[#3c3c3c] text-neutral-400 hover:text-white"
                      >
                        <FilePlus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleStartCreate(e, 'folder', node.id)}
                        title="New Folder in Folder"
                        className="rounded p-0.5 hover:bg-[#3c3c3c] text-neutral-400 hover:text-white"
                      >
                        <FolderPlus className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNode(node.id)
                    }}
                    title="Delete"
                    className="rounded p-0.5 hover:bg-[#3c3c3c] text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {node.isFolder && node.isOpen && (
                <>
                  {creatingType && targetParentId === node.id && (
                    <form
                      onSubmit={handleCreateSubmit}
                      style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
                      className="flex items-center gap-1.5 py-1 pr-2"
                    >
                      {creatingType === 'folder' ? (
                        <Folder className="h-4 w-4 text-[#dcb67a] shrink-0" />
                      ) : (
                        <FileCode className="h-4 w-4 text-blue-400 shrink-0" />
                      )}
                      <input
                        autoFocus
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onBlur={() => setCreatingType(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCreateSubmit(e as unknown as React.FormEvent)
                          }
                        }}
                        placeholder={creatingType === 'file' ? 'filename.ts' : 'folder-name'}
                        className="w-full rounded bg-[#3c3c3c] px-1.5 py-0.5 text-xs text-white border border-[#007acc] outline-none"
                      />
                    </form>
                  )}
                  {renderNodes(node.id, depth + 1)}
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#252526] text-[#cccccc] select-none">
      {/* Explorer Header Actions */}
      <div className="flex h-9 items-center justify-between border-b border-[#2d2d2d] px-4">
        <span className="text-xs font-bold tracking-wider uppercase text-neutral-400">
          EXPLORER
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => handleStartCreate(e, 'file', null)}
            className="rounded p-1 hover:bg-[#3c3c3c] text-neutral-400 hover:text-white transition-colors"
            title="New File"
          >
            <FilePlus className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => handleStartCreate(e, 'folder', null)}
            className="rounded p-1 hover:bg-[#3c3c3c] text-neutral-400 hover:text-white transition-colors"
            title="New Folder"
          >
            <FolderPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Root files and tree */}
      <div className="flex-1 overflow-auto p-1">
        {renderNodes(null)}
      </div>
    </div>
  )
}
