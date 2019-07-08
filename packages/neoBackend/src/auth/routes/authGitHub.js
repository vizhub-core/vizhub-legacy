import asyncHandler from 'express-async-handler';
import { CreateUser } from 'datavis-tech-use-cases';
import { toErrorResponse } from '../../Error';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { jwtSign } from '../jwt';

export const authGitHub = userGateway => {
  const createUser = new CreateUser({ userGateway });
  return asyncHandler(async (req, res) => {
    try {
      const accessToken = await getAccessToken(req.body.code);
      const gitHubUser = await getGitHubUser(accessToken);
      const userName = gitHubUser.login;

      let user;

      // TODO move logic into getOrCreateUser interactor (in useCases).
      // TODO add tests for it
      //  - user does not exist
      //  - user exists
      try {
        user = await userGateway.getUserByUserName(userName);
      } catch (error) {
        const oAuthProfile = {
          id: '' + gitHubUser.id,
          username: gitHubUser.login,
          _json: gitHubUser
        };
        const requestModel = { oAuthProfile };
        const responseModel = await createUser.execute(requestModel);
        user = responseModel.user;
      }

      // Generate a JWT with the user id as its payload.
      const vizHubJWT = await jwtSign(user.id);

      // Store the JWT securely in an httpOnly cookie.
      res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });

      // Send the user data as the response (same response as authMe).
      res.send(user);
    } catch (error) {
      res.send(toErrorResponse(error));
    }
  });
};
