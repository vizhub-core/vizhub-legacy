import { MongoClient } from 'mongodb';
import { mongoURI, mongoDatabaseName } from './constants';

// Log this for server admins to see.
// Support local development without MongoDB.
const mongoURIDefined = mongoURI !== undefined;

if (!mongoURIDefined) {
  console.log('VIZHUB_MONGO_URI environment variable is not set.');
  console.log(
    'Disabling event record analytics (totally fine for local development).'
  );
  console.log(
    'If this is a production instance, be sure VIZHUB_MONGO_URI is defined.\n'
  );
}

export const getMongoDatabase = async () =>
  mongoURIDefined
    ? (await MongoClient.connect(mongoURI)).db(mongoDatabaseName)
    : null;
