export const getHomePageData = async ({ getVizInfos, getUsersByIds }) => {
  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  // TODO support pagination / infinite scroll
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });

  // Get the owner users for these vizzes.
  const ownerUsers = await getUsersByIds(vizInfos.map(({ owner }) => owner));
  //const ownerUsers = await getUsersByIds([...new Set(ownerUserIds)]);

  return { vizInfos, ownerUsers };
};
