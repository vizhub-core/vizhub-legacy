import { rollup } from 'rollup/dist/rollup.browser';
import vizhubLibraries from 'vizhub-libraries';
import bubleJSXOnly from './bubleJSXOnly';
import hypothetical from './hypothetical';

const external = Object.keys(vizhubLibraries);

const transformFilesToObject = (files) =>
  files
    .filter((file) => file.name.endsWith('.js'))
    .reduce((accumulator, file) => {
      accumulator['./' + file.name] = file.text;
      return accumulator;
    }, {});

const outputOptions = {
  format: 'iife',
  name: 'bundle',
  sourcemap: 'inline',
  globals: vizhubLibraries,
};

export const bundle = async (files) => {
  const inputOptions = {
    input: './index.js',
    plugins: [
      hypothetical({
        files: transformFilesToObject(files),
      }),
      bubleJSXOnly({
        target: {
          chrome: 71,
        },
      }),
    ],
    external,
  };
  const rollupBundle = await rollup(inputOptions);
  const { output } = await rollupBundle.generate(outputOptions);

  // Monkey patch magic-string internals
  // to support characters outside of the Latin1 range, e.g. Cyrillic.
  //
  // Related reading:
  //  - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_strings
  //  - https://github.com/Rich-Harris/magic-string/blob/3466b0230dddc95eb378ed3e0d199e36fbd1f572/src/SourceMap.js#L3
  //
  if (output.length !== 1) {
    throw new Error(
      'Expected Rollup output length to be 1. This Error is a VizHub bug if it happens.'
    );
  }
  const { code, map } = output[0];

  const toString = map.toString.bind(map);
  map.toString = () => unescape(encodeURIComponent(toString()));

  // Inspired by https://github.com/rollup/rollup/issues/121
  const codeWithSourceMap = code + '\n//# sourceMappingURL=' + map.toUrl();

  return [
    {
      name: 'bundle.js',
      text: codeWithSourceMap,
    },
  ];
};
