import { getUserIDFromJWT } from '../jwtAuth';
export const userIdFromReq = req => {
  // Handle VizHub 1.0 sessions.
  if (req.user) {
    return req.user.id;
  }

  // Handle VizHub 2.0 sessions.
  const { vizHubJWT } = req.cookies;
  if (vizHubJWT) {
    return getUserIDFromJWT(vizHubJWT);
  }
};
