import { User } from 'vizhub-entities';

export class CreateCommit {
  constructor({ revisionHistoryGateway }) {
    this.revisionHistoryGateway = revisionHistoryGateway;
  }

  async execute(requestModel) {
    const { id, viz, timestamp } = requestModel;
    const responseModel = {
      commit: await this.revisionHistoryGateway.createCommit({
        id,
        viz,
        timestamp,
      }),
    };
    return responseModel;
  }
}
