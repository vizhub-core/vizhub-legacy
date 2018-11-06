import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { save } from './save';

export const saveVisualization = connection => ({ visualization }) => (
  Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, visualization.id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, visualization.id, connection)
  ])
  .then(([info, content]) => Promise.all([
    save(info, visualization.info),
    save(content, visualization.content)
  ]))
);
