// Web Worker for code execution
// Runs JavaScript in a sandboxed context

interface MessageData {
  id: number
  code: string
}

interface ResponseData {
  id: number
  success: boolean
  logs: string[]
  result?: string
  error?: string
}

const originalLog = self.console.log
const originalWarn = self.console.warn
const originalError = self.console.error

function captureLog(prefix: string, args: any[]): string {
  return `${prefix} ${args.map((a) => String(a)).join(' ')}`
}

self.addEventListener('message', (event: MessageEvent<MessageData>) => {
  const { code, id } = event.data
  const logs: string[] = []

  try {
    // Capture console output
    self.console.log = (...args: any[]) => {
      logs.push(captureLog('→', args))
      originalLog(...args)
    }
    self.console.warn = (...args: any[]) => {
      logs.push(captureLog('⚠️', args))
      originalWarn(...args)
    }
    self.console.error = (...args: any[]) => {
      logs.push(captureLog('❌', args))
      originalError(...args)
    }

    // Execute code in function scope
    const run = new Function(code)
    const result = run()

    // Restore original console
    self.console.log = originalLog
    self.console.warn = originalWarn
    self.console.error = originalError

    const response: ResponseData = {
      id,
      success: true,
      logs,
    }

    if (result !== undefined) {
      response.result = String(result)
    }

    self.postMessage(response)
  } catch (error: any) {
    // Restore original console
    self.console.log = originalLog
    self.console.warn = originalWarn
    self.console.error = originalError

    const response: ResponseData = {
      id,
      success: false,
      logs,
      error: error.message,
    }

    self.postMessage(response)
  }
})
