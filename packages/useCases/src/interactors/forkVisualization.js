import { timestamp } from 'vizhub-entities';
import { i18n } from 'vizhub-i18n';
import { generateId } from '../utils/generateId';
import { GetUser } from './getUser';
import { SendEvent } from './sendEvent';

export class ForkVisualization {
  constructor({ visualizationGateway, userGateway, eventRecordsGateway }) {
    this.visualizationGateway = visualizationGateway;
    this.getUser = new GetUser({ userGateway });
    this.sendEvent = new SendEvent({ eventRecordsGateway });
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

    // No need to "await" this as we can return immediately.
    this.visualizationGateway.incrementForksCount({
      id: visualization.id,
    });

    // No need to "await" this as we can return immediately.
    this.sendEvent.execute({
      eventIDs: [
        'event',
        'event.interaction',
        'event.interaction.fork',
        `event.interaction.fork.owner:${owner}`,
        `event.interaction.fork.owner:${owner}.viz:${visualization.id}`,
      ],
    });

    return { id, userName };
  }
}
