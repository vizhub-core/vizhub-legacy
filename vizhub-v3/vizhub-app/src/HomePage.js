const pageSize = 4 * 4;

export const homePageVizInfosQuery = (pageIndex = 0) => ({
  $skip: pageIndex * pageSize,
  $limit: pageSize,
});
