export const srcdocCodeOnly = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script id="injected-script">(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
})(this, (function (exports) { 'use strict';

    const main = (node, configuration) => {
            parent.postMessage({configuration}, "*");
          };

    exports.main = main;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
</script>
    <div id="root"></div>
    <script>
      (() => {
        const node = document.getElementById("root");
        const configuration = {};

        const run = () => {
          App.main(node, configuration);
        }
        run();

        const init = () => {
          parent.postMessage({type: 'initialized'}, "*");
        }
        init();

        const runJS = ({code}) => {
          document.getElementById('injected-script')?.remove();
          const script = document.createElement('script');
          script.textContent = code;
          script.id = 'injected-script';
          document.body.appendChild(script);
          run();
        };

        window.addEventListener('message', ({data}) => {
          if(data.type === 'initialize') {
            init();
          }
          if(data.type === 'runJS') {
            runJS(data);
          }
          //if(data.type === 'setConfiguration') {
          //  setConfiguration(data.configuration);
          //}
        });
      })();
    </script>
  </body>
</html>`;