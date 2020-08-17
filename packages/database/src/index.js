import { createVisualization } from './createVisualization';
import { getVisualization } from './getVisualization';
import { getVisualizationInfo } from './getVisualizationInfo';
import { saveVisualization } from './saveVisualization';
import { deleteVisualization } from './deleteVisualization';
import { getDataset } from './getDataset';
import { createUser } from './createUser';
import { saveUser } from './saveUser';
import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { getUserByUserName } from './getUserByUserName';
import { getVisualizationInfosByUserId } from './getVisualizationInfosByUserId';
import { getAllVisualizationInfos } from './getAllVisualizationInfos';
import { getHomePageVisualizationInfos } from './getHomePageVisualizationInfos';
import { searchVisualizationInfos } from './searchVisualizationInfos';
import { getForks } from './getForks';
import { searchUsers } from './searchUsers';
import { getDatasetInfosByUserId } from './getDatasetInfosByUserId';
import { updateImages } from './updateImages';
import { getThumbnail } from './getThumbnail';
import { getPreview } from './getPreview';
import { setImagesUpdatedTimestamp } from './setImagesUpdatedTimestamp';
import { incrementForksCount, decrementForksCount } from './forksCount';

export {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  USER,
  THUMBNAIL_IMAGES,
  PREVIEW_IMAGES,
} from './collectionName';
export { fetchShareDBDoc } from './fetchShareDBDoc';

export const Database = (connection) => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  getVisualizationInfo: getVisualizationInfo(connection),
  saveVisualization: saveVisualization(connection),
  deleteVisualization: deleteVisualization(connection),
  createUser: createUser(connection),
  saveUser: saveUser(connection),
  getUser: getUser(connection),
  getUsers: getUsers(connection),
  getUserByUserName: getUserByUserName(connection),
  getVisualizationInfosByUserId: getVisualizationInfosByUserId(connection),
  getAllVisualizationInfos: getAllVisualizationInfos(connection),
  getHomePageVisualizationInfos: getHomePageVisualizationInfos(connection),
  searchVisualizationInfos: searchVisualizationInfos(connection),
  getForks: getForks(connection),
  searchUsers: searchUsers(connection),
  updateImages: updateImages(connection),
  getThumbnail: getThumbnail(connection),
  getPreview: getPreview(connection),
  setImagesUpdatedTimestamp: setImagesUpdatedTimestamp(connection),
  incrementForksCount: incrementForksCount(connection),
  decrementForksCount: decrementForksCount(connection),

  /**
   * @deprecated database api
   */
  getDataset: getDataset(connection),
  getDatasetInfosByUserId: getDatasetInfosByUserId(connection),
});
