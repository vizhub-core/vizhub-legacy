import { ascending } from 'd3-array';

export const getFileEntries = vizData =>
  Object.entries(vizData.working.files)
    .map(([id, { path, text }]) => ({ id, path, text }))
    .sort((a, b) => ascending(a.path, b.path));

export const getFileTree = vizData => {
  const fileTree = {};
  getFileEntries(vizData).forEach(fileEntry => {
    const pathArray = fileEntry.path.split('/');
    const n = pathArray.length;
    let node = fileTree;
    for (let i = 1; i < n; i++) {
      const pathItem = pathArray[i];
      if (!node[pathItem]) {
        node[pathItem] = Object.assign(i === n - 1 ? fileEntry : {}, {
          name: pathItem
        });
        (node.children || (node.children = [])).push(node[pathItem]);
      }
      node = node[pathItem];
    }
  });
  return fileTree;
};
