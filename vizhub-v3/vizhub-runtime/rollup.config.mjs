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

// Builds the tests.
const test = {
  input: 'test/index.js',
  output: {
    file: 'build/test.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins,
  external,
};

//// Builds the client and copies content of public directory.
//const client = {
//  input: 'src/client.js',
//  output: {
//    dir: 'build/public',
//    format: 'iife',
//    globals,
//    sourcemap: true,
//  },
//  plugins: [
//    ...plugins,
//    copy({
//      targets: [{ src: 'public/*', dest: 'build/public' }],
//    }),
//  ],
//  external,
//};

export default [test /*, client*/];
