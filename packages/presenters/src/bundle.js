import { rollup } from 'rollup/dist/rollup.browser';
import * as rollupPluginVirtual from 'rollup-plugin-virtual';
import { d3Packages } from './d3Packages';

const transformFilesToObject = files => (
  files.reduce((accumulator, file) => {

    // Handle imports like './foo.js'.
    accumulator[file.name] = file.text;

    // Handle imports like './foo'.
    accumulator[file.name.replace(/\.js/, '')] = file.text;
    return accumulator;
  }, {})
);

// Handle inconsistencies between node.js vs. browser builds.
const virtual = rollupPluginVirtual.default || rollupPluginVirtual;

const outputOptions = {
  format: 'iife',
  name: 'bundle',
  sourcemap: 'inline',
  globals: d3Packages.reduce((accumulator, packageName) => {
    accumulator[packageName] = 'd3';
    return accumulator;
  }, {})
};

export const bundle = async (files) => {
  const inputOptions = {
    input: 'index.js',
    plugins: [ virtual(transformFilesToObject(files)) ],
    external: d3Packages
  };

  const rollupBundle = await rollup(inputOptions);
  const { code, map } = await rollupBundle.generate(outputOptions);

  return [{
    name: 'bundle.js',
    text: code
  }];
};
