import { getProfileDataController } from './getProfileDataController';
import { getUserSearchResultsDataController } from './getUserSearchResultsData';
import { getUsersController } from './getUsers';

export const userAPIController = (expressApp, userGateway) => {
  getProfileDataController(expressApp, userGateway);
  getUserSearchResultsDataController(expressApp, userGateway);
  getUsersController(expressApp, userGateway);
};
