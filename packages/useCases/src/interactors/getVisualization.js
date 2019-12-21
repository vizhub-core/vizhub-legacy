import { i18n } from 'vizhub-i18n';
import { GetUser } from './getUser';
import { GetVisualizationInfo } from './getVisualizationInfo';

export class GetVisualization {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
    this.getVisualizationInfo = new GetVisualizationInfo({
      visualizationGateway
    });
  }

  async execute(requestModel) {
    console.log(requestModel);
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });

    const owner = (await this.getUser.execute({
      id: visualization.info.owner
    })).user;

    const userId = requestModel.user;
    const vizInfo = visualization.info;

    // Only allow owners to get private documents.
    if(vizInfo.privacy === 'private'){
      if (vizInfo.owner !== userId) {
        throw new Error('This visualization is private.');
      }
    }

    let forkedFromVisualizationInfo;
    let forkedFromVisualizationOwnerUserName;
    try {
      if (visualization.info.forkedFrom) {
        const response = await this.getVisualizationInfo.execute({
          id: visualization.info.forkedFrom
        });
        const { visualizationInfo } = response;

        // Detect the case that the forked from visualization has been deleted.
        // In this case, don't show the viz as being forked from anything.
        // TODO preserve lineage somehow
        //  - reset it to be forked from the nearest ancestor?
        //  - reset it to be formed from the most similar past viz?
        if (visualizationInfo.owner) {
          forkedFromVisualizationInfo = visualizationInfo;
          const { user } = await this.getUser.execute({
            id: forkedFromVisualizationInfo.owner
          });
          forkedFromVisualizationOwnerUserName = user.userName;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return {
      visualization,
      ownerUser: owner,
      forkedFromVisualizationInfo,
      forkedFromVisualizationOwnerUserName
    };
  }
}
