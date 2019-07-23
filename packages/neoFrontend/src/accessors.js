import { defaultVizHeight } from './constants';

export const getVizHeight = visualization =>
  visualization.info.height || defaultVizHeight;
