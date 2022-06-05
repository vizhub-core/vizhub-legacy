// This module defines queries that are used both on the
// server side and client side.
const pageSize = 4 * 4;
export const homePageVizInfosQuery = (pageIndex = 0) => ({
  $skip: pageIndex * pageSize,
  $limit: pageSize,
});
