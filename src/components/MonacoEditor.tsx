import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export default function MonacoEditor() {
  const { selectedFileId, getFileContent, setFileContent } = useIDEStore();

  const content = selectedFileId ? getFileContent('proj-1', selectedFileId) : '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedFileId) {
      setFileContent('proj-1', selectedFileId, e.target.value);
    }
  };

  return (
    <div className="flex-1 p-2 bg-white dark:bg-gray-900">
      <div className="font-mono text-sm h-full flex flex-col">
        {selectedFileId ? (
          <>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{selectedFileId}</div>
            <textarea
              className="flex-1 bg-transparent resize-none outline-none"
              value={content}
              onChange={handleChange}
              placeholder="Edit your code here..."
            />
          </>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">Select a file to edit</div>
        )}
      </div>
    </div>
  );
}
