import { useCallback, useEffect, useContext, useState, useRef } from 'react';
import { VizContext } from '../VizContext';
import { EditorModulesContext } from '../EditorModulesContext';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { updateBundleIfNeeded } from './updateBundleIfNeeded';
import { generateRunId } from './generateRunId';
import { onlyBundleJSChanged } from './onlyBundleJSChanged';

// The delay in ms between the time a change is made and the time
// the program is run.
const runDelay = 1000;

export const useRun = () => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const [runId, setRunId] = useState(generateRunId());
  const { editorModules } = useContext(EditorModulesContext);
  const realtimeModules = useContext(RealtimeModulesContext);
  const timeoutId = useRef();

  const resetRunTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      await updateBundleIfNeeded(
        viz$,
        editorModules,
        realtimeModules,
        submitVizContentOp
      );
      setRunId(generateRunId());
    }, runDelay);
  }, [setRunId, editorModules, realtimeModules, viz$, submitVizContentOp]);

  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op }) => {
        if (previousContent.files !== nextContent.files) {
          if(!onlyBundleJSChanged(previousContent.files, nextContent.files)){
            resetRunTimer();
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [vizContentOp$, resetRunTimer]);

  return {
    // TODO reset run timer on keystroke in editor
    //resetRunTimer,
    runId
  };
};
