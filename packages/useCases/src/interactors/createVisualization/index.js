import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../../utils/generateId';
import { visualizationDefaults } from './visualizationDefaults';

export class CreateVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    if (!requestModel.owner) {
      throw new Error(i18n('errorNoOwner'));
    }

    const nowTimestamp = timestamp();

    return await this.visualizationGateway.createVisualization(
      Object.assign({}, visualizationDefaults, {
        owner: requestModel.owner,
        id: generateId(),
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp,
      })
    );
  }
}
