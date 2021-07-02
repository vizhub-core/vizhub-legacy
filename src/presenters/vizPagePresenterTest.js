import assert from 'assert';
import { vizPagePresenter } from './vizPagePresenter';

export const vizPagePresenterTest = () => {
  describe('vizPagePresenter', () => {
    it('Should present viz page data', () => {
      const {
        title,
        page,
        pageProps
      } = vizPagePresenter({
        vizInfo: {title:'TheTitle', description:'TheDescription'}
        // TODO ownerUser: ...
      });
      assert.equal(title, 'TheTitle');
      assert.equal(page, 'VizPage');
      assert.equal(pageProps.title, 'TheTitle');
      assert.equal(pageProps.sanitizedDescriptionHTML, '<p>TheDescription</p>\n');
    });
    // TODO it('Should render markdown', () => {
    // TODO it('Should sanitize rendered markdown', () => {
  });
};
