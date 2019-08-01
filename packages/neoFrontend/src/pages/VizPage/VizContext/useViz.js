import { useReducer, useEffect, useCallback } from 'react';
import { useRealtimeModules } from './useRealtimeModules';
import { useVizContentDoc } from './useVizContentDoc';

const reducer = (viz, action) => {
  switch (action.type) {
    case 'contentChange':
      return action.content !== viz.content
        ? { info: viz.info, content: action.content }
        : viz;
    default:
      throw new Error();
  }
};

export const useViz = initialViz => {
  // Lazy load realtime-related modules.
  const realtimeModules = useRealtimeModules();

  const vizContentDoc = useVizContentDoc(realtimeModules, initialViz.id);

  // TODO move this into CodeAreaTextarea.
  const onFileChange = name => newText => {
    if (!realtimeModules || !vizContentDoc) {
      throw new Error(
        'Attempting change file before subscribe. Should never happen.'
      );
    }

    // Derive old text and file index.
    let oldText, fileIndex;
    const files = vizContentDoc.data.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name === name) {
        oldText = file.text;
        fileIndex = i;
        break;
      }
    }

    // Derive the op for this change by diffing the text.
    const { diffMatchPatch, jsondiff } = realtimeModules;
    const op = jsondiff(oldText, newText, diffMatchPatch).map(opComponent => ({
      ...opComponent,
      p: ['files', fileIndex, 'text'].concat(opComponent.p)
    }));

    vizContentDoc.submitOp(op);
  };

  // Display initial viz until realtime connection has been established.
  const [viz, dispatch] = useReducer(reducer, initialViz);

  const dispatchContentChange = useCallback(() => {
    dispatch({
      type: 'contentChange',
      content: vizContentDoc.data
    });
  }, [dispatch, vizContentDoc]);

  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    // Handle the case that the initial viz and the
    // vizContentDoc content are different.
    dispatchContentChange();

    // Update on each change.
    vizContentDoc.on('op', dispatchContentChange);

    return () => {
      console.log('unsubscribing from ops');
      vizContentDoc.off('op', dispatchContentChange);
    };
  }, [vizContentDoc, dispatchContentChange]);

  const allowEditing = vizContentDoc ? true : false;

  return { viz, onFileChange, allowEditing };
};
