//Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/rollup.config.js
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { external, globals } from 'vizhub-build';

const plugins = [
  nodeResolve({ extensions: ['.ts', '.js'] }),
  babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js'] }),
  commonjs(),
  json(),
];

const server = {
  input: 'src/server.js',
  output: {
    dir: 'build',
    format: 'cjs',
    sourcemap: true,
  },
  plugins,
  external,
};

const client = {
  input: 'src/client.js',
  output: {
    dir: 'build/public',
    format: 'iife',
    globals,
    sourcemap: true,
  },
  plugins,
  external,
};

export default [server, client];
