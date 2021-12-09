import { i18n } from 'vizhub-i18n';
import { SendEvent } from './sendEvent';

export class DeleteVisualization {
  constructor({ visualizationGateway, eventRecordsGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.sendEvent = new SendEvent({ eventRecordsGateway });
  }

  async execute(requestModel) {
    const { id, userId } = requestModel;

    if (!userId) {
      throw new Error(i18n('errorNoOwner'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id,
    });

    const vizOwner = visualization.info.owner;
    if (vizOwner !== userId) {
      throw new Error(i18n('errorNotOwnerCantDelete'));
    }

    // No need to "await" this as we can return immediately.
    if (visualization.info.forkedFrom != null) {
      this.visualizationGateway.decrementForksCount({
        id: visualization.info.forkedFrom,
      });
    }

    // No need to "await" this as we can return immediately.
    const eventIDs = `event.interaction.viz.delete.owner:${vizOwner}`;
    this.sendEvent.execute({ eventIDs });

    return await this.visualizationGateway.deleteVisualization({ id });
  }
}
