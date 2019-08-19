export const generateErrorMessageSrcDoc = errorMessage => `
  <html>
    <body style="margin: 0px; max-width: 100vw;">
      <div
        style="width: 100%; height: 100%; box-sizing: border-box; text-align: center; background-color: rgb(255, 255, 255);"
      >
        <div
          style="position: relative; display: inline-flex; flex-direction: column; height: 100%; width: 1024px; max-width: 100%; overflow: hidden auto; padding: 0.5rem; box-sizing: border-box; text-align: left; font-family: Consolas, Menlo, monospace; font-size: 11px; white-space: pre-wrap; word-break: break-word; line-height: 1.5; color: rgb(41, 50, 56);"
        >
          <div
            style="font-size: 2em; font-family: sans-serif; color: rgb(206, 17, 38); white-space: pre-wrap; margin: 0px 2rem 0.75rem 0px; flex: 0 0 auto; max-height: 50%; overflow: auto;"
          >
            Failed to compile
          </div>
          <div style="cursor: pointer;">
            <pre
              style="position: relative; display: block; padding: 0.5em; margin-top: 0.5em; margin-bottom: 0.5em; overflow-x: auto; white-space: pre-wrap; border-radius: 0.25rem; background-color: rgba(206, 17, 38, 0.05);"
            ><code style="font-family: Consolas, Menlo, monospace;">${errorMessage}</code></pre>
          </div>
        </div>
      </div>
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
