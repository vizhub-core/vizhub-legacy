import { isClient } from '../../isomorphic/isClient';
import { getFileText } from '../../entities/VizContent';

if (isClient) {
  // Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js
  const myWorker = new Worker('/build/worker.js');

  myWorker.postMessage([5, 6]);
  console.log('Message posted to worker');

  myWorker.onmessage = function (e) {
    console.log('Message received from worker');
    console.log(e.data);
  };
}

export const renderREADME = async (vizContent, { marked, DOMPurify }) => {
  const readmeMarkdown = getFileText(vizContent, 'README.md');

  // TODO highlight code snippets
  //  marked.setOptions({
  //    highlight: (code, lang) => {
  //      console.log('TODO highlight code: ');
  //      console.log(lang);
  //      console.log(code);
  //
  //      const hljs = require('highlight.js');
  //      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //      return hljs.highlight(code, { language }).value;
  //    },
  //  });

  return DOMPurify.sanitize(marked(readmeMarkdown));
};
