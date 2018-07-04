import 'codemirror/lib/codemirror.css';
import '../../css/ubuntu.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';

export const CodeEditor = ({ value, onSave }) => {
  if (!process.browser) {
    return null;
  }
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml')
  require('codemirror/mode/css/css')
  require('codemirror/mode/htmlmixed/htmlmixed')

  return (
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
    />
  );
}
