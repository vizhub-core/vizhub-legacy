import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../../ErrorResponse';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { getJWT } from '../getJWT';

export const authGitHub = asyncHandler(async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const vizHubJWT = await getJWT(gitHubUser);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send({ success: true });
  } catch (error) {
    res.send(ErrorResponse(error));
  }
});
