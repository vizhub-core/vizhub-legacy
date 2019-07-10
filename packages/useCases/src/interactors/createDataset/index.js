import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../../utils/generateId';
import { removeExtension } from '../../utils/removeExtension';
import { datasetDefaults } from './datasetDefaults';

export class CreateDataset {
  constructor({ datasetGateway }) {
    this.datasetGateway = datasetGateway;
  }

  async execute(requestModel) {
    if (!requestModel.owner) {
      throw new Error(i18n('errorNoOwner'));
    }

    const { owner, title, file, sourceName, sourceUrl } = requestModel;
    const slug = file && removeExtension(file.name);
    const text = file && file.text;
    const id = generateId();

    // TODO validate slug uniqueness within this owner

    const nowTimestamp = timestamp();

    return await this.datasetGateway.createDataset(
      Object.assign({}, datasetDefaults, {
        owner,
        id,
        title,
        slug,
        text,
        sourceName,
        sourceUrl,
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp
      })
    );
  }
}
