import { rollup } from 'rollup';
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
  transforms: ['jsx'],
};

const inputOptions = {
  plugins: [sucrase(sucraseOptions)],
  external: ['react', 'react-dom', 'react-bootstrap', 'vizhub-ui'],
  // Ignore warnings from sucrase plugin.
  // https://github.com/rollup/rollup/issues/1518
  onwarn: (warning, warn) => {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'SOURCEMAP_ERROR') return;
    warn(warning);
  },
};

const outputOptions = {
  sourcemap,
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-bootstrap': 'ReactBootstrap',
    'vizhub-ui': 'VizHubUI',
  },
};

const buildLib = async () => {
  await buildBundle({
    inputOptions: { input: 'src/index.js', ...inputOptions },
    outputOptions: {
      file: 'dist/vizhub-ui.js',
      format: 'umd',
      name: 'VizHubUI',
      ...outputOptions,
    },
  });
};

const buildDemoApp = async () => {
  await buildBundle({
    inputOptions: { input: 'src/DemoApp.js', ...inputOptions },
    outputOptions: {
      file: 'dist/demo-app.js',
      format: 'iife',
      ...outputOptions,
    },
  });
};

buildLib();
buildDemoApp();
