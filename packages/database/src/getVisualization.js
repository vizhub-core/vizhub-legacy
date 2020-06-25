import {
  Visualization,
  VisualizationInfo,
  VisualizationContent,
} from 'vizhub-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getVisualization = (connection) => async ({ id }) => {
  console.log('id');
  console.log(id);
  const [info, content] = await Promise.all([
    fetchShareDBDoc(DOCUMENT_INFO, id, connection),
    fetchShareDBDoc(DOCUMENT_CONTENT, id, connection),
  ]);
  console.log('info');
  console.log(info);
  //console.log('content.data');
  //console.log(content.data);
  console.log('returning new viz')
  return new Visualization({
    visualizationInfo: new VisualizationInfo(info.data),
    visualizationContent: new VisualizationContent(content.data),
  });
}
