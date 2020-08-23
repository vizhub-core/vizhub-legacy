import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { createAuthController } from './createAuthController';
import { getUserAvatar } from '../getUserAvatar';

const getUserFromRequest = async (req) => {
  const accessToken = await getAccessToken(req.body.code);
  const gitHubUser = await getGitHubUser(accessToken);
  const avatar_url = await getUserAvatar('github', gitHubUser);

  const user = {
    id: '' + gitHubUser.id,
    username: gitHubUser.login,
    email: gitHubUser.email,
    avatar_url: avatar_url,
    _json: gitHubUser,
  };

  return user;
};

export const authGitHub = createAuthController(getUserFromRequest);
