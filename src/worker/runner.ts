// Web Worker for safe code execution
self.addEventListener('message', (event) => {
  const { code, id } = event.data

  const logs: string[] = []
  const originalLog = console.log
  const originalWarn = console.warn
  const originalError = console.error

  console.log = (...args: any[]) => {
    logs.push(`✓ ${args.map((a) => String(a)).join(' ')}`)
    originalLog(...args)
  }
  console.warn = (...args: any[]) => {
    logs.push(`⚠️ ${args.map((a) => String(a)).join(' ')}`)
    originalWarn(...args)
  }
  console.error = (...args: any[]) => {
    logs.push(`❌ ${args.map((a) => String(a)).join(' ')}`)
    originalError(...args)
  }

  try {
    const run = new Function(code)
    const result = run()

    console.log = originalLog
    console.warn = originalWarn
    console.error = originalError

    self.postMessage({
      id,
      success: true,
      logs,
      result: result !== undefined ? String(result) : undefined,
    })
  } catch (error: any) {
    self.postMessage({
      id,
      success: false,
      error: error.message,
      logs,
    })
  }
})
