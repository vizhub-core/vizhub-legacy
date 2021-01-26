import { createVisualizationController } from './createVisualizationController';
import { getVisualizationController } from './getVisualizationController';
import { exportVisualizationController } from './exportVisualizationController';
import { saveVisualizationController } from './saveVisualizationController';
import { deleteVisualizationController } from './deleteVisualizationController';
import { forkVisualizationController } from './forkVisualizationController';
import { getAllVisualizationInfosController } from './getAllVisualizationInfosController';
import { getHomePageDataController } from './getHomePageDataController';
import { getVisualizationInfosController } from './getTemplatesDataController';
import { getThumbnailController } from './getThumbnailController';
import { getPreviewController } from './getPreviewController';
import { getSearchResultsPageDataController } from './getSearchResultsPageData';
import { getForksController } from './getForksController';
import { getSharedVisualizationsController } from './getSharedVisualizationsController';
import { getPrivateVisualizationsController } from './getPrivateVisualizationsController';
import { getPublicVisualizationsController } from './getPublicVisualizationsController';

// the order of controllers matters
export const visualizationAPIController = (expressApp, gateways) => {
  createVisualizationController(expressApp, gateways);
  getSharedVisualizationsController(expressApp, gateways);
  getPrivateVisualizationsController(expressApp, gateways);
  getPublicVisualizationsController(expressApp, gateways);
  getVisualizationController(expressApp, gateways);
  exportVisualizationController(expressApp, gateways);
  saveVisualizationController(expressApp, gateways);
  deleteVisualizationController(expressApp, gateways);
  forkVisualizationController(expressApp, gateways);
  getAllVisualizationInfosController(expressApp, gateways);
  getHomePageDataController(expressApp, gateways);
  getVisualizationInfosController(expressApp, gateways);
  getThumbnailController(expressApp, gateways);
  getPreviewController(expressApp, gateways);
  getSearchResultsPageDataController(expressApp, gateways);
  getForksController(expressApp, gateways);
};
