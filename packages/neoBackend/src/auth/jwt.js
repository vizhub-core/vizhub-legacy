import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { VizHubAPIError } from '../VizHubAPIError';
import { getGitHubUser } from './getGitHubUser';

const secret = process.env.REACT_APP_VIZHUB_JWT_SECRET;

export const jwtSign = async gitHubUser => {
  // TODO use VizHub User entity
  const { login, id, name } = gitHubUser;
  const user = { login, id, name };

  try {
    return jwt.sign(user, secret, { expiresIn: '2 days' });
  } catch (error) {
    throw new VizHubAPIError({
      error: 'jwt_signing_error',
      errorDescription: error.message
    });
  }
};

export const jwtVerify = vizHubJWT => {
  const { login, id, name } = jwt.verify(vizHubJWT, secret);
  return { login, id, name };
};
