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

export const getViz = async (vizId) =>
  await (await getMongoDatabase())
    .collection(DOCUMENT_INFO)
    .findOne({ id: vizId });
