import { Visualization, UserId, DocumentId, timestamp } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway';
import { UserGateway } from '../gatewayInterfaces/userGateway';
import { generateId } from '../utils/generateId';

export interface DeleteVisualizationRequestModel extends RequestModel {
  id: DocumentId,
  userId: UserId
}

export interface DeleteVisualizationResponseModel extends ResponseModel {
  status: string
}

export class DeleteVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: DeleteVisualizationRequestModel) {
    const { id, userId } = requestModel;

    if (!userId) {
      throw new Error(i18n('errorNoOwner'))
    }

    const visualization = await this.visualizationGateway.getVisualization({ id });

    if (visualization.info.owner !== userId) {
      throw new Error(i18n('errorNotOwnerCantDelete'))
    }

    return await this.visualizationGateway.deleteVisualization({ id });
  }
}
