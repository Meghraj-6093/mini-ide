import { create } from 'zustand';
import type { FileNode, Project, Tab, TerminalLog, TerminalOutput, Template } from '../types';

// Initialize localStorage
const storage = typeof window !== 'undefined' ? window.localStorage : null;

// Sample projects
const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'My Project',
    files: [
      { id: 'f1', name: 'main.ts', content: 'console.log("Hello, World!");\n', type: 'file' },
      { id: 'f2', name: 'utils.ts', content: 'export const add = (a: number, b: number) => a + b;\n', type: 'file' },
    ],
    rootId: 'root',
  },
];

// Default templates
const defaultTemplates: Template[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'A simple hello world program',
    files: [
      { name: 'main.ts', content: 'console.log("Hello, World!");\n', type: 'file' },
    ],
  },
  {
    id: 'typescript-functions',
    name: 'TypeScript Functions',
    description: 'Functions with TypeScript typing',
    files: [
      { name: 'main.ts', content: '// TypeScript with type annotations\nconst greet = (name: string): string => {\n  return `Hello, ${name}!`;\n};\n\nconsole.log(greet("World"));\n', type: 'file' },
    ],
  },
  {
    id: 'algorithm',
    name: 'Algorithms',
    description: 'Sorting and searching algorithms',
    files: [
      { name: 'main.ts', content: '// Bubble Sort Implementation\nfunction bubbleSort(arr: number[]): number[] {\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}\n\nconsole.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));\n', type: 'file' },
    ],
  },
  {
    id: 'dom-manipulation',
    name: 'DOM Manipulation',
    description: 'Simple DOM operations',
    files: [
      { name: 'main.ts', content: '// DOM manipulation example\nclass DOMUtils {\n  static create(element: string, attrs: Record<string, string> = {}): HTMLElement {\n    const el = document.createElement(element);\n    Object.entries(attrs).forEach(([key, val]) => {\n      el.setAttribute(key, val);\n    });\n    return el;\n  }\n}\n\nconsole.log("DOM utilities ready");\n', type: 'file' },
    ],
  },
  {
    id: 'web-worker',
    name: 'Web Worker',
    description: 'Parallel computation example',
    files: [
      { name: 'main.ts', content: '// Web Worker example\nconst workerCode = `\n  self.onmessage = (e) => {\n    const n = e.data;\n    let sum = 0;\n    for (let i = 0; i <= n; i++) sum += i;\n    self.postMessage(sum);\n  };\n`;\n\nconsole.log("Worker code:", workerCode);\n', type: 'file' },
    ],
  },
];

interface IDEState {
  projects: Project[];
  currentProjectId: string;
  openTabs: Tab[];
  activeTabId: string | null;
  selectedFileId: string | null;
  terminalOutputs: TerminalOutput[];
  terminalPanelOpen: boolean;
  sidebarOpen: boolean;
  darkMode: boolean;
  commandPaletteOpen: boolean;
  searchQuery: string;
  searchResults: FileNode[];
  consoleOpen: boolean;
}

interface IDEActions {
  // Project management
  loadProjects: () => void;
  setCurrentProject: (id: string) => void;
  createProject: (name: string) => string;
  createFile: (projectId: string, name: string, content?: string) => void;
  createFolder: (projectId: string, name: string) => void;
  deleteNode: (projectId: string, id: string) => void;
  renameNode: (projectId: string, id: string, newName: string) => void;
  loadFromTemplate: (templateId: string) => void;

  // File operations
  getFileContent: (projectId: string, fileId: string) => string;
  setFileContent: (projectId: string, fileId: string, content: string) => void;
  setActiveFile: (fileId: string | null) => void;
  createTab: (projectId: string, fileId: string) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  setSelectedFile: (fileId: string | null) => void;

  // Terminal and output
  addConsoleOutput: (output: string, type?: 'log' | 'error' | 'warn') => void;
  clearTerminal: () => void;
  setTerminalPanelOpen: (open: boolean) => void;
  setConsoleOpen: (open: boolean) => void;

  // UI state
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setDarkMode: (mode: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;

  // Search
  setSearchQuery: (query: string) => void;
  searchFiles: (projectId: string) => void;

  // Persistence
  saveToStorage: () => void;
}

export type IDEStore = IDEState & IDEActions;

export const useIDEStore = create<IDEStore>((set, get) => {
  let loadedProjects = defaultProjects;
  let loadedTabId: string | null = null;
  let loadedSelectedFile: string | null = null;
  let loadedDarkMode = true;
  let loadedSidebar = true;

  if (storage) {
    try {
      const saved = storage.getItem('mini-ide-data');
      if (saved) {
        const data = JSON.parse(saved);
        loadedProjects = data.projects || defaultProjects;
        loadedTabId = data.activeTabId || null;
        loadedSelectedFile = data.selectedFileId || null;
        loadedDarkMode = data.darkMode ?? true;
        loadedSidebar = data.sidebarOpen ?? true;
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }

  // Default project
  if (loadedProjects.length === 0) {
    loadedProjects.push({
      id: 'proj-1',
      name: 'My Project',
      files: [
        { id: 'f1', name: 'main.ts', content: 'console.log("Hello, World!");\n', type: 'file' },
      ],
      rootId: 'root',
    });
  }

  return {
    // State
    projects: loadedProjects,
    currentProjectId: loadedProjects[0].id,
    openTabs: loadedTabId ? [{ id: loadedTabId, fileId: loadedTabId, name: 'main.ts' }] : [],
    activeTabId: loadedTabId,
    selectedFileId: loadedSelectedFile,
    terminalOutputs: [],
    terminalPanelOpen: false,
    sidebarOpen: loadedSidebar,
    darkMode: loadedDarkMode,
    commandPaletteOpen: false,
    searchQuery: '',
    searchResults: [],
    consoleOpen: false,

    // Actions
    loadProjects: () => {
      if (storage) {
        try {
          const saved = storage.getItem('mini-ide-data');
          if (saved) {
            const data = JSON.parse(saved);
            set({ projects: data.projects || defaultProjects });
          }
        } catch (e) {
          console.error('Failed to load projects:', e);
        }
      }
    },

    setCurrentProject: (id) => set({ currentProjectId: id }),

    createProject: (name) => {
      const id = `proj-${Date.now()}`;
      const newProject: Project = {
        id,
        name,
        files: [{ id: 'f1', name: 'main.ts', content: '// New project\n', type: 'file' }],
        rootId: 'root',
      };
      set((state) => ({ projects: [...state.projects, newProject] }));
      return id;
    },

    createFile: (projectId, name, content = '') => {
      const id = `f-${Date.now()}`;
      set((state) => {
        const projects = state.projects.map((p) => {
          if (p.id === projectId) {
            return { ...p, files: [...p.files, { id, name, content, type: 'file' }] };
          }
          return p;
        });
        return { projects };
      });
    },

    createFolder: (projectId, name) => {
      const id = `folder-${Date.now()}`;
      set((state) => {
        const projects = state.projects.map((p) => {
          if (p.id === projectId) {
            return { ...p, files: [...p.files, { id, name, content: '', type: 'folder' }] };
          }
          return p;
        });
        return { projects };
      });
    },

    deleteNode: (projectId, id) => {
      set((state) => {
        const projects = state.projects.map((p) => {
          if (p.id === projectId) {
            return { ...p, files: p.files.filter((f) => f.id !== id) };
          }
          return p;
        });
        return { projects };
      });
    },

    renameNode: (projectId, id, newName) => {
      set((state) => {
        const projects = state.projects.map((p) => {
          if (p.id === projectId) {
            return { ...p, files: p.files.map((f) => (f.id === id ? { ...f, name: newName } : f)) };
          }
          return p;
        });
        return { projects };
      });
    },

    loadFromTemplate: (templateId) => {
      const template = defaultTemplates.find((t) => t.id === templateId);
      if (!template) return;

      const id = `proj-${Date.now()}`;
      const newProject: Project = {
        id,
        name: template.name,
        files: template.files.map((f) => ({
          id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: f.name,
          content: f.content,
          type: 'file',
        })),
        rootId: 'root',
      };
      set((state) => ({ projects: [...state.projects, newProject] }));
    },

    getFileContent: (projectId, fileId) => {
      const project = get().projects.find((p) => p.id === projectId);
      const file = project?.files.find((f) => f.id === fileId);
      return file?.content || '';
    },

    setFileContent: (projectId, fileId, content) => {
      set((state) => {
        const projects = state.projects.map((p) => {
          if (p.id === projectId) {
            return { ...p, files: p.files.map((f) => (f.id === fileId ? { ...f, content } : f)) };
          }
          return p;
        });
        return { projects };
      });
    },

    setActiveFile: (fileId) => {
      const id = fileId || null;
      set({ selectedFileId: id });
    },

    createTab: (projectId, fileId) => {
      const tabId = `tab-${Date.now()}`;
      const project = get().projects.find((p) => p.id === projectId);
      const file = project?.files.find((f) => f.id === fileId);
      if (!file) return;

      set((state) => ({
        openTabs: [...state.openTabs, { id: tabId, fileId, name: file.name }],
        activeTabId: tabId,
      }));
    },

    closeTab: (tabId) => {
      set((state) => {
        const newTabs = state.openTabs.filter((t) => t.id !== tabId);
        return {
          openTabs: newTabs,
          activeTabId: newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null,
        };
      });
    },

    setActiveTab: (tabId) => {
      set({ activeTabId: tabId });
      const tab = get().openTabs.find((t) => t.id === tabId);
      if (tab) set({ selectedFileId: tab.fileId });
    },

    setSelectedFile: (fileId) => {
      set({ selectedFileId: fileId || null });
    },

    addConsoleOutput: (output, type = 'log') => {
      const log: TerminalLog = {
        id: `log-${Date.now()}`,
        timestamp: Date.now(),
        type,
        content: output,
      };
      set((state) => ({
        terminalOutputs: [...state.terminalOutputs, { id: `out-${Date.now()}`, logs: [log] }],
      }));
    },

    clearTerminal: () => set({ terminalOutputs: [] }),
    setTerminalPanelOpen: (open) => set({ terminalPanelOpen: open }),
    setConsoleOpen: (open) => set({ consoleOpen: open }),

    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    setDarkMode: (mode) => {
      set({ darkMode: mode });
      if (storage) {
        try {
          const saved = storage.getItem('mini-ide-data');
          const data = saved ? JSON.parse(saved) : {};
          data.darkMode = mode;
          storage.setItem('mini-ide-data', JSON.stringify(data));
        } catch (e) {
          console.error('Failed to save dark mode:', e);
        }
      }
    },

    setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    searchFiles: (projectId) => {
      const { projects, searchQuery } = get();
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const results = project.files.filter(
        (f) => f.type === 'file' && f.name.includes(searchQuery)
      );
      set({ searchResults: results });
    },

    saveToStorage: () => {
      if (storage) {
        try {
          const { projects, activeTabId, selectedFileId, darkMode, sidebarOpen } = get();
          const data = {
            projects,
            activeTabId,
            selectedFileId,
            darkMode,
            sidebarOpen,
          };
          storage.setItem('mini-ide-data', JSON.stringify(data));
        } catch (e) {
          console.error('Failed to save state:', e);
        }
      }
    },
  };
});
