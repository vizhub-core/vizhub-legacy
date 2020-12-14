import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetVisualizationInfos {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute({ offset, ids }) {
    const visualizationInfos = await this.visualizationGateway.getVisualizationInfos(
      { offset, ids }
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
