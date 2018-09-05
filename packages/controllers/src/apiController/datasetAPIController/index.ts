import { createDatasetController } from './createDatasetController';
import { getDatasetController } from './getDatasetController';
// import { saveDatasetController } from './saveDatasetController';

export const datasetAPIController = (expressApp, gateways) => {
  createDatasetController(expressApp, gateways);
  getDatasetController(expressApp, gateways);
  // saveDatasetController(expressApp, datasetGateway);
};
