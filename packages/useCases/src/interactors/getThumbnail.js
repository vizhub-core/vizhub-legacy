import { i18n } from 'vizhub-i18n';

export class GetThumbnail {
  constructor({ imageStorageGateway }) {
    this.imageStorageGateway = imageStorageGateway;
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const thumbnail = await this.imageStorageGateway.getThumbnail({
      id: requestModel.id
    });

    return { thumbnail };
  }
}
