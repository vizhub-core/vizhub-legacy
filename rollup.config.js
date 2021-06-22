import buble from '@rollup/plugin-buble';
//import { nodeResolve } from '@rollup/plugin-node-resolve';

const serverBuild = {
  input: 'server/src/index.js',
  output: {
    file: 'server/build/bundle.js',
    format: 'cjs',
    interop: 'default',
  },
  external: ['express'],
};

const clientBuild = {
  input: 'client/src/index.js',
  output: {
    dir: 'client/build',
    format: 'iife',
    interop: 'default',
  },
  plugins: [buble()],
};

export default [serverBuild, clientBuild];
