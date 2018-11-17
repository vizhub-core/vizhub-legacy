import { createVisualizationController } from './createVisualizationController';
import { getVisualizationController } from './getVisualizationController';
import { exportVisualizationController } from './exportVisualizationController';
import { saveVisualizationController } from './saveVisualizationController';
import { deleteVisualizationController } from './deleteVisualizationController';
import { forkVisualizationController } from './forkVisualizationController';
import { getAllVisualizationInfosController } from './getAllVisualizationInfosController';
import { getThumbnailController } from './getThumbnailController';
import { getPreviewController } from './getPreviewController';

export const visualizationAPIController = (expressApp, gateways) => {
  createVisualizationController(expressApp, gateways);
  getVisualizationController(expressApp, gateways);
  exportVisualizationController(expressApp, gateways);
  saveVisualizationController(expressApp, gateways);
  deleteVisualizationController(expressApp, gateways);
  forkVisualizationController(expressApp, gateways);
  getAllVisualizationInfosController(expressApp, gateways);
  getThumbnailController(expressApp, gateways);
  getPreviewController(expressApp, gateways);
};
