import { createDatasetController } from './createDatasetController';
import { getDatasetController } from './getDatasetController';
// import { saveDatasetController } from './saveDatasetController';

export const datasetAPIController = (expressApp, { datasetGateway }) => {
  createDatasetController(expressApp, datasetGateway);
  getDatasetController(expressApp, datasetGateway);
  // saveDatasetController(expressApp, datasetGateway);
};
