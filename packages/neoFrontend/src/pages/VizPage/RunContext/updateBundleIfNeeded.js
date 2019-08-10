import { getVizFiles, getFileIndex } from '../../../accessors';
import { generateFileChangeOp } from '../generateFileChangeOp';
import { generateFileCreateOp } from '../generateFileCreateOp';

export const updateBundleIfNeeded = async (
  viz$,
  editorModules,
  realtimeModules,
  submitVizContentOp
) => {
  if (editorModules) {
    const files = getVizFiles(viz$.getValue());
    const indexJSExists = getFileIndex(files, 'index.js') !== -1;
    if (indexJSExists) {
      try {
        const output = await editorModules.bundle(files);
        if (output.length !== 1) {
          throw new Error(
            'Expected Rollup output to contain exactly one file.'
          );
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
          // TODO guard against degenerate case.
          submitVizContentOp(op);
        } else {
          submitVizContentOp(
            generateFileCreateOp(files, { name: 'bundle.js', text })
          );
        }
      } catch (error) {
        // TODO proper handling of errors.
        // Display them where viz should be.
        // Also output to console.
        console.log(error);
      }
    } else {
      // TODO delete bundle.js
    }
  }
};
