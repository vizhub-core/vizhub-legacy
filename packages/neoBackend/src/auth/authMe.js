import { getAccessToken } from './getAccessToken';
import { getGitHubUser } from './getGitHubUser';
import { getJWT } from './getJWT';
import { ErrorResponse } from '../ErrorResponse';
import jwt from 'jsonwebtoken';

const secret = process.env.REACT_APP_VIZHUB_JWT_SECRET;

export const authMe = (req, res) => {
  try {
    const { vizHubJWT } = req.cookies;
    const gitHubUser = jwt.verify(vizHubJWT, secret);
    const { login, id, name } = gitHubUser;
    res.send({ login, id, name });
  } catch (error) {
    res.send(ErrorResponse(error));
  }
};
