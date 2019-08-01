import { defaultVizHeight, vizWidth } from './constants';
import { darkNavbarTheme } from './theme';

const microHeight = darkNavbarTheme.bannerHeight + darkNavbarTheme.headHeight;

export const getVizHeight = visualization =>
  visualization.info.height || defaultVizHeight;

export const getMicroScale = visualization =>
  microHeight / getVizHeight(visualization);

export const getMicroWidth = microScale => microScale * vizWidth;

export const getFileIndex = (files, name) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].name === name) {
      return i;
    }
  }
  return -1;
};

export const getFile = (files, name) => files[getFileIndex(files, name)];

export const getText = (files, activeFile) => {
  const file = getFile(files, activeFile);
  return file ? file.text : '';
};
