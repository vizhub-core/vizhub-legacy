import {
  DatabaseVisualizationGateway,
  DatabaseDatasetGateway,
  DatabaseUserGateway
} from 'datavis-tech-gateways';
import { Database } from 'datavis-tech-database';
import { getConnection } from './shareDB';

export const serverGateways = () => {
  const database = Database(getConnection());
  return {
    visualizationGateway: new DatabaseVisualizationGateway(database),
    datasetGateway: new DatabaseDatasetGateway(database),
    userGateway: new DatabaseUserGateway(database),
  };
};
