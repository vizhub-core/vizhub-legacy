import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
 
export const CodeEditor = () => (
  <CodeMirror
    value='<h1>I ♥ react-codemirror2</h1>'
    options={{
      mode: 'xml',
      theme: 'material',
      lineNumbers: true
    }}
    onChange={(editor, data, value) => {
      console.log('change');
    }}
  />
)
