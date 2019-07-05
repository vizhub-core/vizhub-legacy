import { jwtVerify } from '../jwt';
import { toErrorResponse } from '../../Error';

export const authMe = (req, res) => {
  try {
    const { vizHubJWT } = req.cookies;
    const me = jwtVerify(vizHubJWT);
    res.send({ me });
  } catch (error) {
    res.send(toErrorResponse(error));
  }
};
