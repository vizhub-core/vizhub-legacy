export const getUserAvatar = async (provider, user) => {
  let avatar = '';

  switch (provider) {
    case 'github':
      avatar = user.avatar_url;
      break;

    case 'google':
      avatar = user.picture;
      break;

    case 'fb':
      let {
        data: { url },
      } = user.picture;
      avatar = url;
      break;

    default:
      avatar = user.avatar_url;
      break;
  }

  return avatar;
};
