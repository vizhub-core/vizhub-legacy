export class GetForks {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    const forks = await this.visualizationGateway.getForks(
      requestModel
    );

    return forks
  }
}
