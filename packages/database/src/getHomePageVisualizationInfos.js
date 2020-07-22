import { getPageVisualizationInfos } from './getPageVisualizationInfos';

export const getHomePageVisualizationInfos = (connection) => async (args) => {
  return getPageVisualizationInfos(connection)({
    ...args,
    includePrivate: false,
  });
};
