import { GetUserProfileData } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const getProfileDataController = (expressApp, gateways) => {
  const getUserProfileData = new GetUserProfileData(gateways);

  expressApp.get('/api/user/getProfileData/:userName', async (req, res) => {
    try {
      const { userName } = req.params;
      const requestModel = {
        userName,
        authenticatedUser: userIdFromReq(req),
        ...req.query,
      };
      const responseModel = await getUserProfileData.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({
        error: {
          message: error.message,
          statusCode: error.statusCode,
        },
      });
    }
  });
};
