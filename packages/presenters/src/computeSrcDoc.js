import magicSandbox from './magicSandbox';
import { getText } from './accessors';

const template = files => getText(files, 'index.html');

const transform = files =>
  files
    .filter(file => file.name !== 'index.html')
    .reduce((accumulator, file) => {
      accumulator[file.name] = {
        content: file.text
      };
      return accumulator;
    }, {});

export const computeSrcDoc = files =>
  magicSandbox(template(files), transform(files));
