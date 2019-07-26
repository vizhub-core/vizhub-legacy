import { defaultVizHeight, vizWidth } from './constants';
import { darkNavbarTheme } from './theme';

const microHeight = darkNavbarTheme.bannerHeight + darkNavbarTheme.headHeight;

export const getVizHeight = visualization =>
  visualization.info.height || defaultVizHeight;

export const getMicroScale = visualization =>
  microHeight / getVizHeight(visualization);

export const getMicroWidth = microScale => microScale * vizWidth;
