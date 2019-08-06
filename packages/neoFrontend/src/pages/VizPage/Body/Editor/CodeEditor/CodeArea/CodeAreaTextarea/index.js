import React, { useContext, useEffect, useRef } from 'react';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { onFileChange } from '../onFileChange';

export const CodeAreaTextarea = ({ file, fileIndex, submitVizContentOp }) => {
  const { text } = file;
  const allowEditing = submitVizContentOp ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);
  const onTextChange = onFileChange(
    text,
    fileIndex,
    submitVizContentOp,
    realtimeModules
  );

  const ref = useRef();

  // TODO submit presence
  // onSelect={updateSelection}
  //const updateSelection = () => {
  //  const { selectionStart, selectionEnd } = ref.current;
  //  console.log({selectionStart, selectionEnd});
  //};

  useEffect(() => {
    const { selectionStart, selectionEnd } = ref.current;
    ref.current.value = text;
    ref.current.setSelectionRange(selectionStart, selectionEnd);
  }, [text, ref]);

  return (
    <Wrapper
      className="test-codearea-textarea"
      ref={ref}
      onChange={event => {
        onTextChange(event.target.value);
      }}
      readOnly={!allowEditing}
    />
  );
};
