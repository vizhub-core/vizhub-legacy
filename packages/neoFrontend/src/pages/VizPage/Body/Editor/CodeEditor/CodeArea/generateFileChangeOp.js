export const generateFileChangeOp = (files, name, newText, realtimeModules) => {
  // Derive old text and file index.
  let oldText, fileIndex;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.name === name) {
      oldText = file.text;
      fileIndex = i;
      break;
    }
  }

  // Derive the op for this change by diffing the text.
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);

  // Make the op path correct with respect to the document root.
  op.forEach(opComponent => {
    opComponent.p = ['files', fileIndex, 'text'].concat(opComponent.p);
  });

  return op;
};
