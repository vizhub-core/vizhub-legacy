import { Dataset, UserId, ciUser } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { DatasetGateway } from '../gatewayInterfaces/datasetGateway'
import { UserGateway } from '../gatewayInterfaces/userGateway'

export interface GetDatasetRequestModel extends RequestModel {
  userName: string,
  slug: string
}

export interface GetDatasetResponseModel extends ResponseModel {
  dataset: Dataset
}

export class GetDataset implements Interactor {
  datasetGateway: DatasetGateway;
  userGateway: UserGateway;

  constructor({ userGateway, datasetGateway }) {
    this.userGateway = userGateway;
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel: GetDatasetRequestModel) {
    const { slug, userName } = requestModel;
    if (!slug) {
      throw new Error(i18n('errorNoId'))
    }

    const ownerUser = (
      userName === ciUser.userName
        ? ciUser
        : await this.userGateway.getUserByUserName(userName)
    );

    return await this.datasetGateway.getDataset({
      owner: ownerUser.id,
      slug
    });
  }
}
