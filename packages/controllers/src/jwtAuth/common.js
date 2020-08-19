// Documentation: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
// Documentation: https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint
// Documentation: https://developer.github.com/v3/users/#get-the-authenticated-user

export const config = {
  github: {
    oAuthAccessTokenURL: 'https://github.com/login/oauth/access_token',
    getUserInfoUrl: 'https://api.github.com/user',
    client_id: process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID,
    client_secret: process.env.VIZHUB_GITHUB_CLIENT_SECRET,
  },
  google: {
    getUserInfoUrl: 'https://oauth2.googleapis.com/tokeninfo?id_token=',
  },
  fb: {
    oAuthAccessTokenURL: `https://graph.facebook.com/v8.0/oauth/access_token?client_id=392704021076365&client_secret=13aedfb953666b2a425e5ba00deef3c1&redirect_uri=http://localhost:3000/authenticated&code=`,
    getUserInfoUrl: `https://graph.facebook.com/v8.0/me?fields=id,email,name,first_name,last_name,picture&access_token=`,
    client_id: process.env.REACT_APP_VIZHUB_FACEBOOK_CLIENT_ID,
    client_secret: process.env.VIZHUB_FACEBOOK_CLIENT_SECRET,
  },
};

export const errorObj = (type, error) => {
  let obj;

  switch (type) {
    case 'github':
      obj = {
        error: 'github_user_fetch_error',
        errorDescription:
          error.message || error.error_description || error.error,
        errorURL: error.documentation_url,
      };
      break;

    case 'google':
      obj = {
        error: 'google_user_fetch_error',
        errorDescription: error.error_description,
        errorType: error.error,
      };
      break;

    case 'fb':
      obj = {
        error: 'facebook_token_fetch_error',
        errorDescription: error.error.message,
        errorType: error.error.type,
      };
      break;

    default:
      obj = error;
      break;
  }
  return obj;
};

export const profileObj = (type, user) => {
  let userobj = {};

  switch (type) {
    case 'github':
      userobj = {
        id: '' + user.id,
        username: user.login,
        _json: user,
      };
      break;

    case 'google':
      userobj = {
        id: '' + user.sub,
        username: user.name,
        _json: user,
      };
      break;

    case 'fb':
      userobj = {
        id: '' + user.id,
        username: user.name,
        _json: user,
      };
      break;

    default:
      userobj = user;
      break;
  }

  return userobj;
};
