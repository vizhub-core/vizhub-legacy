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

const buildServer = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/server.js',
      plugins: [
        nodeResolve(),
        sucrase({
          exclude: ['node_modules/**'],
          transforms: ['jsx'],
        }),
      ],
      // Ignore warnings from sucrase plugin.
      // https://github.com/rollup/rollup/issues/1518
      onwarn: (warning, warn) => {
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        if (warning.code === 'SOURCEMAP_ERROR') return;
        warn(warning);
      },
      external: [
        'express',
        '@teamwork/websocket-json-stream',
        'ws',
        'sharedb',
        'mongodb',
        'sharedb-mongo',
        'react',
        'react-dom/server',
      ],
    },
    outputOptions: { file: 'build/server.cjs', format: 'cjs' },
  });
};

const buildClient = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/client/index.js',
      plugins: [],
      external: ['react'],
    },
    outputOptions: {
      dir: 'public/build',
      format: 'iife',
    },
  });
};

// These run in parallel as we don't use "await" here.
buildServer();
buildClient();
