# Mini IDE

A lightweight, browser-based integrated development environment built with modern web technologies.

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **File Management** | Create, edit, organize files and folders |
| **Monaco Editor** | Full VS Code-like editing experience |
| **Code Execution** | Run JavaScript/TypeScript in secure Web Workers |
| **Terminal Panel** | View console output and execution results |
| **Command Palette** | Quick search and command execution (Cmd/Ctrl+P) |
| **Keyboard Shortcuts** | Fast navigation and file management |
| **Project Templates** | Quick-start templates for common use cases |
| **Dark Theme** | Professional VS Code-inspired interface |
| **Tabs System** | Multiple open files with easy switching |
| **Autosave** | Automatic saving to localStorage |

## 📋 Usage

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+P` | Open command palette |
| `Cmd/Ctrl+B` | Toggle sidebar |
| `Cmd/Ctrl+` ` | Toggle terminal panel |
| `Cmd/Ctrl+Shift+N` | Create new file |

### Creating Files

- Click `+` in the Explorer sidebar
- Use keyboard shortcut `Cmd/Ctrl+Shift+N`
- Right-click in file tree (future feature)

### Running Code

1. Create or open a JavaScript/TypeScript file
2. Click the **Run** button in the header
3. View output in the Terminal panel

## 🏗️ Architecture

```
src/
├── components/           # UI Components
│   ├── Tree.tsx         # File explorer
│   ├── Terminal.tsx     # Output panel
│   ├── ProblemsPanel.tsx# Lint display
│   ├── Templates.tsx    # Project templates
│   ├── CommandPalette.tsx # Command search
│   └── Layout.tsx       # Main layout
├── hooks/               # Custom React Hooks
│   ├── useShortcuts.ts  # Keyboard shortcuts
│   ├── useFileSearch.ts # File search
│   └── useAutosave.ts   # Autosave
├── store/               # State Management
│   └── ideStore.ts      # Zustand store
├── worker/              # Web Workers
│   ├── runner.ts        # Code execution
│   └── index.ts         # Worker interface
└── main.tsx             # Entry point
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor (VS Code's editor)
- **State**: Zustand
- **Icons**: Lucide React

## 📝 License

MIT License
