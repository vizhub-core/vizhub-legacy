import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

let Inlet;

if (process.browser) {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/htmlmixed/htmlmixed');
  require('codemirror/mode/markdown/markdown');
  require('codemirror/addon/comment/comment');

  // Sublime bindings setup inspired by
  // https://codemirror.net/demo/sublime.html
  require('codemirror/addon/search/searchcursor.js');
  require('codemirror/addon/search/search.js');
  require('codemirror/addon/dialog/dialog.js');
  require('codemirror/addon/edit/matchbrackets.js');
  require('codemirror/addon/edit/closebrackets.js');
  require('codemirror/addon/wrap/hardwrap.js');
  require('codemirror/addon/fold/foldcode.js');
  require('codemirror/addon/fold/brace-fold.js');
  require('codemirror/keymap/sublime.js');

  Inlet = require('codemirror-inlet/index-browserify');
}

// This component depends on the following CSS:
//   codemirror/lib/codemirror.css
//   ../css/ubuntu.css

const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown'
};
const extension = fileName => fileName.substr(fileName.lastIndexOf('.'));
const getMode = fileName => modes[extension(fileName)];

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
    const { fileName, value, onTextChange } = this.props;

    if (!process.browser) {
      return null;
    }

    return (
      <div
        className='code-editor-container test-code-editor'
        ref={this.containerDiv}
      >
        <CodeMirror
          value={value}
          options={{
            mode: getMode(fileName),
            theme: 'ubuntu',
            lineNumbers: true,
            lineWrapping: true,
            keyMap: 'sublime',
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            tabSize: 2
          }}
          onBeforeChange={(editor, data, value) => {
            onTextChange(value)
          }}
          editorDidMount={editor => {
            this.value = editor.getValue();
            Inlet && Inlet(editor);
          }}
        />
      </div>
    );
  }
}
