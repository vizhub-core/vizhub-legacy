import { i18n } from 'vizhub-i18n';
import { GetUser } from './getUser';

export class GetVisualization {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
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

    return {
      visualization,
      ownerUser: user
    };
  }
}
