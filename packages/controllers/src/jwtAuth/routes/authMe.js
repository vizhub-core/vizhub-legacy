import asyncHandler from 'express-async-handler';
import { GetUser } from 'vizhub-use-cases';
import { getUserIDFromJWT } from '../jwt';
import { toErrorResponse } from '../../Error';

export const authMe = (userGateway) => {
  const getUser = new GetUser({ userGateway });
  return asyncHandler(async (req, res) => {
    try {
      const { vizHubJWT } = req.cookies;
      const id = getUserIDFromJWT(vizHubJWT);
      console.log(id);
      if (!id) {
        return res.send({ me: null });
      }
      const requestModel = { id };
      const responseModel = await getUser.execute(requestModel);
      const me = responseModel.user;
      res.send({ me });
    } catch (error) {
      res.send(toErrorResponse(error));
    }
  });
};
