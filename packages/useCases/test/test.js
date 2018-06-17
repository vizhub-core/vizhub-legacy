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
        message: i18n('errorNoOwner')
      });
    });

    it('should return a Visualization entity with defaults.', () => {
      const action = createVisualization({ owner: '754328' });

      assert.equal(action.data.id.length, 32);
      delete action.data.id;

      assert.deepEqual(action, {
        type: 'createVisualization',
        data: {
          title: '',
          slug: '',
          description: '',
          files: {
            'index.html': '<h1>I AM VIZ</h1>'
          },
          owner: '754328'
        }
      });
    });

    it('should compute slug from provided title.', () => {
      const action = createVisualization({
        owner: '754328',
        title: 'Foo the Great'
      });
      assert.equal(action.data.title, 'Foo the Great');
      assert.equal(action.data.slug, 'foo-the-great');
    });

    it('should use slug if provided.', () => {
      const action = createVisualization({
        owner: '754328',
        title: 'Foo the Great',
        slug: 'foo'
      });
      assert.equal(action.data.slug, 'foo');
    });
    // it('should override defaults with provided fields.', () => {
    // it('should return a Visualization entity with given data.', () => {
  });
});
