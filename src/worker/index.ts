import { createWorker } from 'react-web-worker';
import { workerCode } from './runner';

const Worker = createWorker(workerCode);

export const runCode = (code: string, language: string = 'javascript') => {
  return new Promise((resolve, reject) => {
    const worker = new Worker();

    worker.onmessage = (e) => {
      if (e.data.type === 'error') {
        reject(e.data.content);
      } else {
        resolve(e.data);
      }
    };

    worker.onerror = (error) => {
      reject(error.message);
    };

    worker.postMessage({ code, language });
  });
};
