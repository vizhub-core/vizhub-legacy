export class GetVisualizationInfo {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute({ id }) {
    return {
      visualizationInfo: await this.visualizationGateway.getVisualizationInfo({
        id
      })
    };
  }
}
