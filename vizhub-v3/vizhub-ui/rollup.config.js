//Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/rollup.config.js

import { babel } from '@rollup/plugin-babel';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-bootstrap': 'ReactBootstrap',
  'vizhub-ui': 'VizHubUI',
};

const external = ['react', 'react-dom', 'react-bootstrap', 'vizhub-ui'];

// Build the library.
// Leveraged in both minimal demo app and vizhub-app.
const lib = {
  input: 'src/index.js',
  output: {
    file: 'dist/vizhub-ui.js',
    format: 'umd',
    name: 'VizHubUI',
    globals,
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
  external,
};

// Build the minimal demo app.
const app = {
  input: 'src/DemoApp/index.js',
  output: {
    file: 'dist/demo-app.js',
    format: 'iife',
    globals,
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
  external,
};

export default [lib, app];
