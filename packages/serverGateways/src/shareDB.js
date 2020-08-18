import redis from 'redis';
import redisPubSub from 'sharedb-redis-pubsub';

import ShareDB from 'sharedb';
import ShareDBMingoMemory from 'sharedb-mingo-memory';
import ShareDBMongo from 'sharedb-mongo';
import { type as json0 } from 'json0-with-presence';

// Use our custom json0 that implements presence.
ShareDB.types.register(json0);
ShareDB.types.defaultType = json0;

// Singletons.
let shareDB;
let connection;

// Environment variables.
const mongoURI = process.env.VIZHUB_MONGO_URI;
const redisHost = process.env.VIZHUB_REDIS_HOST;
export const getShareDB = () => {
  if (!shareDB) {
    const options = {
      presence: true,
      db: mongoURI ? new ShareDBMongo(mongoURI) : new ShareDBMingoMemory(),
    };
    if (process.env.VIZHUB_REDIS_HOST) {
      options.pubsub = redisPubSub({
        client: redis.createClient({ host: redisHost }),
      });
    }
    shareDB = ShareDB(options);
  }
  return shareDB;
};

export const getConnection = () => {
  if (!connection) {
    connection = getShareDB().connect();
  }
  return connection;
};
