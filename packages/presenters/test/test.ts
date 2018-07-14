import * as assert from 'assert';
import { CVResponse } from 'datavis-tech-use-cases';
import { CVPresenter } from '../src';

describe('Presenters', () => {
  describe('createVisualizationPresenter', () => {
    it('should present a CVResponse', () => {
      const response: CVResponse = { id: '123' };
      const viewModel = CVPresenter(response);
      assert.deepEqual(viewModel, { id: '123' });
    });
  });
});
