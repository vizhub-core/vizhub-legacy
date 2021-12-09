import {
  DatabaseVisualizationGateway,
  DatabaseDatasetGateway,
  DatabaseUserGateway,
  DatabaseImageStorageGateway,
  DatabaseEventRecordsGateway,
} from 'vizhub-gateways';
import { Database } from 'vizhub-database';
import { getConnection } from './shareDB';
import { getMongoDatabase } from './mongodb';

export { getShareDB } from './shareDB';
export { getConnection };

export const serverGateways = async () => {
  const database = Database(getConnection(), await getMongoDatabase());

  return {
    visualizationGateway: new DatabaseVisualizationGateway(database),
    datasetGateway: new DatabaseDatasetGateway(database),
    userGateway: new DatabaseUserGateway(database),
    imageStorageGateway: new DatabaseImageStorageGateway(database),
    eventRecordsGateway: new DatabaseEventRecordsGateway(database),
  };
};
