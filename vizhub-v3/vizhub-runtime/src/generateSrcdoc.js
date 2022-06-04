import { cdn } from './cdn';

export const generateSrcdoc = ({
  code,
  configuration = {},
  dependencies = {},
  libraries = {},
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">${cdn({ dependencies, libraries })}
  </head>
  <body>
    <script id="injected-script">${code}</script>
    <div id="root"></div>
    <script>
      (() => {
        const node = document.getElementById("root");
        const configuration = ${JSON.stringify(configuration)};
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
