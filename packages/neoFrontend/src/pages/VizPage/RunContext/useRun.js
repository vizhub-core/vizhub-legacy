import {
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useState,
  useRef,
} from 'react';
import { Subject } from 'rxjs';
import { runDelay } from '../../../constants';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../VizContext';
import { EditorModulesContext } from '../EditorModulesContext';
import { updateBundleIfNeeded } from './updateBundleIfNeeded';
import { updateTitleIfNeeded } from './updateTitleIfNeeded';
import { updateDescriptionIfNeeded } from './updateDescriptionIfNeeded';
import { updateLastUpdatedTimestamp } from './updateLastUpdatedTimestamp';
import { generateRunId } from './generateRunId';
import { onlyBundleJSChanged } from './onlyBundleJSChanged';
import { createChangesChecker } from './createChangesChecker';

const changesMD = createChangesChecker('.md');
const changesJS = createChangesChecker('.js');
const changesSvelte = createChangesChecker('.svelte');

// Note: This is here specifically to detect changes in package.json.
// If any other .json files change, bundle.js gets updated unnecessarily.
const changesJSON = createChangesChecker('.json');

export const useRun = () => {
  const {
    viz$,
    submitVizContentOp,
    submitVizInfoOp,
    vizContentOp$,
  } = useContext(VizContext);
  const [runId, setRunId] = useState(generateRunId());
  const [runError, setRunError] = useState(null);
  const [isAutoRunEnabled, setIsAutoRunEnabled] = useState(true);
  const [needsManualRun, setNeedsManualRun] = useState(false);
  const { editorModules } = useContext(EditorModulesContext);
  const realtimeModules = useContext(RealtimeModulesContext);
  const runTimerProgress$ = useMemo(() => new Subject(), []);

  // If this .current is true, then something changed that is
  // an input to the build process that generates bundle.js.
  // Namely, if any .js or .svelte file changed, or if package.json changes.
  const bundleInputChanged = useRef(false);

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
      return (newRunId) => {
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
    if (!(bundleInputChanged.current || mdChanged.current)) {
      setRunId(generateRunId());
    } else if (bundleInputChanged.current === 'local') {
      try {
        await updateBundleIfNeeded(
          viz$,
          editorModules,
          realtimeModules,
          submitVizContentOp
        );
        bundleInputChanged.current = false;
        setRunError(null);
        setRunId(generateRunId());
      } catch (error) {
        console.error(error);
        setRunError(error);
      }
    } else if (bundleInputChanged.current === 'remote') {
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

    setNeedsManualRun(false);
  }, [
    setRunId,
    editorModules,
    realtimeModules,
    viz$,
    submitVizContentOp,
    submitVizInfoOp,
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

  const cancelRunTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      runTimerStart.current = 0;
    }
  }, []);

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
        if (
          changesJS(op, previous.files) ||
          changesSvelte(op, previous.files) ||
          changesJSON(op, previous.files)
        ) {
          bundleInputChanged.current = originatedLocally ? 'local' : 'remote';
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
          if (isAutoRunEnabled) {
            startRunTimer();
          } else {
            setNeedsManualRun(true);
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [vizContentOp$, startRunTimer, isAutoRunEnabled]);

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
    cancelRunTimer,
    runId,
    runTimerProgress$,
    runError,
    isAutoRunEnabled,
    setIsAutoRunEnabled,
    needsManualRun,
    run,
  };
};
