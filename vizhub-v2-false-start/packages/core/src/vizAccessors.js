export const findActiveFileId = ({ working: { files } }, activeFileName) =>
  Object.keys(files).find(key => files[key].name === activeFileName);
