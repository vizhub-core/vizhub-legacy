import { Document } from './document';

// This file represents the domain entity called Visualization.
export const Visualization = data => (
  Object.assign(Document(data, 'visualization'), {

    // A representation of "files",
    // where keys are file names,
    // and values are file content (text only)
    //
    // Files include:
    //
    //   index.html - Required, the main HTML page.
    //   index.js - Optional, the JS entry point.
    //     This JavaScript may import other JS files in this Visualization using ES6 imports,
    //       of the form `import { something } from './${filename}';`
    //     Modules from any D3 package (except the root d3 package) may also be imported,
    //       of the form `import { selection } from 'd3-selection';`
    //     Importing JS files from other Visualizations is also possible using ES6 imports,
    //       of the form `import { something } from './${username}/${slug}/${filename}';`
    //     Loading datasets may occur,
    //       of the form `${d3.fetch method}(./${username}/${slug}.${format})`
    //       where d3.fetch method is one of 'csv', 'tsv', 'json', or 'text';
    files: data.files
  })
);
