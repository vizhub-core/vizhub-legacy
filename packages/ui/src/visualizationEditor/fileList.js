import React from 'react';
import classNames from 'classnames';

const BACKSPACE = 8;
const DELETE = 46;

export const FileList = props => {
  const {
    files,
    activeFileName,
    onFileClick,
    onFileDoubleClick,
    onFileDelete
  } = props;

  const isActive = file => file.name === activeFileName;

  const onKeyDown = event => {
    if (event.keyCode === BACKSPACE || event.keyCode === DELETE) {
      onFileDelete(activeFileName);
    }
  };

  return (
    <div className='file-list' tabIndex='0' onKeyDown={onKeyDown}>
      {
        files.map(file => (
          <div
            key={file.name}
            className={classNames('file', { active: isActive(file) })}
            onClick={() => onFileClick(file.name)}
            onDoubleClick={() => onFileDoubleClick(file.name)}
          >
            { file.name }
          </div>
        ))
      }
    </div>
  );
};
