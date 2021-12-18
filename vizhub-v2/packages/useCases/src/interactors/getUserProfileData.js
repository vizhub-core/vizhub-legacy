import { ciUser } from 'vizhub-entities';

export class GetUserProfileData {
  constructor({ userGateway, visualizationGateway }) {
    this.userGateway = userGateway;
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    const {
      section = 'public',
      userName,
      authenticatedUser,
      ...otherProfileOptions
    } = requestModel;

    const user =
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName);

    const searchParams = {
      ...otherProfileOptions,
      offset: 0,
    };

    const isUserRequestOwnProfile = authenticatedUser === user.id;

    if (section === 'shared') {
      searchParams.collaborators = [user.id];
      searchParams.privacy = isUserRequestOwnProfile ? 'any' : 'public';
    }

    if (section === 'private') {
      searchParams.owner = user.id;
      searchParams.privacy = isUserRequestOwnProfile ? 'private' : 'public';
    }

    if (section === 'public') {
      searchParams.owner = user.id;
      searchParams.privacy = 'public';
    }

    const visualizationInfos =
      await this.visualizationGateway.searchVisualizationInfos(searchParams);

    return {
      user,
      visualizationInfosBySection: { [section]: visualizationInfos },
    };
  }
}
