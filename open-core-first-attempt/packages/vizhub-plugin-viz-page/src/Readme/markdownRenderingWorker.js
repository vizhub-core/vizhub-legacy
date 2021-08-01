import { jsDelivrCombine } from 'vizhub-core';
import { renderREADME } from './renderREADME';

// This file defines a Web Worker that renders Markdown.

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

importScripts(libraries);

// Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js
onmessage = ({ data }) => {
  postMessage(renderREADME(data, marked, filterXSS));
};
