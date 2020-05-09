import marked from 'marked';

// Use a custom renderer to open links in a new tab.
// Draws from https://github.com/markedjs/marked/issues/144
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace('<a', '<a target="_blank" ');
};

marked.setOptions({
  renderer: renderer,
});

export const renderMarkdown = marked;
