import 'codemirror/lib/codemirror.css';
import '../../css/ubuntu.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
export class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.containerDiv = React.createRef();
    this.exposeValueOnContainerDiv = value => {
      this.containerDiv.current.value = value;
    };
  }

  componentDidMount() {
    this.exposeValueOnContainerDiv(this.value);
  }

  render() {
    const { value, onSave } = this.props;

    if (!process.browser) {
      return null;
    }

    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml')
    require('codemirror/mode/css/css')
    require('codemirror/mode/htmlmixed/htmlmixed')

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
          onChange={(editor, data, value) => {
            console.log('change');
          }}
          onKeyDown={(editor, event) => {
            if (event.shiftKey && event.code === 'Enter') {
              event.preventDefault();
              onSave(editor.getValue());
            }
          }}
          editorDidMount={editor => {
            this.value = editor.getValue();
          }}
        />
      </div>
    );
  }
}
