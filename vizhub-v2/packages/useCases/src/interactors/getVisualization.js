import { i18n } from 'vizhub-i18n';
import { GetUser } from './getUser';
import { GetUsers } from './getUsers';
import { GetVisualizationInfo } from './getVisualizationInfo';
import { allowRead } from '../accessControl/allowRead';

export class GetVisualization {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
    this.getUsers = new GetUsers({ userGateway });
    this.getVisualizationInfo = new GetVisualizationInfo({
      visualizationGateway,
    });
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id,
    });

    const owner = (
      await this.getUser.execute({
        id: visualization.info.owner,
      })
    ).user;

    const userId = requestModel.user;
    const vizInfo = visualization.info;

    if (!allowRead(vizInfo, userId)) {
      throw new Error('This visualization is private.');
    }

    let forkedFromVisualizationInfo;
    let forkedFromVisualizationOwnerUserName;
    try {
      if (visualization.info.forkedFrom) {
        const response = await this.getVisualizationInfo.execute({
          id: visualization.info.forkedFrom,
        });
        const { visualizationInfo } = response;

        if (visualizationInfo.owner) {
          forkedFromVisualizationInfo = visualizationInfo;

          if (forkedFromVisualizationInfo) {
            const { user } = await this.getUser.execute({
              id: forkedFromVisualizationInfo.owner,
            });
            forkedFromVisualizationOwnerUserName = user.userName;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }

    const usersWhoUpvoted =
      vizInfo.upvotes && vizInfo.upvotes.length
        ? (
            await this.getUsers.execute({
              ids: vizInfo.upvotes.map(({ userId }) => userId),
            })
          ).users.map(({ userName }) => userName)
        : [];

    return {
      visualization,
      ownerUser: owner,
      forkedFromVisualizationInfo,
      forkedFromVisualizationOwnerUserName,
      usersWhoUpvoted,
    };
  }
}
