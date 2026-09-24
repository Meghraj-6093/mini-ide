import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function Tree() {
  const { projects, currentProjectId, createTab, setActiveFile, setActiveTab } = useIDEStore();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));

  const project = projects.find((p) => p.id === currentProjectId);
  const files = project?.files || [];

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleClick = (id: string, file: typeof files[0]) => {
    if (file.type === 'folder') {
      toggleExpand(id);
    } else if (file.type === 'file') {
      createTab(currentProjectId, id);
      setActiveFile(id);
      setActiveTab(`tab-${Date.now()}`);
    }
  };

  return (
    <div className="p-2">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => handleClick(file.id, file)}
          className={cn(
            'flex items-center gap-2 px-2 py-1 rounded cursor-pointer',
            'hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <span className="text-sm">
            {file.type === 'folder' ? (
              <>
                <span className="text-blue-500">
                  {expanded.has(file.id) ? '▼' : '▶'}
                </span>
                📁
              </>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">📄</span>
            )}
          </span>
          <span className="text-sm truncate">{file.name}</span>
        </div>
      ))}
    </div>
  );
}
