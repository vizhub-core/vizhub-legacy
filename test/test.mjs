import assert from 'assert';
import { VizInfo } from '../src/entities/VizInfo.js';

console.log(VizInfo);

describe('VizInfo', () => {
  it('should copy expected keys', function () {
    const vizInfo = VizInfo({});
    assert.deepEqual(Object.keys(vizInfo), [
      'type',
      'id',
      'owner',
      'title',
      'slug',
      'description',
      'createdTimestamp',
      'lastUpdatedTimestamp',
      'forkedFrom',
      'forksCount',
      'height',
      'imagesUpdatedTimestamp',
      'upvotes',
      'privacy',
      'anyoneCanEdit',
      'collaborators',
    ]);
  });
  it('should allow inspection of the type', () => {
    const vizInfo = VizInfo({});
    assert.equal(vizInfo.type, 'VizInfo');
  });
});
