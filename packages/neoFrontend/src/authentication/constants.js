// These values are read in from environment variables.
// See packages/neoBackend/README.md for details.
//
export const GITHUB_CLIENT_ID = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
export const OAUTH_URL_BASE = "https://github.com/login/oauth/authorize";
export const GITHUB_OAUTH_URL =
  OAUTH_URL_BASE + "?client_id=" + GITHUB_CLIENT_ID;

// Both Google and FB client need to make adynamic from env after test
export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/auth?scope=email profile openid&openid.realm&client_id=1089209754756-iuvb60rkf8mheiqk186n3kk7lp6sb5kr.apps.googleusercontent.com&redirect_uri=http://localhost:3000/authenticated&response_type=id_token`;
export const FACEBOOK_OAUTH_URL = `https://www.facebook.com/v8.0/dialog/oauth?client_id=392704021076365&response_type=code&redirect_uri=http://localhost:3000/authenticated&state="{viz-2@#A}"`;

export const AUTH_PENDING = "AUTH_PENDING";
export const CI_USER_CODE = "ci";
export const CI_AUTH_PATH = "/authenticated?code=" + CI_USER_CODE;
