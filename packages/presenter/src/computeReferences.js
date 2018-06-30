import { rollup } from 'rollup';
import virtual from 'rollup-plugin-virtual';

export const computeReferences = async visualization => {

  const indexJS = `
    import { selection } from "d3-selection";
    import { bar } from "./bar";
    export const foo = "test";
  `;

  const references = [];

  const inputOptions = {
    input: 'index.js',
    plugins: [
      virtual({
        'index.js': indexJS
      }),
      {
        name: 'detective',

        resolveId: (id, importer) => {
          references.push(id);
          return `detected-${id}`;
        },

        load: (id) => `console.log('this is ${id}')`
      }
    ]
  };

  const outputOptions = {
    format: 'iife',
    name: 'viz'
  };

  const bundle = await rollup(inputOptions);
  //const { code, map } = await bundle.generate(outputOptions);

  //console.log(code);
  //console.log(references);
  const localFileReferences = references.filter(str => str.startsWith('./'));
  //console.log(localFileReferences);

  return references;
}
