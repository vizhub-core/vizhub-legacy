export const config = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'no-undef': 1,
    'no-unreachable': 1,
    'no-unreachable-loop': 1,
    'no-unused-expressions': 1,
    'no-unused-labels': 1,
    'no-unused-vars': 1,
    'no-useless-backreference': 1,
    'no-useless-call': 1,
    'no-useless-catch': 1,
    'no-useless-computed-key': 1,
    'no-useless-concat': 1,
    'no-useless-constructor': 1,
    'no-useless-escape': 1,
    'no-useless-rename': 1,
    'no-useless-return': 1,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
  },
  env: {
    browser: true,
    es6: true,
  },
};
