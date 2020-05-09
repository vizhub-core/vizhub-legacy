import { GetVisualizationsOwners } from './getVisualizationsOwners';

export class GetSearchResultsPageData {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;

    this.getOwnersInteractor = new GetVisualizationsOwners({ userGateway });
  }

  async execute(requestModel) {
    const visualizationInfos = await this.visualizationGateway.searchVisualizationInfos(
      requestModel
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
