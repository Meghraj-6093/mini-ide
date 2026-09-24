import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function Header() {
  const { setCommandPaletteOpen } = useIDEStore();

  return (
    <header className="h-10 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <button
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <span className="text-xs">🔍</span>
        </button>
        <span className="text-sm font-semibold">Mini IDE</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          ⚙️ Settings
        </button>
        <button className="px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white">
          Run
        </button>
      </div>
    </header>
  );
}
