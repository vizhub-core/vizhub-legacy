import * as assert from 'assert';
import { Commit } from '../src/index';

describe('Commits', () => {
  describe('Constructor', () => {
    it('should expose expected fields', () => {
      const data = { viz: 'a' };
      const commit = new Commit(data);
      assert.deepEqual(data.viz, commit.viz);
    });
  });
});
