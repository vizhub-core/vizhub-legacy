import { ciUser } from 'vizhub-entities';

export class GetUserProfileData {
  constructor({ userGateway, visualizationGateway }) {
    this.userGateway = userGateway;
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    const { userName, ...otherProfileOptions } = requestModel;

    const user =
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName);

    const visualizationInfos = await this.visualizationGateway.getVisualizationInfosByUserId(
      {
        ...otherProfileOptions,
        offset: 0,
        includePrivate: false,
        owner: user.id,
      }
    );

    return { user, visualizationInfos };
  }
}
