import assert from 'assert';
import { VisualizationPresenter } from '../src';


describe('Presenters', () => {
  describe('VisualizationPresenter', () => {

    it('should present visualization and owner', done => {
      const visualizationPresenter = VisualizationPresenter({
        fetchDocument: id => Promise.resolve({}),
        fetchUser: id => Promise.resolve({})
      }); 

      visualizationPresenter('123')
        .then(({ visualization, owner }) => {
          assert(true);// TODO
          done();
        });
    });
  });
});
