import { getPageVisualizationInfos } from './getPageVisualizationInfos';

export const getTemplatesVisualizationInfos = (connection) => async (args) => {
  return getPageVisualizationInfos(connection)({
    ...args,
    extraQueryParams: {
      // TODO: Curran define ids for templates here
      id: { $in: ["37e6a7d7fced488f964e694b301554b0", "e9720c007a1f425eb0f3d1a8d3ced0b9"] }
    },
    includePrivate: false,
  });
};
