import magicSandbox from 'magic-sandbox';

const template = files => {
  const indexHtml = files.find(file => file.name === 'index.html');
  return indexHtml ? indexHtml.text : '';
};

const transform = files => (
  files
    .filter(file => file.name !== 'index.html')
    .reduce((accumulator, file) => {
      accumulator[file.name] = {
        content: file.text
      };
      return accumulator;
    }, {})
);

export const computeSrcDoc = files => (
  magicSandbox(template(files), transform(files))
);
