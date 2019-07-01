// TODO capitalize these for strong convention
export const GITHUB_CLIENT_ID = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
export const OAUTH_URL_BASE = 'https://github.com/login/oauth/authorize';
export const GITHUB_OAUTH_URL =
  OAUTH_URL_BASE + '?client_id=' + GITHUB_CLIENT_ID;

export const AUTH_PENDING = 'AUTH_PENDING';
