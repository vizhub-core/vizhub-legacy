import * as assert from 'assert';
import { presentVisualization } from '../src';

describe('Presenter', () => {
  describe('presentVisualization', () => {

    it('should compute references', async () => {
      //const gateway = {
      //  fetchDocument: id => Promise.resolve({}),
      //  fetchUser: id => Promise.resolve({})
      //}; 
      //const presenter = Presenter(gateway);

      const { references } = await presentVisualization()

      assert.deepEqual(references, [ 'd3-selection', './bar' ]);
    });
  });
});
