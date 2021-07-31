import { jsDelivrCombine } from '../../isomorphic/jsDelivrCombine';
import { renderREADME } from './renderREADME';

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

const workerWindow = self;

export const vizPageWorkerPlugin = () => {
  importScripts(libraries);
  const secondaryModules = {
    marked,
    // TODO get this working.
    // https://github.com/cure53/DOMPurify/issues/278
    DOMPurify: DOMPurify(workerWindow),
  };

  // Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js
  onmessage = (event) => {
    console.log('Worker: Message received from main script');
    const { readmeMarkdown } = event.data;
    const result = renderREADME(readmeMarkdown, secondaryModules);
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  };
};
