import { Fragment } from 'react';
import { ChosenFileIndicator } from './chosenFileIndicator';

export const AfterFileChosen = props => {
  const { chosenFile, name, onNameChange, onUploadClick } = props;
  return (
    <Fragment>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            value={name}
            onChange={event => onNameChange(event.target.value)}
          />
        </div>
      </div>
      <div className='field'>
        <ChosenFileIndicator chosenFile={chosenFile} />
      </div>
      <div className='field'>
        <div className='button' onClick={onUploadClick}>
          Upload
        </div>
      </div>
    </Fragment>
  );
}
