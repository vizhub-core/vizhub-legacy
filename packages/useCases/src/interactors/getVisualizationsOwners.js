export class GetVisualizationsOwners {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(visualizationInfos) {
    const ownerUserIds = Array.from(
      new Set(visualizationInfos.map(({ owner }) => owner))
    );

    const ownerUsers = await this.userGateway.getUsers(ownerUserIds);

    return ownerUsers;
  }
}
