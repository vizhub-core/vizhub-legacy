import { createVisualizationController } from './createVisualizationController';
import { getVisualizationController } from './getVisualizationController';
import { exportVisualizationController } from './exportVisualizationController';
import { saveVisualizationController } from './saveVisualizationController';
import { forkVisualizationController } from './forkVisualizationController';

export const visualizationAPIController = (expressApp, gateways) => {
  createVisualizationController(expressApp, gateways);
  getVisualizationController(expressApp, gateways);
  exportVisualizationController(expressApp, gateways);
  saveVisualizationController(expressApp, gateways);
  forkVisualizationController(expressApp, gateways);
};
