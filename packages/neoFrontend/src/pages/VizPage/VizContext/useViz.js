import { useReducer, useCallback, useRef } from 'react';
import { useRealtimeModules } from './useRealtimeModules';
import { reducer } from './reducer';

export const useViz = initialViz => {
  // Lazy load realtime-related modules.
  const realtimeModulesRef = useRef();
  const realtimeModules = useRealtimeModules();
  realtimeModulesRef.current = realtimeModules;

  const initialState = { viz: initialViz };
  const [state, dispatch] = useReducer(
    reducer(realtimeModulesRef),
    initialState
  );

  //console.log(JSON.stringify(state.contentOp, null, 2));

  const onFileChange = useCallback(
    name => text => {
      dispatch({ type: 'fileChange', name, text });
    },
    [dispatch]
  );

  const viz = state.viz;
  const allowEditing = realtimeModules ? true : false;

  return { viz, onFileChange, allowEditing };
};
