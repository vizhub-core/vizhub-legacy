import marked from 'marked';
import DOMPurify from 'dompurify';
import { isClient } from '../../isomorphic/isClient';
import { getFileText } from '../../entities/VizContent';

// TODO style markdown
export const renderREADME = (vizContent) => {
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

  const readmeHTMLUnsanitized = marked(readmeMarkdown);

  let readmeHTML;
  if (isClient) {
    readmeHTML = DOMPurify.sanitize(readmeHTMLUnsanitized);
  } else {
    // See https://github.com/cure53/DOMPurify#okay-makes-sense-lets-move-on
    const { JSDOM } = require('jsdom');
    readmeHTML = DOMPurify(new JSDOM('').window).sanitize(
      readmeHTMLUnsanitized
    );
  }
  return readmeHTML;
};
