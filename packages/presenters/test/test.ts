import * as assert from 'assert';
import { VisualizationViewModel } from '../src';
import { bundle } from '../src';

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
      assert.deepEqual(await bundle(files), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconst foo = \"bar\";\n\n\tconsole.log(foo);\n\n}());\n"
      }]);
    });
    it('should refer to global d3 in bundle', async () => {
      const files = [
        { name: 'index.js', text: 'import { select } from "d3"; console.log(select);' }
      ];
      assert.deepEqual(await bundle(files), [{
        name: 'bundle.js',
        text: "(function (d3) {\n\t'use strict';\n\n\tconsole.log(d3.select);\n\n}(d3));\n"
      }]);
    });
  });
});
