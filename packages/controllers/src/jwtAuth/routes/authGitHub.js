import asyncHandler from 'express-async-handler';
import { GetOrCreateUser } from 'vizhub-use-cases';
import { toErrorResponse } from '../../Error';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { jwtSign } from '../jwt';

export const authGitHub = userGateway => {
  const getOrCreateUser = new GetOrCreateUser({ userGateway });
  return asyncHandler(async (req, res) => {
    try {
      const accessToken = await getAccessToken(req.body.code);
      const gitHubUser = await getGitHubUser(accessToken);

      const oAuthProfile = {
        id: '' + gitHubUser.id,
        username: gitHubUser.login,
        _json: gitHubUser
      };

      const user = await getOrCreateUser({ oAuthProfile });

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
