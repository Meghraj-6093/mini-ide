import { useIDEStore } from '@/store/ideStore';

export default function MonacoEditor() {
  const { selectedFileId } = useIDEStore();

  return (
    <div className="flex-1 p-2 bg-white dark:bg-gray-900">
      <div className="font-mono text-sm">
        {selectedFileId ? (
          <textarea
            className="w-full h-full bg-transparent resize-none"
            placeholder="Edit your code here..."
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">Select a file to edit</div>
        )}
      </div>
    </div>
  );
}
