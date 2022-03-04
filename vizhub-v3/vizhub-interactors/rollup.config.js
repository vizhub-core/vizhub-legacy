//Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/rollup.config.js

import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const plugins = [
  nodeResolve({ extensions: ['.ts', '.js'] }),
  babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js'] }),
  commonjs(),
];

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
  'assert',
  'mocha',
];

const test = {
  input: 'test/test.ts',
  output: {
    dir: 'build',
    format: 'cjs',
    sourcemap: true,
  },
  plugins,
  external,
};

export default test;
