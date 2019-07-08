import { User, VisualizationInfo, ciUser } from 'vizhub-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'
import { DatasetGateway } from '../gatewayInterfaces/datasetGateway'

export interface GetAllVisualizationInfosResponseModel extends ResponseModel {
  visualizationInfos: [VisualizationInfo]
}

export class GetAllVisualizationInfos implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute() {
    return {
      visualizationInfos: await this.visualizationGateway.getAllVisualizationInfos()
    };
  }
}
