import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/keymap/vim';

import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/edit/matchbrackets';
//import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
//import 'codemirror/addon/wrap/hardwrap';
//import 'codemirror/addon/fold/foldcode';
//import 'codemirror/addon/fold/brace-fold';
import 'codemirror/keymap/sublime';

import { bundle } from 'vizhub-presenters';

export { CodeMirror, bundle };
