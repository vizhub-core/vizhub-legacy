import { rollup } from 'rollup/dist/rollup.browser';
import * as hypothetical from './hypothetical';
import { d3Packages } from './d3Packages';

console.log(hypothetical);

const transformFilesToObject = files =>
  files
    .filter(file => file.name.endsWith('.js'))
    .reduce((accumulator, file) => {
      accumulator['./' + file.name] = file.text;
      return accumulator;
    }, {});

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
    input: './index.js',
    plugins: [
      hypothetical({
        files: transformFilesToObject(files)
      })
    ],
    external: d3Packages
  };

  const rollupBundle = await rollup(inputOptions);
  const { code, map } = await rollupBundle.generate(outputOptions);

  // Inspired by https://github.com/rollup/rollup/issues/121
  const codeWithSourceMap = code + '\n//# sourceMappingURL=' + map.toUrl();

  return [{
    name: 'bundle.js',
    text: codeWithSourceMap
  }];
};
