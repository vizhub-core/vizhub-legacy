import { i18n } from 'vizhub-i18n';
import { zipFiles } from './zipFiles';

export class ExportVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });

    const files = visualization.content.files.concat([
      {
        name: 'package.json',
        text: `{
  "scripts": {
    "build": "rollup -c"
  },
  "devDependencies": {
    "rollup": "latest"
  }
}`
      },
      {
        name: 'rollup.config.js',
        text: `export default {
  input: 'index.js',
  external: ['d3'],
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: { d3: 'd3' }
  }
};`
      }
    ]);

    const zipFileBuffer = zipFiles(files);
    const zipFileName = visualization.info.title + '.zip';

    return { zipFileBuffer, zipFileName };
  }
}
