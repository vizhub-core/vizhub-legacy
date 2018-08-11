import { createVisualizationController } from './createVisualizationController';
import { getVisualizationController } from './getVisualizationController';
import { saveVisualizationController } from './saveVisualizationController';
import { forkVisualizationController } from './forkVisualizationController';

export const visualizationAPIController = (expressApp, gateways) => {
  createVisualizationController(expressApp, gateways);
  getVisualizationController(expressApp, gateways);
  saveVisualizationController(expressApp, gateways);
  forkVisualizationController(expressApp, gateways);
};
