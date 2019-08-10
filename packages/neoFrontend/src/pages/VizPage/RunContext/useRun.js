import { useCallback, useEffect, useContext, useState, useRef } from 'react';
import { VizContext } from '../VizContext';
import { EditorModulesContext } from '../EditorModulesContext';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { updateBundleIfNeeded } from './updateBundleIfNeeded';
import { generateRunId } from './generateRunId';
import { onlyBundleJSChanged } from './onlyBundleJSChanged';
import { changesJS } from './changesJS';

// The delay in ms between the time a change is made and the time
// the program is run.
const runDelay = 1000;

export const useRun = () => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const [runId, setRunId] = useState(generateRunId());
  const { editorModules } = useContext(EditorModulesContext);
  const realtimeModules = useContext(RealtimeModulesContext);
  const jsChangedLocally = useRef(false);
  const timeoutId = useRef();

  const resetRunTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      if (jsChangedLocally.current) {
        await updateBundleIfNeeded(
          viz$,
          editorModules,
          realtimeModules,
          submitVizContentOp
        );
        jsChangedLocally.current = false;
      }
      setRunId(generateRunId());
    }, runDelay);
  }, [setRunId, editorModules, realtimeModules, viz$, submitVizContentOp]);

  // Keep track of when JS files were changed locally.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, op, originatedLocally }) => {
        if (originatedLocally) {
          if (changesJS(op, previousContent.files)) {
            jsChangedLocally.current = true;
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [vizContentOp$, resetRunTimer]);

  // Reset run timer whenever files are changed by the user.
  // Do not reset run timer when bundle.js gets generated.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op }) => {
        if (previousContent.files !== nextContent.files) {
          if (!onlyBundleJSChanged(previousContent.files, nextContent.files)) {
            resetRunTimer();
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [vizContentOp$, resetRunTimer]);

  // Handle the case that a remote user changes some JS
  // that causes the bundle to update.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op }) => {
        if (previousContent.files !== nextContent.files) {
          if (onlyBundleJSChanged(previousContent.files, nextContent.files)) {
            setRunId(generateRunId());
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [setRunId, vizContentOp$, editorModules]);

  return {
    // TODO reset run timer on keystroke in editor
    //resetRunTimer,
    runId
  };
};
