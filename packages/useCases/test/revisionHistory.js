import assert from 'assert';
import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { timestamp, Commit, Edge, testData } from 'vizhub-entities';
import { CreateCommit, CreateEdge, GetVizAtCommit } from '../src/index';

// A utility function for generating ops by diffing objects.
const computeEdgeOps = (a, b) => jsondiff(a, b, diffMatchPatch);

const commits = {};
const edges = {};
const edgesByTarget = {}; // Keys: target commit id
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

    if (edgesByTarget[target]) {
      edgesByTarget[target].push(edge);
    } else {
      edgesByTarget[target] = [edge];
    }

    return edge;
  },
  getEdgesByTarget: async (target) => edgesByTarget[target] || [],
};

describe('Revision History Use Cases', () => {
  const createCommit = new CreateCommit({ revisionHistoryGateway });
  const createEdge = new CreateEdge({ revisionHistoryGateway });
  const getVizAtCommit = new GetVizAtCommit({ revisionHistoryGateway });

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
      const source = await createCommit.execute({ id: '1', viz: 'a' }).id;
      const target = await createCommit.execute({ id: '2', viz: 'b' }).id;
      const ops = [];
      const edge = await createEdge.execute({ source, target, ops });
      assert.equal(edge.source, source);
      assert.equal(edge.target, target);
      assert.equal(edge.ops, ops);
    });
  });
  describe('Get Viz At Commit', () => {
    it('should apply ops from root.', async () => {
      const source = (await createCommit.execute({ id: '0', isRoot: true })).id;
      const target = (await createCommit.execute({ id: '1' })).id;
      const expectedViz = JSON.parse(JSON.stringify(testData.visualization));
      const ops = computeEdgeOps({}, expectedViz);
      const edge = await createEdge.execute({ source, target, ops });
      assert.equal(edge.source, source);
      assert.equal(edge.target, target);
      assert.equal(edge.ops, ops);

      const actualViz = await getVizAtCommit.execute({ commit: target });
      assert.deepEqual(actualViz, expectedViz);
    });
  });
});
