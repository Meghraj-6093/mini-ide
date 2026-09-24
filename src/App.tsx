import React from 'react'
import {
  Files,
  Search,
  Settings,
  Play,
  PanelBottom,
  Sidebar as SidebarIcon,
  Code2,
  Terminal,
  AlertCircle,
  X,
  FileCode,
} from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useIDEStore } from './store/ideStore'
import { FileTree } from './components/Tree'

export function App() {
  const {
    files,
    activeFileId,
    openTabs,
    sidebarOpen,
    bottomPanelOpen,
    activeSideTab,
    activeBottomTab,
    toggleSidebar,
    toggleBottomPanel,
    setActiveSideTab,
    setActiveBottomTab,
    setActiveFile,
    closeTab,
    updateFileContent,
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
      {/* Title Bar / Header */}
      <header className="flex h-9 items-center justify-between border-b border-[#2d2d2d] bg-[#181818] px-3 text-xs">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-[#007acc]" />
          <span className="font-semibold text-neutral-300">Mini IDE</span>
          {activeFile && <span className="text-neutral-500"> — {activeFile.name}</span>}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded bg-[#0e639c] hover:bg-[#1177bb] px-2.5 py-1 font-medium text-white transition-colors"
            title="Run Code"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Run</span>
          </button>
        </div>

        <div className="flex items-center gap-1 text-[#858585]">
          <button
            onClick={toggleSidebar}
            className={`rounded p-1 hover:bg-[#2a2d2e] hover:text-white transition-colors ${
              sidebarOpen ? 'text-white' : ''
            }`}
            title="Toggle Primary Side Bar"
          >
            <SidebarIcon className="h-4 w-4" />
          </button>
          <button
            onClick={toggleBottomPanel}
            className={`rounded p-1 hover:bg-[#2a2d2e] hover:text-white transition-colors ${
              bottomPanelOpen ? 'text-white' : ''
            }`}
            title="Toggle Panel"
          >
            <PanelBottom className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (Leftmost icons) */}
        <nav className="flex w-12 flex-col items-center justify-between border-r border-[#2d2d2d] bg-[#181818] py-2">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveSideTab('files')}
              className={`relative rounded p-2 transition-colors ${
                sidebarOpen && activeSideTab === 'files'
                  ? 'text-white bg-[#2a2d2e]'
                  : 'text-[#858585] hover:text-white'
              }`}
              title="Explorer"
            >
              <Files className="h-5 w-5" />
              {sidebarOpen && activeSideTab === 'files' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-[#007acc]" />
              )}
            </button>

            <button
              onClick={() => setActiveSideTab('search')}
              className={`relative rounded p-2 transition-colors ${
                sidebarOpen && activeSideTab === 'search'
                  ? 'text-white bg-[#2a2d2e]'
                  : 'text-[#858585] hover:text-white'
              }`}
              title="Search"
            >
              <Search className="h-5 w-5" />
              {sidebarOpen && activeSideTab === 'search' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-[#007acc]" />
              )}
            </button>
          </div>

          <button
            onClick={() => setActiveSideTab('settings')}
            className={`relative rounded p-2 transition-colors ${
              sidebarOpen && activeSideTab === 'settings'
                ? 'text-white bg-[#2a2d2e]'
                : 'text-[#858585] hover:text-white'
            }`}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
            {sidebarOpen && activeSideTab === 'settings' && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-[#007acc]" />
            )}
          </button>
        </nav>

        {/* Collapsible Sidebar */}
        {sidebarOpen && (
          <aside className="flex w-64 flex-col border-r border-[#2d2d2d] bg-[#252526]">
            {activeSideTab === 'files' && <FileTree />}

            {activeSideTab === 'search' && (
              <div className="flex flex-col h-full">
                <div className="flex h-9 items-center px-4 border-b border-[#2d2d2d] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Search
                </div>
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Search in files..."
                    className="w-full rounded bg-[#3c3c3c] px-2 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#007acc]"
                  />
                </div>
              </div>
            )}

            {activeSideTab === 'settings' && (
              <div className="flex flex-col h-full">
                <div className="flex h-9 items-center px-4 border-b border-[#2d2d2d] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Settings
                </div>
                <div className="p-3 text-xs text-neutral-400">
                  Editor & Runner Settings
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Center / Editor & Bottom Panels */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Editor Tabs Header */}
          <div className="flex h-9 items-center border-b border-[#2d2d2d] bg-[#181818] overflow-x-auto">
            {openTabs.map((tabId) => {
              const file = files[tabId]
              if (!file) return null
              const isSelected = activeFileId === tabId

              return (
                <div
                  key={tabId}
                  onClick={() => setActiveFile(tabId)}
                  className={`group flex items-center gap-2 border-r border-[#2d2d2d] px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#1e1e1e] text-white border-t border-t-[#007acc]'
                      : 'bg-[#181818] text-[#858585] hover:bg-[#1f1f1f] hover:text-[#cccccc]'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 text-[#007acc]" />
                  <span>{file.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeTab(tabId)
                    }}
                    className="rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-[#3c3c3c] hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={getLanguage(activeFile?.name)}
              value={activeFile?.content || ''}
              onChange={(value) => {
                if (activeFileId && value !== undefined) {
                  updateFileContent(activeFileId, value)
                }
              }}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Bottom Panel */}
          {bottomPanelOpen && (
            <div className="h-64 border-t border-[#2d2d2d] bg-[#181818] flex flex-col">
              <div className="flex h-8 items-center border-b border-[#2d2d2d] bg-[#181818]">
                <button
                  onClick={() => setActiveBottomTab('terminal')}
                  className={`flex items-center gap-2 px-3 py-1 text-xs transition-colors ${
                    activeBottomTab === 'terminal'
                      ? 'text-white border-b border-b-[#007acc]'
                      : 'text-[#858585] hover:text-[#cccccc]'
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Terminal</span>
                </button>
                <button
                  onClick={() => setActiveBottomTab('problems')}
                  className={`flex items-center gap-2 px-3 py-1 text-xs transition-colors ${
                    activeBottomTab === 'problems'
                      ? 'text-white border-b border-b-[#007acc]'
                      : 'text-[#858585] hover:text-[#cccccc]'
                  }`}
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Problems</span>
                </button>
              </div>

              {activeBottomTab === 'terminal' && (
                <div className="p-3 flex-1 overflow-auto font-mono text-xs text-neutral-300">
                  <div className="text-[#4ec9b0] mb-2">Terminal ready</div>
                  <div className="text-[#969696]">Click Run button to execute your code</div>
                </div>
              )}

              {activeBottomTab === 'problems' && (
                <div className="p-3 flex-1 overflow-auto font-mono text-xs text-neutral-300">
                  <div className="text-[#4ec9b0]">No problems detected</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
