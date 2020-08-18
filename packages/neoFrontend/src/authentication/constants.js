// These values are read in from environment variables.
// See packages/neoBackend/README.md for details.
//
export const GITHUB_CLIENT_ID = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_VIZHUB_GOOGLE_CLIENT_ID;
export const OAUTH_URL_BASE = "https://github.com/login/oauth/authorize";
export const GITHUB_OAUTH_URL =
  OAUTH_URL_BASE + "?client_id=" + GITHUB_CLIENT_ID;

export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/auth?scope=email profile openid&openid.realm&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/authenticated&response_type=id_token`;
export const FACEBOOK_OAUTH_URL = `https://www.facebook.com/v8.0/dialog/oauth?client_id=392704021076365&response_type=code&redirect_uri=http://localhost:3000/authenticated&state="{viz-2@#A}"`;

export const AUTH_PENDING = "AUTH_PENDING";
export const CI_USER_CODE = "ci";
export const CI_AUTH_PATH = "/authenticated?code=" + CI_USER_CODE;

// Both Google and FB client need to make dynamic from env after test
