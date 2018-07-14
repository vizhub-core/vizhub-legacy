import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';

export const createVisualization = connection => visualization => {
  const id = visualization.id;
  return new Promise(resolve => {

    // TODO handle errors here.
    connection.get(DOCUMENT_INFO, id).create(visualization.info);
    connection.get(DOCUMENT_CONTENT, id).create(visualization.content);

    // TODO only resolve after document created,
    // to avoid race conditions.
    resolve({ id });
  });
}
