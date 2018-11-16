import { getProfileDataController } from './getProfileDataController';

export const userAPIController = (expressApp, userGateway) => {
  getProfileDataController(expressApp, userGateway);
};
