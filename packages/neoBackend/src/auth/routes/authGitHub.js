import asyncHandler from 'express-async-handler';
import { CreateUser } from 'datavis-tech-use-cases';
import { toErrorResponse } from '../../Error';
import { getAccessToken } from '../getAccessToken';
import { getGitHubUser } from '../getGitHubUser';
import { jwtSign, jwtVerify } from '../jwt';

export const authGitHub = userGateway => asyncHandler(async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const userName = gitHubUser.login;

    // TODO move this logic into getOrCreateUser interactor (in useCases).
    try {
      const user = await userGateway.getUserByUserName(userName);
      console.log('user exists!');
      console.log(user);
    } catch (error) {
      console.log('user does not exist, creating!');
      const createUser = new CreateUser({ userGateway });
      const oAuthProfile = {
        id: '' + gitHubUser.id,
        username: gitHubUser.login,
        _json: gitHubUser
      };
      const requestModel = { oAuthProfile };
      const responseModel = await createUser.execute(requestModel);
      console.log(responseModel);
    }

    const vizHubJWT = await jwtSign(gitHubUser);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send(jwtVerify(vizHubJWT));
  } catch (error) {
    res.send(toErrorResponse(error));
  }
});
