import * as assert from 'assert';
import { Presenter } from '../src';

describe('Presenter', () => {
  describe('presentVisualization', () => {

    it('should compute references', done => {
      const gateway = {
        fetchDocument: id => Promise.resolve({}),
        fetchUser: id => Promise.resolve({})
      }; 
      const presenter = Presenter(gateway);

      presenter.presentVisualization('123')
        .then(({ references }) => {
          assert.deepEqual(references, [ 'd3-selection', './bar' ]);
          done();
        });
    });
  });
});
