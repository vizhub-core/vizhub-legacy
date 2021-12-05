import assert from 'assert';
import set from 'lodash/fp/set';
import { fork, vizId, vizData, forkVizId } from '../src';

describe('fork', () => {
  it('should compute fork', () => {
    const forkOwnerUserId = '4732895';
    const forkPublishDateISOString = new Date().toISOString();
    const forked = fork({
      vizId,
      vizData,
      forkVizId,
      forkOwnerUserId,
      forkPublishDateISOString
    });
    const forkVizData = Object.assign({}, vizData, {
      ownerUserId: forkOwnerUserId,
      forkedFromVizId: vizId,
      publishDateISOString: forkPublishDateISOString,
      viewCount: 0,
      upvotes: 0,
      downvotes: 0
    });
    assert.equal(forked.vizId, forkVizId);
    assert.deepEqual(forked.vizData, forkVizData);
  });
});
