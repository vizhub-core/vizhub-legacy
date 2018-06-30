import assert from 'assert';
import { i18n } from 'datavis-tech-i18n';
import { Gateway } from '../src';

describe('Visualization Gateway', () => {
  describe('createVisualization', () => {

    it('should invoke db if success.', done => {
      const database = {
        createVisualization: data => Promise.resolve({ id: '123' })
      };
      Gateway(database).createVisualization({ owner: 'bob' })
        .then(({id}) => {
          assert.equal(id, '123');
          done();
        });
    });

  });
});
