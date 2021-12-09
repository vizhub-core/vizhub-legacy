export class GetAllVisualizationInfos {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute() {
    return {
      visualizationInfos: await this.visualizationGateway.getAllVisualizationInfos(),
    };
  }
}
