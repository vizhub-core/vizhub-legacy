import { rollup } from 'rollup';
import * as virtual from 'rollup-plugin-virtual';

// A Rollup plugin that detects and reports all unresolved references.
const detective = ({ detect }) => {
  return {
    name: 'detective',
    resolveId: (id: string) => {
      detect(id);
      return `detected-${id}`;
    },
    load: () => 'detective-stub'
  };
};

export async function computeReferences(): Promise<string[]> {

  const indexJS = `
    import { selection } from "d3-selection";
    import { bar } from "./bar";
    export const foo = "test";
  `;

  const references: string[] = [];

  await rollup({
    input: 'index.js',
    plugins: [
      virtual({
        'index.js':
        indexJS
      }),
      detective({
        detect: id => references.push(id)
      })
    ]
  });

  // const bundle = await rollup(inputOptions);
  // const { code, map } = await bundle.generate({ format: 'iife', name: 'bundle' });
  // console.log(code);
  // const localFileReferences = detective.references.filter(str => str.startsWith('./'));
  // console.log(localFileReferences);

  return references;
}
