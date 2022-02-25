import { babel } from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  external: ['d3', 'react', 'react-dom', 'three'],
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      d3: 'd3',
      react: 'React',
      'react-dom': 'ReactDOM',
      three: 'THREE',
    },
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
};
