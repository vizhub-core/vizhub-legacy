export const getHomePageData = async (database) => {
  //const { getVizInfo, getVizInfos } = database;
  const { getVizInfos } = database;

  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });

  return { vizInfos };
};
