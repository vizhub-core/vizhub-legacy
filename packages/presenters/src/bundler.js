import { rollup } from 'rollup/dist/rollup.browser';
import * as rollupPluginVirtual from 'rollup-plugin-virtual';

const transformFilesToObject = files => (
  files.reduce((accumulator, file) => {
    accumulator[file.name] = file.text;
    accumulator[file.name.replace(/\.js/, '')] = file.text;
    return accumulator;
  }, {})
);

// Handle inconsistencies between node.js vs. browser builds.
const virtual = rollupPluginVirtual.default || rollupPluginVirtual;

export const Bundler = () => {
  const bundle = async (files) => {

    const rollupBundle = await rollup({
      input: 'index.js',
      plugins: [ virtual(transformFilesToObject(files)) ]
    });

    const { code, map } = await rollupBundle.generate({
      format: 'iife',
      name: 'bundle'
    });

    return [{ name: 'bundle.js', text: code }];
  };
  return { bundle };
};
