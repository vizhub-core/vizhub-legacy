import { getPageVisualizationInfos } from './getPageVisualizationInfos';

export const getVisualizationInfosByUserId = (connection) => async ({
  owner,
  authenticatedUser,
  ...commonProps
}) => {
  return getPageVisualizationInfos(connection)({
    ...commonProps,
    // Show private visualizations if profile owner is currently authenticated.
    includePrivate: owner === authenticatedUser,
    extraQueryParams: { owner },
  });
};
