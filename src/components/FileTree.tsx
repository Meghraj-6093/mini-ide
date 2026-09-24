import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function FileTree() {
  const { projects, currentProjectId, setSelectedFile } = useIDEStore();

  const project = projects.find((p) => p.id === currentProjectId);
  const files = project?.files || [];

  const handleFileClick = (id: string) => {
    setSelectedFile(id);
  };

  return (
    <div className="p-2">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => handleFileClick(file.id)}
          className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="text-sm">📄</span>
          <span className="text-sm truncate">{file.name}</span>
        </div>
      ))}
    </div>
  );
}
