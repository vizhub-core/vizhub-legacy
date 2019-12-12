export class GetHomePageData {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(offset) {
    return {
      visualizationInfos: await this.visualizationGateway.getHomePageVisualizationInfos(
        offset
      )
    };
  }
}
