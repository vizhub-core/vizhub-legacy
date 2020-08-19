import asyncHandler from 'express-async-handler';
import { GetOrCreateUser } from 'vizhub-use-cases';
import { toErrorResponse } from '../../Error';
import { getAccessToken } from '../getAccessToken';
import { getUser } from '../getUser';
import { jwtSign } from '../jwt';
import { profileObj } from '../common';

export const auth = (userGateway) => {
  const getOrCreateUser = new GetOrCreateUser({ userGateway });
  return asyncHandler(async (req, res) => {
    let { type } = req.params;
    try {
      let token =
        type === 'google'
          ? req.body.code
          : await getAccessToken(type, req.body.code);

      const userData = await getUser(type, token);

      const oAuthProfile = profileObj(type, userData);

      const responseModel = await getOrCreateUser.execute({ oAuthProfile });
      const user = responseModel.user;

      //   // Generate a JWT with the user id as its payload.
      const vizHubJWT = await jwtSign(user.id);

      //   // Store the JWT securely in an httpOnly cookie.
      const days = 1000 * 60 * 60 * 24;
      res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true, maxAge: 14 * days });

      // Send the user data as the response (same response as authMe).
      res.send(user);
    } catch (error) {
      res.send(toErrorResponse(error));
    }
  });
};
