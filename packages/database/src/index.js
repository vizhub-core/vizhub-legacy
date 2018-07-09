import {
  Visualization,
  VisualizationInfo,
  VisualizationContent,
  DocumentInfo
} from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';

const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';
// const DOCUMENT_INFO_HISTORY = 'documentInfoHistory';
// const DOCUMENT_CONTENT_HISTORY = 'documentContentHistory';

const collectionName = entity => (
  entity instanceof DocumentInfo
    ? DOCUMENT_INFO
    : DOCUMENT_CONTENT
);

const fetchShareDBDoc = (collection, id, connection) => (
  new Promise((resolve, reject) => {
    const shareDBDoc = connection.get(collection, id);
    shareDBDoc.fetch(error => error
      ? reject(error)
      : shareDBDoc.type
        ? resolve(shareDBDoc)
        : reject({ message: i18n('errorDocNotFound'), statusCode: 404 })
    );
  })
);

export const Database = connection => ({

  createVisualization: visualization => {
    const id = visualization.id;
    return new Promise(resolve => {
      connection
        .get(collectionName(visualization.info), id)
        .create(visualization.info);
      connection
        .get(collectionName(visualization.content), id)
        .create(visualization.content);
      // TODO test handling of errors here
      resolve({ id });
    });
  },

  getVisualization: ({ id }) => Promise
    .all([
      fetchShareDBDoc(DOCUMENT_INFO, id, connection),
      fetchShareDBDoc(DOCUMENT_CONTENT, id, connection)
    ])
    .then(([info, content]) => new Visualization({
      visualizationInfo: new VisualizationInfo(info.data),
      visualizationContent: new VisualizationContent(content.data)
    })),

  saveVisualization: ({ id, html }) => (
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection)
      .then(shareDBDoc => {

        const op = [{
          p: ['files', 'index.html'],
          oi: html,
          od: shareDBDoc.data.files['index.html']
        }];

        return new Promise((resolve, reject) => {
          shareDBDoc.submitOp(op, error => error
            ? reject({ message: error.message, statusCode: 503 })
            : resolve({ status: 'success' })
          );
        });
      })
  )
});
