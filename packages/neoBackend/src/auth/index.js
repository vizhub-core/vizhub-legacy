import jwt from 'jsonwebtoken';
import { getAccessToken } from './getAccessToken';
import asyncHandler from 'express-async-handler';

const authGitHub = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    res.send({ accessToken });
  } catch (errorResponse) {
    res.send(errorResponse);
  }
};

export const auth = app => {
  app.post('/api/auth/github', asyncHandler(authGitHub));
};
//        // set token in header for fetching user
//        // api for getting profile data
//        return fetch('https://api.github.com/user', {
//          method: 'GET',
//          mode: 'cors',
//          headers: {
//            Accept: 'application/json',
//            'Content-Type': 'application/json',
//            Authorization: `token ${accessToken}`,
//          },
//        })
//          .then(response => response.json())
//          .then(data => {
//            console.log(data);
//            // storing user profile for creating access token
//            const user = {
//              user: data.login,
//              id: data.id,
//            };
//
//            // generating jwt token with expired in 24 hour and sending to front
//            jwt.sign(
//              user,
//              process.env.JWT_SECRET,
//              {expiresIn: 60 * 60 * 24},
//              (err, token) => {
//                res.json({
//                  token,
//                });
//                console.log('l' + token);
//              },
//            );
//          });
//      .catch(error => {
//        console.log(error);
//      });
//      })
