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

const validator = async (text, callback) => {
  const Linter = (await import('eslint4b')).default;
  const { config } = await import('./eslintrc');

  const jsxUsesReactRule = (
    await import('eslint-plugin-react/lib/rules/jsx-uses-react')
  ).default;
  const jsxUsesVarsRule = (
    await import('eslint-plugin-react/lib/rules/jsx-uses-vars')
  ).default;

  const linter = new Linter();

  linter.defineRule('react/jsx-uses-react', jsxUsesReactRule);
  linter.defineRule('react/jsx-uses-vars', jsxUsesVarsRule);

  const results = linter.verify(text, config);

  callback(parseErrors(results));
};

validator.async = true;

CodeMirror.registerHelper('lint', 'javascript', validator);
