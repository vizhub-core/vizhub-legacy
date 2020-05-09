import { i18n } from 'vizhub-i18n';

export class DeleteVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    const { id, userId } = requestModel;

    if (!userId) {
      throw new Error(i18n('errorNoOwner'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id,
    });

    if (visualization.info.owner !== userId) {
      throw new Error(i18n('errorNotOwnerCantDelete'));
    }

    return await this.visualizationGateway.deleteVisualization({ id });
  }
}
