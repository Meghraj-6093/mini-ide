import { cn } from '@/lib/utils';

export default function ConsoleOutput() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
        <span className="text-sm font-medium">Console</span>
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-xs">Clear</button>
      </div>
      <div className="flex-1 p-2 font-mono text-sm overflow-auto">
        <div className="text-green-500">
          <span className="text-gray-500 dark:text-gray-400">[10:30:45]</span> Hello, World!
        </div>
      </div>
    </div>
  );
}
