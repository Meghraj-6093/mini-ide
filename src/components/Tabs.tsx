import { cn } from '@/lib/utils';

export default function Tabs() {
  const tabs = [
    { id: 'tab1', name: 'main.ts', active: true },
    { id: 'tab2', name: 'utils.ts', active: false },
  ];

  return (
    <div className="h-8 border-b border-gray-200 dark:border-gray-700 flex items-center bg-gray-50 dark:bg-gray-800">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={cn(
            'px-3 py-1 text-sm cursor-pointer border-r border-gray-200 dark:border-gray-700',
            tab.active
              ? 'bg-white dark:bg-gray-900 border-b-2 border-b-blue-500'
              : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
