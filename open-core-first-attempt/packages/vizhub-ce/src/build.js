import sucrase from '@rollup/plugin-sucrase';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import sass from 'sass';
import { writeFileSync } from 'fs';
import { buildBundle, sucraseOptions, onwarn } from 'vizhub-core/build.js';
import { vizPageBuildPlugin } from 'vizhub-plugin-viz-page/build.js';

const buildPlugins = [vizPageBuildPlugin()];

// TODO refactor more stuff - move it from here to vizhub-core
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
      input: 'src/client.js',
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
      file: 'public/build/client.js',
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
    outputOptions: { file: 'build/test.cjs', format: 'cjs' },
  });
};

const buildStyles = () => {
  // TODO minify for production build.
  writeFileSync(
    './public/build/styles.css',
    sass.renderSync({ file: 'src/styles.scss' }).css.toString()
  );
};

const build = async () => {
  const startTime = Date.now();
  await Promise.all([
    buildServer(),
    buildClient(),
    buildTests(),
    buildStyles(),
    ...buildPlugins.map((plugin) => plugin()),
  ]);
  const endTime = Date.now();
  const buildTime = endTime - startTime;
  console.log(`Built everything in ${buildTime} ms`);
};

build();
