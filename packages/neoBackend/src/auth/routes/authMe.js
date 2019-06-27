import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../../ErrorResponse';
import { VizHubAPIError } from '../../VizHubAPIError';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { getJWT } from '../getJWT';

const secret = process.env.REACT_APP_VIZHUB_JWT_SECRET;

export const authMe = (req, res) => {
  try {
    const { vizHubJWT } = req.cookies;
    const gitHubUser = jwt.verify(vizHubJWT, secret);
    const { login, id, name } = gitHubUser;
    res.send({ login, id, name });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      error = new VizHubAPIError({
        error: 'jwt_error',
        errorDescription: error.message
      });
    }

    res.send(ErrorResponse(error));
  }
};
