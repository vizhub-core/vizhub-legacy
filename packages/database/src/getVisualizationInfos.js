import { getPageVisualizationInfos } from './getPageVisualizationInfos';

export const getVisualizationInfos = (connection) => async (args) => {
  const { offset, ids } = args;

  return getPageVisualizationInfos(connection)({
    offset,
    extraQueryParams: {
      id: { $in: ids },
    },
    includePrivate: false,
  });
};
