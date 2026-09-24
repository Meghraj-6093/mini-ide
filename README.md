# Mini IDE

A browser-based mini IDE built with React, TypeScript, Tailwind CSS, and Monaco Editor.

## Features

- **File Management**: Create, edit, and delete files and folders
- **Code Editing**: Full-featured Monaco Editor with syntax highlighting
- **In-Browser Execution**: Run JavaScript/TypeScript code safely in Web Workers
- **Tabs**: Multiple open files with easy switching
- **Command Palette**: Quick file search and command execution (Cmd/Ctrl+P)
- **Keyboard Shortcuts**: 
  - `Cmd/Ctrl+P` - Command palette
  - `Cmd/Ctrl+B` - Toggle sidebar
  - `Cmd/Ctrl+` ` - Toggle terminal
  - `Cmd/Ctrl+Shift+N` - New file
- **Dark Theme**: Polished VS Code-inspired interface
- **Project Templates**: Quick-start templates for common use cases
- **Autosave**: Automatic saving to localStorage

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── components/
│   ├── Tree.tsx        # File tree sidebar
│   ├── Terminal.tsx    # Console output panel
│   ├── ProblemsPanel.tsx # Lint/warning display
│   ├── Templates.tsx   # Project templates
│   ├── CommandPalette.tsx # Command search
│   └── Layout.tsx      # Main layout
├── hooks/
│   ├── useShortcuts.ts # Keyboard shortcuts
│   ├── useFileSearch.ts # File search
│   └── useAutosave.ts  # Autosave
├── store/
│   └── ideStore.ts     # State management
├── worker/
│   ├── runner.ts       # Code execution worker
│   └── index.ts        # Worker interface
├── App.tsx
└── main.tsx
```

## Technologies Used

- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **Zustand** for state management
- **Lucide React** for icons

## License

MIT
