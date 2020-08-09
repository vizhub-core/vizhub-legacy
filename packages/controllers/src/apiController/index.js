import { visualizationAPIController } from './visualizationAPIController/index';
import { datasetAPIController } from './datasetAPIController/index';
import { userAPIController } from './userAPIController/index';
export { paymentsAPIController } from './paymentsAPIController/index';

export const apiController = (expressApp, gateways) => {
  visualizationAPIController(expressApp, gateways);
  datasetAPIController(expressApp, gateways);
  userAPIController(expressApp, gateways);
};
