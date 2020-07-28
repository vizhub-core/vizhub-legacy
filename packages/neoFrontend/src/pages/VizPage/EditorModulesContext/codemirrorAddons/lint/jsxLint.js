import CodeMirror from 'codemirror';

const parseErrors = (errors) => {
  return errors.map((error) => {
    var start = error.column - 1,
      end = start + 1;

    // Convert to format expected by validation service
    return {
      message: error.message,
      severity: error.severity === 1 ? 'warning' : 'error',
      from: CodeMirror.Pos(error.line - 1, start),
      to: CodeMirror.Pos(error.line - 1, end),
    };
  });
};

const validator = (text, callback) => {
  const linterModulePromise = import('eslint4b');
  const lintrcModulePromise = import('./eslintrc');

  Promise.all([linterModulePromise, lintrcModulePromise]).then(
    ([linterModule, lintrcModule]) => {
      const Linter = linterModule.default;
      const linter = new Linter();
      const { config } = lintrcModule;
      const results = linter.verify(text, config);
      callback(parseErrors(results));
    }
  );
};

validator.async = true;

CodeMirror.registerHelper('lint', 'javascript', validator);
