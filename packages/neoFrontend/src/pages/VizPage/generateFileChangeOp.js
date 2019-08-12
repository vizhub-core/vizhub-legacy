export const generateFileChangeOp = (
  fileIndex,
  oldText,
  newText,
  realtimeModules
) => {
  // Derive the op for this change by diffing the text.
  const { diffMatchPatch, jsondiff } = realtimeModules;
  const op = jsondiff(oldText, newText, diffMatchPatch);

  // Make the op path correct with respect to the document root.
  op.forEach(opComponent => {
    opComponent.p = ['files', fileIndex, 'text'].concat(opComponent.p);
  });

  return op;
};
