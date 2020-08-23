import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { createAuthController } from './createAuthController';

const getUserFromRequest = async (req) => {
  const accessToken = await getAccessToken(req.body.code);
  const gitHubUser = await getGitHubUser(accessToken);

  const user = {
    id: '' + gitHubUser.id,
    username: gitHubUser.login,
    email: gitHubUser.email,
    _json: gitHubUser,
  };

  return user;
};

export const authGitHub = createAuthController(getUserFromRequest);
