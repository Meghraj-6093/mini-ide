// Web Worker for code execution
self.onmessage = (e) => {
  const { code, language } = e.data;

  try {
    if (language === 'typescript') {
      // For TypeScript, we can use simple eval or Babel in production
      // For this demo, we'll assume the code is valid JS
      eval(code);
    } else {
      eval(code);
    }
  } catch (error) {
    self.postMessage({ type: 'error', content: error.message });
  }
};
