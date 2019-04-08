import assert from 'assert';
import set from 'lodash/fp/set';
import { fork, vizId, vizData } from '../src';

describe('fork', () => {
  it('should compute fork', () => {
    const ownerUserId = '4732895';
    const publishDateISOString = new Date().toISOString();
    const forked = fork({
      vizId,
      vizData,
      ownerUserId,
      publishDateISOString
    });
    const expected = Object.assign({}, vizData, {
      ownerUserId,
      forkedFromVizId: vizId,
      publishDateISOString,
      viewCount: 0,
      upvotes: 0,
      downvotes: 0
    });
    assert.deepEqual(forked, expected);
  });
});
