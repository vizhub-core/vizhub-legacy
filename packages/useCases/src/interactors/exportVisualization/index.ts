import { Visualization, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../../interactor';
import { VisualizationGateway } from '../../gatewayInterfaces/visualizationGateway';
import { zipFiles } from './zipFiles';

export interface ExportVisualizationRequestModel extends RequestModel {
  id: DocumentId
}

export interface ExportVisualizationResponseModel extends ResponseModel {
  zipFileBuffer: any,
  zipFileName: string
}

export class ExportVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: ExportVisualizationRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
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
