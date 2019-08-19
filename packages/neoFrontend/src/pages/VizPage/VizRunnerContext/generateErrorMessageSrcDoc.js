import { defaultCodingFontFamily } from '../../../theme';

export const generateErrorMessageSrcDoc = errorMessage => `
  <html>
    <style>
      body {
        padding: 10px;
      }
      pre {
        font-family: ${defaultCodingFontFamily};
        font-size: 1.5em;
        border-radius: 0.25rem;
        background-color: rgba(206, 17, 38, 0.05);
        padding: 10px;
        color: rgb(41, 50, 56);
      }
      .title {
        color: rgb(206, 17, 38);
        font-size: 2em;
        font-family: sans-serif;
      }
    </style>
    <body>
      <div class="title">Failed to compile</div>
      <pre>${errorMessage}</pre>
    </body>
  </html>
`;
//  >
//    style="font-size: 2em; font-family: sans-serif; color: rgb(206, 17, 38); white-space: pre-wrap; margin: 0px 2rem 0.75rem 0px; flex: 0 0 auto; max-height: 50%; overflow: auto;"
//    Failed to compile
//  </div>
//  <div style="cursor: pointer;">
//    <pre
//      style="position: relative; display: block; padding: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em; overflow-x: auto; white-space: pre-wrap; border-radius: 0.25rem; background-color: rgba(206, 17, 38, 0.05);"
//    ><code style="font-family: Consolas, Menlo, monospace;"><span data-ansi-line="true"><span>./src/pages/VizPage/VizRunnerContext/index.js</span></span><br><span data-ansi-line="true"><span>  </span><span>Line 72:</span><span>  'generateErrorMessageSrcDoc' is not defined  </span><span style="color: #881280;"></span><span style="color: #881280;">no-undef</span><span style="color: #881280;"></span><span></span></span><br><span data-ansi-line="true"><span></span></span><br><span data-ansi-line="true"><span>Search for the </span><span></span><span style="color: #881280;">keywords</span><span></span><span> to learn more about each error.</span></span></code></pre>
//  </div>
//  <div
//    style="font-family: sans-serif; color: rgb(135, 142, 145); margin-top: 0.5rem; flex: 0 0 auto;"
//  >
//    This error occurred during the build time and cannot be dismissed.
//    <br />
//  </div>
//</div>
//
