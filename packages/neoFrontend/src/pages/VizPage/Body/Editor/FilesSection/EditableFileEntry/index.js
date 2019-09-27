import React, { useState, useCallback } from 'react';
import { Wrapper, EditableFileInput } from './styles';

export const EditableFileEntry = ({
  changeFileName,
  initialFileName,
  indent
}) => {
  const [fileName, setEditableFileNewName] = useState(initialFileName);

  const onEditableFileChange = useCallback(
    event => {
      setEditableFileNewName(event.target.value);
    },
    [setEditableFileNewName]
  );

  const onEditableFileBlur = useCallback(
    event => {
      changeFileName(event.target.value);
    },
    [changeFileName]
  );

  const onEditableFileKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        changeFileName(event.target.value);
      }
    },
    [changeFileName]
  );

  return (
    <Wrapper>
      <EditableFileInput
        type="text"
        value={fileName}
        onChange={onEditableFileChange}
        onBlur={onEditableFileBlur}
        onKeyDown={onEditableFileKeyDown}
        autoFocus
        indent={indent}
      />
    </Wrapper>
  );
};
