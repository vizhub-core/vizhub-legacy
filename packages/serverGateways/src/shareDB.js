import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import ShareDBMongo from '@teamwork/sharedb-mongo';
import { type as json0 } from '@datavis-tech/ot-json0';

// Spoof json0 name and URI to match existing documents from VizHub 1.0.
Object.assign(json0, {
  name: 'json0',
  uri: 'http://sharejs.org/types/JSONv0'
});

// Use our custom json0 fork that implements presence.
ShareDB.types.register(json0);
ShareDB.types.defaultType = json0;

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
