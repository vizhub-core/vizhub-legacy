import { createInstance } from './createInstance';

export function VizContent(data) {
  return createInstance(VizContent, data);
}

VizContent.keys = [
  // The unique ID of the document.
  'id',

  // A representation of "files".
  //
  // Expected files include:
  //
  //   index.html - Required, the main HTML page.
  //   index.js - Optional, the JS entry point.
  //     May import other JS files in this Visualization using ES6 imports,
  //       `import { something } from './${filename}';`
  //   styles.css - Optional, CSS file, could be any name ending with .css.
  'files',
];
