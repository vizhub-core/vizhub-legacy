import { useCallback, useEffect, useContext, useState, useRef } from 'react';
import { VizContext } from '../VizContext';
import { EditorModulesContext } from '../EditorModulesContext';
import { updateBundleIfNeeded } from './updateBundleIfNeeded';

const runDelay = 1000;

const generateRunId = (() => {
  let runId = 0;
  return () => runId++ % 100;
})();

export const useRun = () => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const [runId, setRunId] = useState(generateRunId());
  const { editorModules } = useContext(EditorModulesContext);
  const timeoutId = useRef();

  const resetRunTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      await updateBundleIfNeeded(viz$, editorModules, submitVizContentOp);
      setRunId(generateRunId());
    }, runDelay);
  }, [setRunId, editorModules, viz$, submitVizContentOp]);

  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op }) => {
        if (previousContent.files !== nextContent.files) {
          resetRunTimer();
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
