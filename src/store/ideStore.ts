import { create } from 'zustand'

export interface FileNode {
  id: string
  name: string
  isFolder: boolean
  content?: string
  parentId: string | null
  isOpen?: boolean
}

export interface IDEState {
  files: Record<string, FileNode>
  activeFileId: string | null
  openTabs: string[]
  sidebarOpen: boolean
  bottomPanelOpen: boolean
  activeSideTab: 'files' | 'search' | 'settings'
  activeBottomTab: 'output' | 'terminal' | 'problems'

  createFile: (parentId: string | null, name: string) => string
  createFolder: (parentId: string | null, name: string) => string
  deleteNode: (id: string) => void
  toggleFolder: (id: string) => void
  setActiveFile: (id: string) => void
  closeTab: (id: string) => void
  updateFileContent: (id: string, content: string) => void
  toggleSidebar: () => void
  toggleBottomPanel: () => void
  setActiveSideTab: (tab: 'files' | 'search' | 'settings') => void
  setActiveBottomTab: (tab: 'output' | 'terminal' | 'problems') => void
}

const initialFiles: Record<string, FileNode> = {
  'root-src': {
    id: 'root-src',
    name: 'src',
    isFolder: true,
    parentId: null,
    isOpen: true,
  },
  'file-index': {
    id: 'file-index',
    name: 'index.ts',
    isFolder: false,
    parentId: 'root-src',
    content: `// Mini IDE TypeScript Playground\nfunction calculateSum(a: number, b: number): number {\n  return a + b;\n}\n\nconst result = calculateSum(10, 25);\nconsole.log("Sum result:", result);\n`,
  },
  'file-app': {
    id: 'file-app',
    name: 'App.tsx',
    isFolder: false,
    parentId: 'root-src',
    content: `import React from 'react';\n\nexport default function App() {\n  return <div>Hello from Mini IDE!</div>;\n}\n`,
  },
}

export const useIDEStore = create<IDEState>((set) => ({
  files: initialFiles,
  activeFileId: 'file-index',
  openTabs: ['file-index', 'file-app'],
  sidebarOpen: true,
  bottomPanelOpen: true,
  activeSideTab: 'files',
  activeBottomTab: 'terminal',

  createFile: (parentId, name) => {
    const id = `file-${Date.now()}`
    set((state) => ({
      files: {
        ...state.files,
        [id]: { id, name, isFolder: false, parentId, content: '' },
      },
      openTabs: [...state.openTabs, id],
      activeFileId: id,
    }))
    return id
  },

  createFolder: (parentId, name) => {
    const id = `folder-${Date.now()}`
    set((state) => ({
      files: { ...state.files, [id]: { id, name, isFolder: true, parentId, isOpen: true } },
    }))
    return id
  },

  deleteNode: (id) => {
    set((state) => {
      const nextFiles = { ...state.files }
      const deleteRecursive = (nodeId: string) => {
        Object.values(nextFiles).forEach((child) => {
          if (child.parentId === nodeId) deleteRecursive(child.id)
        })
        delete nextFiles[nodeId]
      }
      deleteRecursive(id)
      const nextOpenTabs = state.openTabs.filter((tabId) => tabId !== id)
      const nextActiveId = state.activeFileId === id
        ? nextOpenTabs[nextOpenTabs.length - 1] || null
        : state.activeFileId
      return { files: nextFiles, openTabs: nextOpenTabs, activeFileId: nextActiveId }
    })
  },

  toggleFolder: (id) => {
    set((state) => {
      const folder = state.files[id]
      if (!folder || !folder.isFolder) return state
      return { files: { ...state.files, [id]: { ...folder, isOpen: !folder.isOpen } } }
    })
  },

  setActiveFile: (id) => {
    set((state) => ({
      activeFileId: id,
      openTabs: state.openTabs.includes(id) ? state.openTabs : [...state.openTabs, id],
    }))
  },

  closeTab: (id) => {
    set((state) => {
      const nextTabs = state.openTabs.filter((tabId) => tabId !== id)
      const nextActive = state.activeFileId === id
        ? nextTabs[nextTabs.length - 1] || null
        : state.activeFileId
      return { openTabs: nextTabs, activeFileId: nextActive }
    })
  },

  updateFileContent: (id, content) => {
    set((state) => {
      const target = state.files[id]
      if (!target || target.isFolder) return state
      return { files: { ...state.files, [id]: { ...target, content } } }
    })
  },

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleBottomPanel: () => set((state) => ({ bottomPanelOpen: !state.bottomPanelOpen })),
  setActiveSideTab: (tab) => set((state) => ({ activeSideTab: tab })),
  setActiveBottomTab: (tab) => set((state) => ({ activeBottomTab: tab })),
}))
