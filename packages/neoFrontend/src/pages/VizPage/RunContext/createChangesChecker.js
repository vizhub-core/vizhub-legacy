import { getExtension } from 'vizhub-presenters';

// Returns true if the given op changes the target file
// that is not one of ignored files.
// If 'target' starts with '.', then we match on the extension.
// Otherwise, 'target' is matched on the exact file name.
export const createChangesChecker = (target, ignoreFiles = ['bundle.js']) => {
  return (op, previousFiles) => {
    for (let i = 0; i < op.length; i++) {
      const c = op[i];
      if (c.p[0] === 'files') {
        const fileIndex = c.p[1];

        // If a file's content was changed, or a file was deleted.
        if (c.si || c.sd || c.ld) {
          const fileName = previousFiles[fileIndex].name;

          // Ignore when ignored file updates
          if (ignoreFiles.find((file) => file === fileName)) {
            continue;
          }

          // If target starts with '.', we are looking for a matching extension.
          if (target[0] === '.') {
            return getExtension(fileName) === target;
          }

          // Otherwise we are looking for an exact file name match.
          return fileName === target;
        }
      }
    }
    return false;
  };
};
