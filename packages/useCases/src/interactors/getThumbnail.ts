import { Images, User, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { ImageStorageGateway } from '../gatewayInterfaces/imageStorageGateway';
import { UserGateway } from '../gatewayInterfaces/userGateway';

export interface GetThumbnailRequestModel extends RequestModel {
  id: DocumentId
}

export interface GetThumbnailResponseModel extends ResponseModel {
  thumbnail: string
}

export class GetThumbnail implements Interactor {
  imageStorageGateway: ImageStorageGateway;

  constructor({ imageStorageGateway, userGateway }) {
    this.imageStorageGateway = imageStorageGateway;
  }

  async execute(requestModel: GetThumbnailRequestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'))
    }

    const thumbnail = await this.imageStorageGateway.getThumbnail({
      id: requestModel.id
    });

    return { thumbnail };
  }
}
