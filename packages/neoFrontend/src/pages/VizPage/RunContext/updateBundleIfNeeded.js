import { getVizFiles, getFileIndex, deleteFileOp } from '../../../accessors';
import { generateFileChangeOp } from '../generateFileChangeOp';
import { generateFileCreateOp } from '../generateFileCreateOp';

export const updateBundleIfNeeded = async (
  viz$,
  editorModules,
  realtimeModules,
  submitVizContentOp
) => {
  if (editorModules) {
    const viz = viz$.getValue();
    const files = getVizFiles(viz);
    const indexJSExists = getFileIndex(files, 'index.js') !== -1;
    if (indexJSExists) {
      const output = await editorModules.bundle(files);
      if (output.length !== 1) {
        throw new Error('Expected Rollup output to contain exactly one file.');
      }
      const { text } = output[0];
      const fileIndex = getFileIndex(files, 'bundle.js');
      const bundleJSExists = fileIndex !== -1;
      if (bundleJSExists) {
        const oldText = files[fileIndex].text;
        const op = generateFileChangeOp(
          fileIndex,
          oldText,
          text,
          realtimeModules
        );
        if (op.length !== 0) {
          submitVizContentOp(op);
        }
      } else {
        submitVizContentOp(
          generateFileCreateOp(files, { name: 'bundle.js', text })
        );
      }
    } else {
      submitVizContentOp(deleteFileOp(viz, 'bundle.js'));
    }
  }
};
