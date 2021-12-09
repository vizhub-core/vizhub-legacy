import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';

export class SaveVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    throw new Error('DEPRECATED');
    //const { visualization, userId } = requestModel;
    //if (visualization.info.owner !== userId) {
    //  throw new Error(i18n('errorNotOwnerCantSave'));
    //}
    //visualization.info.lastUpdatedTimestamp = timestamp();
    //return await this.visualizationGateway.saveVisualization(requestModel);
  }
}
