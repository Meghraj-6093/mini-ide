export const useFileSearch = (projectId: string | null, query: string) => {
  const { projects, searchFiles } = useIDEStore();
  const [results, setResults] = useState<FileNode[]>([]);

  useEffect(() => {
    if (!projectId || !query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      searchFiles(projectId);
    }, 300);
    return () => clearTimeout(timer);
  }, [projectId, query]);

  return results;
};
