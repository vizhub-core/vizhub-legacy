import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../utils/generateId';
import { GetUser } from './getUser';

// Feature flag.
const incrementForksCount = true;

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
        user: { userName },
      },
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
        forksCount: 0,
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp,
        privacy: visualization.info.privacy,
      }),
      this.getUser.execute({ id: owner }),
    ]);

    if (incrementForksCount) {
      await this.visualizationGateway.incrementForksCount({
        id: visualization.id,
      });
    }

    return { id, userName };
  }
}
