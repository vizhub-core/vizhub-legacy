import { generateFileChangeOp } from './generateFileChangeOp';

export const onFileChange = (
  oldText,
  fileIndex,
  submitVizOp,
  realtimeModules
) => newText => {
  submitVizOp(
    generateFileChangeOp(fileIndex, oldText, newText, realtimeModules)
  );
};
