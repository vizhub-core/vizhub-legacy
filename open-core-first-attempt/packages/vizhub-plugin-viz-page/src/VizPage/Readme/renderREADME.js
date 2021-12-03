import { isClient, getFileText } from 'vizhub-core/worker';

export const renderREADME = (readmeMarkdown, marked, filterXSS) => {
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
  return filterXSS(marked(readmeMarkdown));
};
