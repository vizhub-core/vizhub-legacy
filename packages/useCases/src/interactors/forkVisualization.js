import { timestamp } from 'vizhub-entities';
import { getFileIndex } from 'vizhub-presenters';
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
    const { visualization, forkSettings, owner } = requestModel;
    const vizId = visualization.info.id;

    if (!owner) {
      throw new Error(i18n('errorNoOwner'));
    }

    const nowTimestamp = timestamp();

    const indexHtmlIndex = getFileIndex(
      visualization.content.files,
      'index.html'
    );
    const indexHtml = visualization.content.files[indexHtmlIndex];
    const updatedIndexHtml = {
      ...indexHtml,
      text: indexHtml.text.replace(
        `<title>${visualization.info.title}</title>`,
        `<title>${forkSettings.forkTitle}</title>`
      ),
    };

    const files = [...visualization.content.files];
    files[indexHtmlIndex] = updatedIndexHtml;

    const [
      { id },
      {
        user: { userName },
      },
    ] = await Promise.all([
      this.visualizationGateway.createVisualization({
        owner,
        id: generateId(),
        title: forkSettings.forkTitle || visualization.info.title,
        slug: undefined,
        description: visualization.info.description,
        height: visualization.info.height,
        files,
        forkedFrom: vizId,
        forksCount: 0,
        createdTimestamp: nowTimestamp,
        lastUpdatedTimestamp: nowTimestamp,
        privacy: visualization.info.privacy,
      }),
      this.getUser.execute({ id: owner }),
    ]);

    // No need to "await" this as we can return immediately.
    this.visualizationGateway.incrementForksCount({ id: vizId });

    // No need to "await" this as we can return immediately.
    const vizOwner = visualization.info.owner;
    const eventIDs = `event.interaction.viz.fork.owner:${vizOwner}.viz:${vizId}`;
    this.sendEvent.execute({ eventIDs });

    return { id, userName };
  }
}
