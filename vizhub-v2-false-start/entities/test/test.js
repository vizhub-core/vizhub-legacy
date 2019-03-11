import assert from 'assert';

const vizData = {
  views: 1234,
  upvotes: 2345,
  downvotes: 5,
  workingState: {
    state: {
      title: {
        type: 'string',
        value: 'A Viz'
      },
      showGrid: {
        type: 'boolean',
        value: true
      },
      markColor: {
        type: 'color',
        value: '#FFEEDD'
      },
      maxCircleRadius: {
        type: 'number',
        value: '30',
        min: 0,
        max: 100
      }
    },
    files: {
      // Keys are random, so that file renames are trivial via JSON OT.
      '9043411906112002': {
        path: 'index.html',

        // Parcel-style script tag declaration directly into ES6 module (magic).
        text: '<html><body>Hello World<script src="index.js"></body></html>',

        // Hash of text is stored to detect content changes in application code.
        // https://www.npmjs.com/package/@emotion/hash
        hash: '12fj1d'
      },

      '15886149663202853': {
        // Directories are defined implicitly as part of file paths.
        // Similar to https://github.com/Permutatrix/rollup-plugin-hypothetical#usage
        path: 'styles/theme.css',
        text: 'body { margin: 0; }',
        hash: '45hd69'
      }
    }
  },

  // References a Commit by id.
  // Related https://www.npmjs.com/package/hat
  head: '0c82a54f22f775a3ed8b97b2dea74036'
};

describe('Entities', () => {
  describe('Viz', () => {
    it('', () => {
      assert.equal('a', 'a');
    });
  });
});
