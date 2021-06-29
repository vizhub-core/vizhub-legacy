import { MongoClient } from 'mongodb';
//import mingo from 'mingo';
import { VizInfo } from '../entities/VizInfo';
import { User } from '../entities/User';

// TODO consider using ShareDB for many benefits:
//  * always up to date
//  * it caches recently accessed docs in memory
//    * good for serving viz files statically at latest version
const mongoURI = process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017';
const mongoDatabaseName = 'vizhub';

// Collection names.
const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';
const USER = 'user';
//export const DOCUMENT_INFO = 'documentInfo';
//export const DOCUMENT_CONTENT = 'documentContent';
//export const USER = 'user';
//export const THUMBNAIL_IMAGES = 'thumbnailImages';
//export const PREVIEW_IMAGES = 'previewImages';
//export const EVENT_RECORDS = 'eventRecords';

// TODO Support using Mingo, an in-memory database, for fast tests.
//let mingoDatabase = null;
//export const useMingo = () => {
//  mingoDatabase = mingo;
//};

// Get and lazy-initialize the database.
let mongoClient;
let mongoDatabase;
const getMongoDatabase = async () => {
  // TODO If we want to use Mingo, return the Mingo database.
  //if (mingoDatabase) {
  //  console.log('using Mingo...');
  //  return mingoDatabase;
  //}

  // Otherwise actually instantiate the real MongoDB connection.
  try {
    if (!mongoDatabase) {
      const timeout = setTimeout(() => {
        console.log('Having trouble connecting to the database.');
        console.log('Ensure that the database is running.');
        console.log(`VIZHUB_MONGO_URI environment variable is "${mongoURI}".`);
        console.log('See README for setup details.');
        console.log('In dev on Linux, start MongoDB with:');
        console.log('sudo service mongod start');
      }, 5000);
      mongoClient = new MongoClient(mongoURI, {
        useUnifiedTopology: true,
      });
      mongoDatabase = (await mongoClient.connect()).db(mongoDatabaseName);
      clearTimeout(timeout);
    }
    return mongoDatabase;
  } catch (error) {
    console.log(error);
  }
};

export const closeConnection = () => {
  mongoClient.close();
};

const getCollection = async (collectionName) =>
  (await getMongoDatabase()).collection(collectionName);

const getMongoDoc = (collectionName) => async (id) =>
  await (await getCollection(collectionName)).findOne({ id });

const getVizInfoMongoDoc = getMongoDoc(DOCUMENT_INFO);

// Fetches a page of results.
const getMongoDocs =
  (collectionName) =>
  async ({ sortField, limit }) =>
    await (
      await getCollection(collectionName)
    )
      .find({ privacy: { $ne: 'private' } })
      .sort({ [sortField]: -1 })

      // TODO implement infinite scroll or other pagination pattern
      .limit(limit)
      .toArray();

// Fetches documents with the given ids.
const getMongoDocsByIds = (collectionName) => async (ids) =>
  await (
    await getCollection(collectionName)
  )
    .find({
      id: { $in: ids },
    })
    .toArray();

const getVizInfoMongoDocs = getMongoDocs(DOCUMENT_INFO);

const getUserMongoDocsByIds = getMongoDocsByIds(USER);

// TODO add this when we need it.
//const getVizContentMongoDocById = getById(DOCUMENT_CONTENT);

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
