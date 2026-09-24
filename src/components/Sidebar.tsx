import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';
import Tree from './Tree';
import Templates from './Templates';

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useIDEStore();

  return (
    <div
      className={cn(
        'border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all duration-200',
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium">Explorer</span>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span className="text-xs">✕</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <Tree />
        </div>
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <Templates />
        </div>
      </div>
    </div>
  );
}
