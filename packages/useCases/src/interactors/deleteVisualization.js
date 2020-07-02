import { i18n } from 'vizhub-i18n';

// Feature flag.
const incrementForksCount = true;

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

    if (incrementForksCount && visualization.info.forkedFrom != null) {
      await this.visualizationGateway.decrementForksCount({
        id: visualization.info.forkedFrom,
      });
    }

    return await this.visualizationGateway.deleteVisualization({ id });
  }
}
