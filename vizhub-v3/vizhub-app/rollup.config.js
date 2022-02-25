//Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/rollup.config.js

import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
//import { nodeResolve } from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const plugins = [babel({ babelHelpers: 'bundled' }), json()];
const external = [...Object.keys(pkg.dependencies), 'http', 'react-dom/server'];

const server = {
  input: 'src/server.js',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins,
  external,
};

const client = {
  input: 'src/client.js',
  output: {
    dir: 'build/public',
    format: 'iife',
    globals: { react: 'React', 'react-dom': 'ReactDOM' },
  },
  plugins,
  external,
};

export default [server, client];
