import * as assert from 'assert';
import { Commit } from '../src/index';

describe('Commits', () => {
  describe('Constructor', () => {
    it('should expose expected fields', () => {
      const data = { id: '1', viz: 'a' };
      const commit = new Commit(data);
      assert.deepEqual(data.id, commit.id);
      assert.deepEqual(data.viz, commit.viz);
    });
  });
});
