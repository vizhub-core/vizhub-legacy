import assert from 'assert';
import { getHomePageData } from './getHomePageData';
import { ciUserData } from '../entities/User';

const getUsersByIds = async () => [{ userName: 'joe' }];

export const getHomePageDataTest = () => {
  describe('getHomePageData', () => {
    it('Should provide vizInfos and ownerUsers.', async () => {
      const homePageData = await getHomePageData({
        getVizInfos: async () => [{ title: 'Test Viz', owner: 'Joe' }],
        getUsersByIds,
      });
      //console.log(JSON.stringify(homePageData));
      assert.deepEqual(homePageData, {
        vizInfos: [{ owner: 'Joe', title: 'Test Viz' }],
        ownerUsers: [{ userName: 'joe' }],
      });
    });
    it('Should include CI user in ownerUsers.', async () => {
      const homePageData = await getHomePageData({
        getVizInfos: async () => [
          { title: 'Test Viz 2', owner: ciUserData.id },
        ],
        getUsersByIds, // Does not return CI user.
      });

      assert.deepEqual(homePageData, {
        vizInfos: [{ title: 'Test Viz 2', owner: '47895473289547832938754' }],
        ownerUsers: [{ userName: 'joe' }, ciUserData],
      });
    });
  });
};
