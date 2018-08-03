import assert from 'assert';
import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Database } from '../src';

const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
const connection = shareDB.connect();
const database = Database(connection);

describe('Database', () => {
  it('should create a dataset', async () => {
    const { slug } = await database.createDataset({
      id: '123',
      info: { slug: 'foo' },
      content: { text: 'data' }
    });
    assert.equal(slug, 'foo');
  });
  // TODO
  //after(process.exit);
});
