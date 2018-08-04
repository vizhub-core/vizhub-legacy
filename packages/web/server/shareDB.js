import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import ShareDBMongo from '@teamwork/sharedb-mongo';

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
