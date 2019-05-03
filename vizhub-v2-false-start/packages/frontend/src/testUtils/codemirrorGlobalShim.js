import jsdom from 'jsdom';

// Shim odds and ends needed for CodeMirror to run in Node tests.
global.document = new jsdom.JSDOM('').window.document;

const _createElement = global.document.createElement;
global.document.createElement = function() {
  console.log('JSDOM is creating a ' + JSON.stringify(arguments));
  return _createElement.apply(global.document, arguments);
}

console.log('global.document');
console.log(global.document);

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
