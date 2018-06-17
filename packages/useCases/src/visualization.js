import uuidV4 from 'uuid/v4'

import { Visualization } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';

import { defaults as documentDefaults } from './document';

const generateId = () => uuidV4().replace(/-/g, '');

const slugFromTitle = title => title.toLowerCase().replace(/ /g, '-');

const defaults = Object.assign({}, documentDefaults, {
  files: {
    'index.html': '<h1>I AM VIZ</h1>'
  }
});

export const createVisualization = data => {
  if (!data.owner) {
    return {
      type: 'error',
      error: i18n('errorNoOwner')
    };
  }

  const slug = (data.slug
    ? data.slug
    : (
      data.title
        ? slugFromTitle(data.title)
        : defaults.slug
    )
  );

  return {
    type: 'createVisualization',
    data: Visualization(Object.assign({}, defaults, data, {
      id: generateId(),
      slug
    }))
  };
};

export const updateVisualization = () => {};
