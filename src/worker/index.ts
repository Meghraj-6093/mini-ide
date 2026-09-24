// Web Worker for safe code execution in a separate thread
let worker: Worker | null = null
let messageId = 0

export function runCode(code: string): Promise<{ logs: string[]; result?: string; error?: string }> {
  if (!worker) {
    worker = new Worker(new URL('./runner.ts', import.meta.url))
    worker.onmessage = (e) => {
      console.log('Worker response:', e.data)
    }
  }

  return new Promise((resolve) => {
    const id = messageId++

    const handler = (e: MessageEvent) => {
      if (e.data.id === id) {
        worker!.removeEventListener('message', handler)
        resolve(e.data)
      }
    }

    worker!.addEventListener('message', handler)
    worker!.postMessage({ id, code })
  })
}
