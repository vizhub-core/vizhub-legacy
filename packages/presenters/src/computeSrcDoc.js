import magicSandbox from './magicSandbox';
import { getComputedIndexHtml } from './getComputedIndexHtml';

const transform = (files) =>
  files
    .filter((file) => file.name !== 'index.html')
    .reduce((accumulator, file) => {
      accumulator[file.name] = {
        content: file.text,
      };
      return accumulator;
    }, {});

export const computeSrcDoc = (files) => {
  return magicSandbox(getComputedIndexHtml(files), transform(files));
};
