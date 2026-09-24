import { useState } from 'react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const allCommands = [
    { id: 'toggle-sidebar', name: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
    { id: 'toggle-terminal', name: 'Toggle Terminal', shortcut: 'Ctrl+`' },
    { id: 'new-file', name: 'New File', shortcut: 'Ctrl+N' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded p-4 w-80">
        <input
          className="w-full border p-2 mb-2"
          placeholder="Type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {allCommands.map((cmd) => (
          <div key={cmd.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            {cmd.name} ({cmd.shortcut})
          </div>
        ))}
      </div>
    </div>
  );
}
