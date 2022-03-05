import { Viz } from 'vizhub-entities';
import { Gateways } from './Gateways';

// Convenience interactor for saving info and content together.
export const SaveViz = (gateways: Gateways) => {
  return async (viz: Viz): Promise<void> => {
    await Promise.all([
      gateways.saveVizInfo(viz.vizInfo),
      gateways.saveVizContent(viz.vizContent),
    ]);
  };
};
