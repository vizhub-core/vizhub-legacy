// This file represents the domain entity called Visualization.
export const dataset = data => ({

  // The title of the visualization.
  title: data.title,

  // The URL slug for the visualization.
  slug: data.slug,

  // The ID of the user that owns this visualization
  owner: data.owner,

  // The Markdown description of the visualization.
  description: data.description,

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
  //     Importing JS files from other Visualizations is also possible using ES6 imports,
  //       of the form `import { something } from './${username}/${slug}/${filename}';`
  files: data.files,

  // The datasets used by this visualization.
  datasets: data.datasets
});
