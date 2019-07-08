import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import ShareDBMongo from '@teamwork/sharedb-mongo';

// Singletons.
let shareDB;
let connection;

// These options serve only to disable deprecation warnings.
const options = {
  disableDocAction: true,
  disableSpaceDelimitedActions: true
};

export const getShareDB = () => {
  if (!shareDB) {
    if (process.env.MONGO_URI) { 
      shareDB = ShareDB(Object.assign(options, {
        db: new ShareDBMongo(process.env.MONGO_URI)
      }));
    } else {
      shareDB = ShareDB(Object.assign(options, {
        db: new ShareDBMingoMemory()
      }));
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
