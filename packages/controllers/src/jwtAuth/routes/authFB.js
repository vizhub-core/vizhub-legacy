import { getFBUser } from '../getFBUser';
import { getFBAccessToken } from '../getFBAccessToken';
import { createAuthController } from './createAuthController';

const getUserFromRequest = async (req) => {
  const accessToken = await getFBAccessToken(req.body.code);
  const fbUser = await getFBUser(accessToken);

  const user = {
    id: '' + fbUser.id,
    username: fbUser.name,
    _json: fbUser,
  };

  return user;
};

export const authFB = createAuthController(getUserFromRequest);
