import { Visualization, User, DocumentId } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { GetUser } from './getUser';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway';
import { UserGateway } from '../gatewayInterfaces/userGateway';

export interface GetVisualizationRequestModel extends RequestModel {
  id: DocumentId
}

export interface GetVisualizationResponseModel extends ResponseModel {
  visualization: Visualization,
  user: User
}

export class GetVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;
  getUser: GetUser;

  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
  }

  async execute(requestModel: GetVisualizationRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });

    const { user } = await this.getUser.execute({
      id: visualization.info.owner
    })

    return {
      visualization,
      ownerUser: user
    };
  }
}
