import assert from 'assert';
import { timestamp, Commit, Edge } from 'vizhub-entities';
import { CreateCommit, CreateEdge } from '../src/index';

const commits = {};
const edges = {};
const revisionHistoryGateway = {
  createCommit: async ({ id, viz, timestamp }) => {
    const commit = new Commit({ id, viz, timestamp });
    commits[id] = commit;
    return commit;
  },
  createEdge: async ({ source, target, ops }) => {
    const edge = new Edge({ source, target, ops });
    const id = source + '|' + target;
    edges[id] = edge;
    return edge;
  },
};

describe('Revision History Use Cases', () => {
  const createCommit = new CreateCommit({ revisionHistoryGateway });
  const createEdge = new CreateEdge({ revisionHistoryGateway });

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
      // This is the case where a viz is forked - no ops, different viz IDs.
      const commit1 = await createCommit.execute({
        id: 'commit-1',
        viz: 'viz-a',
      });
      const commit2 = await createCommit.execute({
        id: 'commit-2',
        viz: 'viz-b',
      });
      const ops = [];
      const edge = await createEdge.execute({
        source: commit1.id,
        target: commit2.id,
        ops,
      });
      assert.equal(edge.source, commit1.id);
      assert.equal(edge.target, commit2.id);
      assert.equal(edge.ops, ops);
    });
  });
});
