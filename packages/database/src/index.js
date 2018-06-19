import { Visualization, DocumentInfo } from 'datavis-tech-entities';

const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';
// const DOCUMENT_INFO_HISTORY = 'documentInfoHistory';
// const DOCUMENT_CONTENT_HISTORY = 'documentContentHistory';

const collectionName = entity => (
  entity instanceof DocumentInfo
    ? DOCUMENT_INFO
    : DOCUMENT_CONTENT
);

export const Database = connection => ({
  createVisualization: visualization => {

    const id = visualization.id;
    
    return new Promise((resolve, reject) => {
      connection
        .get(collectionName(visualization.info), id)
        .create(visualization.info);

      connection
        .get(collectionName(visualization.content), id)
        .create(visualization.content);

      resolve({ id });
    });
  }
});
