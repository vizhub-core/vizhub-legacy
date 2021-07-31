import { jsDelivrCombine } from '../../isomorphic/jsDelivrCombine';

// We use Marked to render Markdown.
// https://www.npmjs.com/package/marked
const markedVersion = '2.1.3';

// We use DOMPurify to sanitize rendered Markdown.
// https://www.npmjs.com/package/dompurify
const domPurifyVersion = '2.3.0';

// Load modules in the browser via CDN.
const libraries = jsDelivrCombine([
  `marked@${markedVersion}/marked.min.js`,
  `dompurify@${domPurifyVersion}/dist/purify.min.js`,
]);

export const vizPageWorkerPlugin = () => {
  importScripts(libraries);

  console.log({ marked, DOMPurify });

  // Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js
  onmessage = (event) => {
    console.log('Worker: Message received from main script');
    console.log(event.data);
    const result = event.data[0] * event.data[1];
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  };
};
