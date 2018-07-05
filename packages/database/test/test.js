import assert from 'assert';
import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Gateway } from 'datavis-tech-gateways';
import { Database } from '../src';

const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
const connection = shareDB.connect();
const database = Database(connection);
const gateway = Gateway(database);

describe('Database', () => {
  it('should create a visualization', done => {
    gateway.createVisualization({ owner: 'bob' })
      .then(({id}) => {
        assert.equal(id.length, 32);
        done();
      });
  });
  after(process.exit);
});
