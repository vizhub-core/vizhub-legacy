module.exports = {
  'globals': {
    // Globals for Mocha
    'it': false,
    'describe': false,
    'after': false
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0
  }
};
