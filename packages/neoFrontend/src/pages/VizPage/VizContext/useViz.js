import { useReducer, useEffect, useContext } from 'react';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { useVizContentDoc } from './useVizContentDoc';
import { reducer } from './reducer';

export const useViz = initialViz => {
  const realtimeModules = useContext(RealtimeModulesContext);

  const vizContentDoc = useVizContentDoc(realtimeModules, initialViz.id);

  // Display initial viz until realtime connection has been established.
  const [viz, dispatch] = useReducer(reducer, initialViz);

  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    const dispatchContentChange = () => {
      dispatch({ type: 'contentChange', content: vizContentDoc.data });
    };

    // Handle the case that the initial viz and the
    // vizContentDoc content are different.
    dispatchContentChange();

    // Update on each change.
    console.log('subscribing dispatchContentChange');
    vizContentDoc.on('op', dispatchContentChange);

    return () => {
      console.log('unsubscribing from ops');
      vizContentDoc.off('op', dispatchContentChange);
    };
  }, [vizContentDoc, dispatch]);

  return { viz, vizContentDoc };
};
