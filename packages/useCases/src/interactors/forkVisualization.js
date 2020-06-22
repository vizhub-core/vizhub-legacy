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

    const { forksCount = 0 } = visualization.info;

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
      this.getUser.execute({ id: owner })
    ]);

  await this.visualizationGateway.saveVisualization({
    visualization: {
      ...visualization,
      info: {
        ...visualization.info,
        forksCount: forksCount + 1,
      }
    }
  })

    return { id, userName };
  }
}
