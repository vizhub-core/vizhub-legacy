import assert from 'assert';
import { i18n } from 'datavis-tech-i18n';
import { 
  createVisualization,
  updateVisualization
} from '../src';

describe('Visualization Use Cases', () => {
  describe('createVisualization', () => {
    it('should return an error if no owner specified.', () => {
      assert.deepEqual(createVisualization({}), {
        type: 'error',
        error: i18n('errorNoOwner')
      });
    });

    it('should return a Visualization entity with defaults.', () => {
      const action = createVisualization({ owner: '754328' });

      assert.equal(action.data.id.length, 32);
      delete action.data.id;

      assert.deepEqual(action, {
        type: 'createVisualization',
        data: {
          'description': '',
          'files': {
            'index.html': '<h1>I AM VIZ</h1>'
          },
          'owner': '754328',
          'slug': '',
          'title': ''
        }
      });
    });
    //it('should return a Visualization entity with given data.', function() {
  });
});
