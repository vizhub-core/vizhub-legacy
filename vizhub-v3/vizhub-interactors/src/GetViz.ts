import { VizId, Viz } from 'vizhub-entities';
import { Gateways } from './Gateways';

// Convenience interactor for getting info and content together.
export const GetViz = (gateways: Gateways) => {
  return async (vizId: VizId): Promise<Viz> => {
    const [vizInfo, vizContent] = await Promise.all([
      gateways.getVizInfo(vizId),
      gateways.getVizContent(vizId),
    ]);
    return { vizInfo, vizContent };
  };
};
