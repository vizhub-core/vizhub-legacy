import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../utils/generateId';

export class ForkVisualization {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.userGateway = userGateway;
  }

  async execute(requestModel) {
    const { visualization, owner } = requestModel;

    if (!owner) {
      throw new Error(i18n('errorNoOwner'));
    }

    const nowTimestamp = timestamp();

    const [{ id }, { userName }] = await Promise.all([
      this.visualizationGateway.createVisualization({
        owner,
        id: generateId(),
        title: visualization.info.title,
        slug: undefined,
        description: visualization.info.description,
        height: visualization.info.height,
        files: visualization.content.files,
        forkedFrom: visualization.id,
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp
      }),
      this.userGateway.getUser(owner)
    ]);

    return { id, userName };
  }
}
