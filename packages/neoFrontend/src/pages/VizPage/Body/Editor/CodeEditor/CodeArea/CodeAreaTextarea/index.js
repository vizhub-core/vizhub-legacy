import React, {
  useContext,
  useCallback,
  useEffect,
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
    const { selectionStart, selectionEnd } = ref.current;
    const selection = [selectionStart, selectionEnd];
    selection.isLocal = true;
    dispatch({ type: 'localChange', selection });
  };

  useEffect(() => {
    const { selectionStart, selectionEnd } = ref.current;
    ref.current.value = text;
    ref.current.setSelectionRange(selectionStart, selectionEnd);
  }, [text, ref]);

  useEffect(() => {
    if (!selection.isLocal) {
      ref.current.setSelectionRange(selection[0], selection[1]);
    }
  }, [selection, ref]);

  // Test for cursor transform.
  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          vizContentDoc.submitOp({ si: 'e', p: ['files', 1, 'text', 5] });
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

        // Delay execution of this so that the text gets set FIRST,
        // then the selection gets set SECOND.
        // This avoids a bug where if the cursor is in the last position,
        // it doesn't get transformed on screen.
        setTimeout(() => {
          op.forEach(c => {
            if (json0.canOpAffectPath(c, path)) {
              dispatch({ type: 'remoteOp', c });
            }
          });
        }, 0);
      }
    };

    // Update on each change.
    vizContentDoc.on('op', transformCursor);

    return () => {
      vizContentDoc.off('op', transformCursor);
    };
  }, [vizContentDoc, name, realtimeModules]);

  return (
    <Wrapper
      className="test-codearea-textarea"
      ref={ref}
      onChange={event => {
        onTextChange(event.target.value);
      }}
      onSelect={updateSelection}
      readOnly={!allowEditing}
    />
  );
};
