import React, { useContext, useEffect } from 'react';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { onFileChange } from '../onFileChange';

export const CodeAreaTextarea = ({ file, vizContentDoc }) => {
  const { name, text } = file;
  const allowEditing = vizContentDoc ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);
  const onTextChange = onFileChange(name, vizContentDoc, realtimeModules);

  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    const transformCursor = op => {
      console.log('here');
    };

    // Update on each change.
    vizContentDoc.on('op', transformCursor);

    return () => {
      console.log('unsubscribing from ops in CodeAreaTextarea');
      vizContentDoc.off('op', transformCursor);
    };
  }, [vizContentDoc]);

  return (
    <Wrapper
      value={text}
      onChange={event => {
        onTextChange(event.target.value);
      }}
      readOnly={!allowEditing}
    />
  );
};
