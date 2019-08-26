import { defaultVizHeight, vizWidth } from './constants';
import { darkNavbarTheme } from './theme';

const microHeight = darkNavbarTheme.bannerHeight + darkNavbarTheme.headHeight;

export const getMicroScale = vizHeight => microHeight / vizHeight;

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

export const getText = (files, name) => {
  const file = getFile(files, name);
  return file ? file.text : '';
};

export const getVizHeight = visualization =>
  visualization.info.height || defaultVizHeight;

export const getVizFiles = visualization => visualization.content.files;

export const getVizFileIndex = name => visualization =>
  getFileIndex(getVizFiles(visualization), name);

export const getVizFile = fileIndex => visualization =>
  getVizFiles(visualization)[fileIndex];

export const getExtension = fileName =>
  fileName.substr(fileName.lastIndexOf('.'));

export const deleteFileOp = (viz, fileName) => {
  const fileIndex = getVizFileIndex(fileName)(viz);
  return {
    p: ['files', fileIndex],
    ld: viz.content.files[fileIndex]
  };
};

export const extractTitle = html => {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1] : 'Untitled';
};
