import { Visualization, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../../interactor';
import { VisualizationGateway } from '../../gatewayInterfaces/visualizationGateway';
import { zipVisualization } from './zipVisualization';

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

    return zipVisualization(visualization);
  }
}
