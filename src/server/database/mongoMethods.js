import { MongoClient } from 'mongodb';

const mongoURI = process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017';
const mongoDatabaseName = 'vizhub';

let mongoClient;
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

export const createMongoDoc = (collectionName) => async (data, isTestingDoc) =>
  (await getCollection(collectionName)).insertOne({ ...data, isTestingDoc });

export const deleteTestingDocs = (collectionName) => async () =>
  await (
    await getCollection(collectionName)
  ).deleteMany({ isTestingDoc: true });

export const getMongoDoc = (collectionName) => async (id) =>
  await (await getCollection(collectionName)).findOne({ id });

// Fetches a page of results.
export const getMongoDocs =
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
export const getMongoDocsByIds = (collectionName) => async (ids) =>
  await (await getCollection(collectionName))
    .find({ id: { $in: ids } })
    .toArray();
