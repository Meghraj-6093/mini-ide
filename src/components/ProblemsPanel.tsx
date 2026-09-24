import { cn } from '@/lib/utils';

export default function ProblemsPanel() {
  const problems = [
    { id: '1', type: 'error', message: "Expected ';' at end of line", file: 'main.ts:5' },
    { id: '2', type: 'warning', message: 'Unused variable', file: 'utils.ts:3' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-sm font-medium">Problems</span>
      </div>
      <div className="flex-1 overflow-auto">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className={cn(
              'p-2 border-b border-gray-200 dark:border-gray-700 text-sm',
              problem.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20'
                : 'bg-yellow-50 dark:bg-yellow-900/20'
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-xs',
                  problem.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                )}
              >
                ⚠️
              </span>
              <span>{problem.message}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{problem.file}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
