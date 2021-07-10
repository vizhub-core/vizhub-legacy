import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup

const inputOptions = {
  input: 'src/server.js',
  plugins: [nodeResolve()],
  external: [
    'express',
    '@teamwork/websocket-json-stream',
    'ws',
    'sharedb',
    'mongodb',
    'sharedb-mongo',
  ],
};

const outputOptions = { file: 'build/server.js' };

const build = async () => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

build();
