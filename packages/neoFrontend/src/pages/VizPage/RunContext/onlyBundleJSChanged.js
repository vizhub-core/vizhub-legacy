export const onlyBundleJSChanged = (previousFiles, nextFiles) => {
  // If a file was added or removed, it's not just bundle.js that changed.
  if (previousFiles.length !== nextFiles.length) {
    return false;
  }

  // If a file other than bundle.js changed,
  // it's not just bundle.js that changed.
  for (let i = 0; i < previousFiles.length; i++) {
    const previousFile = previousFiles[i];
    const nextFile = nextFiles[i];
    if (previousFile.name !== 'bundle.js' && previousFile !== nextFile) {
      return false;
    }
  }

  // Looks like only bundle.js changed!
  return true;
};
