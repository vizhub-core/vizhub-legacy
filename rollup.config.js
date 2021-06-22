import buble from '@rollup/plugin-buble';
//import { nodeResolve } from '@rollup/plugin-node-resolve';

const serverBuild = {
  input: 'src/server.js',
  output: {
    file: 'server/build/bundle.js',
    format: 'cjs',
    interop: 'default',
  },
  external: ['express', 'react', 'react-dom/server'],
  plugins: [buble()],
};

const clientBuild = {
  input: 'src/client.js',
  output: {
    dir: 'public/build',
    format: 'iife',
    interop: 'default',
    globals: { react: 'React', 'react-dom': 'ReactDOM' },
  },
  external: ['react', 'react-dom'],
  plugins: [buble()],
};

export default [serverBuild, clientBuild];
