export const modules = {
  code: `(function (global, factory) {
          typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
          typeof define === 'function' && define.amd ? define(['exports'], factory) :
          (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
})(this, (function (exports) { 'use strict';

          const add = (a, b) => a + b;

          const main = () => console.log(add(1, 2));

          exports.main = main;

          Object.defineProperty(exports, '__esModule', { value: true });

}));
`,
};
