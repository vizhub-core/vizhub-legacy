import { ciUserData } from '../entities/User';

export const getHomePageData = async ({ getVizInfos, getUsersByIds }) => {
  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  // TODO support pagination / infinite scroll
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });

  // Get the owner users for these vizzes.
  const ownerUserIdsSet = new Set(vizInfos.map(({ owner }) => owner));
  const ownerUsers = await getUsersByIds(Array.from(ownerUserIdsSet));

  // Add the CI user for testing.
  if (ownerUserIdsSet.has(ciUserData.id)) {
    ownerUsers.push(ciUserData);
  }

  return { vizInfos, ownerUsers };
};
