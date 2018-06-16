import assert from 'assert';
import { 
  createVisualization,
  updateVisualization
} from '../src';

describe('Visualization Use Cases', () => {
  describe('createVisualization', () => {
    it('should return an error if no owner specified.', function() {
      assert.deepEqual(createVisualization({}), {
        error: 'No owner specified, cannot create visualization.'
      });
    });
    //it('should return a Visualization entity with defaults.', function() {
    //it('should return a Visualization entity with given data.', function() {
  });
});
