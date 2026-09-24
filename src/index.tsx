import { useEffect } from 'react';
import { useIDEStore } from './store/ideStore';

export default function App() {
  const { loadProjects } = useIDEStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1 flex flex-col">
        <header className="h-10 border-b border-gray-200 dark:border-gray-700 flex items-center px-3 bg-gray-50 dark:bg-gray-800">
          <span className="text-xs font-semibold">Mini IDE</span>
        </header>
        <main className="flex-1 flex">
          <aside className="w-56 border-r border-gray-200 dark:border-gray-700 p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">File Tree</div>
          </aside>
          <div className="flex-1 flex flex-col">
            <div className="h-8 border-b border-gray-200 dark:border-gray-700 flex items-center px-2 bg-gray-50 dark:bg-gray-800">
              <span className="text-xs">Tabs</span>
            </div>
            <div className="flex-1 p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Editor</div>
            </div>
          </div>
        </main>
        <footer className="h-8 border-t border-gray-200 dark:border-gray-700 flex items-center px-3 bg-gray-50 dark:bg-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
        </footer>
      </div>
    </div>
  );
}
