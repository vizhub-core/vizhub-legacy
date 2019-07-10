import { DocumentContent } from './documentContent';
import { VISUALIZATION_TYPE } from './documentTypes';

export class VisualizationContent extends DocumentContent {
  constructor(data) {
    super({
      id: data.id,
      documentType: VISUALIZATION_TYPE
    });

    // A representation of "files".
    //
    // Expected files include:
    //
    //   index.html - Required, the main HTML page.
    //   index.js - Optional, the JS entry point.
    //     May import other JS files in this Visualization using ES6 imports,
    //       `import { something } from './${filename}';`
    //   styles.css - Optional, CSS file, could be any name ending with .css.
    this.files = data.files;
  }
}
