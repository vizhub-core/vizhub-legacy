import jwt from 'jsonwebtoken';
import { VizHubAPIError } from 'vizhub-entities';

const secret = process.env.REACT_APP_VIZHUB_JWT_SECRET;

export const jwtSign = async userId => {
  try {
    return jwt.sign({ userId }, secret, { expiresIn: '2 days' });
  } catch (error) {
    throw new VizHubAPIError({
      error: 'jwt_signing_error',
      errorDescription: error.message
    });
  }
};

export const jwtVerify = vizHubJWT => {
  try {
    const { userId } = jwt.verify(vizHubJWT, secret);
    return userId;
  } catch (error) {
    // If there's an error verifying the JWT,
    // e.g. if there is no token provided, or the provided one is expired,
    // return null to signify that the user is not authenticated.
    return null;
  }
};
