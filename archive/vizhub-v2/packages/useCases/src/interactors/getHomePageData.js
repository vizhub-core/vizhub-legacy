import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetHomePageData {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute(offset) {
    const visualizationInfos = await this.visualizationGateway.getHomePageVisualizationInfos(
      offset
    );

    const ownerUsers = await this.getOwnersInteractor.execute(
      visualizationInfos
    );

    return {
      visualizationInfos,
      ownerUsers,
    };
  }
}
