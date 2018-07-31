import { Component } from 'react';
import { FileUploader } from './fileUploader';
import { suggestedName } from './suggestedName';
import { AfterFileChosen } from './afterFileChosen';
import { toFileName } from './toFileName';

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

    this.onNameChange = name => {
      this.setState({
        chosenFile: Object.assign({}, this.state.chosenFile, {
          name: toFileName(name)
        }),
        name
      });
    };

    this.onUploadClick = () => {
      this.props.onUploadDataset({
        name: this.state.name,
        file: this.state.chosenFile
      });
    };
  }

  render() {
    const { chosenFile, name } = this.state;
    return (
      chosenFile
        ? (
          <AfterFileChosen
            chosenFile={chosenFile}
            name={name}
            onNameChange={this.onNameChange}
            onUploadClick={this.onUploadClick}
          />
        )
        : <FileUploader onFileChosen={this.onFileChosen} />
    );
  }

};

export const BodyNotAuthenticated = () => (
  <div>You must first log in to upload a dataset.</div>
);
