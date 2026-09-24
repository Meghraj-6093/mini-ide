# Mini IDE - Development Notes

## Architecture Overview

The Mini IDE is built using React 19 with TypeScript, following a functional component pattern with Zustand for state management.

## State Management

All application state is managed in `src/store/ideStore.ts`:
- `files`: File tree structure (in-memory)
- `activeFileId`: Currently selected file
- `openTabs`: List of open file tabs
- `sidebarOpen`: Sidebar visibility state
- `bottomPanelOpen`: Terminal/panel visibility

## Component Architecture

```
App
├── Layout
│   ├── Header (Run, toggle buttons)
│   ├── ActivityBar (side navigation)
│   ├── Sidebar (Explorer/Templates)
│   ├── EditorArea
│   │   ├── Tabs
│   │   └── Textarea
│   └── BottomPanel (Terminal)
└── CommandPalette (modal)
```

## File System

Files are stored in-memory as a flat record with parentId references:
```typescript
{
  'file-123': { id: 'file-123', name: 'index.ts', parentId: 'root-src', content: '...' }
}
```

## Web Worker

Code execution happens in `src/worker/runner.ts`:
1. Code sent via postMessage
2. console.log/warn/error are temporarily overridden
3. Code executed via Function constructor
4. Results returned with captured logs

## Future Enhancements

- Add real file system integration
- Implement syntax highlighting with Monaco
- Add debugging support (breakpoints, step-through)
- Implement proper linting and error highlighting
- Add collaboration features
- Persist state to backend
