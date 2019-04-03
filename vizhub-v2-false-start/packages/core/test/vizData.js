import { sampleCode } from './sampleCode';

export const vizData = {
  '57890243754890': {
    viewCount: 2048,
    upvotes: 2345,
    downvotes: 5,
    publishDateISOString: new Date().toISOString(),

    // Akin to the "working directory" using Git.
    working: {
      title: 'Visualization Title',
      // The configurable state variables for the Viz.
      state: {
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

      // The text files that define the Viz.
      files: {
        // Keys are random, so that file renames are trivial via JSON OT.
        '9043411906112002': {
          // The path and name of the file.
          path: './index.html',

          // Parcel-style script tag declaration directly into ES6 module (magic).
          text: `<html>
    <title>Visualization Title</title>
    <body>
      Hello World
      <script src="index.js">
    </body>
  </html>`

          // Hash of text is stored to detect content changes in application code.
          // https://www.npmjs.com/package/@emotion/hash
          // hash: '12fj1d'
        },

        '15886149663202853': {
          // Directories are defined implicitly as part of file paths.
          // Similar to https://github.com/Permutatrix/rollup-plugin-hypothetical#usage
          path: './styles/theme.css',

          text: 'body { margin: 0; }'
        },
        '17438295784932853': {
          path: './index.js',
          text: sampleCode
        }
      }
    },

    // References a Commit by id.
    // Related https://www.npmjs.com/package/hat
    head: '0c82a54f22f775a3ed8b97b2dea74036'
  }
};
