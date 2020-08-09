import { ciUser } from 'vizhub-entities';

export class GetVisualizationsOwners {
  constructor({ userGateway }) {
    this.userGateway = userGateway;
  }

  async execute(visualizationInfos) {
    const ownerUserIdsSet = new Set(
      visualizationInfos.map(({ owner }) => owner)
    );
    const ownerUserIds = Array.from(ownerUserIdsSet);

    let ownerUsers = await this.userGateway.getUsers(ownerUserIds);
    if (ownerUsers === null) {
      ownerUsers = [];
    }
    if (ownerUserIdsSet.has(ciUser.id)) {
      ownerUsers.push(ciUser);
    }

    return ownerUsers;
  }
}
