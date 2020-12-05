import { MongoClient } from 'mongodb';
import { mongoURI, mongoDatabaseName } from './constants';

console.log('Using Mongo URI: ' + mongoURI);

export const getMongoDatabase = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(mongoURI, (err, client) => {
      if (err) return reject(err);
      resolve(client.db(mongoDatabaseName));
    });
  });
