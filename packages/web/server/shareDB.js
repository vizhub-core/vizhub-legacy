import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';

// Singletons.
let shareDB;
let connection;

export const getShareDB = () => {
  if (!shareDB) {
    shareDB = ShareDB({ db: new ShareDBMingoMemory() });
  }
  return shareDB;
};

export const getConnection = () => {
  if (!connection) {
    connection = getShareDB().connect(); 
  }
  return connection;
};
