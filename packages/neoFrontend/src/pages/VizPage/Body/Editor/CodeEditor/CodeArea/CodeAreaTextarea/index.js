import React, { useContext, useEffect, useState, useRef } from 'react';
import { getFileIndex } from '../../../../../../../accessors';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { onFileChange } from '../onFileChange';

export const CodeAreaTextarea = ({ file, vizContentDoc }) => {
  const { name, text } = file;
  const allowEditing = vizContentDoc ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);
  const onTextChange = onFileChange(name, vizContentDoc, realtimeModules);

  const ref = useRef();
  const [selection, setSelection] = useState([0, 0]);

  const updateSelection = () => {
    setSelection([ref.current.selectionStart, ref.current.selectionEnd]);
  };

  useEffect(() => {
    ref.current.value = text;
    ref.current.setSelectionRange(selection[0], selection[1]);
  }, [selection, ref, text]);

  // Test for cursor transform.
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          if (vizContentDoc) {
            vizContentDoc.submitOp({ si: 'd', p: ['files', 1, 'text', 0] });
          }
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
        console.log(json0);
        if (json0.canOpAffectPath(op[0], path)) {
          console.log(JSON.stringify(op[0]));
          console.log('TODO transform cursor here.');
        }
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
