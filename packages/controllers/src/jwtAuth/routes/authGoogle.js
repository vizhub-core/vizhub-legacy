import { getGoogleUser } from '../getGoogleUser';
import { createAuthController } from './createAuthController';
import { getUserAvatar } from '../getUserAvatar';

const getUserFromRequest = async (req) => {
  // retrive google user from id_token
  const googleUser = await getGoogleUser(req.body.code);
  const avatar_url = await getUserAvatar('google', googleUser);

  const user = {
    id: '' + googleUser.sub,
    username: googleUser.name,
    email: googleUser.email,
    avatar_url: avatar_url,
    _json: googleUser,
  };

  return user;
};

export const authGoogle = createAuthController(getUserFromRequest);
