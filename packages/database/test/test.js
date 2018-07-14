import assert from 'assert';
import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Database } from '../src';

const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
const connection = shareDB.connect();
const database = Database(connection);

describe('Database', () => {
  // TODO
  //after(process.exit);
});
