import { getPageVisualizationInfos } from './getPageVisualizationInfos';

export const getVisualizationInfosByUserId = (connection) => async ({
  owner,
  authenticatedUser,
  ...commonProps
}) => {
  return getPageVisualizationInfos(connection)({
    ...commonProps,
    extraQueryParams: { owner },
  });
};
