import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function Layout() {
  const { terminalPanelOpen } = useIDEStore();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className={cn('flex-1 flex min-h-0', terminalPanelOpen ? '' : '')}>
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <MonacoEditor />
          </div>
        </main>
      </div>
      {terminalPanelOpen && (
        <div className="h-40 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="h-full flex flex-col p-2">
            <Terminal />
          </div>
        </div>
      )}
    </div>
  );
}
