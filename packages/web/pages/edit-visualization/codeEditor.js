import 'codemirror/lib/codemirror.css';
import '../../css/ubuntu.css';
import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

export class CodeEditor extends Component {

  constructor(props) {
    super(props);

    // For end-to-end testing.
    this.containerDiv = React.createRef();
    this.exposeValueOnContainerDiv = value => {
      this.containerDiv.current.value = value;
    };
  }

  componentDidMount() {
    this.exposeValueOnContainerDiv(this.value);
  }

  render() {
    const { value, onSave, onTextChange } = this.props;

    if (!process.browser) {
      return null;
    }

    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml');
    require('codemirror/mode/css/css');
    require('codemirror/mode/htmlmixed/htmlmixed');

    return (
      <div
        className='code-editor-container test-code-editor'
        ref={this.containerDiv}
      >
        <CodeMirror
          value={value}
          options={{
            mode: 'htmlmixed',
            theme: 'ubuntu',
            lineNumbers: true
          }}
          onKeyDown={(editor, event) => {

            // Shift+Enter is the interaction for saving.
            if (event.shiftKey && event.code === 'Enter') {
              event.preventDefault();
              onSave(editor.getValue());
            }
          }}
          onBeforeChange={(editor, data, value) => {
            onTextChange(value)
          }}
          editorDidMount={editor => {
            this.value = editor.getValue();
          }}
        />
      </div>
    );
  }
}
