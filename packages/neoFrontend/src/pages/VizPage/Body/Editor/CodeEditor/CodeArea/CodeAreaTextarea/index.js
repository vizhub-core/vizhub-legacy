import React, {
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer
} from 'react';
import { getFileIndex } from '../../../../../../../accessors';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { onFileChange } from '../onFileChange';

export const CodeAreaTextarea = ({ file, vizContentDoc }) => {
  const { name, text } = file;
  const allowEditing = vizContentDoc ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);
  const onTextChange = onFileChange(name, vizContentDoc, realtimeModules);

  const reducer = useCallback(
    (selection, action) => {
      switch (action.type) {
        case 'remoteOp':
          return selection.map(position =>
            realtimeModules.json0.transformCursor(position, action.c, 'left')
          );
        case 'localChange':
          return action.selection;
        default:
          throw new Error();
      }
    },
    [realtimeModules]
  );

  const ref = useRef();
  const [selection, dispatch] = useReducer(reducer, [0, 0]);

  const updateSelection = () => {
    dispatch({
      type: 'localChange',
      selection: [ref.current.selectionStart, ref.current.selectionEnd]
    });
  };

  useLayoutEffect(() => {
    ref.current.setSelectionRange(selection[0], selection[1]);
  }, [selection, ref]);

  useLayoutEffect(() => {
    const currentSelection = [
      ref.current.selectionStart,
      ref.current.selectionEnd
    ];
    ref.current.value = text;
    ref.current.setSelectionRange(currentSelection[0], currentSelection[1]);
  }, [text, ref]);

  // Test for cursor transform.
  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          vizContentDoc.submitOp({ si: 'd', p: ['files', 1, 'text', 0] });
        }, 1000);
      }
    });
  }, [vizContentDoc]);

  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    const transformCursor = (op, originatedLocally) => {
      if (!originatedLocally) {
        const files = vizContentDoc.data.files;
        const fileIndex = getFileIndex(files, name);
        const path = ['files', fileIndex, 'text'];
        const { json0 } = realtimeModules;
        op.forEach(c => {
          if (json0.canOpAffectPath(c, path)) {
            dispatch({ type: 'remoteOp', c });
          }
        });
      }
    };

    // Update on each change.
    vizContentDoc.on('op', transformCursor);

    return () => {
      console.log('unsubscribing from ops in CodeAreaTextarea');
      vizContentDoc.off('op', transformCursor);
    };
  }, [vizContentDoc, name, realtimeModules]);

  return (
    <Wrapper
      ref={ref}
      onChange={event => {
        onTextChange(event.target.value);
      }}
      onSelect={updateSelection}
      readOnly={!allowEditing}
    />
  );
};
