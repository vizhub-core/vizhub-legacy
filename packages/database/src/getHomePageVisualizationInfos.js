import { searchVisualizationInfos } from './searchVisualizationInfos';

export const getHomePageVisualizationInfos = (connection) => async (args) => {
  return searchVisualizationInfos(connection)(args);
};
