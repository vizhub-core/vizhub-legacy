import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { saveVisualization } from './saveVisualization';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  saveVisualization: saveVisualization(connection)
});
