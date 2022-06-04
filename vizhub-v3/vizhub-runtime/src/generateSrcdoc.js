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
