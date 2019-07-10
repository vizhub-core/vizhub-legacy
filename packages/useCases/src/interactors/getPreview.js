import { i18n } from 'vizhub-i18n';

export class GetPreview {
  constructor({ imageStorageGateway }) {
    this.imageStorageGateway = imageStorageGateway;
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const preview = await this.imageStorageGateway.getPreview({
      id: requestModel.id
    });

    return { preview };
  }
}
