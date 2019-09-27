export const getFileTree = files => {
  const root = { name: 'files', children: [] };
  files.forEach(file => {
    const path = file.name.split('/');
    const n = path.length;
    let node = root;
    for (let i = 1; i < n; i++) {
      const pathItem = path[i];
      if (!node[pathItem]) {
        const child ={name: pathItem};
        if(i === n - 1){
          child.data = file;
        }
        (node.children || (node.children = [])).push(node[pathItem]);
      }
      node = node[pathItem];
    }
  });
  return root;
};
