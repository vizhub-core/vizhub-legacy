import 'codemirror/lib/codemirror.css';
import '../../css/ubuntu.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
 
function foo() {
    var x = [...foo];
    return x * 5;
  /var/g
}
// This is jjkj
// [...foo]

export const CodeEditor = () => {
  if (!process.browser) {
    return null;
  }
  require('codemirror/mode/javascript/javascript');
  return (
    <CodeMirror
      value='const x = "foo";'
      options={{
        mode: 'javascript',
        theme: 'ubuntu',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        console.log('change');
      }}
    />
  );
}
