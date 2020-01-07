import {
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useState,
  useRef
} from 'react';
import { Subject } from 'rxjs';
import { VizContext } from '../VizContext';
import { EditorModulesContext } from '../EditorModulesContext';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { updateBundleIfNeeded } from './updateBundleIfNeeded';
import { updateTitleIfNeeded } from './updateTitleIfNeeded';
import { updateDescriptionIfNeeded } from './updateDescriptionIfNeeded';
import { updateLastUpdatedTimestamp } from './updateLastUpdatedTimestamp';
import { generateRunId } from './generateRunId';
import { onlyBundleJSChanged } from './onlyBundleJSChanged';
import { changesJS } from './changesJS';
import { changesMD } from './changesMD';

// The delay in ms between the time a change is made and the time
// the program is run.
const runDelay = 1000;

export const useRun = () => {
  const {
    viz$,
    submitVizContentOp,
    submitVizInfoOp,
    vizContentOp$
  } = useContext(VizContext);
  const [runId, setRunId] = useState(generateRunId());
  const [runError, setRunError] = useState(null);
  const { editorModules } = useContext(EditorModulesContext);
  const realtimeModules = useContext(RealtimeModulesContext);
  const runTimerProgress$ = useMemo(() => new Subject(), []);
  const jsChanged = useRef(false);
  const mdChanged = useRef(false);
  const localChanges = useRef(false);
  const timeoutId = useRef();
  const runTimerStart = useRef();

  const startRunTimerProgress = useCallback(() => {
    runTimerStart.current = Date.now();
    const updateProgress = () => {
      const progress = (Date.now() - runTimerStart.current) / runDelay;
      if (progress < 1) {
        runTimerProgress$.next(progress);
        requestAnimationFrame(updateProgress);
      } else {
        runTimerProgress$.next(null);
      }
    };
    updateProgress();
  }, [runTimerProgress$]);

  const resetRunTimerProgress = useCallback(() => {
    runTimerStart.current = Date.now();
  }, []);

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

  const run = useCallback(async () => {
    // if not js or md files are changed then generate run id
    if (!(jsChanged.current || mdChanged.current)) {
      setRunId(generateRunId());
    } else if (jsChanged.current === 'local') {
      try {
        await updateBundleIfNeeded(
          viz$,
          editorModules,
          realtimeModules,
          submitVizContentOp
        );
        jsChanged.current = false;
        setRunError(null);
        setRunId(generateRunId());
      } catch (error) {
        setRunError(error);
      }
    } else if (jsChanged.current === 'remote') {
      // If JS changed remotely, do nothing here,
      // but wait for remote to update bundle.js,
      // and let that trigger a run id update.
    }

    if (localChanges.current) {
      updateTitleIfNeeded(viz$, submitVizInfoOp, realtimeModules);
      updateDescriptionIfNeeded(viz$, submitVizInfoOp, realtimeModules);
      updateLastUpdatedTimestamp(viz$, submitVizInfoOp);
      localChanges.current = false;
      mdChanged.current = false;
    }

    // Flag that the timer is no longer running.
    timeoutId.current = undefined;
  }, [
    setRunId,
    editorModules,
    realtimeModules,
    viz$,
    submitVizContentOp,
    submitVizInfoOp
  ]);

  // If the timer has been started, reset it.
  // If the timer has not been started, this function is a no op.
  const resetRunTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(run, runDelay);
      resetRunTimerProgress();
    }
  }, [run, resetRunTimerProgress]);

  // If the timer has been started, reset it.
  // If the timer has not been started, this function starts it.
  const startRunTimer = useCallback(() => {
    if (timeoutId.current) {
      resetRunTimer();
    } else {
      timeoutId.current = setTimeout(run, runDelay);
      startRunTimerProgress();
    }
  }, [resetRunTimer, run, startRunTimerProgress]);

  // Keep track of when JS and MD files were changed locally.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previous, op, originatedLocally }) => {
        if (changesJS(op, previous.files)) {
          jsChanged.current = originatedLocally ? 'local' : 'remote';
        }

        if (changesMD(op, previous.files)) {
          mdChanged.current = originatedLocally ? 'local' : 'remote';
        }

        if (originatedLocally) {
          localChanges.current = true;
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [vizContentOp$]);

  // Reset run timer whenever files are changed by the user.
  // Do not reset run timer when bundle.js gets generated.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(({ previous, next }) => {
      if (previous.files !== next.files) {
        if (!onlyBundleJSChanged(previous.files, next.files)) {
          startRunTimer();
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [vizContentOp$, startRunTimer]);

  // Handle the case that a remote user changes some JS
  // that causes the bundle to update.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previous, next, originatedLocally }) => {
        if (!originatedLocally) {
          if (previous.files !== next.files) {
            if (onlyBundleJSChanged(previous.files, next.files)) {
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
    resetRunTimer,
    runId,
    runTimerProgress$,
    runError
  };
};
