export const getFileTree = files => {
  const tree = { name: 'files' };
  files.forEach(file => {
    const path = file.name.split('/');
    const node = tree;
    const n = path.length;
    for (let i = 0; i < n; i++) {
      (node.children || (node.children = [])).push({
        name: path[i],
        file
      });
      //const pathItem = path[i];
      //if (!node[pathItem]) {
      //  const child ={name: pathItem};
      //  if(i === n - 1){
      //    child.data = file;
      //  }
      //}
      //node = node[pathItem];
    }
  });
  return tree;
};
