//import buble from '@rollup/plugin-buble';
//import { nodeResolve } from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
//import json from '@rollup/plugin-json';
//import { terser } from 'rollup-plugin-terser';
//
//const external = ['express'];
//
//const plugins = [
//  // So we can parse package.json.
//  json(),
//  // Use Buble for the JSX transform.
//  // All other transformations are disabled.
//  buble({
//    objectAssign: 'Object.assign',
//    transforms: {
//      getterSetter: false,
//      arrow: false,
//      classes: false,
//      computedProperty: false,
//      conciseMethodProperty: false,
//      defaultParameter: false,
//      destructuring: false,
//      forOf: false,
//      generator: false,
//      letConst: false,
//      moduleExport: false,
//      moduleImport: false,
//      numericLiteral: false,
//      parameterDestructuring: false,
//      spreadRest: false,
//      stickyRegExp: false,
//      templateString: false,
//      unicodeRegExp: false,
//      exponentiation: false,
//      reservedProperties: false,
//      trailingFunctionCommas: false,
//      asyncAwait: false,
//      objectRestSpread: false,
//    },
//  }),
//
//  // nodeResolve is used mainly so we can resolve 'dir' to 'dir/index.js'
//  nodeResolve(),
//];
//
//// Use sourcemaps in development.
//let sourcemap = true;
//
//// Minify client builds and disable sourcemaps in production.
//if (process.env.NODE_ENV === 'production') {
//  console.log('Generating production build...');
//  plugins.push(terser());
//  sourcemap = false;
//}
//
//// The node server.
//const serverBuild = {
//  input: 'src/server/index.js',
//  output: {
//    file: 'build/server.js',
//    format: 'cjs',
//    interop: 'default',
//    sourcemap,
//  },
//  external,
//  plugins: [...plugins, commonjs()],
//};
//
//// The tests.
//// A build is required since Mocha was not
//// playing well with ES6 modules.
//const testBuild = {
//  input: 'src/test.js',
//  output: {
//    file: 'build/test.js',
//    format: 'cjs',
//    interop: 'default',
//    sourcemap,
//  },
//  external,
//  plugins,
//};
//
//// The primary client bundle.
//// Runs in the browser only, not for SSR.
//const clientBuild = {
//  input: 'src/client/index.js',
//  output: {
//    file: 'public/build/client.js',
//    format: 'iife',
//    interop: 'default',
//    globals,
//    sourcemap,
//  },
//  external,
//  plugins,
//};
//
//// The secondary, lazy loaded, client bundle.
//// Runs in the browser only.
//const client2Build = {
//  input: 'src/client/client2.js',
//  output: {
//    dir: 'public/build',
//    format: 'amd',
//    interop: 'default',
//    sourcemap,
//    // Globals are handled by d3-require on lazy load.
//  },
//  external,
//  plugins,
//};
//
//// The service worker.
//// Runs in the browser only.
//const serviceWorkerBuild = {
//  input: 'src/client/serviceWorker.js',
//  output: {
//    file: 'public/serviceWorkerBuild.js',
//    format: 'iife',
//    interop: 'default',
//    sourcemap,
//    // Globals are handled by d3-require on lazy load.
//  },
//  external,
//  plugins,
//};
//
//export default [
//  serverBuild,
//  testBuild,
//  clientBuild,
//  client2Build,
//  serviceWorkerBuild,
//];
