import asyncHandler from 'express-async-handler';
import { toErrorResponse } from '../../Error';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { jwtSign, jwtVerify } from '../jwt';

export const authGitHub = userGateway => asyncHandler(async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const vizHubJWT = await jwtSign(gitHubUser);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send(jwtVerify(vizHubJWT));
  } catch (error) {
    res.send(toErrorResponse(error));
  }
});
