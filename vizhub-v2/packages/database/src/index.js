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
import { getUserByEmail } from './getUserByEmail';
import { getUserByEmailOrId } from './getUserByEmailOrId';
import { getUserByUserName } from './getUserByUserName';
import { getVisualizationInfosByUserId } from './getVisualizationInfosByUserId';
import { getAllVisualizationInfos } from './getAllVisualizationInfos';
import { getHomePageVisualizationInfos } from './getHomePageVisualizationInfos';
import { getVisualizationInfos } from './getVisualizationInfos';
import { searchVisualizationInfos } from './searchVisualizationInfos';
import { getForks } from './getForks';
import { searchUsers } from './searchUsers';
import { getDatasetInfosByUserId } from './getDatasetInfosByUserId';
import { updateImages } from './updateImages';
import { getThumbnail } from './getThumbnail';
import { getPreview } from './getPreview';
import { setImagesUpdatedTimestamp } from './setImagesUpdatedTimestamp';
import { incrementForksCount, decrementForksCount } from './forksCount';
import { getEventRecords, setEventRecords } from './eventRecords';
import { updateScores } from './updateScores';

export {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  USER,
  THUMBNAIL_IMAGES,
  PREVIEW_IMAGES,
} from './collectionName';
export { fetchShareDBDoc } from './fetchShareDBDoc';

// connection is the ShareDB connection.
// mongoDatabase is the MongoDB driver database.
export const Database = (connection, mongoDatabase) => ({
  createVisualization: createVisualization(connection),
  getVisualization: getVisualization(connection),
  getVisualizationInfo: getVisualizationInfo(connection),
  saveVisualization: saveVisualization(connection),
  deleteVisualization: deleteVisualization(connection),
  createUser: createUser(connection),
  saveUser: saveUser(connection),
  getUser: getUser(connection),
  getUsers: getUsers(connection),
  getUserByEmail: getUserByEmail(connection),
  getUserByEmailOrId: getUserByEmailOrId(connection),
  getUserByUserName: getUserByUserName(connection),
  getVisualizationInfosByUserId: getVisualizationInfosByUserId(connection),
  getAllVisualizationInfos: getAllVisualizationInfos(connection),
  getHomePageVisualizationInfos: getHomePageVisualizationInfos(connection),
  getVisualizationInfos: getVisualizationInfos(connection),
  searchVisualizationInfos: searchVisualizationInfos(connection),
  getForks: getForks(connection),
  searchUsers: searchUsers(connection),
  updateImages: updateImages(connection),
  getThumbnail: getThumbnail(connection),
  getPreview: getPreview(connection),
  setImagesUpdatedTimestamp: setImagesUpdatedTimestamp(connection),
  incrementForksCount: incrementForksCount(connection),
  decrementForksCount: decrementForksCount(connection),
  updateScores: updateScores(connection),

  /**
   * @deprecated database api
   */
  getDataset: getDataset(connection),
  getDatasetInfosByUserId: getDatasetInfosByUserId(connection),
  getEventRecords: getEventRecords(mongoDatabase),
  setEventRecords: setEventRecords(mongoDatabase),
});
