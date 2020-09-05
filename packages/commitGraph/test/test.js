import * as assert from 'assert';
import { testData } from 'vizhub-entities';
import { createRootCommit, ROOT_COMMIT_ID, computeDiffOps } from '../lib/index';

describe('Commit Graph', () => {
  it('should create the root commit', () => {
    const viz = testData.visualization;
    assert.deepEqual(createRootCommit(viz), {
      id: ROOT_COMMIT_ID,
      parentId: null,
      vizId: viz.id,
      ops: computeDiffOps({}, viz),
    });
  });
});
