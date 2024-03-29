import assert from 'assert';
import { homePagePresenter } from './homePagePresenter';

export const homePagePresenterTest = () => {
  describe('homePagePresenter', () => {
    it('Should present home page data', () => {
      const {
        title,
        page,
        pageProps: { vizInfos, ownerUsersById },
      } = homePagePresenter({
        vizInfos: 'vizInfos',
        ownerUsers: [{ id: 'foo' }, { id: 'bar' }],
      });
      assert.equal(title, 'Home');
      assert.equal(page, 'HomePage');
      assert.equal(vizInfos, 'vizInfos');
      assert.deepEqual(ownerUsersById.foo, { id: 'foo' });
      assert.deepEqual(ownerUsersById.bar, { id: 'bar' });
    });
  });
};
