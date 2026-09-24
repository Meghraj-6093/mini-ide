import { cn } from '@/lib/utils';

export default function Terminal() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-sm font-medium">Terminal</span>
      </div>
      <div className="flex-1 p-2 font-mono text-sm overflow-auto">
        <div className="text-green-500">
          <span className="text-gray-500 dark:text-gray-400">$</span> node main.ts
        </div>
        <div>Hello, World!</div>
      </div>
    </div>
  );
}
