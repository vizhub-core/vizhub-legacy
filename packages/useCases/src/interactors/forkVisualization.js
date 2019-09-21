import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../utils/generateId';
import { GetUser } from './getUser';

export class ForkVisualization {
  constructor({ visualizationGateway, userGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
  }

  async execute(requestModel) {
    const { visualization, owner } = requestModel;

    if (!owner) {
      throw new Error(i18n('errorNoOwner'));
    }

    const nowTimestamp = timestamp();

    const [
      { id },
      {
        user: { userName }
      }
    ] = await Promise.all([
      this.visualizationGateway.createVisualization({
        owner,
        id: generateId(),
        title: visualization.info.title,
        slug: undefined,
        description: visualization.info.description,
        height: visualization.info.height,
        files: visualization.content.files,
        forkedFrom: visualization.info.id,
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp
      }),
      this.getUser.execute({ id: owner })
    ]);

    return { id, userName };
  }
}
