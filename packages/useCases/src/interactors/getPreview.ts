import { Images, User, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { ImageStorageGateway } from '../gatewayInterfaces/imageStorageGateway';
import { UserGateway } from '../gatewayInterfaces/userGateway';

export interface GetPreviewRequestModel extends RequestModel {
  id: DocumentId
}

export interface GetPreviewResponseModel extends ResponseModel {
  preview: string
}

export class GetPreview implements Interactor {
  imageStorageGateway: ImageStorageGateway;

  constructor({ imageStorageGateway, userGateway }) {
    this.imageStorageGateway = imageStorageGateway;
  }

  async execute(requestModel: GetPreviewRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
    }

    const preview = await this.imageStorageGateway.getPreview({
      id: requestModel.id
    });

    return { preview };
  }
}
