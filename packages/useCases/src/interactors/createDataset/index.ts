import { UserId, DocumentId, File } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../../interactor';
import { DatasetGateway } from '../../gatewayInterfaces/datasetGateway'
import { generateId } from '../../utils/generateId';
import { removeExtension } from '../../utils/removeExtension';
import { datasetDefaults } from './datasetDefaults';

export interface CreateDatasetRequestModel extends RequestModel {
  owner: UserId,
  title: string,
  slug: string | undefined,
  description: string,
  file: File,
  sourceName: string,
  sourceUrl: string,
}

export interface CreateDatasetResponseModel extends ResponseModel {
  slug: string
}

export class CreateDataset implements Interactor {
  datasetGateway: DatasetGateway;

  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel: CreateDatasetRequestModel) {

    if (!requestModel.owner) {
      throw new Error(i18n('errorNoOwner'))
    }

    const { owner, title, file, sourceName, sourceUrl } = requestModel;
    const slug = file && removeExtension(file.name);
    const text = file && file.text;
    const id = generateId();

    // TODO validate slug uniqueness within this owner
    
    return await this.datasetGateway.createDataset(
      Object.assign({}, datasetDefaults, {
        owner,
        id,
        title,
        slug,
        text,
        sourceName,
        sourceUrl
      })
    )
  }
}
