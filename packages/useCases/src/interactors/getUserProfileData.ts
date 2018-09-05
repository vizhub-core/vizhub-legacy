import { User, VisualizationInfo, ciUser } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'
import { DatasetGateway } from '../gatewayInterfaces/datasetGateway'

export interface GetUserProfileDataRequestModel extends RequestModel {
  userName: string
}

export interface GetUserProfileDataResponseModel extends ResponseModel {
  user: User,
  visualizationInfos: [VisualizationInfo]
}

export class GetUserProfileData implements Interactor {
  userGateway: UserGateway;
  visualizationGateway: VisualizationGateway;
  datasetGateway: DatasetGateway;

  constructor({ userGateway, visualizationGateway, datasetGateway }) {
    this.userGateway = userGateway;
    this.visualizationGateway = visualizationGateway;
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel: GetUserProfileDataRequestModel) {
    const { userName } = requestModel;

    const user: User = (
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName)
    );

    const [visualizationInfos, datasetInfos] = await Promise.all([
      this.visualizationGateway.getVisualizationInfosByUserId(user.id),
      this.datasetGateway.getDatasetInfosByUserId(user.id)
    ]);

    return { user, visualizationInfos, datasetInfos };
  }
}
