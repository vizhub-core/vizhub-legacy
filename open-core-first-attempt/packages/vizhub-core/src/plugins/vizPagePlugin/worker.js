import { jsDelivrCombine } from '../../isomorphic/jsDelivrCombine';
import { renderREADME } from './renderREADME';

// We use Marked to render Markdown.
// https://www.npmjs.com/package/marked
const markedVersion = '2.1.3';

// We use xss to sanitize rendered Markdown.
// https://www.npmjs.com/package/xss
// Note: we are not using DOMPurify
// because it does not support Web Workers.
const xssVersion = '1.0.9';

// Load modules in the browser via CDN.
const libraries = jsDelivrCombine([
  `marked@${markedVersion}/marked.min.js`,
  `xss@${xssVersion}/dist/xss.min.js`,
]);

const workerWindow = self;

export const vizPageWorkerPlugin = () => {
  importScripts(libraries);

  console.log('marked');
  console.log(marked);
  console.log('filterXSS');
  console.log(filterXSS);

  // Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js
  onmessage = (event) => {
    console.log('Worker: Message received from main script');
    const { readmeMarkdown } = event.data;
    const result = renderREADME(readmeMarkdown, marked, filterXSS);
    postMessage(result);
  };
};
