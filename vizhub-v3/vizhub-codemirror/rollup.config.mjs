import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { external, globals } from 'vizhub-build';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vizhubCodemirror.js',
      format: 'umd',
      name: 'VizHubCodeMirror',
      globals,
    },
    plugins: [nodeResolve(), commonjs()],
    external,
  },
  //  {
  //    input: 'src/index.js',
  //    output: {
  //      file: 'dist/vizhubCodemirror.min.js',
  //      format: 'umd',
  //      name: 'VizHubCodeMirror',
  //      globals,
  //    },
  //    plugins: [nodeResolve(), commonjs(), terser()],
  //    external,
  //  },
];
