//Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/rollup.config.js
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import { external, globals } from 'vizhub-build';

const plugins = [
  nodeResolve({ extensions: ['.ts', '.js'] }),
  babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js'] }),
  commonjs(),
  json(),
];

// Build the tests.
const test = {
  input: 'test/index.js',
  output: {
    file: 'build/test.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins,
  external: [...external, 'puppeteer', 'rollup'],
};

// Build the library.
const lib = {
  input: 'src/index.js',
  output: {
    file: 'build/vizhub-runtime.js',
    format: 'umd',
    name: 'VizHubRuntime',
    globals,
    sourcemap: true,
  },
  plugins,
  external,
};

export default [test, lib];
