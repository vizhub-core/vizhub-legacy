import { MongoClient } from 'mongodb';

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

export const getVizInfo = getById(DOCUMENT_INFO);
export const getVizContent = getById(DOCUMENT_CONTENT);

export const getViz = async (vizId) => {
  const infoPromise = getVizInfo(vizId);
  const contentPromise = getVizContent(vizId);
  return { info: await infoPromise, content: await contentPromise };
};
