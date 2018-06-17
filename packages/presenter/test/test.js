import assert from 'assert';
import { Presenter } from '../src';

describe('Presenter', () => {
  describe('presentVisualization', () => {

    it('should present visualization and owner', done => {
      const gateway = {
        fetchDocument: id => Promise.resolve({}),
        fetchUser: id => Promise.resolve({})
      }; 
      const presenter = Presenter(gateway);

      presenter.presentVisualization('123')
        .then(({ visualization, owner }) => {
          assert(true);// TODO actually test something
          done();
        });
    });
  });
});
