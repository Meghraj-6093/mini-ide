import { useEffect } from 'react'
import { useIDEStore } from '../store/ideStore'

export const useKeyboardShortcuts = () => {
  const { toggleSidebar, toggleBottomPanel, createFile } = useIDEStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'n') {
        e.preventDefault()
        createFile(null, `file-${Date.now()}.ts`)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        toggleBottomPanel()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleSidebar, toggleBottomPanel, createFile])
}
