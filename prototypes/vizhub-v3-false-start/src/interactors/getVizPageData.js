export const getVizPageData = async ({ getVizInfo }, vizId) => {
  const vizInfo = await getVizInfo(vizId);
  if (!vizInfo) {
    return null;
  }
  return { vizInfo };
};
