// Pushes a new file entry onto the files array.
// newFile is expected to be an object with "name" and "text" properties.
export const generateFileCreateOp = (files, newFile) => ({
  p: ['files', files.length],
  li: newFile
});
