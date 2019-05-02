import jsdom from 'jsdom';

export const createDom = html => {
  const dom = new jsdom.JSDOM(html);

  // Shim needed for CodeMirror to run in Node.
  dom.window.document.getSelection = () => ({});

  return dom;
};
