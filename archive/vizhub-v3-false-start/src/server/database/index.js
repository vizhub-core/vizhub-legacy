import { VizInfo } from '../../entities/VizInfo';
import { User } from '../../entities/User';
import {
  createMongoDoc,
  getMongoDoc,
  getMongoDocs,
  getMongoDocsByIds,
  deleteTestingDocs,
} from './mongoMethods';
export { closeConnection } from './mongoMethods';

// Collection names.
const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';
const USER = 'user';
//const DOCUMENT_INFO = 'documentInfo';
//const DOCUMENT_CONTENT = 'documentContent';
//const USER = 'user';
//const THUMBNAIL_IMAGES = 'thumbnailImages';
//const PREVIEW_IMAGES = 'previewImages';
//const EVENT_RECORDS = 'eventRecords';

const createVizInfoMongoDoc = createMongoDoc(DOCUMENT_INFO);

const getVizInfoMongoDoc = getMongoDoc(DOCUMENT_INFO);
const getVizInfoMongoDocs = getMongoDocs(DOCUMENT_INFO);
const getUserMongoDocsByIds = getMongoDocsByIds(USER);

export const deleteVizInfoTestingDocs = deleteTestingDocs(DOCUMENT_INFO);

// TODO add this when we need it.
//const getVizContentMongoDocById = getById(DOCUMENT_CONTENT);

export const createVizInfo = async (vizInfoData, isTestingDoc = false) =>
  await createVizInfoMongoDoc(vizInfoData, isTestingDoc);

export const getVizInfo = async (id) => VizInfo(await getVizInfoMongoDoc(id));

export const getVizInfos = async ({ sortField }) =>
  (await getVizInfoMongoDocs({ sortField, limit: 50 })).map(VizInfo);

export const getUsersByIds = async (userIds) =>
  (await getUserMongoDocsByIds(userIds)).map(User);

// Uncomment these when we need them.
//export const getVizContent = getById(DOCUMENT_CONTENT);
//
//export const getViz = async (vizId) => {
//  const infoPromise = getVizInfo(vizId);
//  const contentPromise = getVizContent(vizId);
//  return { info: await infoPromise, content: await contentPromise };
//};
