import { getFBUser } from '../getFBUser';
import { getFBAccessToken } from '../getFBAccessToken';
import { createAuthController } from './createAuthController';
import { getUserAvatar } from '../getUserAvatar';

const getUserFromRequest = async (req) => {
  const accessToken = await getFBAccessToken(req.body.code);
  const fbUser = await getFBUser(accessToken);
  const avatar_url = await getUserAvatar('fb', fbUser);

  const user = {
    id: '' + fbUser.id,
    username: fbUser.name,
    email: fbUser.email,
    avatar_url: avatar_url,
    _json: fbUser,
  };

  return user;
};

export const authFB = createAuthController(getUserFromRequest);
