export const srcdocCodeOnly = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script>(function (global, factory) {
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
        App.main(node, configuration);

        //// TODO receive dynamic configuration updates from the parent (add tests for this)
        //parent.addEventListener('message', (event) => {
        //  // TODO validate it's coming from the right place (add a test for this validation)
        //  if (event.data.context === 'update.configuration') {
        //    console.log('received update.configuration message')
        //    App.main(node, event.data.configuration);
        //  }
        //});
      })();
    </script>
  </body>
</html>`;