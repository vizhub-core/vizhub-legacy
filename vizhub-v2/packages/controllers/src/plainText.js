import marked from 'marked';
import { sanitize } from './sanitize';

// This renderer for Marked renders Markdown to
// plain text with no line breaks.
const PlainTextRenderer = new marked.Renderer();

PlainTextRenderer.link = (href, title, text) => text;
PlainTextRenderer.image = () => '';

const space = () => ' ';
PlainTextRenderer.hr = space;
PlainTextRenderer.br = space;

const justText = (text) => text;
PlainTextRenderer.code = justText;
PlainTextRenderer.blockquote = justText;
PlainTextRenderer.heading = justText;
PlainTextRenderer.list = justText;
PlainTextRenderer.listitem = justText;
PlainTextRenderer.paragraph = justText;
PlainTextRenderer.strong = justText;
PlainTextRenderer.em = justText;
PlainTextRenderer.codespan = justText;
PlainTextRenderer.del = justText;

const firstLine = (str) => (str ? str.split('\n')[0] : '');

const truncate = (text, nChars) =>
  text.substr(0, nChars) + (text.length > nChars ? '…' : '');

export const plainText = (markdown) =>
  truncate(sanitize(marked(markdown, { renderer: PlainTextRenderer })), 300);
