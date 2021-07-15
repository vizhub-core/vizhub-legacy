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
        'description',
        'createdTimestamp',
        'lastUpdatedTimestamp',
        'forkedFrom',
        'forksCount',
        'height',
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

    it('should support extension with additional keys', () => {
      VizInfo.keys.push('someFancyNewPropertyDefinedByAPlugin');
      const vizInfo = VizInfo({});
      assert.deepEqual(Object.keys(vizInfo), [
        'id',
        'owner',
        'title',
        'description',
        'createdTimestamp',
        'lastUpdatedTimestamp',
        'forkedFrom',
        'forksCount',
        'height',
        'someFancyNewPropertyDefinedByAPlugin',
      ]);
    });
  });
};
