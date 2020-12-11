import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetTemplatesData {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute(offset) {
    const visualizationInfos = await this.visualizationGateway.getTemplatesVisualizationInfos(
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
