// Simple localStorage-based autosave
import { useIDEStore } from '../store/ideStore'

const STORAGE_KEY = 'mini-ide-autosave'

export function saveToFilesystem() {
  const state = useIDEStore.getState()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    files: state.files,
    openTabs: state.openTabs,
    activeFileId: state.activeFileId,
  }))
}

export function loadFromFilesystem() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved)
      // This would integrate with Zustand persist or update store
      return data
    } catch {
      return null
    }
  }
  return null
}

// Autosave on every 5 seconds
setInterval(saveToFilesystem, 5000)
