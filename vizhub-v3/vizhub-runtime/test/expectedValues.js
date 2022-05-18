export const singleFileUMD = {
  code: `(function (global, factory) {\n\ttypeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :\n\ttypeof define === 'function' && define.amd ? define(['exports'], factory) :\n\t(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));\n})(this, (function (exports) { 'use strict';\n\n\tconst main = () => console.log(\"Hello\");\n\n\texports.main = main;\n\n\tObject.defineProperty(exports, '__esModule', { value: true });\n\n}));\n`,
};
