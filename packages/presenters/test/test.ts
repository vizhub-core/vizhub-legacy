import * as assert from 'assert';
import { visualizationToViewModel } from '../src';

describe('Presenters', () => {
  describe('CreateVisualizationPresenter', () => {
    it('should present a Visualization', () => {
      const visualization = {
        info: {
          title: 'Foo'
        },
        content: {
          files: [
            { name: 'index.html', text: 'html text' }
          ]
        }
      };
      assert.deepEqual(visualizationToViewModel(visualization), {
        files: visualization.content.files,
        width: 960,
        height: 500,
        title: 'Foo',
        visualization: visualization
      });
    });
  });
});
