import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { saveVisualization } from './saveVisualization';
import { createDataset } from './createDataset';
import { getDataset } from './getDataset';
import { createUser } from './createUser';
import { getUser } from './getUser';
import { getUserByUserName } from './getUserByUserName';
import { getVisualizationInfosByUserId } from './getVisualizationInfosByUserId';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  saveVisualization: saveVisualization(connection),
  createDataset: createDataset(connection),
  getDataset: getDataset(connection),
  createUser: createUser(connection),
  getUser: getUser(connection),
  getUserByUserName: getUserByUserName(connection),
  getVisualizationInfosByUserId: getVisualizationInfosByUserId(connection)
});
