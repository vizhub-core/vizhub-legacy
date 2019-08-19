import { useContext, useEffect } from 'react';
import { getFileIndex } from '../../../../../accessors';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { getPath } from './usePath';

// When the active file is renamed,
// we need to change the URL to reflect the new name.
export const useUpdateURLOnRename = () => {
  const { vizContentOp$ } = useContext(VizContext);
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const realtimeModules = useContext(RealtimeModulesContext);

  useEffect(() => {
    if (!realtimeModules) {
      return;
    }
    const { json0 } = realtimeModules;
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op }) => {
        const fileIndex = getFileIndex(previousContent.files, activeFile);
        const path = getPath(fileIndex, 'name');
        op.forEach(c => {
          if (json0.canOpAffectPath(c, path)) {
            const newName = nextContent.files[fileIndex].name;
            setActiveFile(newName);
          }
        });
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [realtimeModules, vizContentOp$, activeFile]);
};
