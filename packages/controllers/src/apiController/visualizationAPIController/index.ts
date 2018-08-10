import { createVisualizationController } from './createVisualizationController';
import { getVisualizationController } from './getVisualizationController';
import { saveVisualizationController } from './saveVisualizationController';
import { forkVisualizationController } from './forkVisualizationController';

export const visualizationAPIController = (expressApp, { visualizationGateway }) => {
  createVisualizationController(expressApp, visualizationGateway);
  getVisualizationController(expressApp, visualizationGateway);
  saveVisualizationController(expressApp, visualizationGateway);
  forkVisualizationController(expressApp, visualizationGateway);
};
