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
  const jsChanged = useRef(false);
  const timeoutId = useRef();

  const setRunIdSoon = useCallback(
    (() => {
      let timeout;
      return newRunId => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setRunId(newRunId);
        }, 0);
      };
    })(),
    [setRunId]
  );

  const resetRunTimer = useCallback(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      if (!jsChanged) {
        setRunId(generateRunId());
      } else if (jsChanged.current === 'local') {
        await updateBundleIfNeeded(
          viz$,
          editorModules,
          realtimeModules,
          submitVizContentOp
        );
        jsChanged.current = false;
        setRunId(generateRunId());
      } else if (jsChanged.current === 'remote') {
        // If JS changed remotely, do nothing here,
        // but wait for remote to update bundle.js,
        // and let that trigger a run id update.
      }
    }, runDelay);
  }, [setRunId, editorModules, realtimeModules, viz$, submitVizContentOp]);

  // Keep track of when JS files were changed locally.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ nextContent, op, originatedLocally }) => {
        if (changesJS(op, nextContent.files)) {
          jsChanged.current = originatedLocally ? 'local' : 'remote';
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
      ({ previousContent, nextContent, op, originatedLocally }) => {
        if (!originatedLocally) {
          if (previousContent.files !== nextContent.files) {
            if (onlyBundleJSChanged(previousContent.files, nextContent.files)) {
              // This needs to be debounced because each component of
              // remote multi-component ops are emitted as separate ops.
              // See https://github.com/share/sharedb/blob/master/lib/client/doc.js#L544
              setRunIdSoon(generateRunId());
            }
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [setRunIdSoon, vizContentOp$, editorModules]);

  return {
    // TODO reset run timer on keystroke in editor
    //resetRunTimer,
    runId
  };
};
