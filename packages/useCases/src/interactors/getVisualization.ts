import { Visualization, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'

export interface GetVisualizationRequestModel extends RequestModel {
  id: DocumentId
}

export interface GetVisualizationResponseModel extends ResponseModel {
  visualization: Visualization
}

export class GetVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: GetVisualizationRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
    }

    return await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });
  }
}
