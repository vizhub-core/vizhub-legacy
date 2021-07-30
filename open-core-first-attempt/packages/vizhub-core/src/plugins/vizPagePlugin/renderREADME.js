import marked from 'marked';
import DOMPurify from 'dompurify';
import { isClient } from '../../isomorphic/isClient';
import { getFileText } from '../../entities/VizContent';

export const renderREADME = (vizContent) => {
  const readmeMarkdown = getFileText(vizContent, 'README.md');
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
