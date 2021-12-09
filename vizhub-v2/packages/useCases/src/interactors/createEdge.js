export class CreateEdge {
  constructor({ revisionHistoryGateway }) {
    this.revisionHistoryGateway = revisionHistoryGateway;
  }

  async execute(requestModel) {
    return await this.revisionHistoryGateway.createEdge(requestModel);
  }
}
