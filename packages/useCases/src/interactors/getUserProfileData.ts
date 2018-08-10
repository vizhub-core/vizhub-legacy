import { User, VisualizationInfo, ciUser } from 'datavis-tech-entities';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { UserGateway } from '../gatewayInterfaces/userGateway'
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'

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

  constructor({ userGateway, visualizationGateway }) {
    this.userGateway = userGateway;
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: GetUserProfileDataRequestModel) {
    const { userName } = requestModel;

    const user: User = (
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName)
    );

    const visualizationInfos = await this.visualizationGateway
      .getVisualizationInfosByUserId(user.id);

    return { user, visualizationInfos };
  }
}
