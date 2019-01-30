import { rollup } from 'rollup/dist/rollup.browser';
import * as buble from 'rollup-plugin-buble';
import * as hypothetical from './hypothetical';
import { d3Packages } from './d3Packages';

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
  }, {
    react: 'React'
  })
};

// Typescript BS
buble = buble.default ? buble.default : buble;

export const bundle = async (files) => {
  const inputOptions = {
    input: './index.js',
    plugins: [
      hypothetical({
        files: transformFilesToObject(files)
      }),
      buble({
        // Disable most ES6 transforms,
        // use Buble mainly for its JSX transform.
        target: {
          chrome: 71
        }
      })
    ],
    external: d3Packages.concat('react')
  };

  const rollupBundle = await rollup(inputOptions);
  const { code, map } = await rollupBundle.generate(outputOptions);

  // Monkey patch magic-string internals
  // to support characters outside of the Latin1 range, e.g. Cyrillic.
  //
  // Related reading:
  //  - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_strings
  //  - https://github.com/Rich-Harris/magic-string/blob/3466b0230dddc95eb378ed3e0d199e36fbd1f572/src/SourceMap.js#L3
  const toString = map.toString.bind(map);
  map.toString = () => unescape(encodeURIComponent(toString()));

  // Inspired by https://github.com/rollup/rollup/issues/121
  const codeWithSourceMap = code + '\n//# sourceMappingURL=' + map.toUrl();

  return [{
    name: 'bundle.js',
    text: codeWithSourceMap
  }];
};
