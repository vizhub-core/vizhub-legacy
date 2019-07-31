import { useReducer, useCallback, useMemo } from 'react';
import { useRealtimeModules } from './useRealtimeModules';
import { createReducer } from './createReducer';

export const useViz = initialViz => {
  // Lazy load realtime-related modules.
  const realtimeModules = useRealtimeModules();

  const submitContentOp = useCallback(op => {
    console.log('submit content op: ' + JSON.stringify(op));
  }, []);

  //reducerOptionsRef.current.submitInfoOp = op => {
  //  console.log('submit info op: ' + JSON.stringify(op));
  //};

  // Set up our reducer, the source of truth for our Viz state.
  const reducer = useMemo(
    () => createReducer({ realtimeModules, submitContentOp }),
    [realtimeModules, submitContentOp]
  );
  const [state, dispatch] = useReducer(reducer, { viz: initialViz });

  const onFileChange = useMemo(
    () => name => text => {
      dispatch({ type: 'fileChange', name, text });
    },
    [dispatch]
  );

  const viz = state.viz;
  const allowEditing = realtimeModules ? true : false;

  return { viz, onFileChange, allowEditing };
};
