import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { VizHubAPIError } from '../VizHubAPIError';
import { getGitHubUser } from './getGitHubUser';

const hours = n => 60 * 60 * n;

export const getJWT = async gitHubUser => {
  return 'poop';

  // console.log(data);

  // // TODO use VizHub User entity?
  // const user = {
  //   login: data.login,
  //   id: data.id
  // };

  // try {
  //   return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: hours(24) });
  // } catch (error) {
  //   throw new VizHubAPIError({
  //     error: 'jwt_signing_error',
  //     errorDescription: error.message
  //   });
  // }
};
