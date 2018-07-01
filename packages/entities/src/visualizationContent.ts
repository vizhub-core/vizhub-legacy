import { DocumentContent } from './documentContent';
import { File } from './file';

export class VisualizationContent extends DocumentContent {

  // A representation of "files".
  //
  // Expected files include:
  //
  //   index.html - Required, the main HTML page.
  //   index.js - Optional, the JS entry point.
  //     May import other JS files in this Visualization using ES6 imports,
  //       `import { something } from './${filename}';`
  //     Modules from any library may also be imported,
  //       `import { something } from '${library.slug}';`
  //     Modules from other Visualizations is also possible using ES6 imports,
  //       `import { something } from './${username}/${slug}/${filename}';`
  //     Loading datasets may occur,
  //       of the form `${d3.fetch method}(./${username}/${slug}.${format})`
  //       where d3.fetch method is one of 'csv', 'tsv', 'json', or 'text';
  //   styles.css - Optional, CSS file, could be any name ending with .css.
  files: File[];

  constructor(data) {
    super(data.id);

    this.files = data.files;
  }
}
