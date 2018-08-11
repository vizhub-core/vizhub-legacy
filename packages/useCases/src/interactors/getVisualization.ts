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
  userGateway: VisualizationGateway;

  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.userGateway = userGateway;
  }

  async execute(requestModel: GetVisualizationRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });

    return { visualization };
  }
}
