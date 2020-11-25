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
  describe('Create Commit', () => {
    const createCommit = new CreateCommit({ revisionHistoryGateway });
    it('should return an id if success.', async () => {
      const id = 'foo';
      const viz = 'A';
      const timestamp = 1606341594.852;
      const requestModel = { id, viz, timestamp };
      const responseModel = await createCommit.execute(requestModel);
      const { commit } = responseModel;
      assert.equal(commit.id, id);
    });
  });
});
