import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { saveVisualization } from './saveVisualization';
import { createDataset } from './createDataset';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  saveVisualization: saveVisualization(connection),
  createDataset: createDataset(connection),
});
