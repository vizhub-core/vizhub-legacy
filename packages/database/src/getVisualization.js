import {
  Visualization,
  VisualizationInfo,
  VisualizationContent
} from 'datavis-tech-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getVisualization = connection => ({ id }) => (
  Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection)
  ])
  .then(([info, content]) => new Visualization({
    visualizationInfo: new VisualizationInfo(info.data),
    visualizationContent: new VisualizationContent(content.data)
  }))
);
