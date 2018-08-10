import { DocumentContent } from './documentContent';
import { File } from './file';
import { VISUALIZATION_TYPE } from './documentTypes';

export class VisualizationContent extends DocumentContent {

  // A representation of "files".
  //
  // Expected files include:
  //
  //   index.html - Required, the main HTML page.
  //   index.js - Optional, the JS entry point.
  //     May import other JS files in this Visualization using ES6 imports,
  //       `import { something } from './${filename}';`
  //   styles.css - Optional, CSS file, could be any name ending with .css.
  files: File[];

  constructor(data) {
    super({
      id: data.id,
      documentType: VISUALIZATION_TYPE
    });

    this.files = data.files;
  }
}
