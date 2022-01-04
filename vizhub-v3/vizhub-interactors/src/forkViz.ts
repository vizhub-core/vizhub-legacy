import { VizId, VizInfo, VizContent, UserId, Timestamp } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const forkViz = async (options: {
  gateways: Gateways;
  newVizId: VizId; // The ID for the new viz.
  newOwner: UserId; // The owner of the new viz.
  forkedFrom: VizId; // The ID viz being forked.
  timestamp: Timestamp; // The timestamp at which this viz is forked.
}): Promise<void> => {
  const { gateways, newVizId, newOwner, forkedFrom, timestamp } = options;
  const { getVizInfo, getVizContent, saveVizInfo, saveVizContent } = gateways;

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
};
