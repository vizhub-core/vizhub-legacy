import { Visualization, UserId, timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'

export interface SaveVisualizationRequestModel extends RequestModel {
  visualization: Visualization,
  userId: UserId
}

export interface SaveVisualizationResponseModel extends ResponseModel {
  status: string
}

export class SaveVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: SaveVisualizationRequestModel) {
    const { visualization, userId } = requestModel;
    if (visualization.info.owner !== userId) {
      throw new Error(i18n('errorNotOwnerCantSave'))
    }
    visualization.info.lastUpdatedTimestamp = timestamp();
    return await this.visualizationGateway.saveVisualization(requestModel);
  }
}
