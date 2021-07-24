import { rollup } from 'rollup';
import sucrase from '@rollup/plugin-sucrase';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup
const buildBundle = async ({ inputOptions, outputOptions }) => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

const sucraseOptions = {
  exclude: ['node_modules/**'],
  transforms: ['jsx'],
};

// Ignore warnings from sucrase plugin.
// https://github.com/rollup/rollup/issues/1518
const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  if (warning.code === 'SOURCEMAP_ERROR') return;
  warn(warning);
};

const buildServer = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/server.js',
      plugins: [sucrase(sucraseOptions), nodeResolve()],
      onwarn,
      external: [
        'express',
        '@teamwork/websocket-json-stream',
        'ws',
        'sharedb',
        'sharedb/lib/client',
        'mongodb',
        'sharedb-mongo',
        'sharedb-redis-pubsub',
        'redis',
        'react',
        'react-dom',
        'react-dom/server',
      ],
    },
    outputOptions: { file: 'build/server.cjs', format: 'cjs', sourcemap: true },
  });
};

const buildClient = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/client/index.js',
      plugins: [
        sucrase(sucraseOptions),
        nodePolyfills(),
        commonjs(),
        nodeResolve(),
      ],
      onwarn,
      external: ['react', 'react-dom', 'sharedb/lib/client'],
    },
    outputOptions: {
      file: 'public/build/index.js',
      format: 'iife',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'sharedb/lib/client': 'ShareDBClient',
      },
    },
  });
};

const buildTests = async () => {
  await buildBundle({
    inputOptions: {
      input: 'src/test.js',
      plugins: [sucrase(sucraseOptions), nodeResolve()],
      onwarn,
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
