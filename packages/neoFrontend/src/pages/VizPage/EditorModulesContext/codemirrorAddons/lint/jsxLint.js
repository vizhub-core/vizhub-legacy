import CodeMirror from 'codemirror';
import Linter from 'eslint4b';
import { config } from './eslintrc';

const linter = new Linter();

const parseErrors = (errors) => {
  return errors.map((error) => {
    var start = error.column - 1, end = start + 1;

    // Convert to format expected by validation service
    return {
      message: error.message,
      severity: error.severity === 1 ? 'warning' : 'error',
      from: CodeMirror.Pos(error.line - 1, start),
      to: CodeMirror.Pos(error.line - 1, end)
    };
  });
};

const validator = (text) => {
  const results = linter.verify(text, config);
  return parseErrors(results);
};

CodeMirror.registerHelper('lint', 'javascript', validator);