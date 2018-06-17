import { defaults as documentDefaults } from './document';
import { Visualization } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';

const defaults = Object.assign({}, documentDefaults, {
  files: {
    'index.html': '<h1>I AM VIZ</h1>'
  }
});

export const createVisualization = data => {
  if (!data.owner) {
    return {
      error: i18n('errorNoOwner')
    };
  }
  return Visualization(Object.assign({}, defaults, data));
};

export const updateVisualization = () => {};
