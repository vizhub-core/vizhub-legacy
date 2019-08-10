import { getVizFiles, getFileIndex } from '../../../accessors';

export const updateBundleIfNeeded = async (viz$, editorModules) => {
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
        const bundleJS = output[0].text;
        // TODO use jsondiff to set this in ShareDB, before incrementing run ID.
        console.log(bundleJS);
      } catch (error) {
        // TODO proper handling of errors.
        // Display them where viz should be.
        // Also output to console.
        console.log(error);
      }
    }
  }
};
