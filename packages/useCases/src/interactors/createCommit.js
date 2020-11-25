export class CreateCommit {
  constructor({ revisionHistoryGateway }) {
    this.revisionHistoryGateway = revisionHistoryGateway;
  }

  async execute(requestModel) {
    return await this.revisionHistoryGateway.createCommit(requestModel);
  }
}
