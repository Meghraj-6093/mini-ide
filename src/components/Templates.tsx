import React from 'react'
import { useIDEStore } from '../store/ideStore'

const templates = [
  { id: 'hello', name: 'Hello World', code: 'console.log("Hello, World!");\n' },
  { id: 'calculator', name: 'Calculator', code: 'function add(a, b) { return a + b; }\nconsole.log("3 + 4 =", add(3, 4));\n' },
  { id: 'array', name: 'Array Methods', code: 'const numbers = [1, 2, 3, 4, 5];\nconsole.log("Squares:", numbers.map(n => n * n));\nconsole.log("Sum:", numbers.reduce((a, b) => a + b, 0));\n' },
  { id: 'dom', name: 'DOM Operations', code: 'const items = ["Apple", "Banana", "Orange"];\nconsole.log("Items:", items);\nconsole.log("First:", items[0]);\nconsole.log("Last:", items[items.length - 1]);\n' },
]

export const Templates: React.FC = () => {
  const { createFile } = useIDEStore()

  const handleUseTemplate = (id: string) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      const fileName = `${template.name.replace(/\s+/g, '-')}.ts`
      createFile(null, fileName)
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#252526] text-[#cccccc]">
      <div className="flex h-9 items-center border-b border-[#2d2d2d] px-4">
        <span className="text-xs font-bold uppercase text-neutral-400">TEMPLATES</span>
      </div>
      <div className="p-3 space-y-2">
        {templates.map(template => (
          <div key={template.id} className="rounded bg-[#1e1e1e] p-3 border border-[#3c3c3c] hover:border-[#007acc]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{template.name}</span>
              <button
                onClick={() => handleUseTemplate(template.id)}
                className="text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white px-2 py-1 rounded"
              >
                Use
              </button>
            </div>
            <pre className="text-xs text-[#6e6e6e] overflow-x-auto">{template.code}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
