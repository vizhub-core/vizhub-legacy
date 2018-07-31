import { Component, Fragment } from 'react';
import { FileUploader } from './fileUploader';
import { ChosenFileIndicator } from './chosenFileIndicator';
import { suggestedName } from './suggestedName';

const AfterFileChosen = ({chosenFile, name}) => (
  <Fragment>
    <div className='field'>
      <label className='label'>Name</label>
      <div className='control'>
        <input className='input' type='text' value={name} />
      </div>
    </div>
    <div className='field'>
      <ChosenFileIndicator chosenFile={chosenFile} />
    </div>
    <div className='field'>
      <div className='button'>
        Upload
      </div>
    </div>
  </Fragment>
);

export class BodyAuthenticated extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      chosenFile: null
    };

    this.onFileChosen = file => {
      this.setState({
        chosenFile: file,
        name: suggestedName(file.name)
      });
    };
  }

  render() {
    const { chosenFile, name } = this.state;

    return (
      chosenFile
        ? <AfterFileChosen chosenFile={chosenFile} name={name} />
        : <FileUploader onFileChosen={this.onFileChosen} />
    );
  }

};

export const BodyNotAuthenticated = () => (
  <div>You must first log in to upload a dataset.</div>
);
