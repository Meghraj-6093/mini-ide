import { useMemo } from 'react'
import { useIDEStore } from '../store/ideStore'

export const useFileSearch = (query: string) => {
  const { files } = useIDEStore()

  const results = useMemo(() => {
    if (!query.trim()) return []

    return Object.values(files)
      .filter((file) => !file.isFolder)
      .filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      )
  }, [files, query])

  return results
}
