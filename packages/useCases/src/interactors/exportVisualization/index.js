import { i18n } from 'vizhub-i18n';
import { zipFiles } from './zipFiles';
import {
  getFileIndex,
  getComputedIndexHtml,
  getLibraries,
} from 'vizhub-presenters';

export class ExportVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id,
    });

    const libraries = getLibraries(visualization.content.files);

    const globalsJSON = JSON.stringify(libraries);
    const externalJSON = JSON.stringify(Object.keys(libraries));

    const files = visualization.content.files.concat([
      {
        name: 'package.json',
        text: `{
  "scripts": {
    "build": "rollup -c"
  },
  "devDependencies": {
    "rollup": "latest",
    "@rollup/plugin-buble": "latest"
  }
}`,
      },
      {
        name: 'rollup.config.js',
        text: `const buble = require('@rollup/plugin-buble');
  
  export default {
  input: 'index.js',
  external: ${externalJSON},
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: ${globalsJSON}
  },
  plugins: [buble()]
};`,
      },
    ]);

    const indexHtmlFileIndex = getFileIndex(files, 'index.html');
    files[indexHtmlFileIndex].text = getComputedIndexHtml(files);

    const zipFileBuffer = zipFiles(files);
    const zipFileName = visualization.info.title + '.zip';

    return { zipFileBuffer, zipFileName };
  }
}
