// When a page is opened with an active file,
// make sure all the directories leading to that file
// are opened automatically.
export const initialOpenDirectories = activeFile => {
  const openDirectories = {};
  if (activeFile) {
    const path = activeFile.split('/');
    for (let i = 1; i < path.length; i++) {
      openDirectories[path.slice(0, i).join('/')] = true;
    }
  }
  return openDirectories;
};
