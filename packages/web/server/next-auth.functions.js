import { ciUser } from 'datavis-tech-entities';

require('dotenv').load();

const updateUser = async (user) => {
  console.log('TODO implement updateUser');
  return user;
};

const removeUser = async (id) => {
  console.log('TODO implement removeUser');
  return true;
};

const serializeUser = user => {
  if (user.id) {
    return Promise.resolve(user.id);
  } else {
    return Promise.reject(new Error('Unable to serialise user'));
  }
};

module.exports = async (userController) => ({
  // If a user is not found find() should return null (with no error).
  find: async (options) => {
    if (options.provider) {
      const user = await userController.getUser({
        id: options.provider.id
      });
      if (user) {
        // This object is expected by next-auth.
        user[options.provider.name] = {};
      }
      return user;
    }
    return null;
  },

  insert: userController.createUser,

  update: updateUser,
  remove: removeUser,
  serialize: serializeUser,
  deserialize: async (id) => {
    const user = await userController.getUser({ id });
    if (user) {
      user.authenticated = true;
    }
    return user;
  },
  signIn: () => Promise.resolve(ciUser)
});
