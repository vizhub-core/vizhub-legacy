import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const deleteDoc = doc => new Promise((resolve, reject) => {
  doc.del(error => {
    error ? reject(error) : resolve({ status: 'success' })
  });
});

export const deleteVisualization = connection => ({ visualization }) =>
  Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, visualization.id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, visualization.id, connection)
  ])
  .then(([info, content]) => Promise.all([
    deleteDoc(info),
    deleteDoc(content)
  ]));
