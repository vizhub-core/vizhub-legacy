import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../../ErrorResponse';
import { VizHubAPIError } from '../../VizHubAPIError';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { jwtSign, jwtVerify } from '../jwt';

export const authGitHub = asyncHandler(async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const vizHubJWT = await jwtSign(gitHubUser);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send(jwtVerify(vizHubJWT));
  } catch (error) {
    // TODO unify with logic in authMe
    if (error.name === 'JsonWebTokenError') {
      error = new VizHubAPIError({
        error: 'jwt_error',
        errorDescription: error.message
      });
    }
    res.send(ErrorResponse(error));
  }
});
