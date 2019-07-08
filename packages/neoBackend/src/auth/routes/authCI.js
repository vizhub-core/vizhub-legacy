import asyncHandler from 'express-async-handler';
import { ciUser } from 'vizhub-entities';
import { ErrorResponse, VizHubAPIError } from '../../Error';
import { jwtSign } from '../jwt';

export const authCI = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    const vizHubJWT = await jwtSign(ciUser.id);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send(ciUser);
  } else {
    res.send(
      ErrorResponse(
        new VizHubAPIError({
          error: 'attempted_ci_access_in_production',
          errorDescription:
            'CI user access is not allowed in production. Check that NODE_ENV === \'development\''
        })
      )
    );
  }
});
