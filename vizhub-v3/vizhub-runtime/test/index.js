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

  before(async () => {
    browser = await puppeteer.launch();
  });

  after(async () => {
    await browser.close();
  });

  it('sanity check', async () => {
    const page = await browser.newPage();
    await page.setContent('<iframe id="runner-iframe"></iframe>');

    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    await page.evaluate(async () => {
      window.runner = await VizHubRuntime.Runner(
        document.getElementById('runner-iframe')
      );
    });

    const iframe = page
      .frames()
      .find((frame) => frame.name() === 'runner-iframe');

    // For debugging while writing tests.
    page.on('console', (msg) => console.log(msg.text()));

    assert.equal(iframe.name(), 'runner-iframe');
  });
});
