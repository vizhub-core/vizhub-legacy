import assert from 'assert';

const vizData = {
  views: 1234,
  upvotes: 2345,
  downvotes: 5,
  workingState:{
    state: {
      title: "A Viz",
      showGrid: true,
      markColor: "#FFEEDD",
      maxCircleRadius: 50
    },
    files: {

      // Keys are random, so that file renames are trivial via JSON OT.
      '9043411906112002': {
        name: 'index.html',
        
        // Parcel-style script tag declaration directly into ES6 module (magic).
        text: '<html><body>Hello World<script src="index.js"></body></html>',

        // Hash of text is stored to detect content changes in application code.
        // https://www.npmjs.com/package/@emotion/hash
        hash: '12fj1d'
      },

    }
  },

describe('Entities', () => {
  describe('Viz', () => {
    it('', () => {
      assert.deepEqual(new VisualizationViewModel(visualization), {
      });
    });
  });
