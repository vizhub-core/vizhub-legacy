import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetSharedVisualizations {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute({ collaborators, offset }) {
    const visualizationInfos = await this.visualizationGateway.searchVisualizationInfos(
      {
        offset,
        collaborators,
        inlcudePrivate: true,
      }
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
