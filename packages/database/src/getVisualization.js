import {
  Visualization,
  VisualizationInfo,
  VisualizationContent,
} from 'vizhub-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { getForks } from './getForks';

export const getVisualization = (connection) => ({ id }) =>
  Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection),
    getForks(connection)({ forkedFrom: id, includePrivate: true })
  ]).then(
    ([info, content, forks]) =>
      new Visualization({
        visualizationInfo: new VisualizationInfo({...info.data, forksCount: forks.length}),
        visualizationContent: new VisualizationContent(content.data),
      })
  );
