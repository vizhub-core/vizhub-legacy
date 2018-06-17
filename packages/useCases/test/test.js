import assert from 'assert';
import { 
  createVisualization,
  updateVisualization
} from '../src';

describe('Visualization Use Cases', () => {
  describe('createVisualization', () => {
    it('should return an error if no owner specified.', () => {
      assert.deepEqual(createVisualization({}), {
        error: 'No owner specified, cannot create visualization.'
      });
    });

    it('should return a Visualization entity with defaults.', () => {
      assert.deepEqual(createVisualization({ owner: '754328' }), {
        'description': '',
        'files': {
          'index.html': '<h1>I AM VIZ</h1>'
        },
        'owner': '754328',
        'slug': '',
        'title': ''
      });
    });
    //it('should return a Visualization entity with given data.', function() {
  });
});
