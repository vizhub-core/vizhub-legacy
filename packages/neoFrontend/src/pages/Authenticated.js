import queryString from 'query-string';

// This page will open within the authentication popup,
// triggered by the OAuth callback URL, which should be set to
// `${serverURL}/authenticated`.
//
// When invoked via OAuth, it will have a code attached, like this:
//
// `${serverURL}/authenticated?code=fff33d3da4333abdr4fe`.
//
// The code needs to be passed out of the popup to complete the auth flow.
//
export const Authenticated = () => {

  // Get the code passed from OAuth out of the URL.
  const query = queryString.parse(window.location.search);
  const vizHubOAuthCode = query.code;

  // Pass the code from this popup to the parent page (opener).
  window.opener.postMessage({ vizHubOAuthCode }, window.opener.location);

  // Render nothing.
  return null;
};
