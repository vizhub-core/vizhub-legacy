import { defaults as documentDefaults } from './document';

const defaults = Object.assign({}, documentDefaults, {
  files: {
    'index.html': '<h1>I AM VIZ</h1>'
  }
});

export const createVisualization = data => {
  return Visualization(Object.assign({}, defaults, data));
};

export const updateVisualization = () => {};
