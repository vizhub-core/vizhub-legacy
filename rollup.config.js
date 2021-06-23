import buble from '@rollup/plugin-buble';

const external = [
  'express',
  'react',
  'react-dom',
  'react-dom/server',
  'd3-require',
];
const globals = { react: 'React', 'react-dom': 'ReactDOM', 'd3-require': 'd3' };

// The node server.
const serverBuild = {
  input: 'src/server.js',
  output: {
    file: 'server/build/bundle.js',
    format: 'cjs',
    interop: 'default',
  },
  external,
  plugins: [buble()],
};

// The primary client bundle.
const clientBuild = {
  input: 'src/client.js',
  output: {
    dir: 'public/build',
    format: 'iife',
    interop: 'default',
    globals,
  },
  external,
  plugins: [buble()],
};

// The secondary, lazy loaded, client bundle.
const client2Build = {
  input: 'src/client2.js',
  output: {
    dir: 'public/build',
    format: 'amd',
    interop: 'default',
    // Globals are handled by d3-require on lazy load.
  },
  external,
  plugins: [buble()],
};

export default [serverBuild, clientBuild, client2Build];
