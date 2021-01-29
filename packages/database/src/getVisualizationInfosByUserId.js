import { searchVisualizationInfos } from './searchVisualizationInfos';

export const getVisualizationInfosByUserId = (connection) => async ({
  owner,
  ...restArgs
}) => {
  return searchVisualizationInfos(connection)({
    ...restArgs,
    extraQueryParams: { owner },
  });
};
