import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vizhubCodemirror.js',
      format: 'umd',
      name: 'VizHubCodeMirror',
    },
    plugins: [nodeResolve()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vizhubCodemirror.min.js',
      format: 'umd',
      name: 'VizHubCodeMirror',
    },
    plugins: [nodeResolve(), terser()],
  },
];
