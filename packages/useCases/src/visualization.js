import { defaults as documentDefaults } from './document';
import { Visualization } from 'datavis-tech-entities';

const defaults = Object.assign({}, documentDefaults, {
  files: {
    'index.html': '<h1>I AM VIZ</h1>'
  }
});

export const createVisualization = data => {
  if (!data.owner) {
    return {
      error: 'No owner specified, cannot create visualization.'
    };
  }
  return Visualization(Object.assign({}, defaults, data));
};

export const updateVisualization = () => {};
