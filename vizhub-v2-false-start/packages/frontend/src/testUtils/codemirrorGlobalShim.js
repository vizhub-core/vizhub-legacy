import jsdom from 'jsdom';

// Shim odds and ends needed for CodeMirror to run in Node tests.
global.document = new jsdom.JSDOM('').window.document;

global.document.getSelection = () => ({});

global.navigator = {};
global.window = {
  addEventListener: () => {}
};
global.MutationObserver = function() {
  return {
    observe: () => {},
    takeRecords: () => {},
    disconnect: () => {}
  };
};
global.requestAnimationFrame = () => {};
