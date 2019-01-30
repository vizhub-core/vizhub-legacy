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

  console.log('A')
  const rollupBundle = await rollup(inputOptions);
  console.log('B')
  const { code, map } = await rollupBundle.generate(outputOptions);
  console.log('B.5')

  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_strings
  function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // From https://github.com/Rich-Harris/magic-string/blob/3466b0230dddc95eb378ed3e0d199e36fbd1f572/src/SourceMap.js#L3
  let btoa = () => {
    throw new Error('This is the error');
  };
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    btoa = utoa;
  } else if (typeof Buffer === 'function') {
    btoa = str => new Buffer(str).toString('base64');
  }

  // We use this instead of the provide map.toUrl,
  // so that we can support characters outside of the Latin1 range, e.g. Cyrillic.
  const toUrl = map => 
    'data:application/json;charset=utf-8;base64,' + btoa(map.toString());

  // Inspired by https://github.com/rollup/rollup/issues/121
  const codeWithSourceMap = code + '\n//# sourceMappingURL=' + toUrl(map);

  console.log('C')

  return [{
    name: 'bundle.js',
    text: codeWithSourceMap
  }];
};
