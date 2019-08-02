import {
  DatabaseVisualizationGateway,
  DatabaseDatasetGateway,
  DatabaseUserGateway,
  DatabaseImageStorageGateway
} from 'vizhub-gateways';
import { Database } from 'vizhub-database';
import { getConnection } from './shareDB';
export { getShareDB } from './shareDB';

export const serverGateways = () => {
  const database = Database(getConnection());
  return {
    visualizationGateway: new DatabaseVisualizationGateway(database),
    datasetGateway: new DatabaseDatasetGateway(database),
    userGateway: new DatabaseUserGateway(database),
    imageStorageGateway: new DatabaseImageStorageGateway(database),
  };
};
