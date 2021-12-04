import assert from 'assert';
import set from 'lodash/fp/set';
import { computeDiffOps } from '../src/computeDiffOps';
import { type } from 'ot-json0';
import { vizData } from '../src';

const clone = obj => JSON.parse(JSON.stringify(obj));

describe('computeDiffOps', () => {
  const path = ['working', 'state', 'xAxisLabel', 'value'];
  const vizData2 = set(path)('The Cool X Axis')(vizData);
  const ops = computeDiffOps(vizData, vizData2);

  it('should compute diff', () => {
    assert.deepEqual(ops, [{ si: 'Cool ', p: path.concat(4) }]);
  });

  it('should apply diff', () => {
    const vizData3 = type.apply(clone(vizData), ops);
    assert.deepEqual(vizData2, vizData3);
  });
});
