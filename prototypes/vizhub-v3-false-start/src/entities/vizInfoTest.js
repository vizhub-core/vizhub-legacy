import assert from 'assert';
import { VizInfo } from './VizInfo';

export const vizInfoTest = () => {
  describe('VizInfo', () => {
    it('should copy expected keys', () => {
      const vizInfo = VizInfo({});
      assert.deepEqual(Object.keys(vizInfo), [
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

    it('should support instanceof', () => {
      const vizInfo = VizInfo({});
      assert(vizInfo instanceof VizInfo);
    });

    it('should pass through null & undefined as null', () => {
      assert.equal(VizInfo(null), null);
      assert.equal(VizInfo(undefined), null);
    });
  });
};
