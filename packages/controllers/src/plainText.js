import marked from 'marked';

// This renderer for Marked renders Markdown to
// plain text with no line breaks.
const PlainTextRenderer = new marked.Renderer();

PlainTextRenderer.link = (href, title, text) => text;
PlainTextRenderer.image = () => '';

const space = () => ' ';
PlainTextRenderer.hr = space;
PlainTextRenderer.br = space;

const justText = text => text;
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

const firstLine = str => (str ? str.split('\n')[0] : '');

const maxCharacters = 80;
const ellipsis = line =>
  line.length > maxCharacters
    ? line.substr(0, maxCharacters).trim() + '…'
    : line;
export const plainText = markdown =>
  marked(markdown, {
    renderer: PlainTextRenderer
  });

//const unescapeHTML = html => html
//  .replace(/&amp;/, '&')
//  .replace(/&lt;/g, '<')
//  .replace(/&gt;/g, '>')
//  .replace(/&quot;/g, '"')
//  .replace(/&#39;/g, "'")
//
//const truncate = description => unescapeHTML(ellipsis(plainText(description)))
//
//export default truncate
