import assert from 'assert';
import set from 'lodash/fp/set';
import { computeDiffOps } from '../src/computeDiffOps';
import { type } from 'ot-json0';
import { vizData } from './vizData';

const clone = obj => JSON.parse(JSON.stringify(obj));

describe('Entities', () => {
  describe('Viz', () => {
    const path = ['working', 'state', 'title', 'value'];
    const vizData2 = set(path)('A Cool Viz')(vizData);
    const ops = computeDiffOps(vizData, vizData2);

    it('should compute diff', () => {
      assert.deepEqual(ops, [{ si: 'Cool ', p: path.concat(2) }]);
    });

    it('should apply diff', () => {
      const vizData3 = type.apply(clone(vizData), ops);
      assert.deepEqual(vizData2, vizData3);
    });
  });
});
