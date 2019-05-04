// TODO move to central place for accessors.
//
// Computes the file extension from the given file path.
export const extension = path => {
  const i = path.lastIndexOf('.');

  // If no extension, return null.
  if (i === -1) {
    return null;
  }

  return path.substr(i + 1);
};
