import { getExtension } from 'vizhub-presenters';

export const createChangesChecker = (
  targetExtension,
  ignoreFiles = ['bundle.js']
) => {
  // Returns true if the given op changes a .[targetExtension] file
  // that is not one of ignored files
  return (op, previousFiles) => {
    for (let i = 0; i < op.length; i++) {
      const c = op[i];
      if (c.p[0] === 'files') {
        const fileIndex = c.p[1];

        // If a file's content was changed, or a file was deleted.
        if (c.si || c.sd || c.ld) {
          const fileName = previousFiles[fileIndex].name;

          // Ignore when ignored file updates
          if (!!ignoreFiles.find(file => file === fileName)) {
            continue;
          }

          const extension = getExtension(fileName);
          if (extension === targetExtension) {
            return true;
          }
        }
      }
    }
    return false;
  };
};
