import { Fragment } from 'react';
import { PermalinkPreview } from './permalinkPreview';
import { DatasetContentTextPreview } from './datasetContentTextPreview';

export const AfterFileChosen = props => {
  const { chosenFile, name, onNameChange, onUploadClick, userName } = props;
  return (
    <Fragment>
      <div className='field has-text-left'>
        <label className='label'>Choose a name:</label>
        <div className='control'>
          <input
            className='input test-dataset-upload-name-input'
            type='text'
            value={name}
            onChange={event => onNameChange(event.target.value)}
          />
        </div>
      </div>
      <div className='field has-text-left'>
        <PermalinkPreview userName={userName} slug={chosenFile.name} />
      </div>
      <div className='field'>
        <DatasetContentTextPreview text={chosenFile.text} />
      </div>
      <div className='field'>
        <div
          className='button test-dataset-upload-submit'
          onClick={onUploadClick}
        >
          Upload
        </div>
      </div>
    </Fragment>
  );
}
