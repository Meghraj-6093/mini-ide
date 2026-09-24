# Mini IDE

A lightweight, browser-based integrated development environment built with modern web technologies.

## 🚀 Features

- **File Management** - Create, edit, organize files and folders
- **Code Editing** - Full-featured editor with syntax highlighting
- **Code Execution** - Run JavaScript/TypeScript in secure Web Workers
- **Terminal Panel** - View console output and execution results
- **Command Palette** - Quick search and command execution (Cmd/Ctrl+P)
- **Keyboard Shortcuts** - Fast navigation and file management
- **Project Templates** - Quick-start templates for common use cases
- **Dark Theme** - Professional VS Code-inspired interface
- **Tabs System** - Multiple open files with easy switching
- **Autosave** - Automatic saving to localStorage

## 📋 Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+P` | Open command palette |
| `Cmd/Ctrl+B` | Toggle sidebar |
| `Cmd/Ctrl+` ` | Toggle terminal panel |
| `Cmd/Ctrl+Shift+N` | Create new file |

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Tree.tsx           # File explorer
│   ├── Terminal.tsx       # Output panel
│   ├── ProblemsPanel.tsx  # Lint display
│   ├── Templates.tsx      # Project templates
│   ├── CommandPalette.tsx # Command search
│   └── Layout.tsx         # Main layout
├── hooks/
│   ├── useShortcuts.ts    # Keyboard shortcuts
│   ├── useFileSearch.ts   # File search
│   └── useAutosave.ts     # Autosave
├── store/
│   └── ideStore.ts        # Zustand state
└── worker/
    ├── runner.ts          # Code execution
    └── index.ts           # Worker interface
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **State**: Zustand

## 📝 License

MIT
