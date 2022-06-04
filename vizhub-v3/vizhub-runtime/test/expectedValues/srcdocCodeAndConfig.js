export const srcdocCodeAndConfig = `<!DOCTYPE html>
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
        const configuration = {"foo":"bar"};
        App.main(node, configuration);

        //// TODO receive dynamic configuration updates from the parent (add tests for this)
        //parent.addEventListener('message', (event) => {
        //  // TODO validate it's coming from the right place (add a test for this validation)
        //  if (event.data.context === 'update.configuration') {
        //    console.log('received update.configuration message')
        //    App.main(node, event.data.configuration);
        //  }
        //});
        parent.postMessage({type: 'initialized'}, "*");

        const runJS = (code) => {
          document.getElementById('injected-script')?.remove();
          const script = document.createElement('script');
          script.textContent = code;
          script.id = 'injected-script';
          document.body.appendChild(script);
          App.main(node, configuration);
        };

        window.addEventListener('message', ({data}) => {
          if(data.type === 'runJS') {
            runJS(data.code);
          }
          //if(data.type === 'setConfiguration') {
          //  setConfiguration(data.configuration);
          //}
        });
      })();
    </script>
  </body>
</html>`;