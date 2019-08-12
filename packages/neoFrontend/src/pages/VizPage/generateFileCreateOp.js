// Pushes a new file entry onto the files array.
export const generateFileCreateOp = (files, newFile) => ({
  p: ['files', files.length],
  li: newFile
});
