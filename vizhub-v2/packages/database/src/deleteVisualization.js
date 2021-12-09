import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const deleteDoc = (doc) =>
  new Promise((resolve, reject) => {
    doc.del((error) => {
      error ? reject(error) : resolve({ status: 'success' });
    });
  });

export const deleteVisualization = (connection) => ({ id }) => {
  return Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection),
  ])
    .then(([info, content]) =>
      Promise.all([deleteDoc(info), deleteDoc(content)])
    )
    .then(() => ({ status: 'success' }));
};
