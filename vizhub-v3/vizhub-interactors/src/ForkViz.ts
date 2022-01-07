import { VizId, VizInfo, VizContent, UserId, Timestamp } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const ForkViz = (gateways: Gateways) => {
  const { getVizInfo, getVizContent, saveVizInfo, saveVizContent } = gateways;

  return async (options: {
    newVizId: VizId; // The ID for the new viz.
    newOwner: UserId; // The owner of the new viz.
    forkedFrom: VizId; // The ID viz being forked.
    timestamp: Timestamp; // The timestamp at which this viz is forked.
    preFork?: () => Promise<void>; // A function invoked before forking.
    postFork?: () => Promise<void>; // A function invoked after forking.
  }): Promise<void> => {
    const { newVizId, newOwner, forkedFrom, timestamp, preFork, postFork } =
      options;
    if (preFork) {
      await preFork();
    }

    const [forkedFromVizInfo, forkedFromVizContent] = await Promise.all([
      getVizInfo(forkedFrom),
      getVizContent(forkedFrom),
    ]);

    const newVizInfo: VizInfo = {
      ...forkedFromVizInfo,
      id: newVizId,
      forkedFrom: forkedFrom,
      owner: newOwner,
      createdTimestamp: timestamp,
      lastUpdatedTimestamp: timestamp,
    };

    const newVizContent: VizContent = {
      ...forkedFromVizContent,
      id: newVizId,
    };

    await Promise.all([saveVizInfo(newVizInfo), saveVizContent(newVizContent)]);
    if (postFork) {
      await postFork();
    }
  };
};
