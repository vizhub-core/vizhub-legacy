import { rollup } from 'rollup';
// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup

const inputOptions = { input: 'src/server.js', external: 'vizhub-core' };
const outputOptions = {
  file: 'build/server.js',
};

const build = async () => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

build();
