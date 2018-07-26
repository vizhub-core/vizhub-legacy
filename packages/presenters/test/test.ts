import * as assert from 'assert';
import { VisualizationViewModel } from '../src';
import { Bundler } from '../src';

describe('Presenters', () => {
  describe('VisualizationViewModel', () => {
    it('should present a Visualization', () => {
      const visualization = {
        info: {
          title: 'Foo'
        },
        content: {
          files: [
            { name: 'index.html', text: 'html text' }
          ]
        }
      };
      assert.deepEqual(new VisualizationViewModel(visualization), {
        files: visualization.content.files,
        width: 960,
        height: 500,
        title: 'Foo'
      });
    });
  });
  describe('Bundler', () => {
    it('should bundle files using Rollup', async () => {
      const files = [
        { name: 'index.js', text: 'import { foo } from "./foo.js"; console.log(foo);' },
        { name: 'foo.js', text: 'export const foo = "bar";' }
      ];
      assert.deepEqual(await Bundler().bundle(files), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconst foo = \"bar\";\n\n\tconsole.log(foo);\n\n}());\n"
      }]);
    });
  });
});
