export const getFileTree = files => {
  const tree = { name: 'files' };
  files.forEach(file => {
    const path = file.name.split('/');
    const n = path.length;
    let node = tree;
    for (let i = 0; i < n - 1; i++) {
      const child = { name: path[i] };
      (node.children || (node.children = [])).push(child);
    //  if (!node[pathItem]) {
    //    const child ={name: pathItem};
    //    if(i === n - 1){
    //      child.data = file;
    //    }
    //  }
      node = child;
    }
    (node.children || (node.children = [])).push({
      name: path[n - 1],
      file
    });
  });
  return tree;
};
