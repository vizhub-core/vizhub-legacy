import { rollup } from 'rollup';
import virtual from 'rollup-plugin-virtual';

// A Rollup plugin that detects and reports all unresolved references.
const Detective = () => {
  const references = [];
  return {
    name: 'detective',
    resolveId: id => (references.push(id), `detected-${id}`),
    load: id => 'detective-stub',
    references
  };
};

const outputOptions = { format: 'iife', name: 'bundle' };

export const computeReferences = async visualization => {

  const indexJS = `
    import { selection } from "d3-selection";
    import { bar } from "./bar";
    export const foo = "test";
  `;

  const detective = Detective();

  await rollup({
    input: 'index.js',
    plugins: [
      virtual({ 'index.js': indexJS }),
      detective
    ]
  });

  // const bundle = await rollup(inputOptions);
  // const { code, map } = await bundle.generate(outputOptions);
  // console.log(code);
  // const localFileReferences = detective.references.filter(str => str.startsWith('./'));
  // console.log(localFileReferences);

  return detective.references;
}
