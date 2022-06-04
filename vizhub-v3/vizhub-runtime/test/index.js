import * as assert from 'assert';
import { describe, it } from 'mocha';
import { build, generateSrcdoc } from '../src';
import * as expectedValues from './expectedValues';
import { updateExpectedSrcdocValue } from './updateExpectedSrcdocValue';
import puppeteer from 'puppeteer';

const updateExpectedSrcdocValues = true;

describe('build', () => {
  it('should build a single file as UMD', async () => {
    assert.deepEqual(
      await build({
        files: {
          'index.js': 'export const main = () => console.log("Hello");',
        },
      }),
      expectedValues.singleFileUMD
    );
  });

  it('should handle modules', async () => {
    assert.deepEqual(
      await build({
        files: {
          'index.js': `
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

describe('generateSrcdoc', () => {
  const files = {
    'index.js': `
      export const main = (node, configuration) => {
        parent.postMessage({configuration}, "*");
      };
    `,
  };

  it('should generate srcdoc, code only', async () => {
    const srcdoc = generateSrcdoc(await build({ files }));
    if (updateExpectedSrcdocValues) {
      updateExpectedSrcdocValue('srcdocCodeOnly', srcdoc);
    }
    assert.deepEqual(srcdoc, expectedValues.srcdocCodeOnly);
  });

  it('should generate srcdoc, code and configuration', async () => {
    const { code } = await build({ files });
    const configuration = { foo: 'bar' };
    const srcdoc = generateSrcdoc({ code, configuration });
    if (updateExpectedSrcdocValues) {
      updateExpectedSrcdocValue('srcdocCodeAndConfig', srcdoc);
    }
    assert.deepEqual(srcdoc, expectedValues.srcdocCodeAndConfig);
  });

  it('should generate srcdoc, code and dependencies', async () => {
    const { code } = await build({ files });
    const dependencies = {
      d3: '7.4.4',
      react: '18.1.0',
      'react-dom': '18.1.0',
    };
    const libraries = {
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
    const srcdoc = generateSrcdoc({ code, dependencies, libraries });
    if (updateExpectedSrcdocValues) {
      updateExpectedSrcdocValue('srcdocCodeAndDependencies', srcdoc);
    }
    assert.deepEqual(srcdoc, expectedValues.srcdocCodeAndDependencies);
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

    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });

    // For debugging while writing tests.
    page.on('console', (msg) => console.log(msg.text()));
  });

  afterEach(() => {
    page.close();
  });

  it('sanity check', async () => {
    await page.evaluate(async () => {
      const iframe = document.createElement('iframe');
      iframe.id = 'runner-iframe';
      document.body.appendChild(iframe);
    });

    const iframe = page
      .frames()
      .find((frame) => frame.name() === 'runner-iframe');

    assert.equal(iframe.name(), 'runner-iframe');
  });

  // Test that it generates the HTML with built JS and configuration
  // for use in initializing the iframe, and it runs.
  it('should execute initial srcdoc', async () => {
    const result = await page.evaluate(async () => {
      const iframe = document.createElement('iframe');

      // TODO test sourcemap support
      const { code } = await VizHubRuntime.build({
        files: {
          'index.js': `
            export const main = (node, configuration) => {
              parent.postMessage({configuration}, "*");
            };
          `,
        },
      });
      const configuration = { foo: 'bar' };

      const data = await new Promise((resolve) => {
        window.addEventListener('message', (event) => {
          if (event.data.configuration) {
            resolve(event.data);
          }
        });
        iframe.srcdoc = VizHubRuntime.generateSrcdoc({ code, configuration });
        document.body.appendChild(iframe);
      });
      return data;
    });

    // Tests round trip of config through built app.
    assert.deepEqual(result, { configuration: { foo: 'bar' } });
  });

  // This tests the case where the Runner constructor
  // receives the initial "initialized" message.
  it('should execute injected JS', async () => {
    const result = await page.evaluate(async () => {
      const iframe = document.createElement('iframe');

      const { code } = await VizHubRuntime.build({
        files: {
          'index.js': `
            export const main = () => {
              parent.postMessage({v: 1}, "*");
            };
          `,
        },
      });

      const data = await new Promise((resolve) => {
        window.addEventListener('message', async (event) => {
          // After the initial srcdoc runs...
          if (event.data.v === 1) {
            // Inject new JS
            const runner = await VizHubRuntime.Runner(iframe);
            runner.run(
              await VizHubRuntime.build({
                files: {
                  'index.js': `
                    export const main = () => {
                      parent.postMessage({v: 2}, "*");
                    };
                  `,
                },
              })
            );
          } else if (event.data.v === 2) {
            resolve(event.data);
          }
        });
        iframe.srcdoc = VizHubRuntime.generateSrcdoc({ code });
        document.body.appendChild(iframe);
      });
      return data;
    });

    // Tests that the injected code executed.
    assert.deepEqual(result, { v: 2 });
  });

  // This tests the case where the Runner constructor
  // does not receive the initial "initialized" message,
  // but instead receives a later one that is triggered
  // by the handshake "initialize" message sent from the
  // Runner constructor.
  it('should confirm initialization via handshake', async () => {
    const result = await page.evaluate(async () => {
      const iframe = document.createElement('iframe');

      const { code } = await VizHubRuntime.build({
        files: {
          'index.js': `
            export const main = () => {
              parent.postMessage({v: 1}, "*");
            };
          `,
        },
      });

      const data = await new Promise((resolve) => {
        window.addEventListener('message', (event) => {
          // After the initial srcdoc runs...
          if (event.data.v === 1) {
            // Inject new JS _after a delay_.
            // Introducing this delay sets up the condition that
            // the "initialized" message was sent _before_
            // the `Runner` constructor is invoked.
            // This condition tests the initialization check that happens
            // via a `postMessage` handshake between the Runner constructor
            // and the iframe.

            setTimeout(async () => {
              const runner = await VizHubRuntime.Runner(iframe);
              runner.run(
                await VizHubRuntime.build({
                  files: {
                    'index.js': `
                    export const main = () => {
                      parent.postMessage({v: 2}, "*");
                    };
                  `,
                  },
                })
              );
            }, 10);
          } else if (event.data.v === 2) {
            resolve(event.data);
          }
        });
        iframe.srcdoc = VizHubRuntime.generateSrcdoc({ code });
        document.body.appendChild(iframe);
      });
      return data;
    });

    // Tests that the injected code executed.
    assert.deepEqual(result, { v: 2 });
  });
});

// TODO test that it injects new JS into the existing iframe
// TODO test that it injects new configuration into the existing iframe

// it('should run JS', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': "export const main = () => { window.foo = 'bar'; }",
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'bar');
// });
//
// it('should fail silently if main is undefined', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': `window.foo = 'bar'`,
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'bar');
// });
//
// it('should set state from outside', async () => {
//   await page.evaluate(() => {
//     window.runner.setState('outside');
//     window.runner.run({
//       'index.js': 'export const main = (state) => { window.foo = state; }',
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'outside');
// });
//
// it('should set state from inside', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': `
//         export const main = (state, setState) => {
//           setState('inside');
//           window.foo = state;
//         }
//       `,
//     });
//   });
//   // Wait for inner requestAnimationFrame.
//   // TODO wait for message that state was set instead of this hack.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'inside');
// });
//
// it('should notify of state changes from inside', async () => {
//   await page.evaluate(() => {
//     window.runner.onstatechange = (state) => {
//       window.newState = state;
//     };
//     window.runner.run({
//       'index.js': `
//         export const main = (state, setState) => {
//           setState('new from inside');
//         }
//       `,
//     });
//   });
//   // Wait for inner requestAnimationFrame.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const newState = await page.evaluate(() => window.newState);
//   assert.equal(newState, 'new from inside');
// });
//
// it('should notify of state changes from outside', async () => {
//   await page.evaluate(() => {
//     window.newState = 'not set';
//     window.runner.onstatechange = (state) => {
//       window.newState = state;
//     };
//     window.runner.run({
//       'index.js': 'export const main = () => {}',
//     });
//     window.runner.setState('new from outside');
//   });
//
//   // Wait for inner requestAnimationFrame.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const newState = await page.evaluate(() => window.newState);
//   assert.equal(newState, 'new from outside');
// });
