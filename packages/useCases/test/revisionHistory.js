import assert from 'assert';
import { timestamp, Commit } from 'vizhub-entities';
import { CreateCommit } from '../src/index';

const commits = {};
const revisionHistoryGateway = {
  createCommit: async ({ id, viz, timestamp }) => {
    const commit = new Commit({ id, viz, timestamp });
    commits[id] = commit;
    return commit;
  },
};

describe('Revision History Use Cases', () => {
  const createCommit = new CreateCommit({ revisionHistoryGateway });
  describe('Create Commit', () => {
    it('should return an id if success.', async () => {
      const id = 'commit-1';
      const viz = 'viz-a';
      const timestamp = 1606341594.852;
      const commit = await createCommit.execute({ id, viz, timestamp });
      assert.equal(commit.id, id);
    });
  });
  describe('Create Edge', () => {
    it('should return an id if success.', async () => {
      const viz = 'viz-a';
      const commit1 = await createCommit.execute({ id: 'commit-1', viz });
      const commit2 = await createCommit.execute({ id: 'commit-2', viz });
    });
  });
});
