import React from 'react'
import { Code2 } from 'lucide-react'
import { useIDEStore } from '../store/ideStore'

const templates = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Basic greeting app',
    code: `console.log("Hello, World!");
`,
  },
  {
    id: 'calculator',
    name: 'Simple Calculator',
    description: 'Basic arithmetic functions',
    code: `function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

console.log("5 + 3 =", add(5, 3));
console.log("10 - 4 =", subtract(10, 4));
`,
  },
  {
    id: 'typescript-demo',
    name: 'TypeScript Demo',
    description: 'Type-safe functions',
    code: `interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const user: Person = {
  name: "Alice",
  age: 30,
};

console.log(greet(user));
`,
  },
]

export const Templates: React.FC = () => {
  const { createFile } = useIDEStore()

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      createFile(null, `${template.name.replace(/\s+/g, '-')}.ts`)
      // Note: This would need to be connected to actually set the content
      console.log(`Using template: ${template.name}`)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#252526]">
      <div className="flex h-9 items-center px-4 border-b border-[#2d2d2d]">
        <span className="text-xs font-bold tracking-wider uppercase text-neutral-400">
          TEMPLATES
        </span>
      </div>
      <div className="p-3 space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="rounded bg-[#1e1e1e] p-3 border border-[#3c3c3c] hover:border-[#007acc] transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="h-4 w-4 text-[#007acc]" />
              <span className="text-sm font-medium text-[#cccccc]">{template.name}</span>
            </div>
            <p className="text-xs text-[#969696] mb-2">{template.description}</p>
            <button
              onClick={() => handleUseTemplate(template.id)}
              className="text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white px-2 py-1 rounded"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
