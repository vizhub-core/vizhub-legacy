import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';

// Use sourcemaps in development.
let sourcemap = true;

// Builds a bundle.
// https://rollupjs.org/guide/en/#rolluprollup
export const buildBundle = async ({ inputOptions, outputOptions }) => {
  const bundle = await rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

export const sucraseOptions = {
  exclude: ['node_modules/**'],
  transforms: ['typescript'],
};

const inputOptions = {
  plugins: [nodeResolve(), sucrase(sucraseOptions)],
  external: ['assert', 'mocha'],
  // Ignore warnings from sucrase plugin.
  // https://github.com/rollup/rollup/issues/1518
  onwarn: (warning, warn) => {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'SOURCEMAP_ERROR') return;
    warn(warning);
  },
};

const outputOptions = {
  format: 'es',
  sourcemap,
};

const build = async () => {
  await buildBundle({
    inputOptions: { input: 'test/test.ts', ...inputOptions },
    outputOptions: { file: 'build/test.js', ...outputOptions },
  });
};

build();
