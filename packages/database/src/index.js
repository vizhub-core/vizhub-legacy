import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { getVisualizationInfo } from './getVisualizationInfo';
import { saveVisualization } from './saveVisualization';
import { deleteVisualization } from './deleteVisualization';
import { createDataset } from './createDataset';
import { getDataset } from './getDataset';
import { createUser } from './createUser';
import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { getUserByUserName } from './getUserByUserName';
import { getVisualizationInfosByUserId } from './getVisualizationInfosByUserId';
import { getAllVisualizationInfos } from './getAllVisualizationInfos';
import { getHomePageVisualizationInfos } from './getHomePageVisualizationInfos';
import { getDatasetInfosByUserId } from './getDatasetInfosByUserId';
import { updateImages } from './updateImages';
import { getThumbnail } from './getThumbnail';
import { getPreview } from './getPreview';
import { setImagesUpdatedTimestamp } from './setImagesUpdatedTimestamp';

// The following things are imported by access control logic that lives in neoBackend.
// The exposure of this outside the database package doesn't quite feel right,
// but not sure what a better solution would be.
// TODO think about architectural choices around this.
export { DOCUMENT_CONTENT, DOCUMENT_INFO } from './collectionName';
export { fetchShareDBDoc } from './fetchShareDBDoc';

export const Database = connection => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  getVisualizationInfo: getVisualizationInfo(connection),
  saveVisualization: saveVisualization(connection),
  deleteVisualization: deleteVisualization(connection),
  createDataset: createDataset(connection),
  getDataset: getDataset(connection),
  createUser: createUser(connection),
  getUser: getUser(connection),
  getUsers: getUsers(connection),
  getUserByUserName: getUserByUserName(connection),
  getVisualizationInfosByUserId: getVisualizationInfosByUserId(connection),
  getAllVisualizationInfos: getAllVisualizationInfos(connection),
  getHomePageVisualizationInfos: getHomePageVisualizationInfos(connection),
  getDatasetInfosByUserId: getDatasetInfosByUserId(connection),
  updateImages: updateImages(connection),
  getThumbnail: getThumbnail(connection),
  getPreview: getPreview(connection),
  setImagesUpdatedTimestamp: setImagesUpdatedTimestamp(connection)
});
