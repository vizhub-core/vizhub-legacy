import { getPageVisualizationInfos } from './getPageVisualizationInfos';


export const getVisualizationInfosByUserId = (connection) => async ({
  owner,
  authenticatedUser,
  query,
  sort
}) => {
  return getPageVisualizationInfos(connection)({
    query,
    sort,
    // TODO pagination for profile page, like in home page
    offset: 0,
    // Show private visualizations if profile owner is currently authenticated.
    includePrivate: owner === authenticatedUser,
    extraQueryParams: { owner }
  });
};
