// This file is here as a package entry point, to support
// tree shaking for independent builds. For example:
// import { ... } from 'vizhub-core/build';

import { rollup } from 'rollup';

// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup
export const buildBundle = async ({ inputOptions, outputOptions }) => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

export const sucraseOptions = {
  exclude: ['node_modules/**'],
  transforms: ['jsx'],
};

// Ignore warnings from sucrase plugin.
// https://github.com/rollup/rollup/issues/1518
export const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  if (warning.code === 'SOURCEMAP_ERROR') return;
  warn(warning);
};
