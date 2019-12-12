export class GetHomePageData {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.userGateway = userGateway;
  }

  async execute(offset) {
    const visualizationInfos = await this.visualizationGateway.getHomePageVisualizationInfos(
      offset
    );

    const ownerUserIds = Array.from(
      new Set(visualizationInfos.map(({ owner }) => owner))
    );

    const ownerUsers = await this.userGateway.getUsers(ownerUserIds);

    return {
      visualizationInfos,
      ownerUsers
    };
  }
}
