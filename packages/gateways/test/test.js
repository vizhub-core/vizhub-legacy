import assert from 'assert';
import { Gateway } from '../src';

describe('Visualization Gateway', () => {
  describe('createVisualization', () => {

    it('should invoke db if success.', done => {
      const database = {
        createVisualization: () => Promise.resolve({ id: '123' })
      };
      Gateway(database).createVisualization({ owner: 'bob' })
        .then(({id}) => {
          assert.equal(id, '123');
          done();
        });
    });

  });
});
