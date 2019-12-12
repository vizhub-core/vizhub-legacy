export class GetHomePageData {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute() {
    return {
      visualizationInfos: await this.visualizationGateway.getHomePageVisualizationInfos()
    };
  }
}
