import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { saveVisualization } from './saveVisualization';
import { createDataset } from './createDataset';
import { getDataset } from './getDataset';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  saveVisualization: saveVisualization(connection),
  createDataset: createDataset(connection),
  getDataset: getDataset(connection),
});
