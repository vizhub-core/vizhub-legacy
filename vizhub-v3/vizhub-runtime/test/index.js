import * as assert from 'assert';
import { describe, it } from 'mocha';
import { build } from '../src/build';
import * as expectedValues from './expectedValues';
import puppeteer from 'puppeteer';

describe('Build', () => {
  it('should build a single file as UMD', async () => {
    assert.deepEqual(
      await build({
        files: {
          'main.js': 'export const main = () => console.log("Hello");',
        },
      }),
      expectedValues.singleFileUMD
    );
  });

  it('should handle modules', async () => {
    assert.deepEqual(
      await build({
        files: {
          'main.js': `
            import { add } from './add';
            export const main = () => console.log(add(1, 2));
          `,
          'add.js': 'export const add = (a, b) => a + b;',
        },
      }),
      expectedValues.modules
    );
  });
});

// Puppeteer-based tests that instantiate the runtime in a Chrome iframe.
// Note that there are several levels of nesting here:
//  * `page` is the headless Chrome page (akin to the browser page running the VizHub app)
//  * `#runner-iframe` is the iframe within that page (akin to the running viz)
describe('run', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    // For debugging while writing tests.
    page.on('console', (msg) => console.log(msg.text()));
  });

  afterEach(() => {
    page.close();
  });

  it('sanity check', async () => {
    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    await page.evaluate(async () => {
      const iframe = document.createElement('iframe');
      iframe.id = 'runner-iframe';
      document.body.appendChild(iframe);
      window.runner = await VizHubRuntime.Runner(iframe);
    });

    const iframe = page
      .frames()
      .find((frame) => frame.name() === 'runner-iframe');

    assert.equal(iframe.name(), 'runner-iframe');
  });

  it('should execute initial srcdoc', async () => {
    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    const result = await page.evaluate(async () => {
      const iframe = document.createElement('iframe');

      const dependencies = {
        d3: '7.4.4',
        react: '18.1.0',
        'react-dom': '18.1.0',
      };
      const libraries = {
        // TODO remove these from this test, do a separate dedicated test for `cdn`
        d3: {
          global: 'd3',
          path: '/dist/d3.min.js',
        },
        react: {
          global: 'React',
          path: '/umd/react.production.min.js',
        },
        'react-dom': {
          global: 'ReactDOM',
          path: '/umd/react-dom.production.min.js',
        },
      };
      // TODO make this robust to malformed arguments (add tests),
      // since this can be sourced from user generated `package.json` content.
      const cdn = ({ dependencies, libraries }) =>
        Object.keys(dependencies)
          .map((dependency, i) => {
            const version = dependencies[dependency];
            const path = libraries[dependency].path;
            const src = `https://cdn.jsdelivr.net/npm/${dependency}@${version}${path}`;
            const indent = i > 0 ? '    ' : '';
            return `${indent}<script src="${src}"></script>`;
          })
          .join('\n');
      const { code } = await VizHubRuntime.build({
        files: {
          'main.js': `
            export const main = (node, configuration) => {
              parent.postMessage({configuration, hasReact: !!React, hasD3: !!d3}, "*");
            };
          `,
        },
      });
      const configuration = { foo: 'bar' };
      const srcdoc = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    ${cdn({ dependencies, libraries })}
  </head>
  <body>
    <script>${code}</script>
    <div id="root"></div>
    <script>
      (() => {
        const node = document.getElementById("root");
        const configuration = ${JSON.stringify(configuration)};
        App.main(node, configuration);

        // TODO receive dynamic configuration updates from the parent (add tests for this)
        parent.addEventListener('message', (event) => {
          // TODO validate it's coming from the right place (add a test for this validation)
          if (event.data.context === 'update.configuration') {
            console.log('received update.configuration message')
            App.main(node, event.data.configuration);
          }
        });
      })();
    </script>
  </body>
</html>`;

      const data = await new Promise((resolve) => {
        // TODO validate it's coming from the right place
        window.addEventListener('message', (event) => {
          resolve(event.data);
        });
        iframe.srcdoc = srcdoc;
        document.body.appendChild(iframe);
      });
      return data;
    });

    // Tests round trip of config through built app.
    assert.deepEqual(result, {
      configuration: {
        foo: 'bar',
      },
      hasD3: true,
      hasReact: true,
    });
  });
});
// TODO test that it generates the HTML for use in initializing the iframe, and it runs.

// TODO test that it injects new JS into the existing iframe
// TODO test that it generates the HTML with configuration for use in initializing the iframe.
// TODO test that it injects new configuration into the existing iframe
