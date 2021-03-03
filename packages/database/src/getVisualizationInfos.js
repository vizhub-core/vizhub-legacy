import { searchVisualizationInfos } from './searchVisualizationInfos';

export const getVisualizationInfos = (connection) => async (args) => {
  const { offset, ids } = args;

  return searchVisualizationInfos(connection)({
    offset,
    extraQueryParams: {
      id: { $in: ids },
    },
  });
};
