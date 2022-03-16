import { VizId, VizInfo, VizContent, UserId, Timestamp } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const ForkViz = (gateways: Gateways) => {
  const {
    getVizInfoSnapshot,
    getVizContentSnapshot,
    saveVizInfo,
    saveVizContent,
  } = gateways;

  return async (options: {
    newVizId: VizId; // The ID for the new viz.
    newOwner: UserId; // The owner of the new viz.
    forkedFrom: VizId; // The ID viz being forked.
    timestamp: Timestamp; // The timestamp at which this viz is forked.
  }): Promise<void> => {
    const { newVizId, newOwner, forkedFrom, timestamp } = options;

    const [forkedFromVizInfoSnapshot, forkedFromVizContentSnapshot] =
      await Promise.all([
        getVizInfoSnapshot(forkedFrom),
        getVizContentSnapshot(forkedFrom),
      ]);
    const forkedFromVizInfo = forkedFromVizInfoSnapshot.data;
    const forkedFromVizContent = forkedFromVizContentSnapshot.data;

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
  };
};
