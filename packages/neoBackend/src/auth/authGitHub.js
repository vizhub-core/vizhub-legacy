import { getAccessToken } from './getAccessToken';
import { getGitHubUser } from './getGitHubUser';
import { getJWT } from './getJWT';
import { ErrorResponse } from '../ErrorResponse';

export const authGitHub = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const gitHubUser = await getGitHubUser(accessToken);
    const vizHubJWT = await getJWT(gitHubUser);
    res.cookie('vizHubJWT', vizHubJWT, { httpOnly: true });
    res.send({ success: true });
  } catch (error) {
    res.send(ErrorResponse(error));
  }
};
