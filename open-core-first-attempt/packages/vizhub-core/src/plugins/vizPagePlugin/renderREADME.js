import { isClient } from '../../isomorphic/isClient';
import { getFileText } from '../../entities/VizContent';

export const renderREADME = (readmeMarkdown, { marked, DOMPurify }) => {
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
