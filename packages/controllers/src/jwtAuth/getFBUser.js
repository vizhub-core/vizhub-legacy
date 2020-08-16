import { VizHubAPIError } from "vizhub-entities";
import fetch from "node-fetch";

// Documentation: https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint

const FBGetUserInfoUrl = `https://graph.facebook.com/v8.0/me?fields=id,name,first_name,last_name,picture&access_token=`;

export const getFBUser = async token => {
  let fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(`${FBGetUserInfoUrl}${token}`, fetchOptions);

  const FBUser = await response.json();
};

if (FBUser.error) {
  throw new VizHubAPIError({
    error: "facebook_token_fetch_error",
    errorDescription: FBUser.error.message,
    errorType: FBUser.error.type
  });

  return FBUser;
}
