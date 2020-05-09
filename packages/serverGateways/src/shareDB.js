import ShareDB from 'sharedb';
import ShareDBMingoMemory from 'sharedb-mingo-memory';
import ShareDBMongo from 'sharedb-mongo';
import { json0 } from './json0';

// Use our custom json0 that implements presence.
ShareDB.types.register(json0);
ShareDB.types.defaultType = json0;

// Singletons.
let shareDB;
let connection;

export const getShareDB = () => {
  if (!shareDB) {
    if (process.env.MONGO_URI) {
      shareDB = ShareDB({
        db: new ShareDBMongo(process.env.MONGO_URI)
      });
    } else {
      shareDB = ShareDB({
        db: new ShareDBMingoMemory()
      });
    }
  }
  return shareDB;
};

export const getConnection = () => {
  if (!connection) {
    connection = getShareDB().connect();
  }
  return connection;
};
