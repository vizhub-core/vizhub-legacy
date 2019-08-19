import { getExtension } from '../../../accessors';

// Returns true if the given op changes a .js file
// that is not bundle.js.
export const changesJS = (op, previousFiles) => {
  for (let i = 0; i < op.length; i++) {
    const c = op[i];
    if (c.p[0] === 'files') {
      const fileIndex = c.p[1];

      // If a file's content was changed, or a file was deleted.
      if (c.si || c.sd || c.ld) {
        const fileName = previousFiles[fileIndex].name;

        // Ignore when bundle.js updates
        if (fileName === 'bundle.js') {
          continue;
        }

        const extension = getExtension(fileName);
        if (extension === '.js') {
          return true;
        }
      }
    }
  }
  return false;
};
