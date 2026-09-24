export const useAutosave = () => {
  const saveToStorage = useIDEStore((s) => s.saveToStorage);
  const projects = useIDEStore((s) => s.projects);

  useEffect(() => {
    const timer = setTimeout(saveToStorage, 1000);
    return () => clearTimeout(timer);
  }, [projects, saveToStorage]);
};
