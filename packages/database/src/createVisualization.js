import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { saveVisualization } from './saveVisualization';

export const createVisualization = connection => visualization =>
  saveVisualization(connection)({ visualization })
    .then(() => ({ id: visualization.id }));
