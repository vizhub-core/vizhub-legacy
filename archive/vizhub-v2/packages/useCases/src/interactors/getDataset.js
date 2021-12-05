import { ciUser } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';

export class GetDataset {
  constructor({ userGateway, datasetGateway }) {
    this.userGateway = userGateway;
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel) {
    const { slug, userName } = requestModel;
    if (!slug) {
      throw new Error(i18n('errorNoId'));
    }

    const ownerUser =
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName);

    return await this.datasetGateway.getDataset({
      owner: ownerUser.id,
      slug,
    });
  }
}
