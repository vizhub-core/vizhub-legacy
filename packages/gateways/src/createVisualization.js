import uuidV4 from 'uuid/v4';
import {
  Visualization,
  VisualizationInfo,
  VisualizationContent
} from 'datavis-tech-entities';

import { i18n } from 'datavis-tech-i18n';

const generateId = () => uuidV4().replace(/-/g, '');

const slugFromTitle = title => title.toLowerCase().replace(/ /g, '-');

const computeSlug = data => data.slug
  ? data.slug
  : data.title
    ? slugFromTitle(data.title)
    : undefined;

const documentDefaults = {
  title: 'Untitled',
  description: 'No description'
};

const visualizationDefaults = Object.assign({}, documentDefaults, {
  files: {
    'index.html': `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Untitled</title>
  </head>
  <body style="background-color: red; margin 0px;">
    <h1>Hello</h1>
  </body>
</html>`
  }
});

export const createVisualization = data => {

  // Mutates data.
  Object.assign(data, visualizationDefaults, data, {
    id: generateId(),
    slug: computeSlug(data)
  });

  return new Visualization({
    visualizationInfo: new VisualizationInfo({
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,

      // references: computeReferences(data.files),
      references: [],
      referencedBy: [],
      forks: [],
      forkedFrom: undefined,
      thumbnail: undefined
    }),
    visualizationContent: new VisualizationContent({
      id: data.id,
      files: data.files
    })
  });
};

export const updateVisualization = () => {};
