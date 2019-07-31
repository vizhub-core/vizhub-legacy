import { useReducer, useCallback, useMemo } from 'react';
import { useRealtimeModules } from './useRealtimeModules';
import { useVizContentDoc } from './useVizContentDoc';
import { createReducer } from './createReducer';

export const useViz = initialViz => {
  // Lazy load realtime-related modules.
  const realtimeModules = useRealtimeModules();

  const vizContentDoc = useVizContentDoc(realtimeModules, initialViz.id);

  const submitContentOp = useCallback(
    op => {
      if (!vizContentDoc) {
        throw new Error(
          'Attempting submit before subscribe. Should never happen.'
        );
      }
      vizContentDoc.submitOp(op);
      console.log('submit content op: ' + JSON.stringify(op));
    },
    [vizContentDoc]
  );

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
  const allowEditing = vizContentDoc ? true : false;

  return { viz, onFileChange, allowEditing };
};
