import React, { useContext } from 'react';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { generateFileChangeOp } from './generateFileChangeOp';

export const CodeAreaTextarea = ({ file, vizContentDoc }) => {
  const { name, text } = file;

  const allowEditing = vizContentDoc ? true : false;

  const realtimeModules = useContext(RealtimeModulesContext);

  const onTextChange = newText => {
    const files = vizContentDoc.data.files;
    const op = generateFileChangeOp(files, name, newText, realtimeModules);
    vizContentDoc.submitOp(op);
  };

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
