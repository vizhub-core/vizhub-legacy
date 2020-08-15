import asyncHandler from "express-async-handler";
import { GetOrCreateUser } from "vizhub-use-cases";
import { toErrorResponse } from "../../Error";
import { getGoogleUser } from "../getGoogleUser";
import { jwtSign } from "../jwt";

export const authGoogle = userGateway => {
  const getOrCreateUser = new GetOrCreateUser({ userGateway });
  return asyncHandler(async (req, res) => {
    try {
      const googleUser = await getGoogleUser(req.body.code);

      const oAuthProfile = {
        id: "" + googleUser.sub,
        username: googleUser.name,
        _json: googleUser
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
