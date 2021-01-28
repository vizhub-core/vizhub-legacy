import { ciUser } from 'vizhub-entities';

export class GetUserProfileData {
  constructor({ userGateway, visualizationGateway }) {
    this.userGateway = userGateway;
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    const { section = 'public', userName, authenticatedUser, ...otherProfileOptions } = requestModel;

    const user =
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName);

    const searchParams = {
      ...otherProfileOptions,
      offset: 0,
      includePrivare: authenticatedUser === user.id,
    };

    if (section === 'shared') {
      searchParams.collaborators = [user.id];
    } else {
      searchParams.owner = user.id;
    }

    const visualizationInfos = await this.visualizationGateway.searchVisualizationInfos(searchParams);

    return { user, [section]: visualizationInfos };
  }
}
