import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';
import { useAutosave } from '@/hooks/useAutosave';
import { useShortcuts } from '@/hooks/useShortcuts';
import CommandPalette from './CommandPalette';
import Header from './Header';
import Sidebar from './Sidebar';
import Layout from './Layout';
import { useEffect, useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { setDarkMode: setStoreDarkMode, sidebarOpen } = useIDEStore();

  useAutosave();

  useShortcuts((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const { toggleSidebar } = useIDEStore.getState();
      toggleSidebar();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      const { setCommandPaletteOpen } = useIDEStore.getState();
      setCommandPaletteOpen(true);
    }
  });

  useEffect(() => {
    setStoreDarkMode(darkMode);
  }, [darkMode, setStoreDarkMode]);

  return (
    <div className={cn(
      darkMode ? 'dark' : '',
      'w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
    )}>
      <CommandPalette />
      <Header />
      <Layout>
        <Sidebar />
      </Layout>
    </div>
  );
}
