import { getExtension } from '../../../accessors';

// Returns true if the given op changes a .js file
// that is not bundle.js.
export const changesJS = (op, files) => {
  for (let i = 0; i < op.length; i++) {
    const c = op[i];
    if (c.p[0] === 'files') {
      const fileIndex = c.p[1];
      const fileName = files[fileIndex].name;
      if (fileName === 'bundle.js') {
        continue;
      }
      const extension = getExtension(fileName);
      if (extension === '.js') {
        return true;
      }
    }
  }
  return false;
};
