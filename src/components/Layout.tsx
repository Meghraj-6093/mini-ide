import React, { useState } from 'react'
import { useIDEStore } from '../store/ideStore'
import { FileTree } from '../components/Tree'
import { Terminal } from '../components/Terminal'
import { ProblemsPanel } from '../components/ProblemsPanel'
import { Templates } from '../components/Templates'
import { CommandPalette } from '../components/CommandPalette'
import { useKeyboardShortcuts } from '../hooks/useShortcuts'

export const Layout: React.FC = () => {
  useKeyboardShortcuts()
  const {
    files,
    activeFileId,
    openTabs,
    sidebarOpen,
    bottomPanelOpen,
    activeSideTab,
    activeBottomTab,
    setActiveSideTab,
    setActiveBottomTab,
    toggleSidebar,
    toggleBottomPanel,
    setActiveFile,
    closeTab,
    updateFileContent,
    toggleFolder,
  } = useIDEStore()

  const activeFile = activeFileId ? files[activeFileId] : null

  const getLanguage = (fileName?: string) => {
    if (!fileName) return 'plaintext'
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return 'typescript'
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return 'javascript'
    if (fileName.endsWith('.json')) return 'json'
    if (fileName.endsWith('.css')) return 'css'
    if (fileName.endsWith('.html')) return 'html'
    if (fileName.endsWith('.md')) return 'markdown'
    return 'plaintext'
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#1e1e1e] text-[#cccccc] select-none font-sans">
      {/* Header */}
      <header className="flex h-9 items-center justify-between border-b border-[#2d2d2d] bg-[#181818] px-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-300">Mini IDE</span>
          {activeFile && <span className="text-neutral-500"> — {activeFile.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded bg-[#0e639c] hover:bg-[#1177bb] px-2.5 py-1 font-medium text-white"
            onClick={() => console.log('Run code')}
          >
            <span>Run</span>
          </button>
          <button
            className="rounded p-1 hover:bg-[#2a2d2e] hover:text-white"
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          >
            ▮
          </button>
          <button
            className="rounded p-1 hover:bg-[#2a2d2e] hover:text-white"
            onClick={toggleBottomPanel}
            title="Toggle Panel"
          >
            ▢
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <nav className="flex w-12 flex-col items-center justify-between border-r border-[#2d2d2d] bg-[#181818] py-2">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveSideTab('files')}
              className={`p-2 rounded ${
                sidebarOpen && activeSideTab === 'files' ? 'text-white bg-[#2a2d2e]' : 'text-[#858585] hover:text-white'
              }`}
            >
              📁
            </button>
            <button
              onClick={() => setActiveSideTab('templates')}
              className={`p-2 rounded ${
                sidebarOpen && activeSideTab === 'templates' ? 'text-white bg-[#2a2d2e]' : 'text-[#858585] hover:text-white'
              }`}
            >
              📋
            </button>
          </div>
          <button
            className="p-2 rounded text-[#858585] hover:text-white"
            onClick={() => setActiveSideTab('settings')}
          >
            ⚙️
          </button>
        </nav>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-[#2d2d2d] bg-[#252526]">
            {activeSideTab === 'files' && <FileTree />}
            {activeSideTab === 'templates' && <Templates />}
            {activeSideTab === 'settings' && (
              <div className="p-4 text-sm text-[#969696]">
                <h3 className="font-bold text-[#cccccc] mb-2">Settings</h3>
                <p>Editor preferences will appear here.</p>
              </div>
            )}
          </aside>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex h-9 items-center border-b border-[#2d2d2d] bg-[#181818] overflow-x-auto">
            {openTabs.map((tabId) => {
              const file = files[tabId]
              if (!file) return null
              const isSelected = activeFileId === tabId
              return (
                <div
                  key={tabId}
                  onClick={() => setActiveFile(tabId)}
                  className={`flex items-center gap-2 border-r border-[#2d2d2d] px-3 py-1.5 text-xs cursor-pointer ${
                    isSelected ? 'bg-[#1e1e1e] text-white border-t border-t-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'
                  }`}
                >
                  <span>{file.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); closeTab(tabId) }}
                    className="p-0.5 hover:bg-[#3c3c3c] hover:text-white"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>

          {/* Editor */}
          <div className="flex-1">
            {activeFile ? (
              <textarea
                value={activeFile.content || ''}
                onChange={(e) => updateFileContent(activeFileId, e.target.value)}
                className="w-full h-full bg-[#1e1e1e] text-[#cccccc] p-3 font-mono text-sm outline-none resize-none"
                spellCheck={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6e6e6e]">
                Select a file to start editing
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          {bottomPanelOpen && (
            <div className="h-48 border-t border-[#2d2d2d] bg-[#181818]">
              <div className="flex h-8 items-center border-b border-[#2d2d2d]">
                <button
                  onClick={() => setActiveBottomTab('terminal')}
                  className={`px-3 py-1 text-xs ${
                    activeBottomTab === 'terminal' ? 'text-white border-b border-b-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'
                  }`}
                >
                  Terminal
                </button>
                <button
                  onClick={() => setActiveBottomTab('problems')}
                  className={`px-3 py-1 text-xs ${
                    activeBottomTab === 'problems' ? 'text-white border-b border-b-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'
                  }`}
                >
                  Problems
                </button>
              </div>
              <div className="h-40 overflow-auto">
                {activeBottomTab === 'terminal' ? <Terminal /> : <ProblemsPanel />}
              </div>
            </div>
          )}
        </div>
      </div>

      <CommandPalette />
    </div>
  )
}
