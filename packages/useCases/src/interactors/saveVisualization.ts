import { Visualization, User } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'

export interface SaveVisualizationRequestModel extends RequestModel {
  visualization: Visualization,
  user: User
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
    return await this.visualizationGateway.saveVisualization(requestModel);
  }
}
