import { useContext, useEffect } from 'react';
import { getFileIndex } from '../../../../../accessors';
import { URLStateContext } from '../../../URLStateContext';
import { VizContext } from '../../../VizContext';
import { getPath } from './usePath';

const affectsPath = (path, opPath) => {
  for (let i = 0; i < path.length; i++) {
    if (opPath[i] !== path[i]) {
      return false;
    }
  }
  return true;
};

// When the active file is renamed,
// we need to change the URL to reflect the new name.
export const useUpdateURLOnRename = () => {
  const { vizContentOp$ } = useContext(VizContext);
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previous, next, op }) => {
        const fileIndex = getFileIndex(previous.files, activeFile);
        const path = getPath(fileIndex, 'name');
        op.forEach(c => {
          if (affectsPath(path, c.p)) {
            const newName = next.files[fileIndex].name;
            setActiveFile(newName);
          }
        });
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [vizContentOp$, activeFile, setActiveFile]);
};
