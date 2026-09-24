# Web Worker for code execution

This worker runs JavaScript code in a separate thread to avoid blocking the main UI thread. It captures console output and returns results safely.

## Features

- Safe execution in sandboxed context
- Console.log, warn, and error capture
- Timeout protection (future)
- Type-safe message passing

## Usage

```typescript
import { runCode } from './worker/index'

const result = await runCode('console.log("Hello, World!");\n')
// result: { success: true, logs: ['→ Hello, World!'], result: undefined }
```

## Worker Lifecycle

1. Worker is created on first use
2. Code is sent via postMessage
3. Execution happens in worker thread
4. Results are posted back to main thread
5. Console is restored after execution

## Security Notes

- Code runs in separate context (no access to main thread variables)
- Uses Function constructor for safer execution than eval
- Consider adding timeout for long-running code

