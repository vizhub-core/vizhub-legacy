import { rollup } from 'rollup';
import sucrase from '@rollup/plugin-sucrase';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup
const buildBundle = async ({ inputOptions, outputOptions }) => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

const plugins = [
  nodeResolve(),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['jsx'],
  }),
];

// Ignore warnings from sucrase plugin.
// https://github.com/rollup/rollup/issues/1518
const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  if (warning.code === 'SOURCEMAP_ERROR') return;
  warn(warning);
};

const external = [
  'express',
  '@teamwork/websocket-json-stream',
  'ws',
  'sharedb',
  'mongodb',
  'sharedb-mongo',
  'react',
  'react-dom/server',
];

const buildServer = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/server.js',
      plugins,
      onwarn,
      external,
    },
    outputOptions: { file: 'build/server.cjs', format: 'cjs', sourcemap: true, },
  });
};

const buildClient = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/client/index.js',
      plugins,
      onwarn,
      external,
    },
    outputOptions: {
      file: 'public/build/index.js',
      format: 'iife',
      globals: { react: 'React' },
    },
  });
};

const buildTests = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/test.js',
      plugins,
      onwarn,
      external,
    },
    outputOptions: {
      file: 'build/test.cjs',
      format: 'cjs',
    },
  });
};

// These run in parallel as we don't use "await" here.
buildServer();
buildClient();
buildTests();
