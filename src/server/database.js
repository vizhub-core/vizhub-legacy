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
  if (!mongoDatabase) {
    mongoDatabase = (
      await new MongoClient(mongoURI, {
        useUnifiedTopology: true,
      }).connect()
    ).db(mongoDatabaseName);
  }
  return mongoDatabase;
};

const getById = (collection) => async (id) =>
  await (await getMongoDatabase()).collection(collection).findOne({ id });

const getVizInfoMongoDocById = getById(DOCUMENT_INFO);

// TODO add this when we need it.
//const getVizContentMongoDocById = getById(DOCUMENT_CONTENT);

export const getVizInfo = async (id) =>
  VizInfo(await getVizInfoMongoDocById(id));

// Uncomment these when we need them.
//export const getVizContent = getById(DOCUMENT_CONTENT);
//
//export const getViz = async (vizId) => {
//  const infoPromise = getVizInfo(vizId);
//  const contentPromise = getVizContent(vizId);
//  return { info: await infoPromise, content: await contentPromise };
//};
