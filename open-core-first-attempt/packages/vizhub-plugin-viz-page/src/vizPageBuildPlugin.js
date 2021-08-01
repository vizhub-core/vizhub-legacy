import sucrase from '@rollup/plugin-sucrase';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { buildBundle, sucraseOptions, onwarn } from 'vizhub-core/build.js';

export const vizPageBuildPlugin = () => {
  // Builds the Web Worker that renders Markdown.
  const buildWorker = async () => {
    console.log('building worker');
    await buildBundle({
      inputOptions: {
        input: '../vizhub-plugin-viz-page/src/worker.js',
        plugins: [sucrase(sucraseOptions), nodeResolve()],
        onwarn,
        external: ['react'],
      },
      outputOptions: { file: 'public/build/worker.js', format: 'iife' },
    });
  };

  return async () => await buildWorker();
};
