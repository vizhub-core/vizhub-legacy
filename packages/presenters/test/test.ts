import * as assert from 'assert';
import { testData } from 'datavis-tech-entities';
import { VisualizationViewModel, DatasetViewModel } from '../src';
import { bundle } from '../src';

const {
  visualization,
  dataset
} = testData;

const removeSourceMap = files => {
  files[0].text = files[0].text.split('\n//# sourceMappingURL')[0];
  return files;
};

describe('Presenters', () => {
  describe('VisualizationViewModel', () => {
    it('should present a Visualization', () => {
      assert.deepEqual(new VisualizationViewModel(visualization), {
        id: visualization.id,
        files: visualization.content.files,
        title: "Foo",
        description: "Foo the great",
        width: 960,
        height: 600
      });
    });
  });

  describe('DatasetViewModel', () => {
    it('should present a Dataset', () => {
      assert.deepEqual(new DatasetViewModel(dataset), {
        title: "Foo",
        slug: "foo",
        format: "csv",
        sourceName: "Flaring Central",
        sourceUrl: "https://flaring.central/",
        text: "a,b,c\n1,2,3\n4,5,6"
      });
    });
  });

  describe('Bundler', () => {
    it('should bundle files using Rollup', async () => {
      const files = [
        { name: 'index.js', text: 'import { foo } from "./foo.js"; console.log(foo);' },
        { name: 'foo.js', text: 'export const foo = "bar";' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconst foo = \"bar\";\n\n\tconsole.log(foo);\n\n}());\n"
      }]);
    });

    it('should refer to global d3 in bundle for d3 package', async () => {
      const files = [
        { name: 'index.js', text: 'import { select } from "d3"; console.log(select);' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function (d3) {\n\t'use strict';\n\n\tconsole.log(d3.select);\n\n}(d3));\n"
      }]);
    });

    it('should refer to global React in bundle for React package', async () => {
      const files = [
        { name: 'index.js', text: 'import React from "react"; console.log(React);' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function (React) {\n\t'use strict';\n\n\tReact = React && React.hasOwnProperty('default') ? React['default'] : React;\n\n\tconsole.log(React);\n\n}(React));\n"
      }]);
    });

    it('should transpile JSX', async () => {
      const files = [
        { name: 'index.js', text: '<div>Hello JSX!</div>' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tReact.createElement( 'div', null, \"Hello JSX!\" );\n\n}());\n"
      }]);
    });

    it('should not transpile ES6', async () => {
      const files = [
        { name: 'index.js', text: 'const fn = a => a * a; console.log(fn(4));' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconst fn = a => a * a; console.log(fn(4));\n\n}());\n"
      }]);
    });

    it('should allow generators', async () => {
      const files = [
        { name: 'index.js', text: 'console.log(function* () { yield 5; }().next().value)' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconsole.log(function* () { yield 5; }().next().value);\n\n}());\n"
      }]);
    });

    it('should allow characters outside of the Latin1 range', async () => {
      const files = [
        { name: 'index.js', text: 'console.log("Привет")' }
      ];
      assert.deepEqual(removeSourceMap(await bundle(files)), [{
        name: 'bundle.js',
        text: "(function () {\n\t'use strict';\n\n\tconsole.log(\"Привет\");\n\n}());\n"
      }]);
    });
  });
});
