import { Dataset } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { DatasetGateway } from '../gatewayInterfaces/datasetGateway'

export interface GetDatasetRequestModel extends RequestModel {
  slug: string
}

export interface GetDatasetResponseModel extends ResponseModel {
  dataset: Dataset
}

export class GetDataset implements Interactor {
  datasetGateway: DatasetGateway;

  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel: GetDatasetRequestModel) {
    if (!requestModel.slug) {
      throw new Error(i18n('errorNoId'))
    }

    return await this.datasetGateway.getDataset({
      slug: requestModel.slug
    });
  }
}
