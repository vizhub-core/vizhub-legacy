import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetVisualizationInfos {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute(args) {
    const visualizationInfos = await this.visualizationGateway.getVisualizationInfos(args);

    const ownerUsers = await this.getOwnersInteractor.execute(
      visualizationInfos
    );

    return {
      visualizationInfos,
      ownerUsers,
    };
  }
}
