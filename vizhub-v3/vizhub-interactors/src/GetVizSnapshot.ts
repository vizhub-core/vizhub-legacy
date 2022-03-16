import { VizId, Viz } from 'vizhub-entities';
import { Gateways } from './Gateways';

// Convenience interactor for getting info and content together.
export const GetVizSnapshot = (gateways: Gateways) => {
  return async (vizId: VizId): Promise<Viz> => {
    const [vizInfoSnapshot, vizContentSnapshot] = await Promise.all([
      gateways.getVizInfoSnapshot(vizId),
      gateways.getVizContentSnapshot(vizId),
    ]);
    return { vizInfoSnapshot, vizContentSnapshot };
  };
};
