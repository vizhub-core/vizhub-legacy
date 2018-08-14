import { Fragment } from 'react';
import { PermalinkPreview } from '../../components/atoms/permalinkPreview';
import { DatasetContentTextPreview } from '../../components/atoms/datasetContentTextPreview';

export const AfterFileChosen = props => {
  const {
    chosenFile,
    name,
    onNameChange,
    onUploadClick,
    userName,
    onSourceChange,
    onSourceUrlChange
  } = props;

  return (
    <Fragment>
      <div className='field has-text-left'>
        <label
          title='Choose a name for this dataset.'
          className='label'
        >
          Choose a name
        </label>
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
      <div className='field has-text-left'>
        <label
          title={`Where did this data come from?
For example "UCI Machine Learning Repository"`}
          className='label'
        >
          Source name
        </label>
        <div className='control'>
          <input
            className='input test-dataset-upload-source-input'
            type='text'
            onChange={event => onSourceChange(event.target.value)}
          />
        </div>
        <label
          title={`Which Web page was this dataset downloaded from?
For example https://archive.ics.uci.edu/ml/datasets/Iris`}
          className='label'
        >
          Source URL
        </label>
        <div className='control'>
          <input
            className='input test-dataset-upload-source-url-input'
            type='text'
            onChange={event => onSourceUrlChange(event.target.value)}
          />
        </div>
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
