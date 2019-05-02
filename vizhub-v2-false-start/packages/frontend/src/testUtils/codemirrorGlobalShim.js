import { createDom } from './dom';

// Shim odds and ends needed for CodeMirror to run in Node.
global.document = createDom('').window.document;
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
