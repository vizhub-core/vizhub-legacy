import assert from 'assert';
import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Gateway } from 'datavis-tech-gateway';
import { Database } from '../src';

const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
const database = Database(shareDB.connect());
const gateway = Gateway(database);

describe('Database', () => {
  it('should create a visualization', done => {
    gateway.createVisualization({ owner: 'bob' })
      .then(({id}) => {
        assert.equal(id.length, 32);
        done();
      });
  });
});
