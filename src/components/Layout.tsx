import React from 'react'
import { useIDEStore } from '../store/ideStore'
import { FileTree } from './Tree'
import { Terminal } from './Terminal'
import { Templates } from './Templates'
import { CommandPalette } from './CommandPalette'

export const Layout: React.FC = () => {
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

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#1e1e1e] text-[#cccccc]">
      <header className="flex h-9 items-center justify-between border-b border-[#2d2d2d] bg-[#181818] px-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Mini IDE</span>
          {activeFile && <span className="text-neutral-500"> — {activeFile.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded bg-[#0e639c] hover:bg-[#1177bb] px-2.5 py-1 font-medium text-white" onClick={() => console.log('Run')}>Run</button>
          <button className="rounded p-1 hover:bg-[#2a2d2e]" onClick={toggleSidebar}>▮</button>
          <button className="rounded p-1 hover:bg-[#2a2d2e]" onClick={toggleBottomPanel}>▢</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="flex w-12 flex-col items-center justify-between border-r border-[#2d2d2d] bg-[#181818] py-2">
          <div className="flex flex-col gap-2">
            <button onClick={() => setActiveSideTab('files')} className={`p-2 rounded ${sidebarOpen && activeSideTab === 'files' ? 'text-white bg-[#2a2d2e]' : 'text-[#858585] hover:text-white'}`}>📁</button>
            <button onClick={() => setActiveSideTab('templates')} className={`p-2 rounded ${sidebarOpen && activeSideTab === 'templates' ? 'text-white bg-[#2a2d2e]' : 'text-[#858585] hover:text-white'}`}>📋</button>
          </div>
          <button className="p-2 rounded text-[#858585] hover:text-white" onClick={() => setActiveSideTab('settings')}>⚙️</button>
        </nav>

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

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex h-9 items-center border-b border-[#2d2d2d] bg-[#181818] overflow-x-auto">
            {openTabs.map(tabId => {
              const file = files[tabId]
              if (!file) return null
              return (
                <div key={tabId} onClick={() => setActiveFile(tabId)} className={`flex items-center gap-2 border-r border-[#2d2d2d] px-3 py-1.5 text-xs cursor-pointer ${activeFileId === tabId ? 'bg-[#1e1e1e] text-white border-t border-t-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'}`}>
                  <span>{file.name}</span>
                  <button onClick={e => { e.stopPropagation(); closeTab(tabId) }} className="p-0.5 hover:bg-[#3c3c3c]">×</button>
                </div>
              )
            })}
          </div>

          <div className="flex-1">
            {activeFile ? (
              <textarea
                value={activeFile.content || ''}
                onChange={e => updateFileContent(activeFileId, e.target.value)}
                className="w-full h-full bg-[#1e1e1e] text-[#cccccc] p-3 font-mono text-sm outline-none resize-none"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6e6e6e]">Select a file to start editing</div>
            )}
          </div>

          {bottomPanelOpen && (
            <div className="h-48 border-t border-[#2d2d2d] bg-[#181818]">
              <div className="flex h-8 items-center border-b border-[#2d2d2d]">
                <button onClick={() => setActiveBottomTab('terminal')} className={`px-3 py-1 text-xs ${activeBottomTab === 'terminal' ? 'text-white border-b border-b-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'}`}>Terminal</button>
                <button onClick={() => setActiveBottomTab('problems')} className={`px-3 py-1 text-xs ${activeBottomTab === 'problems' ? 'text-white border-b border-b-[#007acc]' : 'text-[#858585] hover:text-[#cccccc]'}`}>Problems</button>
              </div>
              <div className="h-40 overflow-auto">{activeBottomTab === 'terminal' ? <Terminal /> : <div className="p-3 text-xs">No problems detected</div>}</div>
            </div>
          )}
        </div>
      </div>

      <CommandPalette />
    </div>
  )
}
