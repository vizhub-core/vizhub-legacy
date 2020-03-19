import { getProfileDataController } from './getProfileDataController';
import { getUserSearchResultsDataController } from './getUserSearchResultsData';

export const userAPIController = (expressApp, userGateway) => {
  getProfileDataController(expressApp, userGateway);
  getUserSearchResultsDataController(expressApp, userGateway);
};
