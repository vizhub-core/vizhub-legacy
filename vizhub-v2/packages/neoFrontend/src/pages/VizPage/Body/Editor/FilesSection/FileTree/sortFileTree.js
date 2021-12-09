// Recursively sorts the file tree in-place.
// Sorts first to group directories before files.
// Sorts second alphabetically.
export const sortFileTree = (fileTree) => {
  if (fileTree.children) {
    fileTree.children.sort((a, b) => {
      const aIsFile = a.children ? 0 : 1;
      const bIsFile = b.children ? 0 : 1;
      return aIsFile - bIsFile || a.name.localeCompare(b.name);
    });

    fileTree.children.forEach(sortFileTree);
  }
  return fileTree;
};
