import asyncHandler from "express-async-handler";
import { GetOrCreateUser } from "vizhub-use-cases";
import { toErrorResponse } from "../../Error";
import { getFBUser } from "../getFBUser";
import { getFBAccessToken } from "../getFBAccessToken";
import { jwtSign } from "../jwt";

export const authFB = userGateway => {
  const getOrCreateUser = new GetOrCreateUser({ userGateway });
  return asyncHandler(async (req, res) => {
    try {
      const accessToken = await getAccessToken(req.body.code);
      const fbUser = await getFBUser(accessToken);

      const oAuthProfile = {
        id: "" + fbUser.id,
        username: fbUser.name,
        _json: fbUser
      };

      const responseModel = await getOrCreateUser.execute({ oAuthProfile });
      const user = responseModel.user;

      //   // Generate a JWT with the user id as its payload.
      const vizHubJWT = await jwtSign(user.id);

      //   // Store the JWT securely in an httpOnly cookie.
      const days = 1000 * 60 * 60 * 24;
      res.cookie("vizHubJWT", vizHubJWT, { httpOnly: true, maxAge: 14 * days });

      // Send the user data as the response (same response as authMe).
      res.send(user);
    } catch (error) {
      res.send(toErrorResponse(error));
    }
  });
};
