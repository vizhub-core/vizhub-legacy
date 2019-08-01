import { getFileIndex } from '../../../../../../accessors';

export const generateFileChangeOp = (files, name, newText, realtimeModules) => {
  // Derive old text and file index.
  const fileIndex = getFileIndex(files, name);
  const oldText = files[fileIndex].text;

  // Derive the op for this change by diffing the text.
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);

  // Make the op path correct with respect to the document root.
  op.forEach(opComponent => {
    opComponent.p = ['files', fileIndex, 'text'].concat(opComponent.p);
  });

  return op;
};
