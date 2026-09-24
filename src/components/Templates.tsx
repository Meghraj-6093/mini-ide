import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function Templates() {
  const [open, setOpen] = useState(false);
  const { loadFromTemplate } = useIDEStore();

  const templates = [
    { id: 'hello-world', name: 'Hello World' },
    { id: 'typescript-functions', name: 'TypeScript Functions' },
    { id: 'algorithm', name: 'Algorithms' },
  ];

  return (
    <div className="border rounded-md p-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-sm font-medium text-left"
      >
        📁 Templates
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => loadFromTemplate(t.id)}
              className="w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
