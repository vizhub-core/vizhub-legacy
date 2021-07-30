import assert from 'assert';
import { VizInfo, getHeight } from './VizInfo';

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

  describe('VizInfo/getHeight', () => {
    it('should return height value if present', () => {
      const vizInfo = VizInfo({ height: 300 });
      assert.equal(getHeight(vizInfo), 300);
    });
    it('should return default height if height not defined', () => {
      const vizInfo = VizInfo({});
      assert.equal(getHeight(vizInfo), 500);
    });
    it('should return default height if vizInfo not defined (defensive)', () => {
      assert.equal(getHeight(null), 500);
    });
    it('should preserve zero', () => {
      const vizInfo = VizInfo({ height: 0 });
      assert.equal(getHeight(vizInfo), 0);
    });
  });
};
