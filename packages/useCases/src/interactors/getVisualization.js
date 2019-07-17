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
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id
    });

    const { user } = await this.getUser.execute({
      id: visualization.info.owner
    });

    let forkedFromVisualizationInfo;
    if (visualization.info.forkedFrom) {
      const { visualizationInfo } = await this.getVisualizationInfo.execute({
        id: visualization.info.forkedFrom
      });
      forkedFromVisualizationInfo = visualizationInfo;
    }

    return {
      visualization,
      ownerUser: user,
      forkedFromVisualizationInfo
    };
  }
}
