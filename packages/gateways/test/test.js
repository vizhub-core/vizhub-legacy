import assert from 'assert';
import { i18n } from 'datavis-tech-i18n';
import { VisualizationGateway } from '../src';

describe('Visualization Gateway', () => {
  describe('createVisualization', () => {

    it('should resolve to an error if no owner specified.', done => {
      VisualizationGateway().createVisualization({}).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });

    it('should invoke db if success.', done => {
      const db = {
        createVisualization: data => Promise.resolve({ id: '123' })
      };
      VisualizationGateway(db).createVisualization({ owner: 'bob' })
        .then(({id}) => {
          assert.equal(id, '123');
          done();
        });
    });

  });
});
