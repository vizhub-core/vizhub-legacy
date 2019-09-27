export const addPath = (newName, fileName) => {
  const path = fileName.split('/');
  path[path.length - 1] = newName;
  return path.join('/');
};
