import { getGoogleUser } from '../getGoogleUser';
import { createAuthController } from './createAuthController';

const getUserFromRequest = async (req) => {
  // retrive google user from id_token
  const googleUser = await getGoogleUser(req.body.code);

  const user = {
    id: '' + googleUser.sub,
    username: googleUser.name,
    _json: googleUser,
  };

  return user;
};

export const authGoogle = createAuthController(getUserFromRequest);
