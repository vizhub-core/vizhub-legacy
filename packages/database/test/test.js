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
      info: {
        id: '123',
        owner: '1234',
        title: 'Foo',
        slug: 'foo',
        description: 'Foo is cool',
        format: 'csv'
      },
      content: {
        id: '123',
        text: 'data'
      }
    });
    assert.equal(slug, 'foo');
  });

  it('should get a dataset', async () => {
    const dataset = await database.getDataset({ slug: 'foo' });
    assert.deepEqual(dataset, {
      "dataset": {
        "content": {
          "id": "123",
          "text": "data",
        },
        "id": "123",
        "info": {
          "description": "Foo is cool",
          "format": "csv",
          "id": "123",
          "owner": "1234",
          "slug": "foo",
          "title": "Foo"
        }
      }
    });
  });
  // TODO
  //after(process.exit);
});
