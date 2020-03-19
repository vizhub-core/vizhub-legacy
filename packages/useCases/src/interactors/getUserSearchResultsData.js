export class GetUserSearchResultsData {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const users = await this.userGateway.searchUsers(requestModel);
    return { users };
  }
}
