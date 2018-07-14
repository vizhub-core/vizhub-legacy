import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const save = (doc, data) => new Promise((resolve, reject) => {
  doc.submitOp(jsonDiff(doc.data, data, diffMatchPatch), error => (
    error ? reject(error) : resolve({ status: 'success' })
  ));
});

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
