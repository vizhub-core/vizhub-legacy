import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { saveVisualization } from './saveVisualization';
import { deleteVisualization } from './deleteVisualization';
import { createDataset } from './createDataset';
import { getDataset } from './getDataset';
import { createUser } from './createUser';
import { getUser } from './getUser';
import { getUserByUserName } from './getUserByUserName';
import { getVisualizationInfosByUserId } from './getVisualizationInfosByUserId';
import { getAllVisualizationInfos } from './getAllVisualizationInfos';
import { getDatasetInfosByUserId } from './getDatasetInfosByUserId';
import { updateImages } from './updateImages';
import { getThumbnail } from './getThumbnail';
import { setImagesUpdatedTimestamp } from './setImagesUpdatedTimestamp';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  saveVisualization: saveVisualization(connection),
  deleteVisualization: deleteVisualization(connection),
  createDataset: createDataset(connection),
  getDataset: getDataset(connection),
  createUser: createUser(connection),
  getUser: getUser(connection),
  getUserByUserName: getUserByUserName(connection),
  getVisualizationInfosByUserId: getVisualizationInfosByUserId(connection),
  getAllVisualizationInfos: getAllVisualizationInfos(connection),
  getDatasetInfosByUserId: getDatasetInfosByUserId(connection),
  updateImages: updateImages(connection),
  getThumbnail: getThumbnail(connection),
  setImagesUpdatedTimestamp: setImagesUpdatedTimestamp(connection)
});
