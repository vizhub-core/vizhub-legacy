import * as assert from 'assert';
import { describe, it } from 'mocha';
import { build } from '../src/build';
import * as expectedValues from './expectedValues';

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
