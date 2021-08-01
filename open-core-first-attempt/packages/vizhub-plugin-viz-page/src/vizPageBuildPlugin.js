import sucrase from '@rollup/plugin-sucrase';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { buildBundle, sucraseOptions, onwarn } from 'vizhub-core/build.js';

export const vizPageBuildPlugin = () => {
  // Builds the Web Worker that renders Markdown.
  const buildMarkdownRenderingWorker = async () => {
    await buildBundle({
      inputOptions: {
        input:
          '../vizhub-plugin-viz-page/src/Readme/markdownRenderingWorker.js',
        plugins: [sucrase(sucraseOptions), nodeResolve()],
        onwarn,
        external: ['react'],
      },
      outputOptions: {
        file: 'public/build/viz-page/markdownRenderingWorker.js',
        format: 'iife',
      },
    });
  };

  // Open space here for adding more Web Workers in future.
  // TODO Web Worker for building JavaScript and generating srcDoc
  // TODO Web Worker for running Prettier - send code, send back OT diff ops
  // return () => Promise.all([
  //   buildMarkdownRenderingWorker(),
  //   buildJavaScriptBuildWorker(),
  //   buildPrettierWorker(),
  // ]);

  return () => buildMarkdownRenderingWorker();
};
