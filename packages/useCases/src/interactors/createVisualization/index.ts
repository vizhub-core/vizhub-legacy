import { UserId, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../../interactor';
import { VisualizationGateway } from '../../gatewayInterfaces/visualizationGateway'
import { generateId } from '../../utils/generateId';
import { visualizationDefaults } from './visualizationDefaults';

export interface CreateVisualizationRequestModel extends RequestModel {
  owner: UserId
}

export interface CreateVisualizationResponseModel extends ResponseModel {
  id: DocumentId
}

export class CreateVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: CreateVisualizationRequestModel) {

    if (!requestModel.owner) {
      throw new Error(i18n('errorNoOwner'))
    }
    
    return await this.visualizationGateway.createVisualization(
      Object.assign({}, visualizationDefaults, {
        owner: requestModel.owner,
        id: generateId()
      })
    )
  }
}
