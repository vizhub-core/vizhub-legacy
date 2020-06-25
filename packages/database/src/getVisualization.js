import {
  Visualization,
  VisualizationInfo,
  VisualizationContent,
} from 'vizhub-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getVisualization = (connection) => ({ id }) => {
  console.log('id');
  console.log(id);
  Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection),
  ]).then(
    ([info, content]) => {
      console.log('info');
      console.log(info);
      console.log('content');
      console.log(content);
      return new Visualization({
        visualizationInfo: new VisualizationInfo(info.data),
        visualizationContent: new VisualizationContent(content.data),
      });
    }
  );
}
