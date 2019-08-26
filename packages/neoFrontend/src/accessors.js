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

// Pushes a new file entry onto the files array.
// newFile is expected to be an object with "name" and "text" properties.
export const generateFileCreateOp = (files, newFile) => ({
  p: ['files', files.length],
  li: newFile
});

export const generateFileChangeOp = (
  fileIndex,
  oldText,
  newText,
  realtimeModules,
  field = 'text' // Can be 'text' or 'name'
) => {
  // Derive the op for this change by diffing the text.
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);

  // Make the op path correct with respect to the document root.
  op.forEach(opComponent => {
    opComponent.p = ['files', fileIndex, field].concat(opComponent.p);
  });

  return op;
};

// TODO unify with logic of generateFileChangeOp
export const titleChangeOp = (oldTitle, newTitle, realtimeModules) => {
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldTitle, newTitle, diffMatchPatch);
  op.forEach(opComponent => {
    opComponent.p = ['title'].concat(opComponent.p);
  });
  return op;
};
