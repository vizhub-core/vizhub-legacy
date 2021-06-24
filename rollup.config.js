import buble from '@rollup/plugin-buble';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import { globals } from './src/globals';

const external = [
  ...Object.keys(globals),
  'react-dom/server',
  'express',
  'd3-require',
  'mongodb',
  'marked',
];

const plugins = [
  // So we can parse package.json.
  json(),
  // Use Buble for the JSX transform.
  buble({
    // objectAssign configuration allows rest/spread syntax.
    objectAssign: 'Object.assign',
    transforms: {
      // Allows async/await syntax.
      asyncAwait: false,
      // Allows for of loops.
      forOf: false,
    },
  }),

  // nodeResolve is used mainly so we can resolve 'dir' to 'dir/index.js'
  nodeResolve(),
];

// The node server.
const serverBuild = {
  input: 'src/server/index.js',
  output: {
    file: 'server/build/bundle.js',
    format: 'cjs',
    interop: 'default',
  },
  external,
  plugins: [...plugins, commonjs()],
};

// The tests.
// A build is required since Mocha was not
// playing well with ES6 modules.
const testBuild = {
  input: 'src/test/index.js',
  output: {
    file: 'test/index.js',
    format: 'cjs',
    interop: 'default',
  },
  external,
  plugins: [...plugins, commonjs()],
};

// The primary client bundle.
// Runs in Node for SSR, also runs in the browser.
const clientBuild = {
  input: 'src/client/index.js',
  output: {
    file: 'public/build/client.js',
    format: 'iife',
    interop: 'default',
    globals,
  },
  external,
  plugins,
};

// The secondary, lazy loaded, client bundle.
// Runs in the browser only.
const client2Build = {
  input: 'src/client/client2.js',
  output: {
    dir: 'public/build',
    format: 'amd',
    interop: 'default',
    // Globals are handled by d3-require on lazy load.
  },
  external,
  plugins,
};

export default [serverBuild, testBuild, clientBuild, client2Build];
