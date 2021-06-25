import { MongoClient } from 'mongodb';
import { VizInfo } from '../entities/VizInfo';

// TODO consider using ShareDB for many benefits:
//  * always up to date
//  * it caches recently accessed docs in memory
//    * good for serving viz files statically at latest version
const mongoURI = process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017';
const mongoDatabaseName = 'vizhub';

// Collection names.
const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';

let mongoDatabase;
const getMongoDatabase = async () => {
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
      mongoDatabase = (
        await new MongoClient(mongoURI, {
          useUnifiedTopology: true,
        }).connect()
      ).db(mongoDatabaseName);
      clearTimeout(timeout);
    }
    return mongoDatabase;
  } catch (error) {
    console.log(error);
  }
};

const getCollection = async (collectionName) => {
  const db = await getMongoDatabase();
  return db.collection(collectionName);
};

const getMongoDoc = (collectionName) => async (id) =>
  await (await getCollection(collectionName)).findOne({ id });

const getVizInfoMongoDoc = getMongoDoc(DOCUMENT_INFO);

const getMongoDocs =
  (collectionName) =>
  async ({ sortField }) => {
    const collection = await getCollection(collectionName);
    return await (
      await getCollection(collectionName)
    )
      .find({ privacy: { $ne: 'private' } })
      .sort({ [sortField]: -1 })

      // TODO implement infinite scroll or other pagination pattern
      .limit(100);
  };

const getVizInfoMongoDocs = getMongoDocs(DOCUMENT_INFO);

// TODO add this when we need it.
//const getVizContentMongoDocById = getById(DOCUMENT_CONTENT);

export const getVizInfo = async (id) => VizInfo(await getVizInfoMongoDoc(id));

export const getVizInfos = async ({ sortField }) =>
  (await (await getVizInfoMongoDocs({ sortField })).toArray()).map(VizInfo);

// Uncomment these when we need them.
//export const getVizContent = getById(DOCUMENT_CONTENT);
//
//export const getViz = async (vizId) => {
//  const infoPromise = getVizInfo(vizId);
//  const contentPromise = getVizContent(vizId);
//  return { info: await infoPromise, content: await contentPromise };
//};
