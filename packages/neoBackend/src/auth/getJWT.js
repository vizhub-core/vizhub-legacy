import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { VizHubAPIError } from '../VizHubAPIError';
import { getGitHubUser } from './getGitHubUser';

const hours = n => 60 * 60 * n;
const secret = process.env.REACT_APP_VIZHUB_JWT_SECRET;

export const getJWT = async gitHubUser => {
  // TODO use VizHub User entity
  const { login, id } = gitHubUser;
  const user = { login, id };

  try {
    return jwt.sign(user, secret, { expiresIn: hours(24) });
  } catch (error) {
    throw new VizHubAPIError({
      error: 'jwt_signing_error',
      errorDescription: error.message
    });
  }
};
